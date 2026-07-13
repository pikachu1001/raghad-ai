"use client";

import Image from "next/image";
import type { ChatProduct } from "@/lib/products/types";
import { useApp } from "@/components/providers/AppProviders";

export function ChatProductCard({ product }: { product: ChatProduct }) {
  const { messages } = useApp();

  return (
    <article className="overflow-hidden rounded-xl border border-[#ddd0b8]/60 bg-white shadow-sm">
      <div className="relative h-36 w-full bg-[#f3ece0]">
        <Image
          src={product.imageUrl ?? "/brand/mark.png"}
          alt={product.name}
          fill
          className="object-contain p-4"
          unoptimized={Boolean(product.imageUrl)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#24332c]">{product.name}</h3>
        {product.description && (
          <p className="luxury-muted mt-1.5 line-clamp-2 text-sm leading-6">{product.description}</p>
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
            className="mt-3 inline-flex rounded-full bg-gradient-to-b from-[#2c6e55] to-[#1f5240] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            {messages.products.shopNow}
          </a>
        )}
      </div>
    </article>
  );
}
