const SiteContent = require("../models/SiteContent");
const { defaultServices } = require("../data/defaultServices");

const KEY = "services";

function normalizeServices(content) {
  if (!content || typeof content !== "object") return defaultServices;
  if (content.consultingCall) return content;
  const { whyItMatters: _removed, ...rest } = content;
  return { ...rest, consultingCall: defaultServices.consultingCall };
}

async function readServices() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultServices } },
    { new: true, upsert: true }
  ).lean();
  return normalizeServices(doc.content);
}

async function writeServices(content) {
  const normalized = normalizeServices(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: normalized },
    { new: true, upsert: true }
  ).lean();
  return doc.content;
}

async function resetServices() {
  return writeServices(defaultServices);
}

module.exports = { readServices, writeServices, resetServices };
