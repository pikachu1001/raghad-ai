"use client";

import { LuxuryHome } from "@/components/home/LuxuryHome";
import { ServiceCardsSection } from "@/components/cards/ServiceCardsSection";
import { IMPACT_VERIFICATION_TEXT } from "@/lib/affiliate-verification";

export default function HomePage() {
  return (
    <>
      <LuxuryHome />
      <div id="categories" className="bg-[#f3ece0] pb-16">
        <ServiceCardsSection />
      </div>
      {/* Impact "Edit content" verification — must appear in homepage body */}
      <p className="bg-[#f3ece0] pb-6 text-center text-[11px] text-[#8a9a90]">
        {IMPACT_VERIFICATION_TEXT}
      </p>
    </>
  );
}
