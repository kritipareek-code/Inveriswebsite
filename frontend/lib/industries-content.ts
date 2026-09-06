import { industriesPageContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type IndustriesCtaLink = {
  label: string;
  href: string;
};

export type IndustriesSeoContent = {
  title: string;
  description: string;
};

export type IndustriesHeroContent = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type IndustryTimelineItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
};

export type IndustriesWeServeContent = {
  tag: string;
  title: string;
  description: string;
  industries: IndustryTimelineItem[];
};

export type IndustriesValueItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export type IndustriesValueBarContent = {
  title: string;
  items: IndustriesValueItem[];
};

export type IndustriesCtaContent = {
  title: string;
  description: string;
  cta: IndustriesCtaLink;
};

export type IndustriesPageContent = {
  seo: IndustriesSeoContent;
  hero: IndustriesHeroContent;
  industriesWeServe: IndustriesWeServeContent;
  valueBar: IndustriesValueBarContent;
  cta: IndustriesCtaContent;
};

export function getFallbackIndustriesContent(): IndustriesPageContent {
  return {
    seo: { ...industriesPageContent.seo },
    hero: { ...industriesPageContent.hero },
    industriesWeServe: {
      tag: industriesPageContent.industriesWeServe.tag,
      title: industriesPageContent.industriesWeServe.title,
      description: industriesPageContent.industriesWeServe.description,
      industries: industriesPageContent.industriesWeServe.industries.map(
        (industry, index) => ({
          id: `industry-${index + 1}`,
          title: industry.title,
          description: industry.description,
          image: industry.image || "",
          imageAlt: industry.imageAlt || industry.title,
          icon: industry.icon,
        })
      ),
    },
    valueBar: {
      title: industriesPageContent.valueBar.title,
      items: industriesPageContent.valueBar.items.map((item, index) => ({
        ...item,
        id: `value-${index + 1}`,
        image: item.image ?? "",
      })),
    },
    cta: {
      ...industriesPageContent.cta,
      cta: { ...industriesPageContent.cta.cta },
    },
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export function normalizeIndustriesContent(raw: unknown): IndustriesPageContent {
  const fallback = getFallbackIndustriesContent();
  const data = asRecord(raw);
  if (!data) return fallback;

  const hero = asRecord(data.hero) ?? {};
  const weServe = asRecord(data.industriesWeServe) ?? {};
  const valueBar = asRecord(data.valueBar) ?? {};
  const cta = asRecord(data.cta) ?? {};
  const ctaLink = asRecord(cta.cta) ?? {};
  const seo = asRecord(data.seo) ?? {};

  return {
    seo: {
      title: asString(seo.title, fallback.seo.title),
      description: asString(seo.description, fallback.seo.description),
    },
    hero: {
      tag: asString(hero.tag, fallback.hero.tag),
      title: asString(hero.title, fallback.hero.title),
      description: asString(hero.description, fallback.hero.description),
      image: asString(hero.image, fallback.hero.image),
      imageAlt: asString(hero.imageAlt, fallback.hero.imageAlt),
    },
    industriesWeServe: {
      tag: asString(weServe.tag, fallback.industriesWeServe.tag),
      title: asString(weServe.title, fallback.industriesWeServe.title),
      description: asString(weServe.description, fallback.industriesWeServe.description),
      industries: Array.isArray(weServe.industries)
        ? weServe.industries.map((industry, index) => {
            const item = asRecord(industry) ?? {};
            const fallbackItem =
              fallback.industriesWeServe.industries[index] ??
              fallback.industriesWeServe.industries[0];
            const title = asString(item.title, fallbackItem?.title ?? "");
            return {
              id: asString(item.id, fallbackItem?.id ?? `industry-${index + 1}`),
              title,
              description: asString(item.description, fallbackItem?.description ?? ""),
              image: asString(item.image, fallbackItem?.image ?? ""),
              imageAlt: asString(item.imageAlt, fallbackItem?.imageAlt || title),
              icon: asString(item.icon, fallbackItem?.icon ?? "manufacturing"),
            };
          })
        : fallback.industriesWeServe.industries,
    },
    valueBar: {
      title: asString(valueBar.title, fallback.valueBar.title),
      items: Array.isArray(valueBar.items)
        ? valueBar.items.map((entry, index) => {
            const item = asRecord(entry) ?? {};
            const fallbackItem = fallback.valueBar.items[index] ?? fallback.valueBar.items[0];
            return {
              id: asString(item.id, fallbackItem?.id ?? `value-${index + 1}`),
              title: asString(item.title, fallbackItem?.title ?? ""),
              description: asString(item.description, fallbackItem?.description ?? ""),
              icon: asString(item.icon, fallbackItem?.icon ?? "users"),
              image: asString(item.image, fallbackItem?.image ?? ""),
            };
          })
        : fallback.valueBar.items,
    },
    cta: {
      title: asString(cta.title, fallback.cta.title),
      description: asString(cta.description, fallback.cta.description),
      cta: {
        label: asString(ctaLink.label, fallback.cta.cta.label),
        href: asString(ctaLink.href, fallback.cta.cta.href),
      },
    },
  };
}

export async function fetchIndustriesContent(): Promise<IndustriesPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/industries`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load industries content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing industries content");
    return normalizeIndustriesContent(data.content);
  } catch {
    return getFallbackIndustriesContent();
  }
}
