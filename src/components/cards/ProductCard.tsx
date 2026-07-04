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
  const { locale, regionConfig } = useApp();
  const title = locale === "ar" ? item.titleAr : item.titleEn;
  const description = locale === "ar" ? item.descriptionAr : item.descriptionEn;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-medium text-emerald-700">
          {item.price} {regionConfig.currencySymbol}
        </span>
        <Link
          href={item.href}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          {locale === "ar" ? "المزيد" : "Learn more"}
        </Link>
      </div>
    </article>
  );
}
