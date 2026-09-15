"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavProvider } from "@/components/providers/NavProvider";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import type { FooterContent } from "@/lib/footer-content";

const PAGES_WITH_OWN_CTA = new Set([
  "/",
  "/about",
  "/approach",
  "/services",
  "/industries",
  "/leadership",
  "/careers",
]);

export function SiteFrame({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: FooterContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const hideFooterCta =
    PAGES_WITH_OWN_CTA.has(pathname) || pathname.startsWith("/careers/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <NavProvider>
      <BreadcrumbJsonLd pathname={pathname} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer content={footer} showCta={!hideFooterCta} />
    </NavProvider>
  );
}

function BreadcrumbJsonLd({ pathname }: { pathname: string }) {
  const payload = getBreadcrumbJsonLd(pathname);
  if (!payload) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
