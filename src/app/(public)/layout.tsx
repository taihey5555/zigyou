"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/kagu") || pathname.startsWith("/airport");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideChrome && <SiteHeader />}
      {children}
      {!hideChrome && <SiteFooter />}
    </div>
  );
}
