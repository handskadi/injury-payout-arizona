import { NextResponse, type NextRequest } from "next/server";

/**
 * English is served at the root (/), Spanish under /es. Internally every page
 * lives under app/[lang], so root paths are rewritten to /en/… and any
 * explicit /en/… URL is redirected to its canonical unprefixed form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // V2 became the site on 2 Nov 2026: old /v2 review links go to the same page at the root.
  const legacy = pathname.match(/^(\/es)?\/v2(\/.*)?$/);
  if (legacy) {
    const url = request.nextUrl.clone();
    url.pathname = `${legacy[1] ?? ""}${legacy[2] ?? ""}` || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)"],
};
