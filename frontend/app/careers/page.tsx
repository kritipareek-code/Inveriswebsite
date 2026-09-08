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
import { fetchCareersContent } from "@/lib/careers-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("careers", { canonicalPath: "/careers" });

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const careers = await fetchCareersContent();

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
