import { NextResponse } from "next/server";
import { expandQueryForRetrieval } from "@/lib/rag/dialect";
import { getIndexedChunks, isIndexReady } from "@/lib/rag/memory-store";
import {
  generateAnswer,
  isOpenAIConfigured,
  retrieveChunks,
} from "@/lib/rag/openai-rag";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = String(body.query ?? "").trim();
    const locale = body.locale === "ar" ? "ar" : "en";

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (!isOpenAIConfigured()) {
      return NextResponse.json({
        answer:
          locale === "ar"
            ? "مساعد AI غير متصل بعد. يرجى إضافة OPENAI_API_KEY لبدء المحادثة."
            : "AI assistant is not connected yet. Please add OPENAI_API_KEY to start chatting.",
        stub: true,
      });
    }

    if (!isIndexReady()) {
      return NextResponse.json({
        answer:
          locale === "ar"
            ? "قاعدة المعرفة غير مفهرسة بعد. استخدم /api/rag/index-sample أو ارفع مستندات العميل."
            : "Knowledge base is not indexed yet. Call /api/rag/index-sample or upload client documents.",
        stub: true,
      });
    }

    const expanded = expandQueryForRetrieval(query);
    const chunks = await retrieveChunks(getIndexedChunks(), query, expanded);
    const answer = await generateAnswer(query, chunks, locale);

    return NextResponse.json({
      answer,
      sources: chunks.map((c) => ({
        id: c.id,
        source: c.metadata.source,
        preview: c.content.slice(0, 120),
      })),
    });
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }
}
