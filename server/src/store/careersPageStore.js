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

function normalizeCareersContent(content) {
  const cleaned = withoutOpportunity(content);
  if (!cleaned || typeof cleaned !== "object") return cleaned;
  return {
    ...cleaned,
    faq: normalizeFaq(cleaned.faq),
  };
}

async function readCareersPage() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultCareers } },
    { new: true, upsert: true }
  ).lean();
  return normalizeCareersContent(doc.content);
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
