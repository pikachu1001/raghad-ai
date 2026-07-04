"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";

export default function DashboardPage() {
  const { messages } = useApp();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">{messages.dashboard.title}</h1>
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-800">{messages.dashboard.conversations}</h2>
          <p className="mt-4 text-sm text-slate-500">{messages.dashboard.empty}</p>
        </section>
      </div>
    </AppShell>
  );
}
