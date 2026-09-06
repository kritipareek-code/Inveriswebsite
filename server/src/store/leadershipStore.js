const SiteContent = require("../models/SiteContent");
const { defaultLeadership } = require("../data/defaultLeadership");

const KEY = "leadership";

function withSixthValue(content) {
  if (!content?.values || !Array.isArray(content.values.items)) return content;

  const fallback = defaultLeadership.values;
  const items = content.values.items;
  const hasSixth =
    items.length >= 6 ||
    items.some(
      (item) =>
        item?.id === "value-6" || /client partnership/i.test(item?.title || "")
    );

  return {
    ...content,
    values: {
      ...content.values,
      backgroundImage:
        !content.values.backgroundImage ||
        String(content.values.backgroundImage).includes("about-building.jpg")
          ? fallback.backgroundImage
          : content.values.backgroundImage,
      items: hasSixth ? items : [...items, fallback.items[5]],
    },
  };
}

async function readLeadership() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultLeadership } },
    { new: true, upsert: true }
  ).lean();
  return withSixthValue(doc.content);
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
