import { NextResponse } from "next/server";
import { loadSampleKnowledgeBase } from "@/lib/rag/sample-loader";
import { setIndexedChunks, isIndexReady } from "@/lib/rag/memory-store";
import { indexChunks, isOpenAIConfigured } from "@/lib/rag/openai-rag";

export async function POST() {
  if (!isOpenAIConfigured()) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured", indexed: false },
      { status: 503 }
    );
  }

  try {
    const chunks = loadSampleKnowledgeBase();
    const indexed = await indexChunks(chunks);
    setIndexedChunks(indexed);

    return NextResponse.json({
      indexed: true,
      chunkCount: indexed.length,
      message: "Sample knowledge base indexed successfully",
    });
  } catch (error) {
    console.error("[index-sample]", error);
    return NextResponse.json({ error: "Indexing failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ready: isIndexReady(),
    openaiConfigured: isOpenAIConfigured(),
  });
}
