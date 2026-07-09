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
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border-2 border-[#2c6e55]/35 bg-white px-6 py-7 text-start shadow-[0_8px_30px_rgba(44,110,85,0.12)] sm:px-8 sm:py-8">
            <p className="font-serif text-xl font-semibold leading-snug text-[#2c6e55] sm:text-2xl">
              {messages.about.collaborationLead}
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#3d4f46] sm:text-base sm:leading-8">
              <p>{messages.about.collaborationP1}</p>
              <p>{messages.about.collaborationP2}</p>
              <p className="font-semibold text-[#2c3e35]">{messages.about.collaborationP3}</p>
            </div>

            <div className="mt-6 rounded-xl border border-[#2c6e55]/25 bg-[#f7faf8] px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2c6e55]">
                {messages.about.contactDetailsTitle}
              </p>
              <ul className="mt-4 space-y-3 text-sm sm:text-base">
                <li className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="min-w-[7.5rem] font-semibold text-[#2c3e35]">
                    {messages.about.contactEmailLabel}
                  </span>
                  <a
                    href={`mailto:${messages.about.contactEmail}`}
                    className="font-medium text-[#2c6e55] underline decoration-[#2c6e55]/40 underline-offset-2 hover:decoration-[#2c6e55]"
                  >
                    {messages.about.contactEmail}
                  </a>
                </li>
                <li className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="min-w-[7.5rem] font-semibold text-[#2c3e35]">
                    {messages.about.contactTelegramLabel}
                  </span>
                  <a
                    href="https://t.me/techlead04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#2c6e55] underline decoration-[#2c6e55]/40 underline-offset-2 hover:decoration-[#2c6e55]"
                  >
                    {messages.about.contactTelegram}
                  </a>
                </li>
                <li className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="min-w-[7.5rem] font-semibold text-[#2c3e35]">
                    {messages.about.contactTeamsLabel}
                  </span>
                  <span className="font-medium text-[#2c3e35]">
                    {messages.about.contactTeamsUser}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:px-6">
          <article className="luxury-card p-8 sm:p-10">
            <h2 className="font-serif text-xl text-[#2c3e35]">{messages.about.visionTitle}</h2>
            <p className="mt-4 text-sm leading-8 text-[#5c6b62]">{messages.about.visionBody}</p>
          </article>

          <article className="luxury-card p-8 sm:p-10">
            <h2 className="font-serif text-xl text-[#2c3e35]">{messages.about.missionTitle}</h2>
            <p className="mt-4 text-sm leading-8 text-[#5c6b62]">{messages.about.missionBody}</p>
          </article>

          <p className="text-center text-xs text-[#9a8560]">{messages.about.contentNote}</p>
        </div>
      </div>
    </AppShell>
  );
}
