"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

export default function ConditionalAnalytics() {
  const pathname = usePathname();

  // Exclude analytics from admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Analytics />;
}
