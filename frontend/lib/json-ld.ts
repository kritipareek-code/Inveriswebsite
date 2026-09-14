import { resolveMediaUrl } from "@/lib/home-content";
import { seoConfig } from "@/lib/seo";

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

export type ServiceJsonLdItem = {
  title: string;
  description: string;
  items?: string[];
  image?: string;
};

export type PersonJsonLdItem = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
};

function siteUrl() {
  return seoConfig.brand.url.replace(/\/$/, "");
}

function toAbsoluteAssetUrl(src?: string) {
  if (!src) return undefined;
  const resolved = resolveMediaUrl(src);
  if (!resolved) return undefined;
  if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
    return resolved;
  }
  return `${siteUrl()}${resolved.startsWith("/") ? resolved : `/${resolved}`}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isUsefulLinkedIn(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("linkedin.com")) return false;
    return parsed.pathname.length > 1 && parsed.pathname !== "/";
  } catch {
    return false;
  }
}

export function getFaqPageJsonLd(items: FaqJsonLdItem[]) {
  const questions = items.filter(
    (item) => item.question.trim() && item.answer.trim(),
  );

  if (!questions.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  };
}

export function getServiceJsonLd(services: ServiceJsonLdItem[]) {
  const lines = services.filter(
    (service) => service.title.trim() && service.description.trim(),
  );

  if (!lines.length) return null;

  const url = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${seoConfig.brand.name} service lines`,
    url: `${url}/services`,
    numberOfItems: lines.length,
    itemListElement: lines.map((service, index) => {
      const image = toAbsoluteAssetUrl(service.image);
      const offers = (service.items ?? []).filter((item) => item.trim());

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title.trim(),
          description: service.description.trim(),
          serviceType: service.title.trim(),
          url: `${url}/services`,
          provider: { "@id": `${url}/#organization` },
          areaServed: seoConfig.gbp.serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
          })),
          ...(image ? { image } : {}),
          ...(offers.length
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: service.title.trim(),
                  itemListElement: offers.map((name) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: name.trim(),
                    },
                  })),
                },
              }
            : {}),
        },
      };
    }),
  };
}

export function getPersonJsonLd(members: PersonJsonLdItem[]) {
  const people = members.filter((member) => member.name.trim());

  if (!people.length) return null;

  const url = siteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": people.map((member) => {
      const image = toAbsoluteAssetUrl(member.image);
      const linkedin = isUsefulLinkedIn(member.linkedin)
        ? member.linkedin
        : undefined;
      const personId = slugify(member.id || member.name);

      return {
        "@type": "Person",
        "@id": `${url}/leadership#${personId}`,
        name: member.name.trim(),
        jobTitle: member.role.trim() || undefined,
        description: member.bio.trim() || undefined,
        url: `${url}/leadership`,
        worksFor: { "@id": `${url}/#organization` },
        ...(image ? { image } : {}),
        ...(linkedin ? { sameAs: [linkedin] } : {}),
      };
    }),
  };
}
