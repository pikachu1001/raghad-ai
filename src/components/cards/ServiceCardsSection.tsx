"use client";

import { ProductCard, type ProductCardItem } from "./ProductCard";
import { useApp } from "@/components/providers/AppProviders";

/** Client's 6 core sectors — modular for future expansion */
export const CATEGORY_ITEMS: ProductCardItem[] = [
  {
    id: "fashion",
    titleEn: "Fashion & Abayas",
    titleAr: "الأزياء والعبايات",
    descriptionEn: "Expert recommendations for modest fashion and abaya styles.",
    descriptionAr: "توصيات متخصصة للأزياء المحتشمة وستايلات العبايات.",
    price: 0,
    href: "/chat?category=fashion",
  },
  {
    id: "beauty",
    titleEn: "Beauty & Scents",
    titleAr: "الجمال والعطور",
    descriptionEn: "Discover perfumes, makeup, and beauty essentials with affiliate deals.",
    descriptionAr: "اكتشفي العطور والمكياج وأساسيات الجمال مع عروض الشركاء.",
    price: 0,
    href: "/chat?category=beauty",
  },
  {
    id: "skincare",
    titleEn: "Skincare",
    titleAr: "العناية بالبشرة",
    descriptionEn: "Personalized skincare advice tailored to Gulf climate.",
    descriptionAr: "نصائح عناية بالبشرة مخصصة لمناخ الخليج.",
    price: 0,
    href: "/chat?category=skincare",
  },
  {
    id: "home",
    titleEn: "Home Decor & Kitchen",
    titleAr: "ديكور المنزل والمطبخ",
    descriptionEn: "Curated home and kitchen picks with store links and discount codes.",
    descriptionAr: "اختيارات منزلية ومطبخية مع روابط المتاجر وأكواد الخصم.",
    price: 0,
    href: "/chat?category=home",
  },
  {
    id: "kids",
    titleEn: "Kids & Baby Essentials",
    titleAr: "مستلزمات الأطفال والرضع",
    descriptionEn: "Trusted product guidance for mothers across the Gulf.",
    descriptionAr: "إرشاد موثوق للمنتجات للأمهات في الخليج.",
    price: 0,
    href: "/chat?category=kids",
  },
  {
    id: "travel",
    titleEn: "Smart Travel Planning",
    titleAr: "تخطيط السفر الذكي",
    descriptionEn: "AI-assisted travel tips, packing lists, and destination advice.",
    descriptionAr: "نصائح سفر ذكية وقوائم تعبئة وإرشاد للوجهات.",
    price: 0,
    href: "/chat?category=travel",
  },
];

export function ServiceCardsSection() {
  const { messages } = useApp();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-2xl tracking-wide text-[#2c3e35]">{messages.cards.title}</h2>
        <p className="mt-2 text-sm text-[#7a8b82]">{messages.cards.subtitle}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ITEMS.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
