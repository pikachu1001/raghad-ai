import { NextResponse } from "next/server";
import { expandQueryForRetrieval } from "@/lib/rag/dialect";
import { getActiveIndexedChunks, isRagIndexReady } from "@/lib/rag/store";
import {
  generateAnswer,
  isOpenAIConfigured,
  retrieveChunks,
} from "@/lib/rag/openai-rag";
import { getProductsForChat } from "@/lib/products/store";
import { toChatProduct } from "@/lib/products/types";
import {
  getCategoryFallbackMessage,
  shouldSuggestCategories,
} from "@/lib/chat/fallback";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = String(body.query ?? "").trim();
    const locale = body.locale === "ar" ? "ar" : "en";
    const category = body.category ? String(body.category) : undefined;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (!isOpenAIConfigured()) {
      const answer = getCategoryFallbackMessage(locale);
      return NextResponse.json({
        answer,
        suggestCategories: true,
        stub: true,
      });
    }

    if (!(await isRagIndexReady())) {
      const answer = getCategoryFallbackMessage(locale);
      return NextResponse.json({
        answer,
        suggestCategories: true,
        stub: true,
      });
    }

    const chunks = await getActiveIndexedChunks();
    if (chunks.length === 0) {
      const answer = getCategoryFallbackMessage(locale);
      return NextResponse.json({
        answer,
        suggestCategories: true,
        stub: true,
      });
    }

    const expanded = expandQueryForRetrieval(query);
    const retrieved = await retrieveChunks(chunks, query, expanded);
    const answer = await generateAnswer(query, retrieved, locale, category);
    const suggestCategories = shouldSuggestCategories(answer);

    const dbProducts = await getProductsForChat(category);
    const products = dbProducts.map((p) => toChatProduct(p, locale));

    return NextResponse.json({
      answer,
      products,
      suggestCategories,
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
