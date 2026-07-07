"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import { SettingsMenu } from "@/components/layout/SettingsMenu";
import { MobileNav } from "@/components/layout/MobileNav";

function ActionButton({
  label,
  href,
  onClick,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className =
    "flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-[0_4px_20px_rgba(180,150,90,0.25)] ring-1 ring-[#d4c4a0]/40 transition hover:scale-105 hover:shadow-[0_6px_24px_rgba(180,150,90,0.35)]";

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function LuxuryHome() {
  const { messages, locale, dir } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-[#f3ece0] text-[#2c3e35]" dir={dir}>
      {/* Compass watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%23b8965a' stroke-width='1.5'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Cpath d='M50 8 L54 46 L50 50 L46 46 Z M50 92 L54 54 L50 50 L46 54 Z M8 50 L46 46 L50 50 L46 54 Z M92 50 L54 46 L50 50 L54 54 Z'/%3E%3Ccircle cx='50' cy='50' r='4' fill='%23b8965a'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-24 h-48 w-48 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%23b8965a' stroke-width='1.5'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Cpath d='M50 8 L54 46 L50 50 L46 46 Z M50 92 L54 54 L50 50 L46 54 Z M8 50 L46 46 L50 50 L46 54 Z M92 50 L54 46 L50 50 L54 54 Z'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <span aria-hidden className="pointer-events-none absolute left-4 top-4 font-serif text-sm text-[#c9a962]/50">
        Ai
      </span>
      <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 font-serif text-sm text-[#c9a962]/50">
        Ai
      </span>

      <header className="relative z-10 flex items-center justify-between px-5 pt-5">
        <SettingsMenu />
        <MobileNav />
      </header>

      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 pb-6 pt-2">
        <div className="relative mb-2 h-40 w-40 sm:h-48 sm:w-48">
          <Image
            src="/brand/logo.png"
            alt="Raghad AI"
            fill
            sizes="(max-width: 640px) 160px, 192px"
            className="object-contain"
            style={{ background: "transparent" }}
            priority
          />
        </div>

        <h1 className="text-center font-serif text-2xl tracking-[0.2em] text-[#2c3e35] sm:text-3xl">
          {locale === "ar" ? "رغد AI" : "RAGHAD AI"}
        </h1>
        <p className="mt-1 font-serif text-sm tracking-widest text-[#7a8b82]">Askraghadai.com</p>
        <p className="mt-1 text-center text-xs text-[#9a8560]">
          {locale === "ar" ? "دليلك الذكي الموثوق" : "Your trusted smart guide"}
        </p>

        <p className="mt-5 max-w-xs text-center text-sm leading-7 text-[#4a5c52]">
          {messages.hero.subtitle}
        </p>

        <form onSubmit={submitSearch} className="relative mt-6 w-full max-w-md">
          <div className="relative overflow-hidden rounded-full bg-gradient-to-b from-[#e8dcc4] via-[#dccfb0] to-[#c9b88a] p-[2px] shadow-[0_8px_32px_rgba(180,150,90,0.35)]">
            <div className="flex items-center gap-3 rounded-full bg-gradient-to-b from-[#f5eedf] to-[#ebe0cc] px-5 py-3.5">
              <svg className="h-5 w-5 shrink-0 text-[#9a8560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={messages.hero.searchPlaceholder}
                className="w-full bg-transparent text-sm text-[#3d4f45] outline-none placeholder:text-[#9a8b78]"
                dir={locale === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>
        </form>

        <div className="mt-5 flex items-center gap-8">
          <ActionButton label={messages.hero.payment} href="/chat">
            <svg className="h-6 w-6 text-[#5a7a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </ActionButton>
          <ActionButton label={messages.hero.voice} href="/chat">
            <svg className="h-6 w-6 text-[#5a7a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z" />
            </svg>
          </ActionButton>
          <ActionButton label={messages.hero.camera} href="/chat">
            <svg className="h-6 w-6 text-[#5a7a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </ActionButton>
        </div>

        <Link
          href="#categories"
          className="mt-6 text-xs uppercase tracking-[0.25em] text-[#8a9a90] hover:text-[#2c6e55]"
        >
          {messages.cards.subtitle}
        </Link>
      </main>
    </div>
  );
}
