import { NextResponse } from "next/server";

/**
 * ZIP → city and state for the step-2 address (Zippopotam.us, no key). The
 * visitor's browser only talks to this site; results are cached for a month.
 */
export async function GET(request: Request) {
  const zip = new URL(request.url).searchParams.get("zip") ?? "";
  if (!/^\d{5}$/.test(zip)) return NextResponse.json({ error: "invalid_zip" }, { status: 400 });
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.status === 404) {
      return NextResponse.json({ error: "not_found" }, { status: 404, headers: { "cache-control": "public, max-age=86400" } });
    }
    if (!res.ok) throw new Error(`lookup ${res.status}`);
    const data = (await res.json()) as { places?: { "place name": string; state: string; "state abbreviation": string }[] };
    const place = data.places?.[0];
    if (!place) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json(
      { city: place["place name"], state: place.state, stateCode: place["state abbreviation"] },
      { headers: { "cache-control": "public, max-age=86400, s-maxage=2592000" } },
    );
  } catch {
    return NextResponse.json({ error: "lookup_failed" }, { status: 502 });
  }
}
