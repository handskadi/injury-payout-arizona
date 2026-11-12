"use client";

/** Last two in-app paths, so an in-form Back can use the browser history when it matches. */
let current: string | null = null;
let previous: string | null = null;

export function recordPath(path: string) {
  if (path === current) return;
  previous = current;
  current = path;
}

export const previousPath = () => previous;
