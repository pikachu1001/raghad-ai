"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup, BrandLogo } from "@/components/brand/BrandLogo";
import { useApp } from "@/components/providers/AppProviders";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const { messages, dir, locale } = useApp();
  const pathname = usePathname();

  return (
    <header
      dir={dir}
      className="sticky top-0 z-50 border-b border-[#ddd0b8]/50 bg-[#faf6ef]/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          {pathname !== "/" && (
            <Link
              href="/"
              aria-label={messages.nav.home}
              title={messages.nav.home}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ddd0b8]/60 bg-white/70 text-[#2c6e55] transition hover:border-[#c9a962]/60 hover:bg-white sm:h-10 sm:w-10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 12l9-9 9 9M5 10v10h14V10"
                />
              </svg>
            </Link>
          )}
          <Link href="/" className="flex min-w-0 shrink-0 items-center" aria-label={messages.brand}>
            <BrandLogo size="sm" className="sm:hidden" priority />
            <BrandLockup locale={locale} height={40} className="hidden sm:block" priority />
          </Link>
        </div>

        <MobileNav className="shrink-0" />
      </div>
    </header>
  );
}
