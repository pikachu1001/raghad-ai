"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import type { Locale, Region } from "@/lib/i18n/types";

export function SettingsMenu({ className = "" }: { className?: string }) {
  const { messages, locale, region, setLocale, setRegion, regionConfig } = useApp();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={panelRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={messages.settings.title}
        className="flex items-center gap-1.5 rounded-full border border-[#d4c4a0]/60 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#5c6b62] transition hover:bg-white hover:shadow-sm"
      >
        <svg className="h-4 w-4 text-[#9a8560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="hidden sm:inline">{messages.settings.title}</span>
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-64 rounded-xl border border-[#ddd0b8]/70 bg-[#faf6ef] p-4 shadow-xl">
          <p className="mb-3 font-serif text-sm tracking-wide text-[#2c3e35]">{messages.settings.title}</p>

          <label className="mb-1 block text-xs text-[#7a8b82]">{messages.settings.region}</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="luxury-input mb-3 text-sm"
          >
            <option value="ksa">{messages.region.ksa}</option>
            <option value="gcc">{messages.region.gcc}</option>
            <option value="egypt">{messages.region.egypt}</option>
          </select>

          <label className="mb-1 block text-xs text-[#7a8b82]">{messages.settings.currency}</label>
          <div className="luxury-input mb-3 text-sm text-[#2c3e35]">
            {regionConfig.currency} ({regionConfig.currencySymbol})
          </div>

          <label className="mb-1 block text-xs text-[#7a8b82]">{messages.settings.language}</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="luxury-input text-sm"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
      )}
    </div>
  );
}
