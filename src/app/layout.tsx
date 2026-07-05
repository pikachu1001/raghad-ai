import type { Metadata } from "next";
import { Noto_Sans_Arabic, Inter, Cormorant_Garamond } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { AuthProvider } from "@/components/providers/AuthProvider";
import {
  IMPACT_VERIFICATION_ID,
  IMPACT_VERIFICATION_TEXT,
} from "@/lib/affiliate-verification";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Raghad AI | Askraghadai.com",
  description:
    "Your AI-powered companion for fashion, beauty, skincare, home, kids, and travel across the Gulf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        {/* Impact expects value= in their snippet; include both value and content for crawlers */}
        <meta name="impact-site-verification" content={IMPACT_VERIFICATION_ID} />
        {/* @ts-expect-error Impact crawler expects non-standard value= attribute */}
        <meta name="impact-site-verification" value={IMPACT_VERIFICATION_ID} />
        <meta name="verify-admitad" content="0592009f07" />
      </head>
      <body
        className={`${inter.variable} ${notoArabic.variable} ${cormorant.variable} min-h-full flex flex-col font-sans antialiased`}
      >
        {/* Impact verification text (also on homepage for Edit content method) */}
        <p style={{ display: "none" }} aria-hidden="true">
          {IMPACT_VERIFICATION_TEXT}
        </p>
        <AppProviders>
          <AuthProvider>{children}</AuthProvider>
        </AppProviders>
      </body>
    </html>
  );
}
