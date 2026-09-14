import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { CareersOpportunitiesSection } from "@/components/careers/CareersOpportunitiesSection";
import { CareersFormProvider } from "@/components/careers/CareersFormProvider";
import { fetchCareersContent } from "@/lib/careers-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = {
  ...getPageMetadata("careers", { canonicalPath: "/careers/opportunities" }),
  title: "Current Opportunities — Inveris Solutions",
};

export const dynamic = "force-dynamic";

export default async function CareersOpportunitiesPage() {
  const careers = await fetchCareersContent();

  return (
    <CareersFormProvider network={careers.network}>
      <CareersHeroSection content={careers.opportunities.hero} />
      <CareersOpportunitiesSection content={careers.opportunities} />
    </CareersFormProvider>
  );
}
