import { Prisma } from "@prisma/client";

export function authErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Authentication is temporarily unavailable. Please try again shortly.";
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021" || error.code === "P1001") {
      return "Authentication is temporarily unavailable. Please try again shortly.";
    }
  }
  if (error instanceof SyntaxError) {
    return "Invalid request. Please check your details and try again.";
  }
  return fallback;
}
