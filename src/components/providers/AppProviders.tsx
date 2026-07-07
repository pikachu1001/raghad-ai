"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMessages } from "@/lib/i18n/get-messages";
import type { Locale, Messages, Region } from "@/lib/i18n/types";
import { REGION_CONFIG } from "@/lib/region/config";
import { REGION_KEY, REGION_MANUAL_KEY } from "@/lib/region/geo";

type AppContextValue = {
  locale: Locale;
  region: Region;
  messages: Messages;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  setRegion: (region: Region) => void;
  regionConfig: (typeof REGION_CONFIG)[Region];
};

const AppContext = createContext<AppContextValue | null>(null);

const LOCALE_KEY = "raghad-locale";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [region, setRegionState] = useState<Region>("ksa");
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null;
    const savedRegion = localStorage.getItem(REGION_KEY) as Region | null;
    if (savedLocale === "en" || savedLocale === "ar") setLocaleState(savedLocale);
    if (savedRegion && savedRegion in REGION_CONFIG) setRegionState(savedRegion);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(REGION_MANUAL_KEY)) return;
    if (localStorage.getItem(REGION_KEY)) return;

    fetch("/api/geo")
      .then((r) => r.json())
      .then((data: { region?: Region }) => {
        if (data.region && data.region in REGION_CONFIG) {
          setRegionState(data.region);
          localStorage.setItem(REGION_KEY, data.region);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getMessages(locale).then(setMessages);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
  }, []);

  const setRegion = useCallback((next: Region) => {
    setRegionState(next);
    localStorage.setItem(REGION_KEY, next);
    localStorage.setItem(REGION_MANUAL_KEY, "1");
  }, []);

  const value = useMemo<AppContextValue | null>(() => {
    if (!messages) return null;
    return {
      locale,
      region,
      messages,
      dir: locale === "ar" ? "rtl" : "ltr",
      setLocale,
      setRegion,
      regionConfig: REGION_CONFIG[region],
    };
  }, [locale, region, messages, setLocale, setRegion]);

  if (!value) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3ece0]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9a962] border-t-transparent" />
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
