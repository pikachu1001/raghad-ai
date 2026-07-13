"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SettingsPanel } from "@/components/layout/SettingsPanel";

type NavItem = { href: string; label: string; show?: boolean };

export function MobileNav({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { messages, dir } = useApp();
  const { user, logout } = useAuth();

  const items: NavItem[] = [
    { href: "/", label: messages.nav.home },
    { href: "/chat", label: messages.nav.chat },
    { href: "/about", label: messages.nav.about },
    { href: "/contact", label: messages.nav.contact },
    { href: "/dashboard", label: messages.nav.dashboard, show: Boolean(user) },
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
              <span className="luxury-heading-section text-lg">
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
                  className={`block rounded-xl px-4 py-3.5 text-base font-medium tracking-wide transition ${
                    pathname === item.href
                      ? "bg-[#2c6e55]/12 font-semibold text-[#1f5240]"
                      : "text-[#4f5f56] hover:bg-[#f3ece0] hover:text-[#24332c]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            {user ? (
              <button
                type="button"
                onClick={() => logout()}
                className="mt-1 block w-full rounded-xl px-4 py-3.5 text-start text-base font-medium text-[#4f5f56] transition hover:bg-[#f3ece0]"
              >
                {messages.nav.logout}
              </button>
            ) : (
              <Link
                href="/login"
                className="mt-1 block rounded-xl px-4 py-3.5 text-start text-base font-medium text-[#4f5f56] transition hover:bg-[#f3ece0]"
              >
                {messages.nav.login}
              </Link>
            )}
          </nav>

          <div className="border-t border-[#ddd0b8]/50 px-6 py-5">
            <h2 className="luxury-heading-section mb-4 text-lg">
              {messages.settings.title}
            </h2>
            <SettingsPanel />
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
