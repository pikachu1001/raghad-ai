"use client";

import { LuxuryHome } from "@/components/home/LuxuryHome";
import { ServiceCardsSection } from "@/components/cards/ServiceCardsSection";

export default function HomePage() {
  return (
    <>
      <LuxuryHome />
      <div id="categories" className="-mt-2 bg-[#f3ece0] pb-12">
        <ServiceCardsSection />
      </div>
    </>
  );
}
