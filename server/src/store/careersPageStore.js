const SiteContent = require("../models/SiteContent");
const { defaultCareers } = require("../data/defaultCareers");

const KEY = "careers";

async function readCareersPage() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultCareers } },
    { new: true, upsert: true }
  ).lean();
  return doc.content;
}

async function writeCareersPage(content) {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content },
    { new: true, upsert: true }
  ).lean();
  return doc.content;
}

async function resetCareersPage() {
  return writeCareersPage(defaultCareers);
}

module.exports = { readCareersPage, writeCareersPage, resetCareersPage };
