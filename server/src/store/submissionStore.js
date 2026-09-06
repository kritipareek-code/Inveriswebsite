const ContactSubmission = require("../models/ContactSubmission");

function toSubmission(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    company: doc.company || "",
    phone: doc.phone || "",
    enquiryType: doc.enquiryType || "",
    subject: doc.subject || "",
    source: doc.source || "contact",
    message: doc.message,
    read: Boolean(doc.read),
    emailSent: Boolean(doc.emailSent),
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

async function createSubmission(data) {
  const doc = await ContactSubmission.create(data);
  return toSubmission(doc);
}

async function listSubmissions() {
  const docs = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
  return docs.map(toSubmission);
}

async function unreadCount() {
  return ContactSubmission.countDocuments({ read: false });
}

async function setRead(id, read) {
  const doc = await ContactSubmission.findByIdAndUpdate(
    id,
    { read: Boolean(read) },
    { returnDocument: "after" }
  ).lean();
  return toSubmission(doc);
}

async function setEmailSent(id, emailSent) {
  const doc = await ContactSubmission.findByIdAndUpdate(
    id,
    { emailSent: Boolean(emailSent) },
    { returnDocument: "after" }
  ).lean();
  return toSubmission(doc);
}

async function deleteSubmission(id) {
  const doc = await ContactSubmission.findByIdAndDelete(id).lean();
  return toSubmission(doc);
}

module.exports = {
  createSubmission,
  listSubmissions,
  unreadCount,
  setRead,
  setEmailSent,
  deleteSubmission,
};
