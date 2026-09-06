import { footerContent } from "@/lib/content";
import { getApiBaseUrl } from "@/lib/home-content";

export type FooterSocialIcon = "instagram" | "linkedin";

export type FooterLinkItem = {
  id: string;
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  items: FooterLinkItem[];
};

export type FooterSocialItem = {
  id: string;
  label: string;
  href: string;
  icon: FooterSocialIcon;
};

export type FooterContact = {
  title: string;
  location: string;
  mobile: string;
  email: string;
  social: FooterSocialItem[];
};

export type FooterContent = {
  companyName: string;
  description: string;
  links: FooterLinkGroup[];
  contact: FooterContact;
  copyright: string;
};

export function getFallbackFooterContent(): FooterContent {
  return {
    companyName: footerContent.companyName,
    description: footerContent.description,
    links: footerContent.links.map((group, groupIndex) => ({
      id: `link-group-${groupIndex + 1}`,
      title: group.title,
      items: group.items.map((item, itemIndex) => ({
        id: `link-${groupIndex + 1}-${itemIndex + 1}`,
        label: item.label,
        href: item.href,
      })),
    })),
    contact: {
      title: footerContent.contact.title,
      location: footerContent.contact.location,
      mobile: footerContent.contact.mobile,
      email: footerContent.contact.email,
      social: footerContent.contact.social.map((item, index) => ({
        id: `social-${index + 1}`,
        label: item.label,
        href: item.href.trim(),
        icon: item.icon,
      })),
    },
    copyright: footerContent.copyright,
  };
}

export function toTelHref(mobile: string) {
  const digits = mobile.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : undefined;
}

function withoutYouTube(content: FooterContent): FooterContent {
  return {
    ...content,
    contact: {
      ...content.contact,
      social: content.contact.social.filter(
        (item) => String(item.icon) !== "youtube" && item.label.toLowerCase() !== "youtube"
      ),
    },
  };
}

export async function fetchFooterContent(): Promise<FooterContent> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/content/footer`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load footer content");
    const data = await res.json();
    if (!data?.content) throw new Error("Missing footer content");
    return withoutYouTube(data.content as FooterContent);
  } catch {
    return withoutYouTube(getFallbackFooterContent());
  }
}
