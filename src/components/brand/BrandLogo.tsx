import Image from "next/image";

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

/** Horizontal lockup: monogram mark + "Raghad Al" wordmark. */
export function BrandLockup({
  height = 40,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  // Intrinsic asset ratio is 368 x 95.
  const width = Math.round((368 / 95) * height);

  return (
    <Image
      src="/brand/raghad-web.png"
      alt="Raghad AI"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
