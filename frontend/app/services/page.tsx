import { PageHero } from "@/components/shared/PageHero";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { ConsultingCallSection } from "@/components/services/ConsultingCallSection";
import { ServicesOfferSection } from "@/components/services/ServicesOfferSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceJsonLd } from "@/lib/json-ld";
import { fetchServicesContent } from "@/lib/services-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("services", { canonicalPath: "/services" });

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await fetchServicesContent();

  return (
    <>
      <JsonLd data={getServiceJsonLd(services.offer.serviceLines)} />
      <PageHero
        tag={services.hero.tag}
        title={services.hero.title}
        description={services.hero.description}
        image={services.hero.image}
        imageAlt={services.hero.imageAlt}
      />
      <ServicesOfferSection content={services.offer} />
      <ConsultingCallSection content={services.consultingCall} />
      <PageCtaBanner
        title={services.cta.title}
        description={services.cta.description}
        cta={services.cta.cta}
      />
    </>
  );
}
