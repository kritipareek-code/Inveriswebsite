const SiteContent = require("../models/SiteContent");
const { defaultLeadership } = require("../data/defaultLeadership");

const KEY = "leadership";

async function readLeadership() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultLeadership } },
    { new: true, upsert: true }
  ).lean();
  return doc.content;
}

async function writeLeadership(content) {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content },
    { new: true, upsert: true }
  ).lean();
  return doc.content;
}

async function resetLeadership() {
  return writeLeadership(defaultLeadership);
}

module.exports = { readLeadership, writeLeadership, resetLeadership };
