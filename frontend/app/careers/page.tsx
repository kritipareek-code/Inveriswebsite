import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { CareersIntroSection } from "@/components/careers/CareersIntroSection";
import { CareersExpectSection } from "@/components/careers/CareersExpectSection";
import { CareersOpportunitySection } from "@/components/careers/CareersOpportunitySection";
import { CareersNetworkSection } from "@/components/careers/CareersNetworkSection";
import {
  CareersCtaBanner,
  CareersFaqSection,
  CareersFormProvider,
} from "@/components/careers/CareersFormProvider";
import { getCareersContent } from "@/lib/careers-content";

export const metadata = {
  title: "Careers",
  description:
    "Join Inveris Solutions — work with people who think differently, take ownership, and turn ideas into action.",
};

export default function CareersPage() {
  const careers = getCareersContent();

  return (
    <CareersFormProvider network={careers.network}>
      <CareersHeroSection content={careers.hero} />
      <CareersIntroSection content={careers.intro} />
      <CareersExpectSection content={careers.expect} />
      <CareersOpportunitySection content={careers.opportunity} />
      <CareersNetworkSection network={careers.network} next={careers.next} />
      <CareersFaqSection content={careers.faq} />
      <CareersCtaBanner content={careers.cta} />
    </CareersFormProvider>
  );
}
