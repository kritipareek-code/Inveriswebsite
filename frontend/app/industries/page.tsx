import { IndustriesGridSection } from "@/components/industries/IndustriesGridSection";
import { IndustryValueBar } from "@/components/industries/IndustryValueBar";
import { OverlayHero } from "@/components/shared/OverlayHero";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { fetchIndustriesContent } from "@/lib/industries-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const industries = await fetchIndustriesContent();
  return {
    title: industries.seo.title,
    description: industries.seo.description,
  };
}

export default async function IndustriesPage() {
  const industries = await fetchIndustriesContent();

  return (
    <>
      <OverlayHero
        tag={industries.hero.tag}
        title={industries.hero.title}
        description={industries.hero.description}
        image={industries.hero.image}
        imageAlt={industries.hero.imageAlt}
      />
      <IndustriesGridSection content={industries.industriesWeServe} />
      <IndustryValueBar content={industries.valueBar} />
      <PageCtaBanner
        title={industries.cta.title}
        description={industries.cta.description}
        cta={industries.cta.cta}
      />
    </>
  );
}
