const SiteContent = require("../models/SiteContent");
const { defaultApproach } = require("../data/defaultApproach");

const KEY = "approach";

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function mergeApproach(stored) {
  const data = asObject(stored);
  const hero = asObject(data.hero);
  const fourSteps = asObject(data.fourSteps);
  const connected = asObject(data.connectedExpertise);
  const cta = asObject(data.cta);
  const seo = asObject(data.seo);

  return {
    seo: { ...defaultApproach.seo, ...seo },
    hero: {
      ...defaultApproach.hero,
      ...hero,
      pathSteps: Array.isArray(hero.pathSteps)
        ? hero.pathSteps
        : defaultApproach.hero.pathSteps,
    },
    fourSteps: {
      ...defaultApproach.fourSteps,
      ...fourSteps,
      steps: Array.isArray(fourSteps.steps)
        ? fourSteps.steps.map((step, index) => ({
            image: "",
            ...(defaultApproach.fourSteps.steps[index] || {}),
            ...asObject(step),
            items: Array.isArray(step?.items) ? step.items : [],
          }))
        : defaultApproach.fourSteps.steps,
    },
    connectedExpertise: {
      ...defaultApproach.connectedExpertise,
      ...connected,
      nodes: Array.isArray(connected.nodes)
        ? connected.nodes
        : defaultApproach.connectedExpertise.nodes,
    },
    cta: {
      ...defaultApproach.cta,
      ...cta,
      cta: { ...defaultApproach.cta.cta, ...asObject(cta.cta) },
    },
  };
}

async function readApproach() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultApproach } },
    { new: true, upsert: true }
  ).lean();
  return mergeApproach(doc.content);
}

async function writeApproach(content) {
  const merged = mergeApproach(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: merged },
    { new: true, upsert: true }
  ).lean();
  return mergeApproach(doc.content);
}

async function resetApproach() {
  return writeApproach(defaultApproach);
}

module.exports = { readApproach, writeApproach, resetApproach };
