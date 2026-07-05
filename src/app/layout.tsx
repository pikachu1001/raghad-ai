import type { Metadata } from "next";
import { Noto_Sans_Arabic, Inter, Cormorant_Garamond } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { AuthProvider } from "@/components/providers/AuthProvider";
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
  other: {
    "verify-admitad": "0592009f07",
    "impact-site-verification": "43590970-d033-431f-9a32-7f4c9e545b82",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body
        className={`${inter.variable} ${notoArabic.variable} ${cormorant.variable} min-h-full flex flex-col font-sans antialiased`}
      >
        <AppProviders>
          <AuthProvider>{children}</AuthProvider>
        </AppProviders>
      </body>
    </html>
  );
}
