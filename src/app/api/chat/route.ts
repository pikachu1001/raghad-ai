import { NextResponse } from "next/server";
import { expandQueryForRetrieval } from "@/lib/rag/dialect";
import { getActiveIndexedChunks, isRagIndexReady } from "@/lib/rag/store";
import {
  generateAnswer,
  generateVisionAnswer,
  isOpenAIConfigured,
  retrieveChunks,
} from "@/lib/rag/openai-rag";
import type { IndexedChunk } from "@/lib/rag/openai-rag";
import { getProductsForChat } from "@/lib/products/store";
import { toChatProduct } from "@/lib/products/types";
import {
  getCategoryFallbackMessage,
  stripRawUrls,
} from "@/lib/chat/fallback";
import { getSession } from "@/lib/auth/session";
import { persistChatExchange } from "@/lib/chat/persist";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = String(body.query ?? "").trim();
    const locale = body.locale === "ar" ? "ar" : "en";
    const category = body.category ? String(body.category) : undefined;
    const image = typeof body.image === "string" && body.image.startsWith("data:image")
      ? body.image
      : undefined;

    if (!query && !image) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Without an API key we cannot generate answers — guide to categories.
    if (!isOpenAIConfigured()) {
      return NextResponse.json({
        answer: getCategoryFallbackMessage(locale),
        suggestCategories: true,
        stub: true,
      });
    }

    // Retrieve knowledge-base context when the index is ready; otherwise the
    // advisor still answers directly from its own expertise.
    let retrieved: IndexedChunk[] = [];
    if (await isRagIndexReady()) {
      const chunks = await getActiveIndexedChunks();
      if (chunks.length > 0) {
        const expanded = expandQueryForRetrieval(query || "");
        retrieved = await retrieveChunks(chunks, query || "", expanded);
      }
    }

    const rawAnswer = image
      ? await generateVisionAnswer(query, image, retrieved, locale, category)
      : await generateAnswer(query, retrieved, locale, category);
    const answer = stripRawUrls(rawAnswer);

    const session = await getSession();
    if (session && query) {
      try {
        await persistChatExchange(session.userId, query, answer);
      } catch (persistError) {
        console.error("[chat] persist", persistError);
      }
    }

    const dbProducts = await getProductsForChat(category);
    const products = dbProducts.map((p) => toChatProduct(p, locale));

    return NextResponse.json({
      answer,
      products,
      suggestCategories: false,
      sources: retrieved.map((c) => ({
        id: c.id,
        source: c.metadata.source,
        category: c.metadata.category,
        preview: c.content.slice(0, 120),
      })),
    });
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }
}
