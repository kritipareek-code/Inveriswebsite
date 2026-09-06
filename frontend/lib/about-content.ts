import { aboutPageContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type AboutCtaLink = {
  label: string;
  href: string;
};

export type AboutHeroContent = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type AboutWhoWeAreContent = {
  tag: string;
  title: string;
  paragraphs: string[];
  highlightPhrase: string;
  cta: AboutCtaLink;
  image: string;
  imageAlt: string;
  card: {
    title: string;
    description: string;
  };
};

export type AboutMissionFooter = {
  icon: string;
  prefix: string;
  highlight: string;
};

export type AboutVisionFooter = {
  icon: string;
  text: string;
};

export type AboutMissionBlock = {
  tag: string;
  title: string;
  icon: string;
  items: string[];
  footer: AboutMissionFooter;
};

export type AboutVisionBlock = {
  tag: string;
  title: string;
  icon: string;
  items: string[];
  footer: AboutVisionFooter;
};

export type AboutMissionVisionContent = {
  tag: string;
  title: string;
  backgroundImage: string;
  mission: AboutMissionBlock;
  vision: AboutVisionBlock;
};

export type AboutCtaContent = {
  title: string;
  description: string;
  cta: AboutCtaLink;
};

export type AboutPageContent = {
  hero: AboutHeroContent;
  whoWeAre: AboutWhoWeAreContent;
  missionVision: AboutMissionVisionContent;
  cta: AboutCtaContent;
};

export function getFallbackAboutContent(): AboutPageContent {
  return {
    hero: { ...aboutPageContent.hero },
    whoWeAre: {
      ...aboutPageContent.whoWeAre,
      imageAlt: aboutPageContent.whoWeAre.imageAlt || "Modern glass office building",
      paragraphs: [...aboutPageContent.whoWeAre.paragraphs],
      cta: { ...aboutPageContent.whoWeAre.cta },
      card: { ...aboutPageContent.whoWeAre.card },
    },
    missionVision: {
      tag: aboutPageContent.missionVision.tag,
      title: aboutPageContent.missionVision.title,
      backgroundImage: aboutPageContent.missionVision.backgroundImage,
      mission: {
        ...aboutPageContent.missionVision.mission,
        items: [...aboutPageContent.missionVision.mission.items],
        footer: { ...aboutPageContent.missionVision.mission.footer },
      },
      vision: {
        ...aboutPageContent.missionVision.vision,
        items: [...aboutPageContent.missionVision.vision.items],
        footer: { ...aboutPageContent.missionVision.vision.footer },
      },
    },
    cta: {
      ...aboutPageContent.cta,
      cta: { ...aboutPageContent.cta.cta },
    },
  };
}

export async function fetchAboutContent(): Promise<AboutPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/about`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load about content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing about content");
    return normalizeAboutContent(data.content as AboutPageContent);
  } catch {
    return getFallbackAboutContent();
  }
}

function normalizeAboutContent(content: AboutPageContent): AboutPageContent {
  const fallback = getFallbackAboutContent();
  return {
    ...fallback,
    ...content,
    hero: { ...fallback.hero, ...content.hero },
    whoWeAre: {
      ...fallback.whoWeAre,
      ...content.whoWeAre,
      paragraphs: Array.isArray(content.whoWeAre?.paragraphs)
        ? content.whoWeAre.paragraphs
        : fallback.whoWeAre.paragraphs,
      cta: { ...fallback.whoWeAre.cta, ...content.whoWeAre?.cta },
      card: { ...fallback.whoWeAre.card, ...content.whoWeAre?.card },
    },
    missionVision: {
      ...fallback.missionVision,
      ...content.missionVision,
      mission: {
        ...fallback.missionVision.mission,
        ...content.missionVision?.mission,
        items: Array.isArray(content.missionVision?.mission?.items)
          ? content.missionVision.mission.items
          : fallback.missionVision.mission.items,
        footer: {
          ...fallback.missionVision.mission.footer,
          ...content.missionVision?.mission?.footer,
        },
      },
      vision: {
        ...fallback.missionVision.vision,
        ...content.missionVision?.vision,
        items: Array.isArray(content.missionVision?.vision?.items)
          ? content.missionVision.vision.items
          : fallback.missionVision.vision.items,
        footer: {
          ...fallback.missionVision.vision.footer,
          ...content.missionVision?.vision?.footer,
        },
      },
    },
    cta: {
      ...fallback.cta,
      ...content.cta,
      cta: { ...fallback.cta.cta, ...content.cta?.cta },
    },
  };
}
