import { careersPageContent } from "@/lib/content";
import type { ContactFaqItem } from "@/lib/contact-content";
import { getApiBaseUrl } from "@/lib/home-content";

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

export type CareersOpportunity = {
  id: string;
  title: string;
  location: string;
  lineOfService: string;
  applyHref: string;
};

export type CareersOpportunitiesContent = {
  title: string;
  emptyMessage: string;
  hero: CareersHeroContent;
  items: CareersOpportunity[];
};

export type CareersFaqContent = {
  tag?: string;
  title: string;
  items: ContactFaqItem[];
};

export type CareersPageContent = {
  hero: CareersHeroContent;
  intro: CareersIntroContent;
  expect: CareersExpectContent;
  network: CareersNetworkContent;
  next: CareersNextContent;
  opportunities: CareersOpportunitiesContent;
  faq: CareersFaqContent;
  cta: CareersCtaContent;
};

export const CAREERS_OPPORTUNITIES_PATH = "/careers/opportunities";

function careersCtaHref(href?: string) {
  if (!href || href === "#talent-network") return CAREERS_OPPORTUNITIES_PATH;
  return href;
}

export function getFallbackCareersContent(): CareersPageContent {
  return {
    hero: {
      ...careersPageContent.hero,
      cta: {
        ...careersPageContent.hero.cta,
        href: careersCtaHref(careersPageContent.hero.cta.href),
      },
    },
    intro: { ...careersPageContent.intro },
    expect: {
      tag: careersPageContent.expect.tag,
      title: careersPageContent.expect.title,
      items: careersPageContent.expect.items.map((item, index) => ({
        ...item,
        id: `expect-${index + 1}`,
      })),
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
    opportunities: {
      title: careersPageContent.opportunities.title,
      emptyMessage: careersPageContent.opportunities.emptyMessage,
      hero: {
        ...careersPageContent.opportunities.hero,
        cta: { ...careersPageContent.opportunities.hero.cta },
      },
      items: careersPageContent.opportunities.items.map((item, index) => ({
        ...item,
        id: `opportunity-${index + 1}`,
      })),
    },
    faq: {
      tag: careersPageContent.faq.tag,
      title: careersPageContent.faq.title,
      items: careersPageContent.faq.items.map((item, index) => ({
        ...item,
        id: `careers-faq-${index + 1}`,
      })),
    },
    cta: {
      ...careersPageContent.cta,
      cta: {
        ...careersPageContent.cta.cta,
        href: careersCtaHref(careersPageContent.cta.cta.href),
      },
    },
  };
}

export function getCareersContent(): CareersPageContent {
  return getFallbackCareersContent();
}

function withIds<T extends { id?: string }>(
  items: T[] | undefined,
  prefix: string
): (T & { id: string })[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    id: item.id || `${prefix}-${index + 1}`,
  }));
}

export function normalizeCareersContent(content: CareersPageContent): CareersPageContent {
  const fallback = getFallbackCareersContent();
  const { opportunity: _removed, ...rest } = content as CareersPageContent & {
    opportunity?: unknown;
  };

  return {
    ...fallback,
    ...rest,
    hero: {
      ...fallback.hero,
      ...content.hero,
      cta: {
        ...fallback.hero.cta,
        ...content.hero?.cta,
        href: careersCtaHref(content.hero?.cta?.href ?? fallback.hero.cta.href),
      },
    },
    intro: { ...fallback.intro, ...content.intro },
    expect: {
      ...fallback.expect,
      ...content.expect,
      items: withIds(content.expect?.items ?? fallback.expect.items, "expect"),
    },
    network: {
      ...fallback.network,
      ...content.network,
      interestOptions: content.network?.interestOptions ?? fallback.network.interestOptions,
      experienceOptions: content.network?.experienceOptions ?? fallback.network.experienceOptions,
    },
    next: {
      ...fallback.next,
      ...content.next,
      steps: withIds(content.next?.steps ?? fallback.next.steps, "next"),
    },
    opportunities: {
      ...fallback.opportunities,
      ...content.opportunities,
      emptyMessage:
        content.opportunities?.emptyMessage ?? fallback.opportunities.emptyMessage,
      hero: {
        ...fallback.opportunities.hero,
        ...content.opportunities?.hero,
        cta: {
          ...fallback.opportunities.hero.cta,
          ...content.opportunities?.hero?.cta,
        },
      },
      items: withIds(
        content.opportunities?.items ?? fallback.opportunities.items,
        "opportunity"
      ).map((item) => ({
        ...item,
        title: item.title ?? "",
        location: item.location ?? "",
        lineOfService: item.lineOfService ?? "",
        applyHref: item.applyHref ?? "",
      })),
    },
    faq: {
      tag: content.faq?.tag ?? fallback.faq.tag,
      title: content.faq?.title ?? fallback.faq.title,
      items: withIds(content.faq?.items ?? fallback.faq.items, "careers-faq"),
    },
    cta: {
      ...fallback.cta,
      ...content.cta,
      cta: {
        ...fallback.cta.cta,
        ...content.cta?.cta,
        href: careersCtaHref(content.cta?.cta?.href ?? fallback.cta.cta.href),
      },
    },
  };
}

export async function fetchCareersContent(): Promise<CareersPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/careers`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load careers content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing careers content");
    return normalizeCareersContent(data.content as CareersPageContent);
  } catch {
    return getFallbackCareersContent();
  }
}
