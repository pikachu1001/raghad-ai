"use client";

import { useApp } from "@/components/providers/AppProviders";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, messages } = useApp();
  const next = locale === "ar" ? "en" : "ar";
  const label = locale === "ar" ? "EN" : "ع";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={messages.settings.language}
      title={messages.settings.language}
      className="flex items-center gap-1.5 rounded-full border border-[#c9a962]/50 bg-white/70 px-3 py-2 text-xs font-semibold text-[#2c3e35] shadow-sm backdrop-blur transition hover:border-[#c9a962] hover:bg-white hover:shadow-md"
    >
      <svg
        className="h-4 w-4 text-[#2c6e55]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" strokeWidth={1.6} />
        <path strokeWidth={1.6} strokeLinecap="round" d="M3 12h18" />
        <path
          strokeWidth={1.6}
          strokeLinecap="round"
          d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z"
        />
      </svg>
      <span className="min-w-[1.2rem] text-center">{label}</span>
    </button>
  );
}
