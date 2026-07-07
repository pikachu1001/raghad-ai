"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";

export default function AboutPage() {
  const { messages, dir } = useApp();

  return (
    <AppShell>
      <div className="luxury-page" dir={dir}>
        <section className="border-b border-[#ddd0b8]/40 bg-gradient-to-b from-[#faf6ef] to-[#f3ece0] px-4 py-14 text-center">
          <h1 className="font-serif text-3xl tracking-wide text-[#2c3e35] sm:text-4xl">
            {messages.about.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#7a8b82]">
            {messages.about.subtitle}
          </p>
        </section>

        <div className="mx-auto grid max-w-4xl gap-6 px-4 py-12">
          <article className="luxury-card p-8">
            <h2 className="font-serif text-xl text-[#2c3e35]">{messages.about.visionTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c6b62]">{messages.about.visionBody}</p>
          </article>

          <article className="luxury-card p-8">
            <h2 className="font-serif text-xl text-[#2c3e35]">{messages.about.missionTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c6b62]">{messages.about.missionBody}</p>
          </article>

          <p className="text-center text-xs text-[#9a8560]">{messages.about.contentNote}</p>
        </div>
      </div>
    </AppShell>
  );
}
