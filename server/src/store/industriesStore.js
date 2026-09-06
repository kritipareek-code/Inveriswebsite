const SiteContent = require("../models/SiteContent");
const { defaultIndustries } = require("../data/defaultIndustries");

const KEY = "industries";

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function mergeIndustries(stored) {
  const data = asObject(stored);
  const hero = asObject(data.hero);
  const weServe = asObject(data.industriesWeServe);
  const valueBar = asObject(data.valueBar);
  const cta = asObject(data.cta);
  const seo = asObject(data.seo);

  return {
    seo: { ...defaultIndustries.seo, ...seo },
    hero: { ...defaultIndustries.hero, ...hero },
    industriesWeServe: {
      ...defaultIndustries.industriesWeServe,
      ...weServe,
      industries: Array.isArray(weServe.industries)
        ? weServe.industries.map((industry, index) => ({
            imageAlt: industry?.title || "",
            ...(defaultIndustries.industriesWeServe.industries[index] || {}),
            ...asObject(industry),
          }))
        : defaultIndustries.industriesWeServe.industries,
    },
    valueBar: {
      ...defaultIndustries.valueBar,
      ...valueBar,
      items: Array.isArray(valueBar.items)
        ? valueBar.items.map((item, index) => ({
            image: "",
            ...(defaultIndustries.valueBar.items[index] || {}),
            ...asObject(item),
          }))
        : defaultIndustries.valueBar.items,
    },
    cta: {
      ...defaultIndustries.cta,
      ...cta,
      cta: { ...defaultIndustries.cta.cta, ...asObject(cta.cta) },
    },
  };
}

async function readIndustries() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultIndustries } },
    { new: true, upsert: true }
  ).lean();
  return mergeIndustries(doc.content);
}

async function writeIndustries(content) {
  const merged = mergeIndustries(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: merged },
    { new: true, upsert: true }
  ).lean();
  return mergeIndustries(doc.content);
}

async function resetIndustries() {
  return writeIndustries(defaultIndustries);
}

module.exports = { readIndustries, writeIndustries, resetIndustries };
