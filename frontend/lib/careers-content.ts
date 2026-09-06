import { careersPageContent } from "@/lib/content";
import type { ContactFaqContent } from "@/lib/contact-content";

export type CareersCtaLink = {
  label: string;
  href: string;
};

export type CareersHeroContent = {
  tag: string;
  titleWhite: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: CareersCtaLink;
};

export type CareersIntroContent = {
  statement: string;
};

export type CareersExpectItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type CareersExpectContent = {
  tag: string;
  title: string;
  items: CareersExpectItem[];
};

export type CareersOpportunityContent = {
  title: string;
  description: string;
  emailLabel: string;
  email: string;
  cta: CareersCtaLink;
};

export type CareersNetworkContent = {
  tag: string;
  title: string;
  description: string;
  formTitle: string;
  interestOptions: string[];
  experienceOptions: string[];
  submitLabel: string;
};

export type CareersNextStep = {
  id: string;
  title: string;
  description: string;
};

export type CareersNextContent = {
  title: string;
  description: string;
  steps: CareersNextStep[];
};

export type CareersCtaContent = {
  title: string;
  description: string;
  cta: CareersCtaLink;
};

export type CareersPageContent = {
  hero: CareersHeroContent;
  intro: CareersIntroContent;
  expect: CareersExpectContent;
  opportunity: CareersOpportunityContent;
  network: CareersNetworkContent;
  next: CareersNextContent;
  faq: ContactFaqContent;
  cta: CareersCtaContent;
};

export function getCareersContent(): CareersPageContent {
  return {
    hero: { ...careersPageContent.hero, cta: { ...careersPageContent.hero.cta } },
    intro: { ...careersPageContent.intro },
    expect: {
      tag: careersPageContent.expect.tag,
      title: careersPageContent.expect.title,
      items: careersPageContent.expect.items.map((item, index) => ({
        ...item,
        id: `expect-${index + 1}`,
      })),
    },
    opportunity: {
      ...careersPageContent.opportunity,
      cta: { ...careersPageContent.opportunity.cta },
    },
    network: {
      ...careersPageContent.network,
      interestOptions: [...careersPageContent.network.interestOptions],
      experienceOptions: [...careersPageContent.network.experienceOptions],
    },
    next: {
      title: careersPageContent.next.title,
      description: careersPageContent.next.description,
      steps: careersPageContent.next.steps.map((step, index) => ({
        ...step,
        id: `next-${index + 1}`,
      })),
    },
    faq: {
      tag: careersPageContent.faq.tag,
      title: careersPageContent.faq.title,
      stillHaveQuestions: careersPageContent.faq.stillHaveQuestions,
      ctaLabel: careersPageContent.faq.ctaLabel,
      avatars: [...careersPageContent.faq.avatars],
      items: careersPageContent.faq.items.map((item, index) => ({
        ...item,
        id: `careers-faq-${index + 1}`,
      })),
    },
    cta: {
      ...careersPageContent.cta,
      cta: { ...careersPageContent.cta.cta },
    },
  };
}
