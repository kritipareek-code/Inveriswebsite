const defaultApproach = {
  hero: {
    tag: "OUR APPROACH",
    title: "A Simple, Proven Approach to Drive Meaningful Impact.",
    description:
      "We follow a clear and collaborative approach that ensures every recommendation is practical, every action is accountable, and every outcome creates lasting value.",
    image: "/images/approach-mountain.jpg",
    imageAlt: "Mountain peak above the clouds",
    pathSteps: [
      {
        id: "path-1",
        number: "01",
        title: "Understand",
        position: "bottom-[18%] left-[8%]",
      },
      {
        id: "path-2",
        number: "02",
        title: "Architect",
        position: "bottom-[38%] left-[22%]",
      },
      {
        id: "path-3",
        number: "03",
        title: "Execute",
        position: "bottom-[58%] left-[38%]",
      },
      {
        id: "path-4",
        number: "04",
        title: "Evolve",
        position: "bottom-[72%] right-[28%]",
      },
    ],
  },
  fourSteps: {
    tag: "OUR 4-STEP APPROACH",
    title: "From Insight to Impact. Together.",
    subtitle:
      "A structured yet flexible approach that adapts to your business, driving clarity, alignment, and results.",
    steps: [
      {
        id: "step-1",
        number: "01",
        title: "Understand",
        description: "We start with your business, not a predefined solution.",
        icon: "search",
        items: [
          "Structured discussions and diagnostics",
          "Identify what's working, what's not, and why",
          "Clarify goals, challenges, and opportunities",
        ],
      },
      {
        id: "step-2",
        number: "02",
        title: "Architect",
        description:
          "We design a solution around your business—spanning strategy, people, processes, finance, compliance, and controls.",
        icon: "pen",
        items: [
          "Prioritize what matters most",
          "Design practical, integrated solutions",
          "Align stakeholders and success metrics",
        ],
      },
      {
        id: "step-3",
        number: "03",
        title: "Execute",
        description: "We work with your team to turn recommendations into action.",
        icon: "play",
        items: [
          "Translate strategy into actionable initiatives",
          "Define ownership, milestones, and KPIs",
          "Drive execution with collaboration and discipline",
        ],
      },
      {
        id: "step-4",
        number: "04",
        title: "Evolve",
        description: "We continuously refine and strengthen to unlock long-term value.",
        icon: "chart",
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
    nodes: [
      {
        id: "node-1",
        label: "PEOPLE",
        description: "Right talent, stronger teams",
        icon: "users",
        position: "top",
        align: "right",
      },
      {
        id: "node-2",
        label: "FINANCE",
        description: "Stronger financial practices",
        icon: "finance",
        position: "top-right",
        align: "right",
      },
      {
        id: "node-3",
        label: "COMPLIANCE",
        description: "Governance and controls",
        icon: "compliance",
        position: "bottom-right",
        align: "right",
      },
      {
        id: "node-4",
        label: "RISK",
        description: "Identify risk, build resilience",
        icon: "risk",
        position: "bottom-left",
        align: "left",
      },
      {
        id: "node-5",
        label: "STRATEGY",
        description: "Clear direction, smarter decisions",
        icon: "strategy",
        position: "top-left",
        align: "left",
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

module.exports = { defaultApproach };
