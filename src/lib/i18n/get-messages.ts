import type { Locale, Messages } from "./types";

const cache: Partial<Record<Locale, Messages>> = {};

export async function getMessages(locale: Locale): Promise<Messages> {
  if (cache[locale]) return cache[locale]!;

  const messages =
    locale === "ar"
      ? await import("@/messages/ar.json")
      : await import("@/messages/en.json");

  cache[locale] = messages.default as Messages;
  return cache[locale]!;
}
