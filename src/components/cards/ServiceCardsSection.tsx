"use client";

import { ProductCard, type ProductCardItem } from "./ProductCard";
import { useApp } from "@/components/providers/AppProviders";

/** Placeholder data — replace with client content when materials arrive */
export const PLACEHOLDER_PRODUCTS: ProductCardItem[] = [
  {
    id: "1",
    titleEn: "Business Consultation",
    titleAr: "استشارات أعمال",
    descriptionEn: "AI-powered guidance for business setup and compliance in KSA.",
    descriptionAr: "إرشاد ذكي لإعداد الأعمال والامتثال في السعودية.",
    price: 299,
    href: "/chat",
  },
  {
    id: "2",
    titleEn: "Legal Q&A Assistant",
    titleAr: "مساعد الأسئلة القانونية",
    descriptionEn: "Get answers from your legal knowledge base in Arabic or English.",
    descriptionAr: "احصل على إجابات من قاعدة المعرفة القانونية بالعربية أو الإنجليزية.",
    price: 199,
    href: "/chat",
  },
  {
    id: "3",
    titleEn: "Customer Support Bot",
    titleAr: "بوت دعم العملاء",
    descriptionEn: "Handle customer inquiries with dialect-aware retrieval.",
    descriptionAr: "التعامل مع استفسارات العملاء مع بحث يدعم اللهجات المحلية.",
    price: 149,
    href: "/chat",
  },
];

export function ServiceCardsSection() {
  const { messages } = useApp();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">{messages.cards.title}</h2>
        <p className="mt-2 text-slate-600">{messages.cards.subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_PRODUCTS.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
