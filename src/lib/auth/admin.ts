import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function getAdminUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      region: true,
    },
  });
  if (!user) return null;

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin =
    user.role === "admin" ||
    (adminEmail && user.email.toLowerCase() === adminEmail);

  return isAdmin ? user : null;
}
