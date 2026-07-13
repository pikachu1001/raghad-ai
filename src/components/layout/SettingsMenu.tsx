"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import { SettingsPanel } from "@/components/layout/SettingsPanel";

export function SettingsMenu({ className = "" }: { className?: string }) {
  const { messages, dir, region, locale } = useApp();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const regionShort = messages.region[region];

  return (
    <div ref={rootRef} dir={dir} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={messages.settings.open}
        title={messages.settings.title}
        onClick={() => setOpen((v) => !v)}
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#c9a962]/50 bg-white/70 px-2.5 py-2 text-sm font-semibold text-[#24332c] shadow-sm backdrop-blur transition hover:border-[#c9a962] hover:bg-white hover:shadow-md xl:gap-2 xl:px-3"
      >
        <svg
          className="h-4 w-4 text-[#2c6e55]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="hidden xl:inline">{messages.settings.title}</span>
        <span className="rounded-full bg-[#2c6e55]/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#1f5240] xl:text-[0.7rem]">
          {locale === "ar" ? "ع" : "EN"}
          <span className="hidden 2xl:inline">{` · ${regionShort}`}</span>
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={messages.settings.title}
          className="absolute end-0 top-[calc(100%+0.5rem)] z-[60] w-[min(100vw-2rem,20rem)] rounded-2xl border border-[#ddd0b8]/60 bg-[#faf6ef] p-6 shadow-[0_12px_40px_rgba(44,62,53,0.15)] ring-1 ring-[#c9a962]/20"
        >
          <h2 className="luxury-heading-section mb-4 text-lg">
            {messages.settings.title}
          </h2>
          <SettingsPanel />
        </div>
      ) : null}
    </div>
  );
}
