"use client";

import type { Locale, Messages, Region } from "@/lib/i18n/types";
import { useApp } from "@/components/providers/AppProviders";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

const REGIONS: Region[] = ["ksa", "gcc", "egypt"];

function regionLabel(messages: Messages, region: Region) {
  return messages.region[region];
}

export function SettingsPanel() {
  const { messages, region, setRegion, regionConfig, dir } = useApp();

  return (
    <div className="space-y-5" dir={dir}>
      <div>
        <p className="luxury-overline">
          {messages.settings.region}
        </p>
        <div className="mt-2.5 flex flex-col gap-2">
          {REGIONS.map((r) => {
            const active = region === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-3 text-start text-base font-medium transition ${
                  active
                    ? "border-[#2c6e55] bg-[#2c6e55]/10 font-semibold text-[#1f5240]"
                    : "border-[#ddd0b8]/70 bg-white/60 text-[#4f5f56] hover:border-[#c9a962]/60 hover:bg-white"
                }`}
              >
                {regionLabel(messages, r)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="luxury-overline">
          {messages.settings.currency}
        </p>
        <p className="mt-2 rounded-xl border border-[#ddd0b8]/50 bg-[#f7faf8] px-3 py-3 text-base font-semibold text-[#24332c]">
          {regionConfig.currency}
          <span className="ms-2 font-medium text-[#4f5f56]">({regionConfig.currencySymbol})</span>
        </p>
      </div>

      <div>
        <p className="luxury-overline">
          {messages.settings.language}
        </p>
        <LanguageToggle className="mt-2.5" />
      </div>
    </div>
  );
}
