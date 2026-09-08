import {
  aboutContent,
  approachContent,
  ctaContent,
  heroContent,
  servicesContent,
  siteConfig,
  valuePropositions,
} from "@/lib/content";
import { seoConfig } from "@/lib/seo";

export type CtaLink = {
  label: string;
  href: string;
};

export type HomeSeoContent = {
  title: string;
  description: string;
};

export type HomeHeroContent = {
  tag: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  backgroundImage: string;
  backgroundImageAlt: string;
};

export type HomeValueItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export type HomeAboutFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
};

export type HomeAboutContent = {
  tag: string;
  title: string;
  description: string;
  cta: CtaLink;
  backgroundImage: string;
  backgroundImageAlt: string;
  features: HomeAboutFeature[];
};

export type HomeServiceItem = {
  id: string;
  title: string;
  icon: string;
  image: string;
  imageAlt: string;
  items: string[];
  href: string;
  linkLabel: string;
};

export type HomeServicesContent = {
  tag: string;
  title: string;
  services: HomeServiceItem[];
};

export type HomeApproachStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export type HomeApproachContent = {
  tag: string;
  title: string;
  steps: HomeApproachStep[];
};

export type HomeCtaContent = {
  title: string;
  description: string;
  cta: CtaLink;
  image: string;
  imageAlt: string;
};

export type HomeContent = {
  seo: HomeSeoContent;
  hero: HomeHeroContent;
  valueBarTitle: string;
  valuePropositions: HomeValueItem[];
  about: HomeAboutContent;
  services: HomeServicesContent;
  approach: HomeApproachContent;
  cta: HomeCtaContent;
};

const VALUE_BAR_TITLE = "Why businesses choose Inveris";

