const SiteContent = require("../models/SiteContent");
const { defaultHome } = require("../data/defaultHome");

const KEY = "home";

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function mergeHome(stored) {
  const data = asObject(stored);
  const hero = asObject(data.hero);
  const about = asObject(data.about);
  const services = asObject(data.services);
  const approach = asObject(data.approach);
  const cta = asObject(data.cta);
  const seo = asObject(data.seo);

  return {
    seo: { ...defaultHome.seo, ...seo },
    hero: {
      ...defaultHome.hero,
      ...hero,
      primaryCta: { ...defaultHome.hero.primaryCta, ...asObject(hero.primaryCta) },
      secondaryCta: { ...defaultHome.hero.secondaryCta, ...asObject(hero.secondaryCta) },
    },
    valueBarTitle: typeof data.valueBarTitle === "string" ? data.valueBarTitle : defaultHome.valueBarTitle,
    valuePropositions: Array.isArray(data.valuePropositions)
      ? data.valuePropositions.map((item, index) => ({
          image: "",
          ...(defaultHome.valuePropositions[index] || {}),
          ...asObject(item),
        }))
      : defaultHome.valuePropositions,
    about: {
      ...defaultHome.about,
      ...about,
      cta: { ...defaultHome.about.cta, ...asObject(about.cta) },
      features: Array.isArray(about.features)
        ? about.features.map((item, index) => ({
            imageAlt: item?.title || "",
            ...(defaultHome.about.features[index] || {}),
            ...asObject(item),
          }))
        : defaultHome.about.features,
    },
    services: {
      ...defaultHome.services,
      ...services,
      services: Array.isArray(services.services)
        ? services.services.map((item, index) => ({
            imageAlt: item?.title || "",
            linkLabel: "Learn More",
            ...(defaultHome.services.services[index] || {}),
            ...asObject(item),
            items: Array.isArray(item?.items) ? item.items : [],
          }))
        : defaultHome.services.services,
    },
    approach: {
      ...defaultHome.approach,
      ...approach,
      steps: Array.isArray(approach.steps)
        ? approach.steps.map((item, index) => ({
            image: "",
            ...(defaultHome.approach.steps[index] || {}),
            ...asObject(item),
          }))
        : defaultHome.approach.steps,
    },
    cta: {
      ...defaultHome.cta,
      ...cta,
      cta: { ...defaultHome.cta.cta, ...asObject(cta.cta) },
    },
  };
}

async function readHome() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultHome } },
    { new: true, upsert: true }
  ).lean();
  return mergeHome(doc.content);
}

async function writeHome(content) {
  const merged = mergeHome(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: merged },
    { new: true, upsert: true }
  ).lean();
  return mergeHome(doc.content);
}

async function resetHome() {
  return writeHome(defaultHome);
}

module.exports = { readHome, writeHome, resetHome };
