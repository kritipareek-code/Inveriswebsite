import { contactPageContent, companyContact } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";
import { businessHoursLabel } from "@/lib/seo";

export type ContactHeroContent = {
  tag: string;
  titleWhite: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ContactFormContent = {
  title: string;
  enquiryTypes: string[];
};

export type ContactInfoEntry = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type ContactAddressEntry = {
  id: string;
  label: string;
  company: string;
  value: string;
};

export type ContactInfoContent = {
  title: string;
  emails: ContactInfoEntry[];
  phones: ContactInfoEntry[];
  addresses: ContactAddressEntry[];
  businessHours: string;
};

export type ContactOfficeContent = {
  title: string;
  subtitle: string;
  company: string;
  address: string;
  directionsUrl: string;
  mapEmbedUrl: string;
};

export type ContactFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ContactFaqContent = {
  tag?: string;
  title: string;
  stillHaveQuestions: string;
  ctaLabel: string;
  avatars: string[];
  items: ContactFaqItem[];
};

export type ContactPageContent = {
  hero: ContactHeroContent;
  form: ContactFormContent;
  contactInfo: ContactInfoContent;
  office: ContactOfficeContent;
  faq: ContactFaqContent;
};

export function getFallbackContactContent(): ContactPageContent {
  return {
    hero: { ...contactPageContent.hero },
    form: {
      title: contactPageContent.form.title,
      enquiryTypes: [...contactPageContent.form.enquiryTypes],
    },
    contactInfo: {
      title: contactPageContent.contactInfo.title,
      emails: [
        {
          id: "email-1",
          label: "Email Us",
          value: companyContact.email,
          href: `mailto:${companyContact.email}`,
        },
      ],
      phones: [
        {
          id: "phone-1",
          label: "Call Us",
          value: companyContact.mobile,
          href: companyContact.mobileHref,
        },
      ],
      addresses: [
        {
          id: "address-1",
          label: "Our Office",
          company: companyContact.company,
          value: companyContact.location,
        },
      ],
      businessHours: businessHoursLabel,
    },
    office: { ...contactPageContent.office },
    faq: {
      title: contactPageContent.faq.title,
      stillHaveQuestions: contactPageContent.faq.stillHaveQuestions,
      ctaLabel: contactPageContent.faq.ctaLabel,
      avatars: [...contactPageContent.faq.avatars],
      items: contactPageContent.faq.items.map((item, index) => ({
        ...item,
        id: `faq-${index + 1}`,
      })),
    },
  };
}

export async function fetchContactContent(): Promise<ContactPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/contact`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load contact content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing contact content");
    return data.content as ContactPageContent;
  } catch {
    return getFallbackContactContent();
  }
}
