"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/components/providers/AppProviders";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { dir } = useApp();

  return (
    <>
      <Header />
      <main className="flex-1" dir={dir}>
        {children}
      </main>
      <Footer />
    </>
  );
}
