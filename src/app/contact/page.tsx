"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";

export default function ContactPage() {
  const { messages } = useApp();

  return (
    <AppShell>
      <div className="luxury-page mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-center font-serif text-3xl tracking-wide text-[#2c3e35]">
          {messages.contact.title}
        </h1>
        <p className="mt-3 text-center text-sm text-[#7a8b82]">{messages.contact.subtitle}</p>

        <form
          className="luxury-card mt-8 space-y-4 p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.name}</label>
            <input className="luxury-input" placeholder={messages.contact.name} disabled />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.email}</label>
            <input type="email" className="luxury-input" placeholder={messages.contact.email} disabled />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.message}</label>
            <textarea
              className="luxury-input min-h-[140px]"
              placeholder={messages.contact.message}
              disabled
            />
          </div>
          <button type="submit" className="luxury-btn w-full" disabled>
            {messages.contact.send}
          </button>
          <p className="text-center text-xs text-[#9a8560]">{messages.contact.contentNote}</p>
        </form>
      </div>
    </AppShell>
  );
}
