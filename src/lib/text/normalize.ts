/** Normalize smart punctuation from LLM output for reliable display. */
export function normalizeAnswerText(text: string): string {
  return text
    .replace(/[\u2018\u2019\u2032\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\uFFFD+/g, "'");
}
