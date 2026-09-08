const defaultFooter = {
  companyName: "Inveris Solutions",
  description:
    "Integrated business solutions across consulting, recruitment, compliance, and audit.",
  links: [
    {
      id: "link-group-1",
      title: "Company",
      items: [
        { id: "link-1", label: "About", href: "/about" },
        { id: "link-2", label: "Leadership", href: "/leadership" },
        { id: "link-3", label: "Our Approach", href: "/approach" },
        { id: "link-4", label: "Industries", href: "/industries" },
        { id: "link-9", label: "Careers", href: "/careers" },
      ],
    },
    {
      id: "link-group-2",
      title: "Services",
      items: [
        { id: "link-5", label: "Management Consulting", href: "/services" },
        { id: "link-6", label: "Recruitment", href: "/services" },
        { id: "link-7", label: "Compliance & Financial", href: "/services" },
        { id: "link-8", label: "Internal Audit", href: "/services" },
      ],
    },
  ],
  contact: {
    title: "Contact",
    location: "Gurugram, Haryana, India",
    mobile: "+91 99695 34628",
    email: "kriti.pareek@inverissolutions.com",
    social: [
      {
        id: "social-1",
        label: "Instagram",
        href: "https://www.instagram.com/inverissolutions",
        icon: "instagram",
      },
      {
        id: "social-2",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/inveris-solutions-llp/",
        icon: "linkedin",
      },
    ],
  },
  copyright: "© 2026 Inveris Solutions LLP. All rights reserved.",
};

module.exports = { defaultFooter };
