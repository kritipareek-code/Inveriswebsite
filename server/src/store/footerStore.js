const SiteContent = require("../models/SiteContent");
const { defaultFooter } = require("../data/defaultFooter");

const KEY = "footer";

function withoutYouTube(content) {
  if (!content?.contact?.social) return content;
  return {
    ...content,
    contact: {
      ...content.contact,
      social: content.contact.social.filter(
        (item) => item.icon !== "youtube" && String(item.label || "").toLowerCase() !== "youtube"
      ),
    },
  };
}

async function readFooter() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultFooter } },
    { new: true, upsert: true }
  ).lean();
  return withoutYouTube(doc.content);
}

async function writeFooter(content) {
  const cleaned = withoutYouTube(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: cleaned },
    { new: true, upsert: true }
  ).lean();
  return withoutYouTube(doc.content);
}

module.exports = { readFooter, writeFooter };
