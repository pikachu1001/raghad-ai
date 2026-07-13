"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProviders";

export type ProductCardItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  href: string;
};

export function ProductCard({ item }: { item: ProductCardItem }) {
  const { locale, messages } = useApp();
  const title = locale === "ar" ? item.titleAr : item.titleEn;
  const description = locale === "ar" ? item.descriptionAr : item.descriptionEn;

  return (
    <article className="flex flex-col rounded-2xl border border-[#ddd0b8]/60 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-[#24332c]">{title}</h3>
      <p className="luxury-body mt-3 flex-1">{description}</p>
      <div className="mt-4 flex items-center justify-end">
        <Link
          href={item.href}
          className="rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {messages.cards.explore}
        </Link>
      </div>
    </article>
  );
}
