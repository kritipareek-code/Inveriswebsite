const defaultIndustries = {
  seo: {
    title: "Industries We Serve — Inveris Solutions",
    description:
      "Discover Inveris Solutions' cross-industry expertise across manufacturing, technology, healthcare, retail, financial services, real estate, hospitality, education, and more.",
  },
  hero: {
    tag: "INDUSTRIES",
    title: "Industry Expertise. Business Impact.",
    description:
      "We partner with organizations across diverse sectors—bringing integrated consulting, talent, compliance, and audit expertise tailored to the unique demands of your industry.",
    image: "/images/leadership-hero.jpg",
    imageAlt: "Leadership team in boardroom overlooking city skyline",
  },
  industriesWeServe: {
    tag: "INDUSTRIES WE SERVE",
    title: "Solutions Aligned to Your Industry. Built for Real-World Impact.",
    description:
      "Every industry faces distinct operational, regulatory, and growth challenges. We combine deep sector knowledge with integrated capabilities to deliver solutions that create measurable business impact.",
    industries: [
      {
        id: "industry-1",
        title: "Manufacturing",
        description:
          "Optimize operations, strengthen supply chain performance, and build workforce capabilities that support sustainable manufacturing growth.",
        icon: "manufacturing",
        image: "/images/about-building.jpg",
        imageAlt: "Manufacturing operations",
      },
      {
        id: "industry-2",
        title: "Retail & E-commerce",
        description:
          "Scale operations across digital and physical channels with integrated support for talent, finance, compliance, and business strategy.",
        icon: "retail",
        image: "/images/service-recruitment.jpg",
        imageAlt: "Retail and e-commerce",
      },
      {
        id: "industry-3",
        title: "Healthcare",
        description:
          "Navigate complex regulatory requirements, strengthen internal controls, and build high-performing teams in patient-focused environments.",
        icon: "healthcare",
        image: "/images/about-3.jpg",
        imageAlt: "Healthcare",
      },
      {
        id: "industry-4",
        title: "Technology",
        description:
          "Support fast-growing tech companies with strategic consulting, specialized recruitment, financial governance, and risk management.",
        icon: "technology",
        image: "/images/about-4.jpg",
        imageAlt: "Technology",
      },
      {
        id: "industry-5",
        title: "Banking & Financial Services",
        description:
          "Strengthen regulatory compliance, internal audit, and operational resilience in an evolving financial services landscape.",
        icon: "banking",
        image: "/images/service-compliance.jpg",
        imageAlt: "Banking and financial services",
      },
      {
        id: "industry-6",
        title: "Education",
        description:
          "Help educational institutions improve workforce planning, operational efficiency, compliance, and governance frameworks.",
        icon: "education",
        image: "/images/about-1.jpg",
        imageAlt: "Education",
      },
      {
        id: "industry-7",
        title: "Real Estate & Construction",
        description:
          "Manage project complexity, financial controls, regulatory compliance, and talent needs across real estate and construction.",
        icon: "realEstate",
        image: "/images/service-consulting.jpg",
        imageAlt: "Real estate and construction",
      },
      {
        id: "industry-8",
        title: "Travel & Hospitality",
        description:
          "Optimize operations, manage seasonal workforce needs, and strengthen financial and compliance practices in hospitality.",
        icon: "travel",
        image: "/images/cta.jpg",
        imageAlt: "Travel and hospitality",
      },
    ],
  },
  valueBar: {
    title: "Why Partner With Inveris?",
    items: [
      {
        id: "value-1",
        title: "Deep Industry Understanding",
        description:
          "We understand the unique challenges, regulations, and dynamics that shape your sector.",
        icon: "users",
        image: "",
      },
      {
        id: "value-2",
        title: "Tailored Solutions",
        description:
          "Our services are customized to address the specific needs of your industry and business stage.",
        icon: "target",
        image: "",
      },
      {
        id: "value-3",
        title: "Integrated Expertise",
        description:
          "Strategy, people, finance, compliance, and audit work together—not in silos.",
        icon: "network",
        image: "",
      },
      {
        id: "value-4",
        title: "Measurable Impact",
        description:
          "We focus on outcomes that drive efficiency, growth, and long-term value.",
        icon: "chart",
        image: "",
      },
      {
        id: "value-5",
        title: "Long-Term Partnership",
        description:
          "We stay engaged as your industry evolves and your business grows.",
        icon: "handshake",
        image: "",
      },
    ],
  },
  cta: {
    title: "Your Industry. Our Expertise. Stronger Together.",
    description:
      "Let's work together to address your industry's unique challenges with integrated expertise and accountable partnership.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
};

module.exports = { defaultIndustries };
