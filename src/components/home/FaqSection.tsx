"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProviders";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ddd0b8]/60 bg-white/70 backdrop-blur transition hover:border-[#c9a962]/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
      >
        <span className="font-serif text-[0.98rem] tracking-wide text-[#2c3e35]">{q}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-[#c9a962] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-[#5c6b62]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const { messages, dir } = useApp();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-12" dir={dir}>
      <div className="mb-7 text-center">
        <h2 className="font-serif text-2xl tracking-wide text-[#2c3e35]">{messages.faq.title}</h2>
        <p className="mt-2 text-sm text-[#7a8b82]">{messages.faq.subtitle}</p>
      </div>
      <div className="space-y-3">
        {messages.faq.items.map((item, i) => (
          <FaqItem key={i} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
