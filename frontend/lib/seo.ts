import type { Metadata } from "next";

export const seoConfig = {
  brand: {
    legalName: "Inveris Solutions LLP",
    name: "Inveris Solutions",
    shortName: "Inveris",
    url: "https://www.inverissolutions.com",
    tagline: "One Partner. Connected Expertise. Better Business Decisions.",
    founded: 2026,
    primaryKeyword: "Business Advisory Services in Gurugram",
    keywords: [
      "management consulting",
      "business consulting",
      "recruitment",
      "compliance",
      "finance",
      "internal audit",
      "Delhi NCR",
      "Gurugram",
    ],
  },
  home: {
    title: "Inveris Solutions — Integrated Business Consulting in Gurugram",
    description:
      "Inveris Solutions LLP provides integrated business consulting, recruitment, compliance, financial, and internal audit, solutions for growing businesses across Gurugram, Delhi NCR, and India.",
  },
  pages: {
    about: {
      title: "About Us — Inveris Solutions",
      description:
        "Learn how Inveris Solutions brings strategy, operations, people, finance, compliance, and risk together under one accountable partnership.",
    },
    services: {
      title: "Business Consulting & Integrated Services — Inveris Solutions",
      description:
        "Explore management consulting, recruitment, compliance and financial services, and internal audit solutions designed for growing businesses.",
    },
    industries: {
      title: "Industries We Serve — Inveris Solutions",
      description:
        "Discover Inveris Solutions' cross-industry expertise across manufacturing, technology, healthcare, retail, financial services, real estate, hospitality, education, and more.",
    },
    approach: {
      title: "Our Approach — Inveris Solutions",
      description:
        "Discover how Inveris Solutions turns business questions into practical outcomes through an integrated, outcome-driven approach.",
    },
    leadership: {
      title: "Leadership Team — Inveris Solutions",
      description:
        "Meet the leadership team behind Inveris Solutions, bringing expertise across business strategy, finance, operations, compliance, and business growth.",
    },
    careers: {
      title: "Careers — Inveris Solutions",
      description:
        "Explore career opportunities at Inveris Solutions and join a team working across consulting, business operations, recruitment, compliance, and growth.",
    },
    contact: {
      title: "Contact Us — Inveris Solutions",
      description:
        "Get in touch with Inveris Solutions in Gurugram for business consulting, recruitment, compliance, financial, and internal audit solutions.",
    },
  },
  contact: {
    address: "Gurugram, Haryana, India",
    phone: "+91 99695 34628",
    phoneHref: "tel:+919969534628",
    email: "kriti.pareek@inverissolutions.com",
    whatsapp: "+91 99695 34628",
    whatsappHref: "https://wa.me/919969534628",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gurugram,+Haryana,+India",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Gurugram,+Haryana,+India&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },
  hours: {
    monday: "11:00 AM – 7:00 PM",
    tuesday: "11:00 AM – 7:00 PM",
    wednesday: "11:00 AM – 7:00 PM",
    thursday: "11:00 AM – 7:00 PM",
    friday: "11:00 AM – 7:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/inveris-solutions-llp/",
    instagram: "https://www.instagram.com/inverissolutions",
  },
  gbp: {
    name: "Inveris Solutions LLP",
    categoryPrimary: "Business management consultant",
    categorySecondary: [
      "Management consultant",
      "Human resource consulting",
      "Recruitment agency",
      "People outsourcing firm",
      "Financial consultant",
    ],
    description:
      "Inveris Solutions is an integrated business consulting and solutions partner helping businesses connect strategy, operations, people, finance, compliance, and risk. We bring consulting, recruitment, compliance and financial services, and internal audit together under one accountable partnership.",
    serviceAreas: ["Gurugram", "Delhi NCR", "Pan India"],
  },
} as const;

export type SeoPageKey = keyof typeof seoConfig.pages;

export const businessHoursLabel =
  "Monday – Friday, 11:00 AM – 7:00 PM IST\nSat–Sun closed.";

export function getPageMetadata(
  page: SeoPageKey,
  options?: { canonicalPath?: string },
): Metadata {
  const { title, description } = seoConfig.pages[page];
  const { url } = seoConfig.brand;

  return {
    title,
    description,
    keywords: [...seoConfig.brand.keywords],
    alternates: options?.canonicalPath
      ? { canonical: `${url}${options.canonicalPath}` }
      : undefined,
    openGraph: {
      title,
      description,
      url: options?.canonicalPath ? `${url}${options.canonicalPath}` : url,
      siteName: seoConfig.brand.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function getHomeMetadata(): Metadata {
  const { title, description } = seoConfig.home;
  const { url, keywords } = seoConfig.brand;

  return {
    title: { absolute: title },
    description,
    keywords: [...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.brand.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function openingHoursSpecification() {
  const dayMap: Record<keyof typeof seoConfig.hours, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return Object.entries(seoConfig.hours).map(([day, hours]) => {
    const isClosed = hours === "Closed";
    const [opens, closes] = isClosed ? ["", ""] : hours.split(" – ");

    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[day as keyof typeof seoConfig.hours],
      ...(isClosed
        ? {}
        : {
            opens: to24Hour(opens),
            closes: to24Hour(closes),
          }),
    };
  });
}

function to24Hour(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;

  let hours = Number.parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

export function getOrganizationJsonLd() {
  const { brand, contact, social, gbp } = seoConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${brand.url}/#organization`,
        name: brand.legalName,
        alternateName: brand.name,
        url: brand.url,
        logo: `${brand.url}/images/Logo.jpeg`,
        description: seoConfig.home.description,
        foundingDate: String(brand.founded),
        email: contact.email,
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        areaServed: gbp.serviceAreas,
        sameAs: [social.linkedin, social.instagram],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${brand.url}/#localbusiness`,
        name: brand.legalName,
        image: `${brand.url}/images/Logo.jpeg`,
        url: brand.url,
        telephone: contact.phone,
        email: contact.email,
        description: gbp.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.4595,
          longitude: 77.0266,
        },
        openingHoursSpecification: openingHoursSpecification(),
        areaServed: gbp.serviceAreas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        priceRange: "$$",
        sameAs: [social.linkedin, social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${brand.url}/#website`,
        url: brand.url,
        name: brand.name,
        description: seoConfig.home.description,
        publisher: { "@id": `${brand.url}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}
