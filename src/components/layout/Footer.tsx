"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProviders";

export function Footer() {
  const { messages, regionConfig, dir } = useApp();

  return (
    <footer dir={dir} className="mt-auto border-t border-[#ddd0b8]/50 bg-[#faf6ef]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/about" className="text-[#5c6b62] hover:text-[#2c6e55]">
            {messages.nav.about}
          </Link>
          <Link href="/contact" className="text-[#5c6b62] hover:text-[#2c6e55]">
            {messages.nav.contact}
          </Link>
        </div>
        <p className="text-sm text-[#7a8b82]">
          © {new Date().getFullYear()} {messages.brand}
        </p>
        <p className="text-sm text-[#7a8b82]">
          {regionConfig.currency} ({regionConfig.currencySymbol})
        </p>
      </div>
    </footer>
  );
}
