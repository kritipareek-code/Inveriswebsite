import { approachPageContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type ApproachCtaLink = {
  label: string;
  href: string;
};

export type ApproachPathStep = {
  id: string;
  number: string;
  title: string;
  position: string;
};

export type ApproachHeroContent = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  pathSteps: ApproachPathStep[];
};

export type ApproachFourStepItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  items: string[];
};

export type ApproachFourStepsContent = {
  tag: string;
  title: string;
  subtitle: string;
  steps: ApproachFourStepItem[];
};

export type ApproachExpertiseNode = {
  id: string;
  label: string;
  description: string;
  icon: string;
  position: string;
  align: string;
};

export type ApproachConnectedExpertiseContent = {
  title: string;
  titleAccent: string;
  description: string;
  quote: string;
  image: string;
  imageAlt: string;
  nodes: ApproachExpertiseNode[];
};

export type ApproachCtaContent = {
  title: string;
  description: string;
  cta: ApproachCtaLink;
};

export type ApproachSeoContent = {
  title: string;
  description: string;
};

export type ApproachPageContent = {
  seo: ApproachSeoContent;
  hero: ApproachHeroContent;
  fourSteps: ApproachFourStepsContent;
  connectedExpertise: ApproachConnectedExpertiseContent;
  cta: ApproachCtaContent;
};

export function getFallbackApproachContent(): ApproachPageContent {
  return {
    seo: { ...approachPageContent.seo },
    hero: {
      tag: approachPageContent.hero.tag,
      title: approachPageContent.hero.title,
      description: approachPageContent.hero.description,
      image: approachPageContent.hero.image,
      imageAlt: approachPageContent.hero.imageAlt,
      pathSteps: approachPageContent.hero.pathSteps.map((step, index) => ({
        ...step,
        id: `path-${index + 1}`,
      })),
    },
    fourSteps: {
      tag: approachPageContent.fourSteps.tag,
      title: approachPageContent.fourSteps.title,
      subtitle: approachPageContent.fourSteps.subtitle,
      steps: approachPageContent.fourSteps.steps.map((step, index) => ({
        ...step,
        id: `step-${index + 1}`,
        image: step.image ?? "",
        items: [...step.items],
      })),
    },
    connectedExpertise: {
      title: approachPageContent.connectedExpertise.title,
      titleAccent: approachPageContent.connectedExpertise.titleAccent,
      description: approachPageContent.connectedExpertise.description,
      quote: approachPageContent.connectedExpertise.quote,
      image: approachPageContent.connectedExpertise.image,
      imageAlt: approachPageContent.connectedExpertise.imageAlt,
      nodes: approachPageContent.connectedExpertise.nodes.map((node, index) => ({
        ...node,
        id: `node-${index + 1}`,
      })),
    },
    cta: {
      ...approachPageContent.cta,
      cta: { ...approachPageContent.cta.cta },
    },
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export function normalizeApproachContent(raw: unknown): ApproachPageContent {
  const fallback = getFallbackApproachContent();
  const data = asRecord(raw);
  if (!data) return fallback;

  const hero = asRecord(data.hero) ?? {};
  const fourSteps = asRecord(data.fourSteps) ?? {};
  const connected = asRecord(data.connectedExpertise) ?? {};
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
      pathSteps: Array.isArray(hero.pathSteps)
        ? hero.pathSteps.map((step, index) => {
            const item = asRecord(step) ?? {};
            const fallbackStep = fallback.hero.pathSteps[index] ?? fallback.hero.pathSteps[0];
            return {
              id: asString(item.id, fallbackStep?.id ?? `path-${index + 1}`),
              number: asString(item.number, fallbackStep?.number ?? String(index + 1).padStart(2, "0")),
              title: asString(item.title, fallbackStep?.title ?? ""),
              position: asString(item.position, fallbackStep?.position ?? ""),
            };
          })
        : fallback.hero.pathSteps,
    },
    fourSteps: {
      tag: asString(fourSteps.tag, fallback.fourSteps.tag),
      title: asString(fourSteps.title, fallback.fourSteps.title),
      subtitle: asString(fourSteps.subtitle, fallback.fourSteps.subtitle),
      steps: Array.isArray(fourSteps.steps)
        ? fourSteps.steps.map((step, index) => {
            const item = asRecord(step) ?? {};
            const fallbackStep = fallback.fourSteps.steps[index] ?? fallback.fourSteps.steps[0];
            return {
              id: asString(item.id, fallbackStep?.id ?? `step-${index + 1}`),
              number: asString(item.number, fallbackStep?.number ?? String(index + 1).padStart(2, "0")),
              title: asString(item.title, fallbackStep?.title ?? ""),
              description: asString(item.description, fallbackStep?.description ?? ""),
              icon: asString(item.icon, fallbackStep?.icon ?? "search"),
              image: asString(item.image, fallbackStep?.image ?? ""),
              items: Array.isArray(item.items)
                ? item.items.map((entry) => asString(entry, ""))
                : [...(fallbackStep?.items ?? [])],
            };
          })
        : fallback.fourSteps.steps,
    },
    connectedExpertise: {
      title: asString(connected.title, fallback.connectedExpertise.title),
      titleAccent: asString(connected.titleAccent, fallback.connectedExpertise.titleAccent),
      description: asString(connected.description, fallback.connectedExpertise.description),
      quote: asString(connected.quote, fallback.connectedExpertise.quote),
      image: asString(connected.image, fallback.connectedExpertise.image),
      imageAlt: asString(connected.imageAlt, fallback.connectedExpertise.imageAlt),
      nodes: Array.isArray(connected.nodes)
        ? connected.nodes.map((node, index) => {
            const item = asRecord(node) ?? {};
            const fallbackNode =
              fallback.connectedExpertise.nodes[index] ?? fallback.connectedExpertise.nodes[0];
            return {
              id: asString(item.id, fallbackNode?.id ?? `node-${index + 1}`),
              label: asString(item.label, fallbackNode?.label ?? ""),
              description: asString(item.description, fallbackNode?.description ?? ""),
              icon: asString(item.icon, fallbackNode?.icon ?? "users"),
              position: asString(item.position, fallbackNode?.position ?? "top"),
              align: asString(item.align, fallbackNode?.align ?? "right"),
            };
          })
        : fallback.connectedExpertise.nodes,
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

export async function fetchApproachContent(): Promise<ApproachPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/approach`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load approach content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing approach content");
    return normalizeApproachContent(data.content);
  } catch {
    return getFallbackApproachContent();
  }
}
