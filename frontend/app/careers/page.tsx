import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { CareersIntroSection } from "@/components/careers/CareersIntroSection";
import { CareersExpectSection } from "@/components/careers/CareersExpectSection";
import { CareersNetworkSection } from "@/components/careers/CareersNetworkSection";
import { CareersFaqSection } from "@/components/careers/CareersFaqSection";
import { CareersCtaBanner, CareersFormProvider } from "@/components/careers/CareersFormProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchCareersContent } from "@/lib/careers-content";
import { getFaqPageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("careers", { canonicalPath: "/careers" });

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const careers = await fetchCareersContent();

  return (
    <>
      <JsonLd data={getFaqPageJsonLd(careers.faq.items)} />
      <CareersFormProvider network={careers.network}>
        <CareersHeroSection content={careers.hero} />
        <CareersIntroSection content={careers.intro} />
        <CareersExpectSection content={careers.expect} />
        <CareersNetworkSection network={careers.network} next={careers.next} />
        <CareersFaqSection content={careers.faq} />
        <CareersCtaBanner content={careers.cta} />
      </CareersFormProvider>
    </>
  );
}
