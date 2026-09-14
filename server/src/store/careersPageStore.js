const SiteContent = require("../models/SiteContent");
const { defaultCareers } = require("../data/defaultCareers");

const KEY = "careers";

function withoutOpportunity(content) {
  if (!content || typeof content !== "object") return content;
  const { opportunity: _removed, ...rest } = content;
  return rest;
}

async function readCareersPage() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultCareers } },
    { new: true, upsert: true }
  ).lean();
  return withoutOpportunity(doc.content);
}

async function writeCareersPage(content) {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: withoutOpportunity(content) },
    { new: true, upsert: true }
  ).lean();
  return withoutOpportunity(doc.content);
}

async function resetCareersPage() {
  return writeCareersPage(defaultCareers);
}

module.exports = { readCareersPage, writeCareersPage, resetCareersPage };
