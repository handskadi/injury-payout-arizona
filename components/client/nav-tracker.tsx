"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPath } from "@/lib/nav-history";

export function NavTracker() {
  const pathname = usePathname();
  useEffect(() => recordPath(pathname), [pathname]);
  return null;
}
