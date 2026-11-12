"use client";

export type Place = { city: string; state: string; stateCode: string };

const cache = new Map<string, Promise<Place | null>>();

/** City and state for a 5-digit US ZIP (null when unknown or the lookup fails). */
export function lookupZip(zip5: string): Promise<Place | null> {
  let hit = cache.get(zip5);
  if (!hit) {
    hit = fetch(`/api/zip?zip=${zip5}`)
      .then((r) => (r.ok ? (r.json() as Promise<Place>) : null))
      .catch(() => null);
    cache.set(zip5, hit);
    // A failed lookup can be retried later.
    void hit.then((p) => {
      if (!p) cache.delete(zip5);
    });
  }
  return hit;
}
