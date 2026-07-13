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
    descriptionAr: "اكتشف العطور والمكياج وأساسيات الجمال مع عروض الشركاء.",
    price: 0,
    href: "/chat?category=beauty",
  },
  {
    id: "skincare",
    titleEn: "Skincare",
    titleAr: "العناية بالبشرة",
    descriptionEn: "Personalized skincare advice tailored to Gulf climate.",
    descriptionAr: "نصائح عناية بالبشرة مناسبة لمناخ الخليج.",
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
    descriptionAr: "إرشاد موثوق للمنتجات للعائلات في منطقة الخليج.",
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
  const { messages, locale, dir } = useApp();

  return (
    <section
      dir={dir}
      className={`mx-auto max-w-6xl px-4 pb-8 ${
        locale === "ar" ? "pt-8 sm:pt-10 md:pt-4" : "pt-6 sm:pt-8 md:pt-4"
      }`}
    >
      <div className="mb-8 text-center sm:mb-10">
        <h2 className="luxury-heading-section text-2xl sm:text-3xl">{messages.cards.title}</h2>
        <p className="luxury-muted mt-3">{messages.cards.subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ITEMS.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
