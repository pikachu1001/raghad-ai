import OpenAI from "openai";
import type { TextChunk } from "./chunker";
import { enrichChunkWithSynonyms } from "./dialect";
import { cosineSimilarity, hybridMerge } from "./hybrid-search";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-4o-mini";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

export async function embedQuery(query: string): Promise<number[]> {
  const [embedding] = await embedTexts([query]);
  return embedding;
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
  const embeddings = await embedTexts(prepared.map((c) => c.searchText));
  return prepared.map((chunk, i) => ({ ...chunk, embedding: embeddings[i] }));
}

export async function retrieveChunks(
  indexed: IndexedChunk[],
  query: string,
  expandedQuery: string,
  topK = 5
): Promise<IndexedChunk[]> {
  const queryEmbedding = await embedQuery(expandedQuery);

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
  locale: "en" | "ar" = "en"
): Promise<string> {
  const client = getOpenAIClient();
  const context = contextChunks.map((c) => c.content).join("\n\n---\n\n");

  const systemPrompt =
    locale === "ar"
      ? "أنت مساعد ذكي لـ Raghad AI. أجب بناءً على السياق المقدم فقط. إذا لم تجد الإجابة في السياق، قل ذلك بوضوح. يمكنك الإجابة بالعربية الفصحى أو اللهجة المناسبة للمستخدم."
      : "You are Raghad AI assistant. Answer based only on the provided context. If the answer is not in the context, say so clearly.";

  const response = await client.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${query}`,
      },
    ],
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content ?? "";
}

/** Stub for when OPENAI_API_KEY is not yet available */
export function isOpenAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}
