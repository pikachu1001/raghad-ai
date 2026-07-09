"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { MobileNav } from "@/components/layout/MobileNav";

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-[0_4px_20px_rgba(180,150,90,0.25)] ring-1 ring-[#d4c4a0]/50 transition hover:scale-105 hover:shadow-[0_6px_24px_rgba(180,150,90,0.4)] md:h-16 md:w-16"
    >
      {children}
    </button>
  );
}

export function LuxuryHome() {
  const { messages, locale, dir } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isArabic = locale === "ar";

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  };

  const goToChatAction = (action: "voice" | "camera" | "file") => {
    router.push(`/chat?action=${action}`);
  };

  return (
    <div className="relative overflow-hidden bg-[#f3ece0] text-[#2c3e35]" dir={dir}>
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

      {/* Bottom-left Ai watermark (reference mockup) */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 font-serif text-sm text-[#c9a962]/50"
      >
        Ai
      </span>

      {/* Arabic mobile header */}
      {isArabic ? (
        <header
          dir="ltr"
          className="relative z-10 flex items-center justify-between px-5 pt-5 md:hidden"
        >
          <span className="font-serif text-sm tracking-wide text-[#c9a962]">Ai</span>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <MobileNav />
          </div>
        </header>
      ) : null}

      {/* English mobile + desktop / Arabic desktop header */}
      <header
        className={`relative z-10 flex items-center justify-between px-5 pt-5 md:px-8 md:pt-6 lg:px-10 lg:pt-7 ${
          isArabic ? "hidden md:flex" : ""
        }`}
      >
        <div className="relative h-10 w-10 shrink-0 md:hidden">
          <Image
            src="/brand/logo.png"
            alt={isArabic ? "رغد AI" : "Raghad AI"}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        <Image
          src="/brand/raghad-web.png"
          alt={isArabic ? "رغد AI" : "Raghad AI"}
          width={368}
          height={95}
          className="hidden h-12 w-auto shrink-0 md:block lg:h-14"
          priority
        />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <MobileNav />
        </div>
      </header>

      <main
        className={`relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 pb-8 md:max-w-2xl md:px-8 lg:max-w-3xl lg:px-10 ${
          isArabic
            ? "pt-8 sm:pt-10 md:pt-14 lg:pt-16"
            : "pt-8 sm:pt-10 md:pt-14 lg:pt-16"
        }`}
      >
        {/* ── Arabic hero (mobile + desktop) ── */}
        {isArabic ? (
          <div className="relative flex w-full flex-col items-center">
            {/* Arabic mobile decorative tagline — client mockup */}
            <div
              dir="ltr"
              className="pointer-events-none absolute top-10 right-6 z-10 sm:top-12 sm:right-8 md:hidden"
            >
              <Image
                src="/brand/right-text.png"
                alt=""
                width={1024}
                height={1024}
                className="h-auto w-[9.5rem] max-w-[calc(100vw-3.5rem)] object-contain object-top sm:w-[10.5rem]"
                priority
                aria-hidden
              />
            </div>

            <div className="relative mx-auto mt-32 flex w-full max-w-sm justify-center sm:mt-36 md:mt-10 lg:mt-12">
              <div className="relative h-[9.5rem] w-[9.5rem] sm:h-40 sm:w-40 md:hidden">
                <Image
                  src="/brand/logo.png"
                  alt="رغد AI"
                  fill
                  sizes="(max-width: 768px) 152px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative hidden h-56 w-[min(100%,22rem)] md:block lg:h-64 lg:w-[min(100%,26rem)]">
                <Image
                  src="/brand/logo-web.png"
                  alt="رغد AI"
                  fill
                  sizes="(min-width: 1024px) 416px, 352px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <Image
              src="/brand/wordmark.png"
              alt="رغد AI"
              width={250}
              height={49}
              className="mt-3 h-auto w-44 sm:w-52 md:mt-4 md:w-64 lg:w-80"
              priority
            />
            <p className="mt-3 text-center text-sm text-[#9a8560] md:text-base lg:text-lg">
              دليلك الذكي الموثوق
            </p>
            <p className="mt-1 text-center font-serif text-sm tracking-widest text-[#7a8b82] md:text-base lg:text-lg">
              Askraghadai.com
            </p>
            <p className="mt-4 hidden max-w-xs text-center text-sm leading-7 text-[#4a5c52] md:block md:max-w-lg md:text-base md:leading-8 lg:text-lg">
              {messages.hero.subtitle}
            </p>

            <form onSubmit={submitSearch} className="mt-12 w-full max-w-md md:hidden">
              <div className="relative overflow-hidden rounded-full bg-gradient-to-b from-[#e8dcc4] via-[#dccfb0] to-[#c9b88a] p-[2px] shadow-[0_8px_32px_rgba(180,150,90,0.35)]">
                <div className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f5eedf] to-[#ebe0cc] py-2 pe-2 ps-5">
                  <svg
                    className="h-5 w-5 shrink-0 text-[#8a7550]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={messages.hero.searchPlaceholder}
                    className="w-full bg-transparent text-sm text-[#3d4f45] outline-none placeholder:text-[#7d7358]"
                    dir="rtl"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(31,82,64,0.4)] transition hover:from-[#337d61] hover:to-[#24614b]"
                  >
                    {messages.hero.searchButton}
                  </button>
                </div>
              </div>
              <div aria-hidden className="mt-3 flex justify-center gap-1 opacity-60">
                <span className="text-[#c9a962]">✦</span>
                <span className="text-[#e8dcc4]">·</span>
                <span className="text-[#c9a962]">✦</span>
              </div>
            </form>
          </div>
        ) : null}

        {/* ── English hero (mobile + desktop) ── */}
        {locale === "en" ? (
          <div className="flex w-full flex-col items-center">
            <div className="relative mb-2 mt-20 h-36 w-[min(100%,17rem)] sm:mt-24 md:hidden">
              <Image
                src="/brand/logo.png"
                alt="Raghad AI"
                fill
                sizes="(max-width: 768px) 272px"
                className="object-contain"
                priority
              />
            </div>
            <div className="relative mb-3 mt-10 hidden h-56 w-[min(100%,22rem)] md:block lg:mt-12 lg:h-64 lg:w-[min(100%,26rem)]">
              <Image
                src="/brand/logo-web.png"
                alt="Raghad AI"
                fill
                sizes="(min-width: 1024px) 416px, 352px"
                className="object-contain"
                priority
              />
            </div>
            <Image
              src="/brand/wordmark.png"
              alt="Raghad AI"
              width={250}
              height={49}
              className="mb-1 h-auto w-44 sm:w-52 md:w-64 lg:w-80"
              priority
            />
            <p className="mt-2 font-serif text-sm tracking-widest text-[#7a8b82] md:text-base lg:text-lg">
              Askraghadai.com
            </p>
            <p className="mt-2 text-center text-xs text-[#9a8560] md:text-sm lg:text-base">
              Your trusted smart guide
            </p>
            <p className="mt-4 max-w-xs text-center text-sm leading-7 text-[#4a5c52] md:max-w-lg md:text-base md:leading-8 lg:text-lg">
              {messages.hero.subtitle}
            </p>
          </div>
        ) : null}

        {/* Search + actions (English + Arabic desktop) */}
        <div className={isArabic ? "hidden w-full md:contents" : "contents w-full"}>
          <form onSubmit={submitSearch} className="mt-6 w-full max-w-md md:mt-8 md:max-w-xl lg:max-w-2xl">
            <div className="relative overflow-hidden rounded-full bg-gradient-to-b from-[#e8dcc4] via-[#dccfb0] to-[#c9b88a] p-[2px] shadow-[0_8px_32px_rgba(180,150,90,0.35)]">
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f5eedf] to-[#ebe0cc] py-2 pe-2 ps-5 md:py-3 md:ps-6">
                <svg
                  className="h-5 w-5 shrink-0 text-[#8a7550] md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={messages.hero.searchPlaceholder}
                  className="w-full bg-transparent text-sm text-[#3d4f45] outline-none placeholder:text-[#7d7358] md:text-base"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(31,82,64,0.4)] transition hover:from-[#337d61] hover:to-[#24614b] md:px-6 md:py-3 md:text-base"
                >
                  {messages.hero.searchButton}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5 flex items-center gap-7 md:mt-7 md:gap-9">
            <ActionButton label={messages.hero.voice} onClick={() => goToChatAction("voice")}>
              <svg className="h-6 w-6 text-[#2c6e55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z" />
              </svg>
            </ActionButton>
            <ActionButton label={messages.hero.camera} onClick={() => goToChatAction("camera")}>
              <svg className="h-6 w-6 text-[#2c6e55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </ActionButton>
            <ActionButton label={messages.hero.file} onClick={() => goToChatAction("file")}>
              <svg className="h-6 w-6 text-[#2c6e55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </ActionButton>
          </div>

          <Link
            href="#categories"
            className="mt-5 text-xs uppercase tracking-[0.25em] text-[#8a9a90] transition hover:text-[#2c6e55] md:mt-7 md:text-sm"
          >
            {messages.cards.subtitle}
          </Link>
        </div>
      </main>
    </div>
  );
}
