"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardPage() {
  const { messages } = useApp();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [loading, user]);

  if (loading) {
    return (
      <AppShell>
        <div className="luxury-page flex min-h-[40vh] items-center justify-center text-sm text-[#7a8b82]">
          {messages.dashboard.loading}
        </div>
      </AppShell>
    );
  }

  if (!user) return null;

  return (
    <AppShell>
      <div className="luxury-page mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-serif text-2xl tracking-wide text-[#2c3e35]">{messages.dashboard.title}</h1>
        <p className="mt-2 text-sm text-[#2c6e55]">
          {messages.dashboard.welcome}, {user.name ?? user.email}
        </p>

        <section className="luxury-card mt-6 p-6">
          <h2 className="font-semibold text-[#2c3e35]">{messages.dashboard.conversations}</h2>
          <p className="mt-4 text-sm text-[#7a8b82]">{messages.dashboard.empty}</p>
          <Link href="/chat" className="luxury-btn mt-4 inline-flex">
            {messages.hero.cta}
          </Link>
        </section>

        {user.isAdmin && (
          <section className="luxury-card mt-4 p-6">
            <h2 className="font-semibold text-[#2c3e35]">{messages.admin.title}</h2>
            <p className="mt-2 text-sm text-[#7a8b82]">{messages.admin.subtitle}</p>
            <Link href="/admin" className="luxury-btn mt-4 inline-flex">
              {messages.nav.admin}
            </Link>
          </section>
        )}
      </div>
    </AppShell>
  );
}
