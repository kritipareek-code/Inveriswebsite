const SiteContent = require("../models/SiteContent");
const { defaultContact } = require("../data/defaultContact");

const KEY = "contact";

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function mergeContact(stored) {
  const data = asObject(stored);
  const hero = asObject(data.hero);
  const form = asObject(data.form);
  const contactInfo = asObject(data.contactInfo);
  const office = asObject(data.office);
  const faq = asObject(data.faq);

  return {
    ...defaultContact,
    ...data,
    hero: { ...defaultContact.hero, ...hero },
    form: {
      ...defaultContact.form,
      ...form,
      enquiryTypes: Array.isArray(form.enquiryTypes)
        ? form.enquiryTypes
        : defaultContact.form.enquiryTypes,
    },
    contactInfo: {
      ...defaultContact.contactInfo,
      ...contactInfo,
      emails: Array.isArray(contactInfo.emails)
        ? contactInfo.emails
        : defaultContact.contactInfo.emails,
      phones: Array.isArray(contactInfo.phones)
        ? contactInfo.phones
        : defaultContact.contactInfo.phones,
      addresses: Array.isArray(contactInfo.addresses)
        ? contactInfo.addresses
        : defaultContact.contactInfo.addresses,
    },
    office: { ...defaultContact.office, ...office },
    faq: {
      ...defaultContact.faq,
      ...faq,
      avatars: Array.isArray(faq.avatars) ? faq.avatars : defaultContact.faq.avatars,
      items: Array.isArray(faq.items) ? faq.items : defaultContact.faq.items,
    },
  };
}

async function readContact() {
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { $setOnInsert: { content: defaultContact } },
    { new: true, upsert: true }
  ).lean();
  return mergeContact(doc.content);
}

async function writeContact(content) {
  const merged = mergeContact(content);
  const doc = await SiteContent.findOneAndUpdate(
    { key: KEY },
    { content: merged },
    { new: true, upsert: true }
  ).lean();
  return mergeContact(doc.content);
}

async function resetContact() {
  return writeContact(defaultContact);
}

module.exports = { readContact, writeContact, resetContact };
