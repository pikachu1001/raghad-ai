import { prisma } from "@/lib/db/prisma";

export const CHAT_PRODUCTS_LIMIT = 2;

export async function getProductsForChat(
  category?: string,
  limit = CHAT_PRODUCTS_LIMIT,
) {
  const where = {
    active: true,
    ...(category ? { category } : {}),
  };

  return prisma.product.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
}

export async function listAllProducts() {
  return prisma.product.findMany({ orderBy: { updatedAt: "desc" } });
}
