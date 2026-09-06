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

export async function fetchLeadershipContent(): Promise<LeadershipPageContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/leadership`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load leadership content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing leadership content");
    return withDefaultValues(data.content as LeadershipPageContent);
  } catch {
    return getFallbackLeadershipContent();
  }
}

function withDefaultValues(content: LeadershipPageContent): LeadershipPageContent {
  const fallback = getFallbackLeadershipContent().values;
  const items = content.values?.items ?? [];
  const hasSixth =
    items.length >= 6 ||
    items.some(
      (item) =>
        item.id === "value-6" || /client partnership/i.test(item.title || "")
    );

  return {
    ...content,
    values: {
      ...content.values,
      tag: content.values?.tag || fallback.tag,
      title: content.values?.title || fallback.title,
      backgroundImage:
        !content.values?.backgroundImage ||
        content.values.backgroundImage.includes("about-building.jpg")
          ? fallback.backgroundImage
          : content.values.backgroundImage,
      items: hasSixth ? items : [...items, fallback.items[5]],
    },
  };
}
