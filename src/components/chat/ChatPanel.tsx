"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { useApp } from "@/components/providers/AppProviders";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function ChatPanel() {
  const { messages, locale } = useApp();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

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
        body: JSON.stringify({ query: userMessage, locale }),
      });
      const data = await res.json();
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.answer ?? data.error ?? "Error" },
      ]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Request failed. Please try again." },
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
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{messages.chat.title}</h1>
        {history.length > 0 && (
          <button
            type="button"
            onClick={exportPdf}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            {messages.chat.exportPdf}
          </button>
        )}
      </div>

      <div className="min-h-[360px] rounded-2xl border border-slate-200 bg-white p-4">
        {history.length === 0 ? (
          <p className="text-sm text-slate-500">{messages.chat.placeholder}</p>
        ) : (
          <div className="space-y-4">
            {history.map((msg, i) => (
              <div
                key={i}
                className={`rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "ml-8 bg-emerald-50 text-emerald-900"
                    : "mr-8 bg-slate-50 text-slate-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={messages.chat.placeholder}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "..." : messages.chat.send}
        </button>
      </div>
    </div>
  );
}
