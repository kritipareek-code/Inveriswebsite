const defaultCareers = {
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
        id: "expect-1",
        title: "Meaningful Work",
        description:
          "Work on projects that directly contribute to business growth and transformation.",
        icon: "briefcase",
      },
      {
        id: "expect-2",
        title: "Cross-Functional Exposure",
        description:
          "Understand how strategy, operations, talent, finance, and compliance come together to shape a business.",
        icon: "network",
      },
      {
        id: "expect-3",
        title: "A Culture of Ownership",
        description:
          "We value initiative, accountability, and people who take their work from idea to execution.",
        icon: "handshake",
      },
      {
        id: "expect-4",
        title: "Continuous Growth",
        description:
          "Build new skills, take on new challenges, and grow with every engagement.",
        icon: "growth",
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
        id: "next-1",
        title: "Share your profile",
        description: "Send your details through the form, or email us at hr@inverissolutions.com.",
      },
      {
        id: "next-2",
        title: "We review with care",
        description: "Our team looks at your experience, skills, and where you could contribute.",
      },
      {
        id: "next-3",
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
        id: "careers-faq-1",
        question: "What does Inveris Solutions do?",
        answer:
          "Inveris Solutions is an integrated business solutions partner providing support across Management Consulting, Recruitment, Compliance & Financial Services, and Internal Audit. We bring these capabilities together to help businesses address interconnected challenges through one accountable partnership.",
      },
      {
        id: "careers-faq-2",
        question: "Who does Inveris work with?",
        answer:
          "We work with startups, MSMEs, growing businesses, and enterprises across a range of industries. Our approach is tailored to the organization's size, business model, challenges, and stage of growth.",
      },
      {
        id: "careers-faq-3",
        question: "What makes Inveris different from a traditional consulting firm?",
        answer:
          "We go beyond providing recommendations. Our approach combines strategy with practical execution, bringing together expertise across multiple business functions rather than treating each challenge in isolation.",
      },
      {
        id: "careers-faq-4",
        question: "Can I engage Inveris for a specific service?",
        answer:
          "Yes. While our strength lies in integrated solutions, businesses can engage us for specific requirements across consulting, recruitment, finance, compliance, internal audit, or business growth.",
      },
      {
        id: "careers-faq-5",
        question: "How do you typically start working with a new client?",
        answer:
          "We begin by understanding your business, current challenges, priorities, and objectives. Based on this assessment, we identify the relevant areas of support and develop an approach tailored to your requirements.",
      },
      {
        id: "careers-faq-6",
        question: "Do you work on long-term engagements?",
        answer:
          "Yes. We aim to build long-term partnerships rather than limiting our involvement to one-off projects. As a business evolves, we continue to identify opportunities to improve, strengthen, and scale.",
      },
      {
        id: "careers-faq-7",
        question: "Do you work with businesses across different industries?",
        answer:
          "Yes. Our experience spans industries including Manufacturing, Technology & IT, Healthcare, Retail & E-Commerce, Financial Services, Professional Services, Real Estate, Hospitality, and Education, among others.",
      },
      {
        id: "careers-faq-8",
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

module.exports = { defaultCareers };
