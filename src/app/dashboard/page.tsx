"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";

type ConversationSummary = {
  id: string;
  title: string;
  updatedAt: string;
  messageCount: number;
  preview: string;
};

export default function DashboardPage() {
  const { messages } = useApp();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/dashboard");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/conversations");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setConversations(data.conversations ?? []);
        }
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || !user) {
    return (
      <AppShell>
        <div className="luxury-page flex min-h-[40vh] items-center justify-center text-sm text-[#7a8b82]">
          {messages.dashboard.loading}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="luxury-page mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-serif text-2xl tracking-wide text-[#2c3e35]">{messages.dashboard.title}</h1>
        <p className="mt-2 text-sm text-[#2c6e55]">
          {messages.dashboard.welcome}, {user.name ?? user.email}
        </p>

        <section className="luxury-card mt-6 p-6">
          <h2 className="font-semibold text-[#2c3e35]">{messages.dashboard.conversations}</h2>

          {fetching ? (
            <p className="mt-4 text-sm text-[#7a8b82]">{messages.dashboard.loading}</p>
          ) : conversations.length === 0 ? (
            <>
              <p className="mt-4 text-sm text-[#7a8b82]">{messages.dashboard.empty}</p>
              <Link href="/chat" className="luxury-btn mt-4 inline-flex">
                {messages.hero.cta}
              </Link>
            </>
          ) : (
            <ul className="mt-4 space-y-3">
              {conversations.map((c) => (
                <li
                  key={c.id}
                  className="rounded-xl border border-[#ddd0b8]/60 bg-white/70 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#2c3e35]">{c.title}</p>
                      {c.preview && (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#7a8b82]">{c.preview}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-[#9a8560]">
                      {c.messageCount} {messages.dashboard.messages}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!fetching && conversations.length > 0 && (
            <Link href="/chat" className="mt-4 inline-flex text-sm text-[#2c6e55] hover:underline">
              {messages.hero.cta}
            </Link>
          )}
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
