import { servicesPageContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type ServicesCtaLink = {
  label: string;
  href: string;
};

export type ServicesHeroContent = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ServicesLineItem = {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  icon: string;
  imagePosition: "left" | "right";
};

export type ServicesOfferContent = {
  tag: string;
  title: string;
  description: string;
  serviceLines: ServicesLineItem[];
};

export type ServicesCtaContent = {
  title: string;
  description: string;
  cta: ServicesCtaLink;
};

export type ServicesConsultingImage = {
  id: string;
  src: string;
  alt: string;
};

export type ServicesConsultingCallContent = {
  tag: string;
  title: string;
  description: string;
  submitLabel: string;
  images: ServicesConsultingImage[];
};

export type ServicesPageContent = {
  hero: ServicesHeroContent;
  offer: ServicesOfferContent;
  consultingCall: ServicesConsultingCallContent;
  cta: ServicesCtaContent;
};

export function getFallbackServicesContent(): ServicesPageContent {
  return {
    hero: { ...servicesPageContent.hero },
    offer: {
      tag: servicesPageContent.offer.tag,
      title: servicesPageContent.offer.title,
      description: servicesPageContent.offer.description,
      serviceLines: servicesPageContent.offer.serviceLines.map((line, index) => ({
        ...line,
        id: `line-${index + 1}`,
        items: [...line.items],
      })),
    },
    consultingCall: {
      tag: servicesPageContent.consultingCall.tag,
      title: servicesPageContent.consultingCall.title,
      description: servicesPageContent.consultingCall.description,
      submitLabel: servicesPageContent.consultingCall.submitLabel,
      images: servicesPageContent.consultingCall.images.map((image, index) => ({
        ...image,
        id: image.id || `consult-img-${index + 1}`,
      })),
    },
    cta: {
      ...servicesPageContent.cta,
      cta: { ...servicesPageContent.cta.cta },
    },
  };
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

function normalizeServicesContent(content: ServicesPageContent): ServicesPageContent {
  const fallback = getFallbackServicesContent();
  const incoming = content.consultingCall;
  const { whyItMatters: _removed, ...rest } = content as ServicesPageContent & {
    whyItMatters?: unknown;
  };

  return {
    ...fallback,
    ...rest,
    hero: { ...fallback.hero, ...content.hero },
    offer: {
      ...fallback.offer,
      ...content.offer,
      serviceLines: withIds(
        content.offer?.serviceLines ?? fallback.offer.serviceLines,
        "line"
      ).map((line) => ({
        ...line,
        items: Array.isArray(line.items) ? line.items : [],
        imagePosition: line.imagePosition === "right" ? "right" : "left",
      })),
    },
    consultingCall: incoming
      ? {
          tag: incoming.tag ?? fallback.consultingCall.tag,
          title: incoming.title ?? fallback.consultingCall.title,
          description: incoming.description ?? fallback.consultingCall.description,
          submitLabel: incoming.submitLabel ?? fallback.consultingCall.submitLabel,
          images: withIds(
            Array.isArray(incoming.images) ? incoming.images : fallback.consultingCall.images,
            "consult-img"
          ).map((image) => ({
            id: image.id,
            src: image.src || "",
            alt: image.alt || "",
          })),
        }
      : fallback.consultingCall,
    cta: {
      ...fallback.cta,
      ...content.cta,
      cta: { ...fallback.cta.cta, ...content.cta?.cta },
    },
  };
}

export async function fetchServicesContent(): Promise<ServicesPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/services`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load services content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing services content");
    return normalizeServicesContent(data.content as ServicesPageContent);
  } catch {
    return getFallbackServicesContent();
  }
}
