import { prisma } from "@/lib/db/prisma";
import { resolveProductCategory } from "@/lib/products/intent";

export const CHAT_PRODUCTS_LIMIT = 2;

type ProductRow = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

function rankByQueryRelevance(products: ProductRow[], query: string) {
  if (!query.trim()) return products;
  const q = query.toLowerCase();

  return [...products].sort((a, b) => {
    const textA = `${a.nameEn} ${a.nameAr} ${a.descriptionEn ?? ""} ${a.descriptionAr ?? ""}`.toLowerCase();
    const textB = `${b.nameEn} ${b.nameAr} ${b.descriptionEn ?? ""} ${b.descriptionAr ?? ""}`.toLowerCase();
    const scoreA = (textA.includes(q) ? 5 : 0) + (q.split(/\s+/).filter((w) => w.length > 2 && textA.includes(w)).length);
    const scoreB = (textB.includes(q) ? 5 : 0) + (q.split(/\s+/).filter((w) => w.length > 2 && textB.includes(w)).length);
    return scoreB - scoreA;
  });
}

export async function getProductsForChat(options: {
  query?: string;
  category?: string;
  limit?: number;
}) {
  const { query = "", category, limit = CHAT_PRODUCTS_LIMIT } = options;
  const resolvedCategory = resolveProductCategory(query, category);

  // No intent match — do not show unrelated cards (e.g. Noon for abaya queries).
  if (!resolvedCategory) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      active: true,
      category: resolvedCategory,
      affiliateUrl: { not: null },
    },
    orderBy: { updatedAt: "desc" },
    take: Math.max(limit * 3, 6),
  });

  return rankByQueryRelevance(products, query).slice(0, limit);
}

export async function listAllProducts() {
  return prisma.product.findMany({ orderBy: { updatedAt: "desc" } });
}
