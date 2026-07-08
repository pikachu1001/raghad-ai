import Image from "next/image";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { box: "h-9 w-9", px: 36 },
  md: { box: "h-14 w-14", px: 56 },
  lg: { box: "h-40 w-40 sm:h-48 sm:w-48", px: 192 },
} as const;

export function BrandLogo({ size = "sm", className = "", priority = false }: BrandLogoProps) {
  const { box, px } = SIZES[size];

  return (
    <div className={`relative shrink-0 ${box} ${className}`}>
      <Image
        src="/brand/logo-emblem.svg"
        alt="Raghad AI"
        fill
        sizes={`${px}px`}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
