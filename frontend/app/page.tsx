import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { CtaSection } from "@/components/home/CtaSection";
import { fetchHomeContent } from "@/lib/home-content";
import { getHomeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await fetchHomeContent();

  return {
    ...getHomeMetadata(),
    title: { absolute: home.seo.title },
    description: home.seo.description,
  };
}

export default async function HomePage() {
  const home = await fetchHomeContent();

  return (
    <>
      <HeroSection
        content={home.hero}
        valueBarTitle={home.valueBarTitle}
        valuePropositions={home.valuePropositions}
      />
      <AboutSection content={home.about} />
      <ServicesSection content={home.services} />
      <ApproachSection content={home.approach} />
      <CtaSection content={home.cta} />
    </>
  );
}
