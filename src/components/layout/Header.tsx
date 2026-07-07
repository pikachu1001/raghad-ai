"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";
import { SettingsMenu } from "@/components/layout/SettingsMenu";
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
  const { messages } = useApp();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[#ddd0b8]/50 bg-[#faf6ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src="/brand/logo.png"
              alt={messages.brand}
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden font-serif text-lg tracking-wide text-[#2c3e35] sm:inline">
            {messages.brand}
          </span>
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
          {user && (
            <span className="hidden text-xs text-[#7a8b82] md:inline">
              {user.name ?? user.email}
            </span>
          )}
          <SettingsMenu className="hidden sm:block" />
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