export function getFallbackHomeContent(): HomeContent {
  return {
    seo: {
      title: seoConfig.home.title,
      description: seoConfig.home.description,
    },
    hero: {
      ...heroContent,
      backgroundImageAlt: heroContent.backgroundImageAlt || "Modern corporate skyscrapers",
    },
    valueBarTitle: VALUE_BAR_TITLE,
    valuePropositions: valuePropositions.map((item, index) => ({
      ...item,
      id: `vp-${index + 1}`,
      image: item.image ?? "",
    })),
    about: {
      ...aboutContent,
      backgroundImageAlt: aboutContent.backgroundImageAlt || aboutContent.title,
      cta: { ...aboutContent.cta },
      features: aboutContent.features.map((feature, index) => ({
        ...feature,
        id: `feat-${index + 1}`,
        imageAlt: feature.imageAlt || feature.title,
      })),
    },
    services: {
      tag: servicesContent.tag,
      title: servicesContent.title,
      services: servicesContent.services.map((service, index) => ({
        ...service,
        id: `svc-${index + 1}`,
        imageAlt: service.imageAlt || service.title,
        linkLabel: service.linkLabel || "Learn More",
      })),
    },
    approach: {
      tag: approachContent.tag,
      title: approachContent.title,
      steps: approachContent.steps.map((step, index) => ({
        ...step,
        id: `step-${index + 1}`,
        image: step.image ?? "",
      })),
    },
    cta: {
      ...ctaContent,
      cta: { ...ctaContent.cta },
      imageAlt: ctaContent.imageAlt || "Inveris branded workspace",
    },
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function asLink(value: unknown, fallback: CtaLink): CtaLink {
  const data = asRecord(value) ?? {};
  return {
    label: asString(data.label, fallback.label),
    href: asString(data.href, fallback.href),
  };
}

export function normalizeHomeContent(raw: unknown): HomeContent {
  const fallback = getFallbackHomeContent();
  const data = asRecord(raw);
  if (!data) return fallback;

  const seo = asRecord(data.seo) ?? {};
  const hero = asRecord(data.hero) ?? {};
  const about = asRecord(data.about) ?? {};
  const services = asRecord(data.services) ?? {};
  const approach = asRecord(data.approach) ?? {};
  const cta = asRecord(data.cta) ?? {};

  return {
    seo: {
      title: asString(seo.title, fallback.seo.title),
      description: asString(seo.description, fallback.seo.description),
    },
    hero: {
      tag: asString(hero.tag, fallback.hero.tag),
      title: asString(hero.title, fallback.hero.title),
      description: asString(hero.description, fallback.hero.description),
      primaryCta: asLink(hero.primaryCta, fallback.hero.primaryCta),
      secondaryCta: asLink(hero.secondaryCta, fallback.hero.secondaryCta),
      backgroundImage: asString(hero.backgroundImage, fallback.hero.backgroundImage),
      backgroundImageAlt: asString(hero.backgroundImageAlt, fallback.hero.backgroundImageAlt),
    },
    valueBarTitle: asString(data.valueBarTitle, fallback.valueBarTitle),
    valuePropositions: Array.isArray(data.valuePropositions)
      ? data.valuePropositions.map((entry, index) => {
          const item = asRecord(entry) ?? {};
          const fallbackItem = fallback.valuePropositions[index] ?? fallback.valuePropositions[0];
          return {
            id: asString(item.id, fallbackItem?.id ?? `vp-${index + 1}`),
            title: asString(item.title, fallbackItem?.title ?? ""),
            description: asString(item.description, fallbackItem?.description ?? ""),
            icon: asString(item.icon, fallbackItem?.icon ?? "user"),
            image: asString(item.image, fallbackItem?.image ?? ""),
          };
        })
      : fallback.valuePropositions,
    about: {
      tag: asString(about.tag, fallback.about.tag),
      title: asString(about.title, fallback.about.title),
      description: asString(about.description, fallback.about.description),
      cta: asLink(about.cta, fallback.about.cta),
      backgroundImage: asString(about.backgroundImage, fallback.about.backgroundImage),
      backgroundImageAlt: asString(about.backgroundImageAlt, fallback.about.backgroundImageAlt),
      features: Array.isArray(about.features)
        ? about.features.map((entry, index) => {
            const item = asRecord(entry) ?? {};
            const fallbackItem = fallback.about.features[index] ?? fallback.about.features[0];
            const title = asString(item.title, fallbackItem?.title ?? "");
            return {
              id: asString(item.id, fallbackItem?.id ?? `feat-${index + 1}`),
              title,
              description: asString(item.description, fallbackItem?.description ?? ""),
              image: asString(item.image, fallbackItem?.image ?? ""),
              imageAlt: asString(item.imageAlt, fallbackItem?.imageAlt || title),
              icon: asString(item.icon, fallbackItem?.icon ?? "puzzle"),
            };
          })
        : fallback.about.features,
    },
    services: {
      tag: asString(services.tag, fallback.services.tag),
      title: asString(services.title, fallback.services.title),
      services: Array.isArray(services.services)
        ? services.services.map((entry, index) => {
            const item = asRecord(entry) ?? {};
            const fallbackItem = fallback.services.services[index] ?? fallback.services.services[0];
            const title = asString(item.title, fallbackItem?.title ?? "");
            return {
              id: asString(item.id, fallbackItem?.id ?? `svc-${index + 1}`),
              title,
              icon: asString(item.icon, fallbackItem?.icon ?? "briefcase"),
              image: asString(item.image, fallbackItem?.image ?? ""),
              imageAlt: asString(item.imageAlt, fallbackItem?.imageAlt || title),
              items: Array.isArray(item.items)
                ? item.items.map((bullet) => asString(bullet, ""))
                : [...(fallbackItem?.items ?? [])],
              href: asString(item.href, fallbackItem?.href ?? "/services"),
              linkLabel: asString(item.linkLabel, fallbackItem?.linkLabel ?? "Learn More"),
            };
          })
        : fallback.services.services,
    },
    approach: {
      tag: asString(approach.tag, fallback.approach.tag),
      title: asString(approach.title, fallback.approach.title),
      steps: Array.isArray(approach.steps)
        ? approach.steps.map((entry, index) => {
            const item = asRecord(entry) ?? {};
            const fallbackItem = fallback.approach.steps[index] ?? fallback.approach.steps[0];
            return {
              id: asString(item.id, fallbackItem?.id ?? `step-${index + 1}`),
              number: asString(item.number, fallbackItem?.number ?? String(index + 1).padStart(2, "0")),
              title: asString(item.title, fallbackItem?.title ?? ""),
              description: asString(item.description, fallbackItem?.description ?? ""),
              icon: asString(item.icon, fallbackItem?.icon ?? "search"),
              image: asString(item.image, fallbackItem?.image ?? ""),
            };
          })
        : fallback.approach.steps,
    },
    cta: {
      title: asString(cta.title, fallback.cta.title),
      description: asString(cta.description, fallback.cta.description),
      cta: asLink(cta.cta, fallback.cta.cta),
      image: asString(cta.image, fallback.cta.image),
      imageAlt: asString(cta.imageAlt, fallback.cta.imageAlt),
    },
  };
}

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
}

export function resolveMediaUrl(src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/uploads/")) return `${getApiBaseUrl()}${src}`;
  return src;
}

export async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/home`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load home content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing home content");
    return normalizeHomeContent(data.content);
  } catch {
    return getFallbackHomeContent();
  }
}
