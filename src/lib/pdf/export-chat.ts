import { jsPDF } from "jspdf";
import type { Locale } from "@/lib/i18n/types";
import { prepareChatDisplayText } from "@/lib/text/normalize";

const FONT_FILE = "NotoSansArabic-Regular.ttf";
const FONT_FAMILY = "NotoSansArabic";

export type PdfChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type PdfChatLabels = {
  title: string;
  user: string;
  assistant: string;
};

let fontBase64Promise: Promise<string> | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function loadArabicFontBase64(): Promise<string> {
  if (!fontBase64Promise) {
    fontBase64Promise = fetch(`/fonts/${FONT_FILE}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load PDF Arabic font");
        return res.arrayBuffer();
      })
      .then(arrayBufferToBase64);
  }
  return fontBase64Promise;
}

function registerArabicFont(doc: jsPDF, base64: string) {
  doc.addFileToVFS(FONT_FILE, base64);
  doc.addFont(FONT_FILE, FONT_FAMILY, "normal");
  doc.setFont(FONT_FAMILY, "normal");
}

/** Strip lightweight markdown before PDF rendering. */
function stripMarkdownForPdf(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*•]\s+/gm, "• ");
}

function messageContainsArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

export async function exportChatToPdf(options: {
  history: PdfChatMessage[];
  locale: Locale;
  labels: PdfChatLabels;
}): Promise<void> {
  const { history, locale, labels } = options;
  const useRtl =
    locale === "ar" ||
    history.some((m) => messageContainsArabic(m.content));

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const base64 = await loadArabicFontBase64();
  registerArabicFont(doc, base64);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const maxWidth = pageWidth - margin * 2;
  const x = useRtl ? pageWidth - margin : margin;
  const align = useRtl ? "right" : "left";
  const lineHeight = 6;

  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFontSize(15);
  doc.setTextColor(44, 62, 53);
  const titleLines = doc.splitTextToSize(labels.title, maxWidth);
  ensureSpace(titleLines.length * lineHeight + 4);
  doc.text(titleLines, x, y, { align, maxWidth });
  y += titleLines.length * lineHeight + 8;

  doc.setFontSize(10);

  for (const msg of history) {
    const prefix = msg.role === "user" ? `${labels.user}: ` : `${labels.assistant}: `;
    const body = stripMarkdownForPdf(prepareChatDisplayText(msg.content, locale));
    const block = `${prefix}${body}`;
    const lines = doc.splitTextToSize(block, maxWidth);
    const blockHeight = lines.length * lineHeight + 5;

    ensureSpace(blockHeight);
    doc.setTextColor(msg.role === "user" ? 31 : 44, msg.role === "user" ? 82 : 62, msg.role === "user" ? 64 : 53);
    doc.text(lines, x, y, { align, maxWidth });
    y += blockHeight;
  }

  const filename =
    locale === "ar" ? "raghad-ai-chat-ar.pdf" : "raghad-ai-chat.pdf";
  doc.save(filename);
}
