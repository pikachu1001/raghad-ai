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
  const { locale } = useApp();
  const title = locale === "ar" ? item.titleAr : item.titleEn;
  const description = locale === "ar" ? item.descriptionAr : item.descriptionEn;

  return (
    <article className="flex flex-col rounded-2xl border border-[#ddd0b8]/60 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-[#2c3e35]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[#5c6b62]">{description}</p>
      <div className="mt-4 flex items-center justify-end">
        <Link
          href={item.href}
          className="rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          {locale === "ar" ? "استكشفي" : "Explore"}
        </Link>
      </div>
    </article>
  );
}
