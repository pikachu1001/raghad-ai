import Image from "next/image";
import type { Locale } from "@/lib/i18n/types";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { box: "h-10 w-10", px: 40 },
  md: { box: "h-14 w-14", px: 56 },
  lg: { box: "h-36 w-36 sm:h-44 sm:w-44", px: 176 },
} as const;

/** The Raghad AI monogram mark (Aع with pearl + emerald ribbon). */
export function BrandLogo({ size = "sm", className = "", priority = false }: BrandLogoProps) {
  const { box, px } = SIZES[size];

  return (
    <div className={`relative shrink-0 ${box} ${className}`}>
      <Image
        src="/brand/mark.png"
        alt="Raghad AI"
        fill
        sizes={`${px}px`}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}

const LOCKUP_ASSETS: Record<Locale, string> = {
  ar: "/brand/lockup.png",
  en: "/brand/raghad-web.png",
};

/** Horizontal lockup — locale-specific wordmark asset. */
export function BrandLockup({
  locale,
  height = 40,
  className = "",
  priority = false,
}: {
  locale: Locale;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = LOCKUP_ASSETS[locale];
  const width = Math.round((368 / 95) * height);

  return (
    <Image
      src={src}
      alt={locale === "ar" ? "رغد AI" : "Raghad AI"}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}

/** Hero centerpiece logo — larger mark for homepage. */
export function BrandHeroLogo({
  locale,
  className = "",
  priority = false,
}: {
  locale: Locale;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-web.png"
      alt={locale === "ar" ? "رغد AI" : "Raghad AI"}
      width={416}
      height={416}
      className={`h-auto w-full object-contain ${className}`}
      priority={priority}
    />
  );
}
