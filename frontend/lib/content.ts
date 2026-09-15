import { businessHoursLabel, seoConfig } from "@/lib/seo";

export const siteConfig = {
  name: seoConfig.brand.legalName,
  shortName: seoConfig.brand.shortName,
  url: seoConfig.brand.url,
  tagline: seoConfig.brand.tagline,
  description: seoConfig.home.description,
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/approach" },
  { label: "Leadership", href: "/leadership" },
  { label: "Careers", href: "/careers" },
];

export const heroContent = {
  tag: "ONE PARTNER. CONNECTED EXPERTISE.",
  title: "Your Business Has One Big Picture. Why Get Advice In Pieces?",
  description:
    "Most businesses work with disconnected advisors — one for strategy, another for finance, another for compliance. We bring integrated expertise across consulting, recruitment, compliance, and audit under one accountable partner.",
  primaryCta: { label: "Discover How We Help", href: "/about" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  backgroundImage: "/images/hero.jpg",
  backgroundImageAlt: "Modern corporate skyscrapers",
};

export const valuePropositions = [
  {
    title: "One Point of Accountability",
    description: "A single partner responsible for outcomes across your business needs.",
    icon: "user",
    image: "",
  },
  {
    title: "Connected Thinking",
    description: "Strategy, finance, compliance, and talent aligned — not siloed.",
    icon: "network",
    image: "",
  },
  {
    title: "Less Vendor Complexity",
    description: "Fewer handoffs, fewer gaps, and clearer ownership.",
    icon: "layers",
    image: "",
  },
  {
    title: "Built to Scale",
    description: "Solutions designed to grow with your business, not just solve today's problem.",
    icon: "trending",
    image: "",
  },
  {
    title: "Faster, Better Decisions",
    description: "Integrated insight means fewer delays and smarter choices.",
    icon: "clock",
    image: "",
  },
  {
    title: "A Partner Beyond the Project",
    description: "We stay engaged as your business evolves — not just during the engagement.",
    icon: "handshake",
    image: "",
  },
];

export const aboutContent = {
  tag: "ABOUT INVERIS",
  title: "One Partner. Integrated Business Solutions.",
  description:
    "Inveris Solutions LLP helps businesses simplify complexity by bringing consulting, recruitment, compliance, and audit together under one roof. Instead of juggling multiple vendors, you get connected expertise and one accountable partner focused on practical results.",
  cta: { label: "Learn More About Us", href: "/about" },
  backgroundImage: "/images/about-building.jpg",
  backgroundImageAlt: "Corporate office building",
  features: [
    {
      title: "Integrated Expertise",
      description: "Strategy, finance, compliance, and talent aligned under one partner.",
      image: "/images/about-1.jpg",
      imageAlt: "Integrated expertise",
      icon: "puzzle",
    },
    {
      title: "Practical Approach",
      description: "Solutions designed for real-world execution — not just recommendations.",
      image: "/images/about-2.jpg",
      imageAlt: "Practical approach",
      icon: "target",
    },
    {
      title: "Accountable Partnership",
      description: "One team responsible for outcomes across your business needs.",
      image: "/images/about-3.jpg",
      imageAlt: "Accountable partnership",
      icon: "shield",
    },
    {
      title: "Built for Growth",
      description: "Support that scales with your business as priorities evolve.",
      image: "/images/about-4.jpg",
      imageAlt: "Built for growth",
      icon: "growth",
    },
  ],
};

export const servicesContent = {
  tag: "SERVICES",
  title: "Solutions That Work Together for Your Business",
  services: [
    {
      title: "Management Consulting",
      icon: "briefcase",
      image: "/images/service-consulting.jpg",
      imageAlt: "Management consulting",
      items: [
        "Business Growth Strategies",
        "Operational Efficiency",
        "Scaling Operations",
        "Change Management",
      ],
      href: "/services",
      linkLabel: "Learn More",
    },
    {
      title: "Recruitment",
      icon: "users",
      image: "/images/service-recruitment.jpg",
      imageAlt: "Recruitment",
      items: [
        "Executive Search",
        "Specialized Talent Acquisition",
        "Workforce Planning",
        "Retention Strategies",
      ],
      href: "/services",
      linkLabel: "Learn More",
    },
    {
      title: "Compliance & Financial Services",
      icon: "chart",
      image: "/images/service-compliance.jpg",
      imageAlt: "Compliance and financial services",
      items: [
        "Regulatory Compliance",
        "Financial Planning & Analysis",
        "Risk Management",
        "Governance Support",
      ],
      href: "/services",
      linkLabel: "Learn More",
    },
    {
      title: "Internal Audit",
      icon: "search",
      image: "/images/service-audit.jpg",
      imageAlt: "Internal audit",
      items: [
        "Risk-Based Auditing",
        "Process Reviews",
        "Control Assessments",
        "Compliance Audits",
      ],
      href: "/services",
      linkLabel: "Learn More",
    },
  ],
};

export const servicesPageContent = {
  hero: {
    tag: "OUR SERVICES",
    title: "Integrated Solutions. Stronger Businesses.",
    description:
      "We bring together strategy, people, finance, compliance, and assurance—so your business can operate efficiently, make better decisions, and scale with confidence.",
    image: "/images/about-hero.jpg",
    imageAlt: "Modern conference room overlooking city skyline",
  },
  offer: {
    tag: "WHAT WE OFFER",
    title: "One Partner. Four Core Service Lines. Complete Coverage.",
    description:
      "Our integrated service lines work together to address the most important aspects of your business—helping you reduce complexity, strengthen your foundation, and accelerate growth.",
    serviceLines: [
      {
        title: "Management Consulting",
        description:
          "We help organizations solve complex business challenges, improve performance, and unlock new opportunities for growth.",
        items: [
          "Business Growth Strategies",
          "Scaling Operations",
          "Productivity Improvement",
          "Business Transformation",
        ],
        image: "/images/service-consulting.jpg",
        icon: "consulting" as const,
        imagePosition: "right" as const,
      },
      {
        title: "Recruitment",
        description:
          "We help businesses build high-performing teams by attracting, evaluating, and hiring the right talent.",
        items: [
          "Hiring Best Practices",
          "Talent Acquisition Trends",
          "Interview Frameworks",
        ],
        image: "/images/service-recruitment.jpg",
        icon: "recruitment" as const,
        imagePosition: "left" as const,
      },
      {
        title: "Compliance & Financial Services",
        description:
          "We help organizations strengthen financial management, ensure compliance, and build a culture of transparency and control.",
        items: [
          "Financial Reporting",
          "Regulatory Compliance",
          "Risk & Control Advisory",
          "Process & Policy Design",
        ],
        image: "/images/service-compliance.jpg",
        icon: "compliance" as const,
        imagePosition: "right" as const,
      },
      {
        title: "Internal Audit",
        description:
          "We provide independent assurance and insights that help organizations improve governance, mitigate risk, and strengthen operational effectiveness.",
        items: [
          "Operational Risk Assessment",
          "Internal Controls Review",
          "Audit & Assurance",
          "Governance Support",
        ],
        image: "/images/service-audit.jpg",
        icon: "audit" as const,
        imagePosition: "left" as const,
      },
    ],
  },
  consultingCall: {
    tag: "BOOK A CALL",
    title: "Book a Consulting Call",
    description:
      "Share a few details about your business and we'll schedule a focused conversation with our consultants.",
    submitLabel: "Request a call",
    images: [
      {
        id: "consult-img-1",
        src: "/images/service-consulting.jpg",
        alt: "Consultants collaborating in a meeting",
      },
      {
        id: "consult-img-2",
        src: "/images/service-compliance.jpg",
        alt: "Team reviewing strategy documents",
      },
      {
        id: "consult-img-3",
        src: "/images/about-hero.jpg",
        alt: "Modern office overlooking the city",
      },
    ],
  },
  cta: {
    title: "Let's Build What's Next. Together.",
    description:
      "Whether you're scaling, transforming, or solving complex business challenges—we're here to help you grow with clarity, confidence, and the right support.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
};

export const industriesPageContent = {
  seo: {
    title: "Industries",
    description:
      "Inveris Solutions LLP serves manufacturing, healthcare, technology, financial services, and more with integrated industry expertise.",
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
        title: "Manufacturing",
        description:
          "Optimize operations, strengthen supply chain performance, and build workforce capabilities that support sustainable manufacturing growth.",
        icon: "manufacturing" as const,
        href: "/contact",
        image: "/images/about-building.jpg",
        imageAlt: "Manufacturing operations",
      },
      {
        title: "Retail & E-commerce",
        description:
          "Scale operations across digital and physical channels with integrated support for talent, finance, compliance, and business strategy.",
        icon: "retail" as const,
        href: "/contact",
        image: "/images/service-recruitment.jpg",
        imageAlt: "Retail and e-commerce",
      },
      {
        title: "Healthcare",
        description:
          "Navigate complex regulatory requirements, strengthen internal controls, and build high-performing teams in patient-focused environments.",
        icon: "healthcare" as const,
        href: "/contact",
        image: "/images/about-3.jpg",
        imageAlt: "Healthcare",
      },
      {
        title: "Technology",
        description:
          "Support fast-growing tech companies with strategic consulting, specialized recruitment, financial governance, and risk management.",
        icon: "technology" as const,
        href: "/contact",
        image: "/images/about-4.jpg",
        imageAlt: "Technology",
      },
      {
        title: "Banking & Financial Services",
        description:
          "Strengthen regulatory compliance, internal audit, and operational resilience in an evolving financial services landscape.",
        icon: "banking" as const,
        href: "/contact",
        image: "/images/service-compliance.jpg",
        imageAlt: "Banking and financial services",
      },
      {
        title: "Education",
        description:
          "Help educational institutions improve workforce planning, operational efficiency, compliance, and governance frameworks.",
        icon: "education" as const,
        href: "/contact",
        image: "/images/about-1.jpg",
        imageAlt: "Education",
      },
      {
        title: "Real Estate & Construction",
        description:
          "Manage project complexity, financial controls, regulatory compliance, and talent needs across real estate and construction.",
        icon: "realEstate" as const,
        href: "/contact",
        image: "/images/service-consulting.jpg",
        imageAlt: "Real estate and construction",
      },
      {
        title: "Travel & Hospitality",
        description:
          "Optimize operations, manage seasonal workforce needs, and strengthen financial and compliance practices in hospitality.",
        icon: "travel" as const,
        href: "/contact",
        image: "/images/cta.jpg",
        imageAlt: "Travel and hospitality",
      },
    ],
  },
  valueBar: {
    title: "Why Partner With Inveris?",
    items: [
      {
        title: "Deep Industry Understanding",
        description:
          "We understand the unique challenges, regulations, and dynamics that shape your sector.",
        icon: "users",
        image: "",
      },
      {
        title: "Tailored Solutions",
        description:
          "Our services are customized to address the specific needs of your industry and business stage.",
        icon: "target",
        image: "",
      },
      {
        title: "Integrated Expertise",
        description:
          "Strategy, people, finance, compliance, and audit work together—not in silos.",
        icon: "network",
        image: "",
      },
      {
        title: "Measurable Impact",
        description:
          "We focus on outcomes that drive efficiency, growth, and long-term value.",
        icon: "chart",
        image: "",
      },
      {
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

export const approachContent = {
  tag: "OUR APPROACH",
  title: "A Simple, Proven Approach",
  steps: [
    {
      number: "01",
      title: "Understand",
      description:
        "We start by deeply understanding your business, challenges, and goals — not just the immediate problem.",
      icon: "search",
      image: "",
    },
    {
      number: "02",
      title: "Architect",
      description:
        "We design integrated solutions that connect strategy, operations, finance, and talent.",
      icon: "pen",
      image: "",
    },
    {
      number: "03",
      title: "Execute",
      description:
        "We work alongside your team to implement practical solutions with clear accountability.",
      icon: "play",
      image: "",
    },
    {
      number: "04",
      title: "Evolve",
      description:
        "We stay engaged as your business grows, adapting support as priorities change.",
      icon: "chart",
      image: "",
    },
  ],
};

export const approachPageContent = {
  seo: {
    title: "Our Approach",
    description:
      "Discover Inveris Solutions LLP four-step approach — Understand, Architect, Execute, and Evolve — for integrated business impact.",
  },
  hero: {
    tag: "OUR APPROACH",
    title: "A Simple, Proven Approach to Drive Meaningful Impact.",
    description:
      "We follow a clear and collaborative approach that ensures every recommendation is practical, every action is accountable, and every outcome creates lasting value.",
    image: "/images/approach-mountain.jpg",
    imageAlt: "Mountain peak above the clouds",
    pathSteps: [
      { number: "01", title: "Understand", position: "bottom-[18%] left-[8%]" },
      { number: "02", title: "Architect", position: "bottom-[38%] left-[22%]" },
      { number: "03", title: "Execute", position: "bottom-[58%] left-[38%]" },
      { number: "04", title: "Evolve", position: "bottom-[72%] right-[28%]" },
    ],
  },
  fourSteps: {
    tag: "OUR 4-STEP APPROACH",
    title: "From Insight to Impact. Together.",
    subtitle:
      "A structured yet flexible approach that adapts to your business, driving clarity, alignment, and results.",
    steps: [
      {
        number: "01",
        title: "Understand",
        description: "We start with your business, not a predefined solution.",
        icon: "search" as const,
        image: "",
        items: [
          "Structured discussions and diagnostics",
          "Identify what's working, what's not, and why",
          "Clarify goals, challenges, and opportunities",
        ],
      },
      {
        number: "02",
        title: "Architect",
        description:
          "We design a solution around your business—spanning strategy, people, processes, finance, compliance, and controls.",
        icon: "pen" as const,
        image: "",
        items: [
          "Prioritize what matters most",
          "Design practical, integrated solutions",
          "Align stakeholders and success metrics",
        ],
      },
      {
        number: "03",
        title: "Execute",
        description: "We work with your team to turn recommendations into action.",
        icon: "play" as const,
        image: "",
        items: [
          "Translate strategy into actionable initiatives",
          "Define ownership, milestones, and KPIs",
          "Drive execution with collaboration and discipline",
        ],
      },
      {
        number: "04",
        title: "Evolve",
        description: "We continuously refine and strengthen to unlock long-term value.",
        icon: "chart" as const,
        image: "",
        items: [
          "Monitor performance and results",
          "Refine processes and systems",
          "Identify next opportunities for improvement",
        ],
      },
    ],
  },
  connectedExpertise: {
    title: "Connected Expertise.",
    titleAccent: "Working Together.",
    description:
      "We look at your business as an interconnected system—where strategy, people, finance, compliance, and risk influence and strengthen each other.",
    quote: "Better connections lead to better decisions and stronger business outcomes.",
    image: "/images/logo.png",
    imageAlt: "Inveris",
    nodes: [
      {
        label: "PEOPLE",
        description: "Right talent, stronger teams",
        icon: "users" as const,
        position: "top" as const,
        align: "right" as const,
      },
      {
        label: "FINANCE",
        description: "Stronger financial practices",
        icon: "finance" as const,
        position: "top-right" as const,
        align: "right" as const,
      },
      {
        label: "COMPLIANCE",
        description: "Governance and controls",
        icon: "compliance" as const,
        position: "bottom-right" as const,
        align: "right" as const,
      },
      {
        label: "RISK",
        description: "Identify risk, build resilience",
        icon: "risk" as const,
        position: "bottom-left" as const,
        align: "left" as const,
      },
      {
        label: "STRATEGY",
        description: "Clear direction, smarter decisions",
        icon: "strategy" as const,
        position: "top-left" as const,
        align: "left" as const,
      },
    ],
  },
  cta: {
    title: "Let's Build What's Next. Together.",
    description:
      "Whether you're scaling, transforming, or solving complex business challenges—we're here to help you grow with clarity, confidence, and the right support.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
};

export const leadershipPageContent = {
  hero: {
    tag: "LEADERSHIP",
    titleWhite: "Visionaries. Builders.",
    titleAccent: "Partners in Your Growth.",
    paragraphs: [
      "Inveris was founded by professionals who saw a common challenge businesses face—managing multiple consultants, agencies, and advisors across critical functions.",
      // "They envisioned a better way: one integrated partner capable of supporting every stage of a company's growth journey.",
    ],
    image: "/images/leadership-hero.jpg",
    imageAlt: "Leadership team in boardroom overlooking city skyline",
  },
  philosophy: {
    tag: "OUR LEADERSHIP PHILOSOPHY",
    title: "Experience that connects. Leadership that delivers.",
    description:
      "With complementary expertise in strategy, finance, operations, compliance, and business expansion, our leadership team is united by a shared commitment to trust, accountability, execution, and long-term partnerships.",
    items: [
      {
        title: "Client First",
        description:
          "Every decision starts with understanding our clients' challenges and goals.",
        icon: "user" as const,
      },
      {
        title: "Integrated Thinking",
        description:
          "We connect strategy, people, finance, compliance, and risk for holistic outcomes.",
        icon: "target" as const,
      },
      {
        title: "Accountable Leadership",
        description:
          "We take ownership, stay involved, and deliver what we commit to.",
        icon: "shield" as const,
      },
      {
        title: "Long-Term Value",
        description:
          "We build relationships that go beyond projects—focused on sustainable growth.",
        icon: "chart" as const,
      },
    ],
  },
  team: {
    tag: "OUR LEADERSHIP TEAM",
    title: "The People Behind Inveris",
    members: [
      {
        name: "KRITI PAREEK",
        role: "Founding Partner",
        bio: "Kriti Pareek brings a finance-led and advisory perspective to business transformation, with experience across finance transformation, risk advisory, business consulting, compliance management, and strategic advisory. Her work focuses on helping businesses bring greater structure to the way they make financial and operational decisions. From strengthening financial frameworks and improving processes to navigating compliance and building scalable operating practices, she works closely with leadership teams to bring greater clarity and discipline to business decisions. At Inveris, Kriti leads Strategic Advisory, Management Consulting, Compliance & Financial Services, with a particular focus on helping startups and MSMEs build stronger financial and operational foundations.",
        image: "/images/leader-1.jpg",
        linkedin: "https://www.linkedin.com/in/kritti-pareek-308099144",
      },
      {
        name: "TAARUN SHARMAA",
        role: "Founding Partner",
        bio: "Taarun Sharmaa brings an entrepreneur's perspective and an execution-focused approach shaped by experience across logistics, cross-border trade, warehousing, and multi-vertical business operations. His experience gives him a practical understanding of what it takes to move a business from opportunity to execution—from identifying growth opportunities and building strategic relationships to improving operational efficiency and entering new markets. At Inveris, Taarun drives Business Growth, Operational Strategy, Client Partnerships, and Expansion Initiatives, working with organizations to translate growth opportunities into structured and actionable business plans.",
        image: "/images/leader-2.jpg",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  values: {
    tag: "WHAT DRIVES US",
    title: "Our Values. Our Compass.",
    backgroundImage: "/images/bg-leadership.jpg",
    items: [
      {
        title: "Integrity",
        description:
          "We operate with honesty, transparency, and strong ethical standards.",
        icon: "handshake" as const,
      },
      {
        title: "Collaboration",
        description:
          "We believe the best results come from working together as one team with our clients.",
        icon: "users" as const,
      },
      {
        title: "Excellence",
        description:
          "We are committed to delivering high-quality work and meaningful outcomes.",
        icon: "award" as const,
      },
      {
        title: "Innovation",
        description:
          "We challenge the status quo and bring fresh ideas to solve complex problems.",
        icon: "lightbulb" as const,
      },
      {
        title: "Growth Mindset",
        description:
          "We continuously learn, evolve, and help our clients grow with confidence.",
        icon: "mountain" as const,
      },
      {
        title: "Client Partnership",
        description:
          "We put client outcomes first—staying close, aligning to their goals, and delivering advice that creates lasting impact.",
        icon: "target" as const,
      },
    ],
  },
  cta: {
    title: "Let's Build What's Next. Together.",
    description:
      "Whether you're scaling, transforming, or solving complex business challenges—we're here to help you grow with clarity, confidence, and the right support.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
};

export const companyContact = {
  company: seoConfig.brand.legalName,
  location: seoConfig.contact.address,
  mobile: seoConfig.contact.phone,
  mobileHref: seoConfig.contact.phoneHref,
  email: seoConfig.contact.email,
  directionsUrl: seoConfig.contact.directionsUrl,
  mapEmbedUrl: seoConfig.contact.mapEmbedUrl,
};

export const contactPageContent = {
  hero: {
    tag: "CONTACT US",
    titleWhite: "Let's Build What's Next.",
    titleAccent: "Together.",
    description:
      "Have a question, a project in mind, or looking for the right expertise to solve a business challenge? We'd love to hear from you.",
    image: "/images/contact-hero.jpg",
    imageAlt: "Modern office workspace",
    trustItems: [
      {
        title: "Quick Response",
        description: "We respond within one business day.",
        icon: "phone" as const,
      },
      {
        title: "Confidential",
        description: "Your information is safe with us.",
        icon: "shield" as const,
      },
      {
        title: "No Obligation",
        description: "Start a conversation with no commitment.",
        icon: "user" as const,
      },
    ],
  },
  form: {
    title: "Send Us a Message",
    enquiryTypes: [
      "General Inquiry",
      "Management Consulting",
      "Recruitment",
      "Compliance & Financial Services",
      "Internal Audit",
      "Partnership Opportunity",
    ],
  },
  contactInfo: {
    title: "Get in Touch",
    items: [
      {
        title: "Email Us",
        value: companyContact.email,
        href: `mailto:${companyContact.email}`,
        icon: "mail" as const,
      },
      {
        title: "Call Us",
        value: companyContact.mobile,
        href: companyContact.mobileHref,
        icon: "phone" as const,
      },
      {
        title: "Our Office",
        value: `${companyContact.company}, ${companyContact.location}`,
        icon: "map" as const,
      },
      {
        title: "Business Hours",
        value: businessHoursLabel,
        icon: "clock" as const,
      },
    ],
  },
  office: {
    title: "Our Office",
    subtitle: "We'd love to meet you in person.",
    company: companyContact.company,
    address: companyContact.location,
    directionsUrl: companyContact.directionsUrl,
    mapEmbedUrl: companyContact.mapEmbedUrl,
  },
  faq: {
    title: "Frequently asked questions",
    stillHaveQuestions: "Still have questions?",
    ctaLabel: "Get in Touch",
    avatars: [
      "https://i.pravatar.cc/120?img=12",
      "https://i.pravatar.cc/120?img=25",
      "https://i.pravatar.cc/120?img=47",
    ],
    items: [
      {
        question: "What services does Inveris provide?",
        answer:
          "We offer integrated business solutions across Management Consulting, Recruitment, Compliance & Financial Services, and Internal Audit—all under one accountable partnership.",
      },
      {
        question: "How quickly will I receive a response?",
        answer:
          "We aim to respond to all enquiries within one business day. For urgent matters, please call us directly.",
      },
      {
        question: "Do you work with startups and established businesses?",
        answer:
          "Yes. We support businesses at every stage—from early growth to enterprise scale—tailoring our approach to your current needs and goals.",
      },
      {
        question: "Which industries do you serve?",
        answer:
          "We work across manufacturing, healthcare, technology, financial services, retail, education, real estate, and more. Visit our Industries page for the full list.",
      },
      {
        question: "How does your integrated partnership model work?",
        answer:
          "Instead of managing multiple vendors, you work with one partner who coordinates consulting, talent, compliance, and audit under a unified engagement.",
      },
      {
        question: "Is there a fee for an initial consultation?",
        answer:
          "Initial conversations are complimentary. We'll discuss your needs and recommend the best path forward with no obligation.",
      },
    ],
  },
};

export const ctaContent = {
  title: "Let's Build What's Next",
  description:
    "Whether you're scaling, restructuring, or strengthening compliance — we're ready to be your integrated partner.",
  cta: { label: "Start a Conversation", href: "/contact" },
  image: "/images/cta.jpg",
  imageAlt: "Inveris branded workspace",
};

export const footerContent = {
  companyName: "Inveris Solutions",
  description:
    "Integrated business solutions across consulting, recruitment, compliance, and audit.",
  links: [
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Leadership", href: "/leadership" },
        { label: "Our Approach", href: "/approach" },
        { label: "Industries", href: "/industries" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Management Consulting", href: "/services" },
        { label: "Recruitment", href: "/services" },
        { label: "Compliance & Financial", href: "/services" },
        { label: "Internal Audit", href: "/services" },
      ],
    },
  ],
  contact: {
    title: "Contact",
    location: companyContact.location,
    mobile: companyContact.mobile,
    mobileHref: companyContact.mobileHref,
    email: companyContact.email,
    social: [
      { label: "Instagram", href: seoConfig.social.instagram, icon: "instagram" as const },
      { label: "LinkedIn", href: seoConfig.social.linkedin, icon: "linkedin" as const },
    ],
  },
  copyright: `© ${new Date().getFullYear()} Inveris Solutions LLP. All rights reserved.`,
};

export const careersPageContent = {
  hero: {
    tag: "CAREERS",
    titleWhite: "Talent That Thinks.",
    titleAccent: "People Who Execute.",
    description:
      "At Inveris, we believe great work comes from people who think differently, take ownership, and turn ideas into action.",
    image: "/images/service-recruitment.jpg",
    imageAlt: "Professionals collaborating in a modern workspace",
    cta: { label: "Join Our Talent Network", href: "/careers/opportunities" },
  },
  intro: {
    statement:
      "We bring individuals together from diverse backgrounds who are comfortable navigating complexity, challenging conventional thinking, and turning business problems into practical solutions.",
  },
  expect: {
    tag: "LIFE AT INVERIS",
    title: "What You Can Expect",
    items: [
      {
        title: "Meaningful Work",
        description:
          "Work on projects that directly contribute to business growth and transformation.",
        icon: "briefcase" as const,
      },
      {
        title: "Cross-Functional Exposure",
        description:
          "Understand how strategy, operations, talent, finance, and compliance come together to shape a business.",
        icon: "network" as const,
      },
      {
        title: "A Culture of Ownership",
        description:
          "We value initiative, accountability, and people who take their work from idea to execution.",
        icon: "handshake" as const,
      },
      {
        title: "Continuous Growth",
        description:
          "Build new skills, take on new challenges, and grow with every engagement.",
        icon: "growth" as const,
      },
    ],
  },
  network: {
    tag: "JOIN OUR TALENT NETWORK",
    title: "Let's Stay Connected.",
    description:
      "Share your details and tell us where you see yourself contributing at Inveris. When a relevant opportunity comes up, our team can connect with you.",
    formTitle: "Tell Us About Yourself",
    interestOptions: [
      "Management Consulting",
      "Business Strategy & Growth",
      "Recruitment & Talent Acquisition",
      "Finance & Accounting",
      "Compliance",
      "Internal Audit & Risk",
      "Business Operations",
      "Other",
    ],
    experienceOptions: ["Fresher", "0–2 Years", "2–5 Years", "5–10 Years", "10+ Years"],
    submitLabel: "Submit Application",
  },
  next: {
    title: "What Happens Next?",
    description:
      "Once we receive your profile, our team will review your information and reach out if your experience aligns with a current or upcoming opportunity at Inveris.",
    steps: [
      {
        title: "Share your profile",
        description: "Send your details through the form, or email us at hr@inverissolutions.com.",
      },
      {
        title: "We review with care",
        description: "Our team looks at your experience, skills, and where you could contribute.",
      },
      {
        title: "We connect when it fits",
        description: "If your background aligns with a current or upcoming role, we will reach out.",
      },
    ],
  },
  faq: {
    tag: "FREQUENTLY ASKED QUESTIONS",
    title: "Have Questions? We Have Answers.",
    items: [
      {
        question: "What does Inveris Solutions do?",
        answer:
          "Inveris Solutions is an integrated business solutions partner providing support across Management Consulting, Recruitment, Compliance & Financial Services, and Internal Audit. We bring these capabilities together to help businesses address interconnected challenges through one accountable partnership.",
      },
      {
        question: "Who does Inveris work with?",
        answer:
          "We work with startups, MSMEs, growing businesses, and enterprises across a range of industries. Our approach is tailored to the organization's size, business model, challenges, and stage of growth.",
      },
      {
        question: "What makes Inveris different from a traditional consulting firm?",
        answer:
          "We go beyond providing recommendations. Our approach combines strategy with practical execution, bringing together expertise across multiple business functions rather than treating each challenge in isolation.",
      },
      {
        question: "Can I engage Inveris for a specific service?",
        answer:
          "Yes. While our strength lies in integrated solutions, businesses can engage us for specific requirements across consulting, recruitment, finance, compliance, internal audit, or business growth.",
      },
      {
        question: "How do you typically start working with a new client?",
        answer:
          "We begin by understanding your business, current challenges, priorities, and objectives. Based on this assessment, we identify the relevant areas of support and develop an approach tailored to your requirements.",
      },
      {
        question: "Do you work on long-term engagements?",
        answer:
          "Yes. We aim to build long-term partnerships rather than limiting our involvement to one-off projects. As a business evolves, we continue to identify opportunities to improve, strengthen, and scale.",
      },
      {
        question: "Do you work with businesses across different industries?",
        answer:
          "Yes. Our experience spans industries including Manufacturing, Technology & IT, Healthcare, Retail & E-Commerce, Financial Services, Professional Services, Real Estate, Hospitality, and Education, among others.",
      },
      {
        question: "How can I get started with Inveris?",
        answer:
          "Simply reach out to our team through the Contact Us section. Tell us about your business and the challenge you are looking to solve, and our team will connect with you to discuss the next steps.",
      },
    ],
  },
  cta: {
    title: "Build your career. Build with Inveris.",
    description:
      "If you're curious, driven, and excited by the idea of building something meaningful, we'd love to hear from you.",
    cta: { label: "Join Our Talent Network", href: "/careers/opportunities" },
  },
  opportunities: {
    title: "Current opportunities",
    emptyMessage: "No job openings for now.",
    hero: {
      tag: "CAREERS",
      titleWhite: "Talent That Thinks.",
      titleAccent: "People Who Execute.",
      description:
        "At Inveris, we believe great work comes from people who think differently, take ownership, and turn ideas into action.",
      image: "/images/service-recruitment.jpg",
      imageAlt: "Professionals collaborating in a modern workspace",
      cta: { label: "Join Our Talent Network", href: "#current-opportunities" },
    },
    items: [],
  },
};

export const aboutPageContent = {
  hero: {
    tag: "ABOUT US",
    title: "One Partner. Integrated Business Solutions.",
    description:
      "We bring the right expertise together across strategy, people, operations, finance, compliance, and risk—so your business moves forward with clarity, alignment, and confidence.",
    image: "/images/about-hero.jpg",
    imageAlt: "Modern conference room overlooking city skyline",
  },
  whoWeAre: {
    tag: "WHO WE ARE",
    title: "Integrated Expertise. Unified Purpose.",
    paragraphs: [
      "At Inveris Solutions LLP, we believe businesses should not have to navigate growth by managing multiple service providers across critical functions.",
      "As businesses grow, their challenges become increasingly interconnected—hiring the right talent, improving operations, managing finances and compliance, and strengthening internal controls all play a role in business performance.",
      "Inveris brings these capabilities together under one integrated partnership, combining Recruitment Services, Management Consulting, Compliance & Financial Services, and Internal Audit to provide businesses with coordinated support across their critical functions.",
    ],
    highlightPhrase: "Inveris brings these capabilities together",
    cta: { label: "Our Services", href: "/services" },
    image: "/images/about-building.jpg",
    imageAlt: "Modern glass office building",
    card: {
      title: "One Partner. Total Business Coverage.",
      description:
        "Our approach is built around a simple idea: when different business functions work with a common understanding of the organization, decisions become more connected, execution becomes more coordinated, and leadership has greater clarity and accountability.",
    },
  },
  missionVision: {
    tag: "MISSION & VISION",
    title: "What we stand for, and where we're going.",
    backgroundImage: "/images/about-building.jpg",
    mission: {
      tag: "OUR MISSION",
      title: "Simplifying Business Support. Strengthening Business Growth.",
      icon: "target" as const,
      items: [
        "Make it easier for businesses to access the expertise they need to operate, grow, and evolve.",
        "Bring recruitment, consulting, compliance, financial services, and internal audit together under one integrated engagement.",
        "Reduce fragmentation, improve coordination, and create greater accountability across critical business functions.",
        "Deliver practical, business-focused support that helps organizations make informed decisions, improve operational efficiency, strengthen their foundations, and move forward with greater confidence.",
      ],
      footer: {
        icon: "diamond" as const,
        prefix: "Our goal is simple:",
        highlight: "make business support more connected, more accountable, and more effective.",
      },
    },
    vision: {
      tag: "OUR VISION",
      title: "Building a More Connected Way to Grow.",
      icon: "eye" as const,
      items: [
        "Be a trusted business solutions partner for organizations navigating growth, transformation, and increasing operational complexity.",
        "Provide diverse expertise without the complexity of managing fragmented relationships.",
        "Create a model where strategy, people, finance, compliance, and risk work together—not in isolation.",
        "Help businesses build stronger foundations, make better-informed decisions, and create the operational discipline required for sustainable growth.",
      ],
      footer: {
        icon: "chart" as const,
        text: "To be the partner businesses turn to when they need the clarity to decide, the expertise to execute, and the foundation to grow.",
      },
    },
  },
  cta: {
    title: "Let's Build What's Next. Together.",
    description:
      "Whether you're scaling, transforming, or solving complex business challenges—we're here to help you grow with clarity, confidence, and the right support.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
};
