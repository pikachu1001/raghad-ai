import OpenAI from "openai";
import https from "https";
import type { TextChunk } from "./chunker";
import { enrichChunkWithSynonyms } from "./dialect";
import { chatViaPowerShell, shouldUsePowerShellOpenAI } from "./powershell-openai";
import { cosineSimilarity, hybridMerge, keywordScore } from "./hybrid-search";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-4o-mini";
const EMBED_BATCH_SIZE = 3;
const REQUEST_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey || apiKey.includes("REPLACE_WITH")) {
    throw new Error("OPENAI_API_KEY is not configured in .env");
  }
  return new OpenAI({
    apiKey,
    timeout: REQUEST_TIMEOUT_MS,
    maxRetries: MAX_RETRIES,
  });
}

function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("timed out") ||
    msg.includes("timeout") ||
    msg.includes("connection") ||
    msg.includes("econnrefused") ||
    msg.includes("fetch failed")
  );
}

function openaiPostViaHttps<T>(path: string, payload: object): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY!.trim();
  const body = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.openai.com",
        path,
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        timeout: REQUEST_TIMEOUT_MS,
        family: 4,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data) as T & { error?: { message: string } };
            if (parsed.error) reject(new Error(parsed.error.message));
            else resolve(parsed);
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("HTTPS request timed out"));
    });
    req.write(body);
    req.end();
  });
}

async function embedViaHttps(texts: string[]): Promise<number[][]> {
  const parsed = await openaiPostViaHttps<{
    data: { index: number; embedding: number[] }[];
  }>("/v1/embeddings", { model: EMBEDDING_MODEL, input: texts });
  return parsed.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
}

async function embedBatch(client: OpenAI, texts: string[]): Promise<number[][]> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts,
      });
      return response.data
        .sort((a, b) => a.index - b.index)
        .map((d) => d.embedding);
    } catch (error) {
      lastError = error;
      if (attempt === MAX_RETRIES && isNetworkError(error)) {
        console.warn("SDK failed, falling back to native HTTPS...");
        return embedViaHttps(texts);
      }
      if (attempt < MAX_RETRIES) {
        const delay = attempt * 2000;
        console.warn(`Embedding batch failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const client = getOpenAIClient();
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE);
    const batchNum = Math.floor(i / EMBED_BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(texts.length / EMBED_BATCH_SIZE);
    console.log(`Embedding batch ${batchNum}/${totalBatches}...`);

    const embeddings = await embedBatch(client, batch);
    allEmbeddings.push(...embeddings);

    if (i + EMBED_BATCH_SIZE < texts.length) {
      await sleep(400);
    }
  }

  return allEmbeddings;
}

const QUERY_EMBED_TIMEOUT_MS = 8_000;

async function tryEmbedQuery(query: string): Promise<number[] | null> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!.trim(),
    timeout: QUERY_EMBED_TIMEOUT_MS,
    maxRetries: 0,
  });
  try {
    const response = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: [query],
    });
    return response.data[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

export type IndexedChunk = TextChunk & {
  embedding?: number[];
  searchText: string;
};

export function prepareChunksForIndexing(chunks: TextChunk[]): IndexedChunk[] {
  return chunks.map((chunk) => {
    const synonyms = enrichChunkWithSynonyms(chunk.content);
    return {
      ...chunk,
      metadata: { ...chunk.metadata, synonyms },
      searchText: [chunk.content, ...synonyms].join(" "),
    };
  });
}

export async function indexChunks(chunks: TextChunk[]): Promise<IndexedChunk[]> {
  const prepared = prepareChunksForIndexing(chunks);
  console.log(`Indexing ${prepared.length} chunks...`);
  const embeddings = await embedTexts(prepared.map((c) => c.searchText));
  return prepared.map((chunk, i) => ({ ...chunk, embedding: embeddings[i] }));
}

function keywordOnlyRetrieve(
  indexed: IndexedChunk[],
  query: string,
  topK: number
): IndexedChunk[] {
  const searchQuery = query;
  return [...indexed]
    .map((chunk) => ({
      chunk,
      score: keywordScore(searchQuery, chunk.searchText ?? chunk.content),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.chunk);
}

export async function retrieveChunks(
  indexed: IndexedChunk[],
  query: string,
  expandedQuery: string,
  topK = 5
): Promise<IndexedChunk[]> {
  const searchText = `${query} ${expandedQuery}`;
  const queryEmbedding = await tryEmbedQuery(expandedQuery);

  if (!queryEmbedding) {
    return keywordOnlyRetrieve(indexed, searchText, topK);
  }

  const denseScores = new Map<string, number>();
  for (const chunk of indexed) {
    if (!chunk.embedding) continue;
    denseScores.set(chunk.id, cosineSimilarity(queryEmbedding, chunk.embedding));
  }
  const merged = hybridMerge(indexed, query, denseScores, { topK });
  return merged.map((r) => r.item);
}

export async function generateAnswer(
  query: string,
  contextChunks: IndexedChunk[],
  locale: "en" | "ar" = "en",
  category?: string
): Promise<string> {
  const context = contextChunks.map((c) => c.content).join("\n\n---\n\n");

  const categoryHint = category
    ? locale === "ar"
      ? `\nالقسم الحالي: ${category}.`
      : `\nCurrent category focus: ${category}.`
    : "";

  const systemPrompt =
    locale === "ar"
      ? `أنت Raghad AI — مساعد Askraghadai.com للمرأة الخليجية. أجب بناءً على السياق المقدم فقط.${categoryHint}
عند التوصية بمنتج، اذكري اسم المنتج ورابط المتجر وكود الخصم إن وُجد في السياق.
إذا لم تجدي الإجابة في السياق، قولي ذلك بوضوح. يمكنك الإجابة بالعربية الفصحى أو اللهجة المناسبة.`
      : `You are Raghad AI — the Askraghadai.com assistant for the modern Gulf woman. Answer based only on the provided context.${categoryHint}
When recommending products, include the product name, store link, and discount code if present in the context.
If the answer is not in the context, say so clearly.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Context:\n${context}\n\nQuestion: ${query}` },
  ];

  const chatPayload = { model: CHAT_MODEL, messages, temperature: 0.3 };

  if (shouldUsePowerShellOpenAI()) {
    try {
      return await chatViaPowerShell(chatPayload);
    } catch (error) {
      console.warn("[rag] PowerShell chat failed:", error);
    }
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!.trim(),
      timeout: 30_000,
      maxRetries: 0,
    });
    const response = await client.chat.completions.create(chatPayload);
    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    console.warn("[rag] Chat SDK failed, trying HTTPS...");
    try {
      const response = await openaiPostViaHttps<{
        choices: { message: { content: string } }[];
      }>("/v1/chat/completions", chatPayload);
      return response.choices[0]?.message?.content ?? "";
    } catch (httpsError) {
      console.warn("[rag] Chat HTTPS failed, returning context excerpt:", httpsError);
      if (locale === "ar") {
        return `أنا Raghad AI — مساعد Askraghadai.com للمرأة الخليجية.\n\n${contextChunks[0]?.content ?? "تعذر الاتصال بخدمة AI."}`;
      }
      return `I am Raghad AI — your Askraghadai.com assistant for the modern Gulf woman.\n\n${contextChunks[0]?.content ?? "Could not reach AI service."}`;
    }
  }
}

export function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY?.trim();
  return Boolean(key && !key.includes("REPLACE_WITH"));
}
