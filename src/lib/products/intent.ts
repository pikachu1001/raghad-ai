import type { CategoryId } from "@/lib/categories";

const CATEGORY_KEYWORDS: Record<CategoryId, string[]> = {
  fashion: [
    "abaya",
    "abayas",
    "fashion",
    "dress",
    "modest",
    "namshi",
    "vogacloset",
    "عباية",
    "عبايات",
    "أزياء",
    "ازياء",
    "موضة",
    "فستان",
    "ملابس",
    "عباءة",
  ],
  beauty: [
    "perfume",
    "perfumes",
    "makeup",
    "scent",
    "fragrance",
    "cologne",
    "عطر",
    "عطور",
    "مكياج",
    "جمال",
    "بخور",
  ],
  skincare: [
    "skincare",
    "skin care",
    "cream",
    "serum",
    "moistur",
    "بشرة",
    "عناية بالبشرة",
    "كريم",
    "روتين",
  ],
  home: [
    "home",
    "kitchen",
    "decor",
    "furniture",
    "noon",
    "منزل",
    "مطبخ",
    "ديكور",
    "أثاث",
  ],
  kids: [
    "baby",
    "kids",
    "kid",
    "child",
    "children",
    "toddler",
    "أطفال",
    "رضع",
    "طفل",
    "مستلزمات الأطفال",
  ],
  travel: [
    "hotel",
    "hotels",
    "flight",
    "flights",
    "travel",
    "trip",
    "booking",
    "dubai",
    "vacation",
    "itinerary",
    "eSIM",
    "esim",
    "رحلة",
    "سفر",
    "فندق",
    "فنادق",
    "طيران",
    "حجز",
    "سياحة",
    "تذاكر",
    "دبي",
    "بوكينج",
  ],
};

function normalizeForMatch(text: string) {
  return text.toLowerCase().trim();
}

/** Score how well a query matches a product category (higher = better). */
export function scoreCategoryMatch(query: string, category: CategoryId): number {
  const normalized = normalizeForMatch(query);
  const raw = query.trim();
  let score = 0;

  for (const keyword of CATEGORY_KEYWORDS[category]) {
    const kw = keyword.toLowerCase();
    if (normalized.includes(kw) || raw.includes(keyword)) {
      score += kw.length >= 4 ? 2 : 1;
    }
  }

  return score;
}

/** Pick the best category from explicit URL param or chat query intent. */
export function resolveProductCategory(
  query: string,
  explicitCategory?: string,
): CategoryId | undefined {
  const validIds = Object.keys(CATEGORY_KEYWORDS) as CategoryId[];

  if (explicitCategory && validIds.includes(explicitCategory as CategoryId)) {
    return explicitCategory as CategoryId;
  }

  let best: CategoryId | undefined;
  let bestScore = 0;

  for (const category of validIds) {
    const score = scoreCategoryMatch(query, category);
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }

  return bestScore > 0 ? best : undefined;
}
