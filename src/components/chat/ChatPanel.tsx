"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import { useApp } from "@/components/providers/AppProviders";
import { ChatProductCard } from "@/components/chat/ChatProductCard";
import {
  CategorySuggestions,
  ChatMessageContent,
} from "@/components/chat/ChatMessageContent";
import type { ChatProduct } from "@/lib/products/types";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  products?: ChatProduct[];
  suggestCategories?: boolean;
};

export function ChatPanel() {
  const { messages, locale } = useApp();
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [category, setCategory] = useState<string | undefined>();

  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) setInput(q);
    if (cat) setCategory(cat);
  }, [searchParams]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setHistory((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage, locale, category }),
      });
      const data = await res.json();
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer ?? data.error ?? "Error",
          products: data.products,
          suggestCategories: data.suggestCategories,
        },
      ]);
    } catch {
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            locale === "ar"
              ? "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو اختيار أحد أقسامنا من الصفحة الرئيسية."
              : "Sorry, something went wrong. Please try again or browse our categories from the homepage.",
          suggestCategories: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Raghad AI — Conversation Summary", 14, 20);
    doc.setFontSize(10);
    let y = 32;
    for (const msg of history) {
      const prefix = msg.role === "user" ? "User: " : "AI: ";
      const lines = doc.splitTextToSize(prefix + msg.content, 180);
      doc.text(lines, 14, y);
      y += lines.length * 6 + 4;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
    doc.save("raghad-ai-chat.pdf");
  };

  return (
    <div className="luxury-page mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl tracking-wide text-[#2c3e35]">{messages.chat.title}</h1>
        {history.length > 0 && (
          <button type="button" onClick={exportPdf} className="luxury-card px-3 py-1.5 text-sm text-[#5c6b62] hover:bg-white">
            {messages.chat.exportPdf}
          </button>
        )}
      </div>

      <div className="min-h-[360px] luxury-card p-4">
        {history.length === 0 ? (
          <p className="text-sm text-[#7a8b82]">{messages.chat.placeholder}</p>
        ) : (
          <div className="space-y-4">
            {history.map((msg, i) => (
              <div key={i}>
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "ml-8 bg-[#2c6e55]/10 text-[#1f5240]"
                      : "mr-8 bg-white text-[#2c3e35]"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ChatMessageContent
                      content={msg.content}
                      locale={locale}
                      linkLabel={messages.chat.visitLink}
                    />
                  )}
                </div>
                {msg.suggestCategories && (
                  <div className="mr-8">
                    <CategorySuggestions
                      locale={locale}
                      title={messages.chat.browseCategories}
                    />
                  </div>
                )}
                {msg.products && msg.products.length > 0 && (
                  <div className="mr-8 mt-3 grid gap-3 sm:grid-cols-2">
                    {msg.products.map((p) => (
                      <ChatProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="luxury-search-bar">
        <div className="luxury-search-inner">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={messages.chat.placeholder}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="flex-1 bg-transparent text-sm text-[#3d4f45] outline-none placeholder:text-[#9a8b78]"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading}
            className="shrink-0 rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "..." : messages.chat.send}
          </button>
        </div>
      </div>
    </div>
  );
}
