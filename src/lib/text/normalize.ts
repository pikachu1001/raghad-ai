/** Normalize smart punctuation from LLM output for reliable display. */
export function normalizeAnswerText(text: string): string {
  return text
    .replace(/[\u2018\u2019\u2032\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\uFFFD+/g, "'");
}

const RLM = "\u200F";

/** Keep Arabic punctuation from jumping to the wrong side of RTL lines. */
export function fixRtlPunctuation(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      let fixed = line.replace(/^(\s*)([:：\-–—•])\s*/, `$1${RLM}$2 `);
      fixed = fixed.replace(/^(\s*)([([])/, `$1${RLM}$2`);
      return fixed;
    })
    .join("\n");
}

export function prepareChatDisplayText(text: string, locale: "en" | "ar"): string {
  const normalized = normalizeAnswerText(text);
  return locale === "ar" ? fixRtlPunctuation(normalized) : normalized;
}
