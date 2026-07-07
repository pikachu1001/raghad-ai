import { NextResponse } from "next/server";
import { countryToRegion } from "@/lib/region/geo";

export async function GET(request: Request) {
  const headers = request.headers;

  // Vercel provides country on deploy
  const vercelCountry = headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    return NextResponse.json({
      country: vercelCountry,
      region: countryToRegion(vercelCountry),
      source: "vercel",
    });
  }

  // Local / other hosts: resolve via client IP
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "";

  if (ip && ip !== "127.0.0.1" && ip !== "::1") {
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = (await res.json()) as { countryCode?: string };
        return NextResponse.json({
          country: data.countryCode ?? null,
          region: countryToRegion(data.countryCode),
          source: "ip-api",
        });
      }
    } catch {
      // fall through to default
    }
  }

  return NextResponse.json({
    country: null,
    region: "ksa" as const,
    source: "default",
  });
}
