"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";
import type { Locale, Region } from "@/lib/i18n/types";

type NavItem = { href: string; label: string; show?: boolean };

export function MobileNav({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { messages, locale, region, setLocale, setRegion, regionConfig } = useApp();
  const { user, logout } = useAuth();

  const items: NavItem[] = [
    { href: "/", label: messages.nav.home },
    { href: "/chat", label: messages.nav.chat },
    { href: "/about", label: messages.nav.about },
    { href: "/contact", label: messages.nav.contact },
    { href: "/dashboard", label: messages.nav.dashboard },
    { href: "/admin", label: messages.nav.admin, show: Boolean(user?.isAdmin) },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={messages.nav.menu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1.5 rounded-lg p-2 transition hover:bg-[#f3ece0]"
      >
        <span className={`h-0.5 w-6 bg-[#c9a962] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-[#c9a962] transition ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-[#c9a962] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="fixed inset-y-0 end-0 z-50 flex w-[min(100%,20rem)] flex-col border-s border-[#ddd0b8]/60 bg-[#faf6ef] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ddd0b8]/50 px-5 py-4">
              <span className="font-serif text-lg text-[#2c3e35]">{messages.brand}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-[#7a8b82] hover:bg-[#f3ece0]"
              >
                {messages.nav.close}
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {items
                .filter((item) => item.show !== false)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
                      pathname === item.href
                        ? "bg-[#c9a962]/20 text-[#1f5240]"
                        : "text-[#5c6b62] hover:bg-[#f3ece0]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {user ? (
                <button
                  type="button"
                  onClick={() => logout()}
                  className="mt-1 block w-full rounded-lg px-3 py-3 text-start text-sm font-medium text-[#5c6b62] hover:bg-[#f3ece0]"
                >
                  {messages.nav.logout}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="mt-1 block rounded-lg px-3 py-3 text-sm font-medium text-[#5c6b62] hover:bg-[#f3ece0]"
                >
                  {messages.nav.login}
                </Link>
              )}
            </nav>

            <div className="border-t border-[#ddd0b8]/50 p-5">
              <p className="mb-3 font-serif text-sm text-[#2c3e35]">{messages.settings.title}</p>

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
          </aside>
        </>
      )}
    </div>
  );
}
