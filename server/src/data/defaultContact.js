const { companyContact } = require("./companyContact");

const defaultContact = {
  hero: {
    tag: "CONTACT US",
    titleWhite: "Let's Build What's Next.",
    titleAccent: "Together.",
    description:
      "Have a question, a project in mind, or looking for the right expertise to solve a business challenge? We'd love to hear from you.",
    image: "/images/contact-hero.jpg",
    imageAlt: "Modern office workspace",
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
    emails: [
      {
        id: "email-1",
        label: "Email Us",
        value: companyContact.email,
        href: `mailto:${companyContact.email}`,
      },
    ],
    phones: [
      {
        id: "phone-1",
        label: "Call Us",
        value: companyContact.mobile,
        href: companyContact.mobileHref,
      },
    ],
    addresses: [
      {
        id: "address-1",
        label: "Our Office",
        company: companyContact.company,
        value: companyContact.location,
      },
    ],
    businessHours: "Monday – Friday, 11:00 AM – 7:00 PM IST\nSat–Sun closed.",
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
        id: "faq-1",
        question: "What services does Inveris provide?",
        answer:
          "We offer integrated business solutions across Management Consulting, Recruitment, Compliance & Financial Services, and Internal Audit—all under one accountable partnership.",
      },
      {
        id: "faq-2",
        question: "How quickly will I receive a response?",
        answer:
          "We aim to respond to all enquiries within one business day. For urgent matters, please call us directly.",
      },
      {
        id: "faq-3",
        question: "Do you work with startups and established businesses?",
        answer:
          "Yes. We support businesses at every stage—from early growth to enterprise scale—tailoring our approach to your current needs and goals.",
      },
      {
        id: "faq-4",
        question: "Which industries do you serve?",
        answer:
          "We work across manufacturing, healthcare, technology, financial services, retail, education, real estate, and more. Visit our Industries page for the full list.",
      },
      {
        id: "faq-5",
        question: "How does your integrated partnership model work?",
        answer:
          "Instead of managing multiple vendors, you work with one partner who coordinates consulting, talent, compliance, and audit under a unified engagement.",
      },
      {
        id: "faq-6",
        question: "Is there a fee for an initial consultation?",
        answer:
          "Initial conversations are complimentary. We'll discuss your needs and recommend the best path forward with no obligation.",
      },
    ],
  },
};

module.exports = { defaultContact };
