"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";
import type { Locale } from "@/lib/i18n/types";

type NavItem = { href: string; label: string; show?: boolean };

export function MobileNav({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { messages, locale, setLocale, dir } = useApp();
  const { user, logout } = useAuth();

  const items: NavItem[] = [
    { href: "/", label: messages.nav.home },
    { href: "/chat", label: messages.nav.chat },
    { href: "/about", label: messages.nav.about },
    { href: "/contact", label: messages.nav.contact },
    { href: "/dashboard", label: messages.nav.dashboard },
    { href: "/admin", label: messages.nav.admin, show: Boolean(user?.isAdmin) },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const drawer = open && mounted ? (
    createPortal(
      <>
        <div
          className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <aside
          dir={dir}
          className="fixed inset-y-0 start-0 z-[210] flex w-[min(100%,19rem)] flex-col bg-[#faf6ef] shadow-2xl ring-1 ring-[#c9a962]/20"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#ddd0b8]/50 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <span className="font-serif text-lg tracking-wide text-[#2c3e35]">
                {messages.brand}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={messages.nav.close}
              className="rounded-full p-2 text-[#7a8b82] transition hover:bg-[#f3ece0] hover:text-[#2c3e35]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.8} d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {items
              .filter((item) => item.show !== false)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 font-serif text-[0.95rem] tracking-wide transition ${
                    pathname === item.href
                      ? "bg-[#2c6e55]/12 text-[#1f5240]"
                      : "text-[#4a5c52] hover:bg-[#f3ece0] hover:text-[#2c3e35]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            {user ? (
              <button
                type="button"
                onClick={() => logout()}
                className="mt-1 block w-full rounded-xl px-4 py-3 text-start font-serif text-[0.95rem] tracking-wide text-[#4a5c52] transition hover:bg-[#f3ece0]"
              >
                {messages.nav.logout}
              </button>
            ) : (
              <Link
                href="/login"
                className="mt-1 block rounded-xl px-4 py-3 font-serif text-[0.95rem] tracking-wide text-[#4a5c52] transition hover:bg-[#f3ece0]"
              >
                {messages.nav.login}
              </Link>
            )}
          </nav>

          <div className="border-t border-[#ddd0b8]/50 px-6 py-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#9a8560]">
              {messages.settings.language}
            </p>
            <div className="flex gap-2">
              {(["ar", "en"] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocale(loc)}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    locale === loc
                      ? "border-[#2c6e55] bg-[#2c6e55]/10 text-[#1f5240]"
                      : "border-[#ddd0b8]/70 bg-white/60 text-[#5c6b62] hover:border-[#c9a962]"
                  }`}
                >
                  {loc === "ar" ? "العربية" : "English"}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </>,
      document.body
    )
  ) : null;

  return (
    <div dir={dir} className={className}>
      <button
        type="button"
        aria-label={messages.nav.menu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 transition hover:bg-[#f3ece0]"
      >
        <span className={`h-0.5 w-6 origin-center bg-[#c9a962] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-[#c9a962] transition ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 origin-center bg-[#c9a962] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>
      {drawer}
    </div>
  );
}
