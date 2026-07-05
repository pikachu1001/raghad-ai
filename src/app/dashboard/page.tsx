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
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
          Loading...
        </div>
      </AppShell>
    );
  }

  if (!user) return null;

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">{messages.dashboard.title}</h1>
        <p className="mt-2 text-sm text-emerald-700">
          {messages.dashboard.welcome}, {user.name ?? user.email}
        </p>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-800">{messages.dashboard.conversations}</h2>
          <p className="mt-4 text-sm text-slate-500">{messages.dashboard.empty}</p>
          <Link
            href="/chat"
            className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {messages.hero.cta}
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
