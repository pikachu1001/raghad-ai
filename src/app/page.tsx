"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ServiceCardsSection } from "@/components/cards/ServiceCardsSection";
import { useApp } from "@/components/providers/AppProviders";

export default function HomePage() {
  const { messages } = useApp();

  return (
    <AppShell>
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            {messages.brand}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {messages.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {messages.hero.subtitle}
          </p>
          <Link
            href="/chat"
            className="mt-8 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
          >
            {messages.hero.cta}
          </Link>
        </div>
      </section>
      <ServiceCardsSection />
    </AppShell>
  );
}
