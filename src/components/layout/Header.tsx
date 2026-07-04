"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProviders";
import type { Locale, Region } from "@/lib/i18n/types";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-emerald-100 text-emerald-800"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { messages, locale, region, setLocale, setRegion } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-emerald-700">
          {messages.brand}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink href="/" label={messages.nav.home} />
          <NavLink href="/chat" label={messages.nav.chat} />
          <NavLink href="/dashboard" label={messages.nav.dashboard} />
          <NavLink href="/login" label={messages.nav.login} />
        </nav>

        <div className="flex items-center gap-2">
          <select
            aria-label={messages.region.label}
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          >
            <option value="ksa">{messages.region.ksa}</option>
            <option value="gcc">{messages.region.gcc}</option>
            <option value="egypt">{messages.region.egypt}</option>
          </select>

          <select
            aria-label="Language"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>
      </div>
    </header>
  );
}
