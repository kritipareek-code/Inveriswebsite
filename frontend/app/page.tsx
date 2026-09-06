import { HeroSection } from "@/components/home/HeroSection";
import { ValueBarSection } from "@/components/home/ValueBarSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { CtaSection } from "@/components/home/CtaSection";
import { fetchHomeContent } from "@/lib/home-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await fetchHomeContent();
  return {
    title: { absolute: home.seo.title },
    description: home.seo.description,
  };
}

export default async function HomePage() {
  const home = await fetchHomeContent();

  return (
    <>
      <HeroSection content={home.hero} />
      <ValueBarSection title={home.valueBarTitle} items={home.valuePropositions} />
      <AboutSection content={home.about} />
      <ServicesSection content={home.services} />
      <ApproachSection content={home.approach} />
      <CtaSection content={home.cta} />
    </>
  );
}
