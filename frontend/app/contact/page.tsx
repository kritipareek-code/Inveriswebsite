import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { FaqSection } from "@/components/contact/FaqSection";
import { OfficeSection } from "@/components/contact/OfficeSection";
import { fetchContactContent } from "@/lib/contact-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("contact", { canonicalPath: "/contact" });

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await fetchContactContent();

  return (
    <>
      <ContactHeroSection content={contact.hero} />
      <ContactMainSection form={contact.form} contactInfo={contact.contactInfo} />
      <OfficeSection content={contact.office} />
      <FaqSection content={contact.faq} />
    </>
  );
}
