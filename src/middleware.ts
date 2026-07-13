import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/lib/i18n/locale";

function ensureLocaleCookie(response: NextResponse, request: NextRequest) {
  const current = request.cookies.get(LOCALE_COOKIE)?.value;
  if (!isLocale(current)) {
    response.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return ensureLocaleCookie(NextResponse.redirect(login), request);
  }

  if (pathname === "/login" && session) {
    return ensureLocaleCookie(
      NextResponse.redirect(new URL("/dashboard", request.url)),
      request
    );
  }

  return ensureLocaleCookie(NextResponse.next(), request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
