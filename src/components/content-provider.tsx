"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({ value, children }: { value: SiteContent; children: React.ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useSiteContent harus digunakan di dalam ContentProvider");
  return content;
}
