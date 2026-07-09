"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup } from "@/components/brand/BrandLogo";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { MobileNav } from "@/components/layout/MobileNav";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[#c9a962]/20 text-[#1f5240]"
          : "text-[#5c6b62] hover:bg-[#f3ece0] hover:text-[#2c3e35]"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { messages, dir } = useApp();
  const { user, logout } = useAuth();

  return (
    <header
      dir={dir}
      className="sticky top-0 z-50 border-b border-[#ddd0b8]/50 bg-[#faf6ef]/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center" aria-label={messages.brand}>
          <BrandLockup height={44} priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" label={messages.nav.home} />
          <NavLink href="/chat" label={messages.nav.chat} />
          <NavLink href="/about" label={messages.nav.about} />
          <NavLink href="/contact" label={messages.nav.contact} />
          <NavLink href="/dashboard" label={messages.nav.dashboard} />
          {user?.isAdmin && <NavLink href="/admin" label={messages.nav.admin} />}
          {user ? (
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c6b62] hover:bg-[#f3ece0]"
            >
              {messages.nav.logout}
            </button>
          ) : (
            <NavLink href="/login" label={messages.nav.login} />
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
