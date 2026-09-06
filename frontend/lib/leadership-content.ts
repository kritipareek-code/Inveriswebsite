import { leadershipPageContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type LeadershipCtaLink = {
  label: string;
  href: string;
};

export type LeadershipHeroContent = {
  tag: string;
  titleWhite: string;
  titleAccent: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
};

export type LeadershipPhilosophyItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type LeadershipPhilosophyContent = {
  tag: string;
  title: string;
  description: string;
  items: LeadershipPhilosophyItem[];
};

export type LeadershipTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
};

export type LeadershipTeamContent = {
  tag: string;
  title: string;
  members: LeadershipTeamMember[];
};

export type LeadershipValueItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type LeadershipValuesContent = {
  tag: string;
  title: string;
  backgroundImage: string;
  items: LeadershipValueItem[];
};

export type LeadershipCtaContent = {
  title: string;
  description: string;
  cta: LeadershipCtaLink;
};

export type LeadershipPageContent = {
  hero: LeadershipHeroContent;
  philosophy: LeadershipPhilosophyContent;
  team: LeadershipTeamContent;
  values: LeadershipValuesContent;
  cta: LeadershipCtaContent;
};

export function getFallbackLeadershipContent(): LeadershipPageContent {
  return {
    hero: {
      tag: leadershipPageContent.hero.tag,
      titleWhite: leadershipPageContent.hero.titleWhite,
      titleAccent: leadershipPageContent.hero.titleAccent,
      paragraphs: [...leadershipPageContent.hero.paragraphs],
      image: leadershipPageContent.hero.image,
      imageAlt: leadershipPageContent.hero.imageAlt,
    },
    philosophy: {
      tag: leadershipPageContent.philosophy.tag,
      title: leadershipPageContent.philosophy.title,
      description: leadershipPageContent.philosophy.description,
      items: leadershipPageContent.philosophy.items.map((item, index) => ({
        ...item,
        id: `philosophy-${index + 1}`,
      })),
    },
    team: {
      tag: leadershipPageContent.team.tag,
      title: leadershipPageContent.team.title,
      members: leadershipPageContent.team.members.map((member, index) => ({
        ...member,
        id: `member-${index + 1}`,
      })),
    },
    values: {
      tag: leadershipPageContent.values.tag,
      title: leadershipPageContent.values.title,
      backgroundImage: leadershipPageContent.values.backgroundImage,
      items: leadershipPageContent.values.items.map((item, index) => ({
        ...item,
        id: `value-${index + 1}`,
      })),
    },
    cta: {
      ...leadershipPageContent.cta,
      cta: { ...leadershipPageContent.cta.cta },
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

function normalizeLeadershipContent(content: LeadershipPageContent): LeadershipPageContent {
  const fallback = getFallbackLeadershipContent();
  return {
    ...fallback,
    ...content,
    hero: {
      ...fallback.hero,
      ...content.hero,
      paragraphs: Array.isArray(content.hero?.paragraphs)
        ? content.hero.paragraphs
        : fallback.hero.paragraphs,
    },
    philosophy: {
      ...fallback.philosophy,
      ...content.philosophy,
      items: withIds(
        content.philosophy?.items ?? fallback.philosophy.items,
        "philosophy"
      ),
    },
    team: {
      ...fallback.team,
      ...content.team,
      members: withIds(content.team?.members ?? fallback.team.members, "member"),
    },
    values: {
      ...fallback.values,
      ...content.values,
      items: withIds(content.values?.items ?? fallback.values.items, "value"),
    },
    cta: {
      ...fallback.cta,
      ...content.cta,
      cta: { ...fallback.cta.cta, ...content.cta?.cta },
    },
  };
}

export async function fetchLeadershipContent(): Promise<LeadershipPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/leadership`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load leadership content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing leadership content");
    return normalizeLeadershipContent(data.content as LeadershipPageContent);
  } catch {
    return getFallbackLeadershipContent();
  }
}
