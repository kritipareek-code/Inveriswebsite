import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { CareersIntroSection } from "@/components/careers/CareersIntroSection";
import { CareersExpectSection } from "@/components/careers/CareersExpectSection";
import { CareersOpportunitySection } from "@/components/careers/CareersOpportunitySection";
import { CareersNetworkSection } from "@/components/careers/CareersNetworkSection";
import { FaqSection } from "@/components/contact/FaqSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { getCareersContent } from "@/lib/careers-content";

export const metadata = {
  title: "Careers",
  description:
    "Join Inveris Solutions — work with people who think differently, take ownership, and turn ideas into action.",
};

export default function CareersPage() {
  const careers = getCareersContent();

  return (
    <>
      <CareersHeroSection content={careers.hero} />
      <CareersIntroSection content={careers.intro} />
      <CareersExpectSection content={careers.expect} />
      <CareersOpportunitySection content={careers.opportunity} />
      <CareersNetworkSection network={careers.network} next={careers.next} />
      <FaqSection content={careers.faq} ctaHref="#talent-network" />
      <PageCtaBanner
        title={careers.cta.title}
        description={careers.cta.description}
        cta={careers.cta.cta}
      />
    </>
  );
}
