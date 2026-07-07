"use client";

import { useApp } from "@/components/providers/AppProviders";

export function Footer() {
  const { messages, regionConfig } = useApp();

  return (
    <footer className="mt-auto border-t border-[#ddd0b8]/50 bg-[#faf6ef]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-[#7a8b82] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {messages.brand}</p>
        <p>
          {regionConfig.currency} ({regionConfig.currencySymbol})
        </p>
      </div>
    </footer>
  );
}
