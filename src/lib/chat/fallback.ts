import { CATEGORIES } from "@/lib/categories";

export function getCategoryFallbackMessage(locale: "en" | "ar"): string {
  const list = CATEGORIES.map((c) => (locale === "ar" ? c.nameAr : c.nameEn)).join(
    locale === "ar" ? " · " : " · "
  );

  if (locale === "ar") {
    return `عذراً، لا أملك معلومات كافية عن هذا الطلب حالياً. يمكنني مساعدتك في الأقسام التالية:\n\n${list}\n\nاختر قسماً من الصفحة الرئيسية أو اكتبي سؤالك ضمن أحد هذه المجالات.`;
  }

  return `I'm sorry, I don't have enough information for that request right now. I can help you with these categories:\n\n${list}\n\nChoose a category from the homepage or ask your question within one of these areas.`;
}

const FALLBACK_PATTERNS = [
  /لا أملك معلومات/i,
  /لا تجدي الإجابة/i,
  /not in the context/i,
  /don't have enough information/i,
  /do not have enough information/i,
  /لا توجد بيانات/i,
  /غير متصل/i,
  /not connected/i,
  /not indexed/i,
  /الأقسام التالية/i,
  /these categories/i,
];

export function shouldSuggestCategories(answer: string): boolean {
  return FALLBACK_PATTERNS.some((p) => p.test(answer));
}

export function stripRawUrls(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1")
    .replace(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
