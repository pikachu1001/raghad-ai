"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProviders";

export function Footer() {
  const { messages, dir } = useApp();

  return (
    <footer dir={dir} className="mt-auto border-t border-[#ddd0b8]/50 bg-[#faf6ef]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <div className="flex flex-wrap gap-5 text-base font-medium">
          <Link href="/about" className="text-[#4f5f56] hover:text-[#2c6e55]">
            {messages.nav.about}
          </Link>
          <Link href="/contact" className="text-[#4f5f56] hover:text-[#2c6e55]">
            {messages.nav.contact}
          </Link>
          <Link href="/#faq" className="text-[#4f5f56] hover:text-[#2c6e55]">
            {messages.faq.title}
          </Link>
        </div>
        <p className="luxury-muted text-base">
          © {new Date().getFullYear()} {messages.brand} · Askraghadai.com
        </p>
        <p className="luxury-note">{messages.footer.note}</p>
      </div>
    </footer>
  );
}
