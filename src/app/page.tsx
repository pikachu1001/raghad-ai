"use client";

import { LuxuryHome } from "@/components/home/LuxuryHome";
import { ServiceCardsSection } from "@/components/cards/ServiceCardsSection";

export default function HomePage() {
  return (
    <>
      <LuxuryHome />
      <div id="categories" className="bg-[#f3ece0] pb-16">
        <ServiceCardsSection />
      </div>
    </>
  );
}
