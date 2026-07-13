"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";

export default function AboutPage() {
  const { messages, dir } = useApp();

  return (
    <AppShell>
      <div className="luxury-page" dir={dir}>
        <section className="luxury-section border-b border-[#ddd0b8]/40 bg-gradient-to-b from-[#faf6ef] to-[#f3ece0] px-4 text-center sm:px-6">
          <h1 className="luxury-heading-page">{messages.about.title}</h1>
          <p className="luxury-muted mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg sm:leading-9">
            {messages.about.subtitle}
          </p>
        </section>

        <div className="mx-auto grid max-w-4xl gap-8 px-4 py-14 sm:gap-10 sm:px-6 sm:py-16">
          <article id="vision" className="luxury-card scroll-mt-24 p-8 sm:p-10 lg:p-12">
            <h2 className="luxury-heading-section text-xl sm:text-2xl">
              {messages.about.visionTitle}
            </h2>
            <p className="luxury-body mt-6 text-base leading-8 sm:text-[1.05rem] sm:leading-9">
              {messages.about.visionBody}
            </p>
          </article>

          <article className="luxury-card p-8 sm:p-10 lg:p-12">
            <h2 className="luxury-heading-section text-xl sm:text-2xl">
              {messages.about.missionTitle}
            </h2>
            <p className="luxury-body mt-6 text-base leading-8 sm:text-[1.05rem] sm:leading-9">
              {messages.about.missionBody}
            </p>
          </article>

          <p className="luxury-note px-2 text-center">{messages.about.contentNote}</p>
        </div>
      </div>
    </AppShell>
  );
}
