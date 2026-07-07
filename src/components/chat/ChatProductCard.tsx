"use client";

import Image from "next/image";
import type { ChatProduct } from "@/lib/products/types";
import { useApp } from "@/components/providers/AppProviders";

export function ChatProductCard({ product }: { product: ChatProduct }) {
  const { locale } = useApp();

  return (
    <article className="overflow-hidden rounded-xl border border-[#ddd0b8]/60 bg-white shadow-sm">
      {product.imageUrl ? (
        <div className="relative h-36 w-full bg-[#f3ece0]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#f3ece0] to-[#e8dcc4]">
          <span className="font-serif text-2xl text-[#c9a962]/60">R</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-[#2c3e35]">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#7a8b82]">{product.description}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {product.price != null && (
            <span className="text-sm font-medium text-[#2c6e55]">
              {product.price} {product.currency}
            </span>
          )}
          {product.discountCode && (
            <span className="rounded-full bg-[#c9a962]/20 px-2 py-0.5 text-xs text-[#9a8560]">
              {product.discountCode}
            </span>
          )}
        </div>
        {product.affiliateUrl && (
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
          >
            {locale === "ar" ? "تسوقي الآن" : "Shop now"}
          </a>
        )}
      </div>
    </article>
  );
}
