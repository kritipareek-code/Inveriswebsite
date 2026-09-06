import { ApproachHeroSection } from "@/components/approach/ApproachHeroSection";
import { ConnectedExpertiseSection } from "@/components/approach/ConnectedExpertiseSection";
import { FourStepSection } from "@/components/approach/FourStepSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { fetchApproachContent } from "@/lib/approach-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const approach = await fetchApproachContent();
  return {
    title: approach.seo.title,
    description: approach.seo.description,
  };
}

export default async function ApproachPage() {
  const approach = await fetchApproachContent();

  return (
    <>
      <ApproachHeroSection content={approach.hero} />
      <FourStepSection content={approach.fourSteps} />
      <ConnectedExpertiseSection content={approach.connectedExpertise} />
      <PageCtaBanner
        title={approach.cta.title}
        description={approach.cta.description}
        cta={approach.cta.cta}
      />
    </>
  );
}
