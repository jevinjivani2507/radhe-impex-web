import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

// Best supported language from Accept-Language, e.g. "km-KH,km;q=0.9,en;q=0.8".
function fromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;
  return header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .map((p) => p.lang)
    .find(hasLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // Already on a language: remember it so "/" brings the visitor back here.
  if (hasLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, { maxAge: 60 * 60 * 24 * 365, path: "/" });
    }
    return response;
  }

  // No language in the URL: last chosen language, then the browser's, then English.
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (saved && hasLocale(saved) ? saved : undefined) ??
    fromAcceptLanguage(request.headers.get("accept-language")) ??
    defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals, files with an extension (images, robots.txt, sitemap.xml).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

