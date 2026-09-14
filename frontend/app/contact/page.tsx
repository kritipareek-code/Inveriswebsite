import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { FaqSection } from "@/components/contact/FaqSection";
import { OfficeSection } from "@/components/contact/OfficeSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchContactContent } from "@/lib/contact-content";
import { getFaqPageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("contact", { canonicalPath: "/contact" });

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await fetchContactContent();

  return (
    <>
      <JsonLd data={getFaqPageJsonLd(contact.faq.items)} />
      <ContactHeroSection content={contact.hero} />
      <ContactMainSection form={contact.form} contactInfo={contact.contactInfo} />
      <OfficeSection content={contact.office} />
      <FaqSection content={contact.faq} />
    </>
  );
}
