"use client";

import { useApp } from "@/components/providers/AppProviders";

export function Footer() {
  const { messages, regionConfig } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {messages.brand}</p>
        <p>
          {regionConfig.currency} ({regionConfig.currencySymbol})
        </p>
      </div>
    </footer>
  );
}
