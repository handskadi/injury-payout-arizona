"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during SSR and hydration, true afterwards (and on client navigations). */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);
