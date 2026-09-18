const SiteContent = require("../models/SiteContent");
const { defaultCareers } = require("../data/defaultCareers");

const KEY = "careers";

function withoutOpportunity(content) {
  if (!content || typeof content !== "object") return content;
  const { opportunity: _removed, ...rest } = content;
  return rest;
}

function normalizeFaq(faq) {
  if (!faq || typeof faq !== "object") return faq;
  return {
    tag: faq.tag,
    title: faq.title,
    items: Array.isArray(faq.items) ? faq.items : [],
  };
}

function normalizeHero(hero, fallback) {
  const source = hero && typeof hero === "object" ? hero : {};
  const cta = source.cta && typeof source.cta === "object" ? source.cta : {};
  return {
    tag: typeof source.tag === "string" ? source.tag : fallback.tag,
    titleWhite: typeof source.titleWhite === "string" ? source.titleWhite : fallback.titleWhite,
    titleAccent: typeof source.titleAccent === "string" ? source.titleAccent : fallback.titleAccent,
    description:
      typeof source.description === "string" ? source.description : fallback.description,
    image: typeof source.image === "string" ? source.image : fallback.image,
    imageAlt: typeof source.imageAlt === "string" ? source.imageAlt : fallback.imageAlt,
    cta: {
      label: typeof cta.label === "string" ? cta.label : fallback.cta.label,
      href: typeof cta.href === "string" && cta.href ? cta.href : fallback.cta.href,
    },
  };
}

function isLegacyOpportunitiesHero(hero) {
  return (
    hero?.titleWhite === "Talent That Thinks." &&
    hero?.titleAccent === "People Who Execute."
  );
}

function normalizeOpportunities(opportunities) {
  if (!opportunities || typeof opportunities !== "object") return opportunities;
  const defaults = defaultCareers.opportunities;
  const fallbackHero = defaults?.hero || defaultCareers.hero;
  const hero = normalizeHero(opportunities.hero, fallbackHero);
  const title =
    !opportunities.title || opportunities.title === "Current opportunities"
      ? defaults.title
      : opportunities.title;
  const emptyMessage =
    typeof opportunities.emptyMessage === "string" &&
    opportunities.emptyMessage.trim() &&
    opportunities.emptyMessage !== "No job openings for now."
      ? opportunities.emptyMessage
      : defaults.emptyMessage;

  return {
    title,
    emptyMessage,
    hero: isLegacyOpportunitiesHero(hero)
      ? {
          ...hero,
          tag: fallbackHero.tag,
          titleWhite: fallbackHero.titleWhite,
          titleAccent: fallbackHero.titleAccent,
          description: fallbackHero.description,
          cta: { ...fallbackHero.cta },
        }
      : hero,
    items: Array.isArray(opportunities.items)
      ? opportunities.items.map((item, index) => ({
          id: item?.id || `opportunity-${index + 1}`,
          title: typeof item?.title === "string" ? item.title : "",
          location: typeof item?.location === "string" ? item.location : "",
          lineOfService: typeof item?.lineOfService === "string" ? item.lineOfService : "",
          applyHref: typeof item?.applyHref === "string" ? item.applyHref : "",
        }))
      : [],
  };
}

function normalizeCareersContent(content) {
  const cleaned = withoutOpportunity(content);
  if (!cleaned || typeof cleaned !== "object") return cleaned;
  return {
    ...cleaned,
    faq: normalizeFaq(cleaned.faq),
    opportunities: normalizeOpportunities(cleaned.opportunities) ?? defaultCareers.opportunities,
  };
}

function opportunitiesNeedPersist(stored, normalized) {
  const storedOpp = stored?.opportunities;
  const nextOpp = normalized?.opportunities;
  if (!storedOpp || !nextOpp) return false;
  return (
    storedOpp.title !== nextOpp.title ||
    storedOpp.emptyMessage !== nextOpp.emptyMessage ||
    storedOpp.hero?.tag !== nextOpp.hero?.tag ||
    storedOpp.hero?.titleWhite !== nextOpp.hero?.titleWhite ||
    storedOpp.hero?.titleAccent !== nextOpp.hero?.titleAccent ||
    storedOpp.hero?.description !== nextOpp.hero?.description ||
    storedOpp.hero?.cta?.label !== nextOpp.hero?.cta?.label
  );
}

async function readCareersPage() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultCareers } },
    { new: true, upsert: true }
  ).lean();
  const normalized = normalizeCareersContent(doc.content);
  if (opportunitiesNeedPersist(doc.content, normalized)) {
    return writeCareersPage(normalized);
  }
  return normalized;
}

async function writeCareersPage(content) {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: normalizeCareersContent(content) },
    { new: true, upsert: true }
  ).lean();
  return normalizeCareersContent(doc.content);
}

async function resetCareersPage() {
  return writeCareersPage(defaultCareers);
}

module.exports = { readCareersPage, writeCareersPage, resetCareersPage };
