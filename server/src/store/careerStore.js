const CareerApplication = require("../models/CareerApplication");

function toApplication(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone || "",
    location: doc.location || "",
    interest: doc.interest || "",
    experience: doc.experience || "",
    organization: doc.organization || "",
    designation: doc.designation || "",
    linkedin: doc.linkedin || "",
    about: doc.about || "",
    jobId: doc.jobId || "",
    jobTitle: doc.jobTitle || "",
    jobLocation: doc.jobLocation || "",
    jobLineOfService: doc.jobLineOfService || "",
    resumeUrl: doc.resumeUrl || "",
    resumeName: doc.resumeName || "",
    read: Boolean(doc.read),
    emailSent: Boolean(doc.emailSent),
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

async function createApplication(data) {
  const doc = await CareerApplication.create(data);
  return toApplication(doc);
}

async function listApplications() {
  const docs = await CareerApplication.find().sort({ createdAt: -1 }).lean();
  return docs.map(toApplication);
}

async function unreadCount() {
  return CareerApplication.countDocuments({ read: false });
}

async function setRead(id, read) {
  const doc = await CareerApplication.findByIdAndUpdate(
    id,
    { read: Boolean(read) },
    { returnDocument: "after" }
  ).lean();
  return toApplication(doc);
}

async function setEmailSent(id, emailSent) {
  const doc = await CareerApplication.findByIdAndUpdate(
    id,
    { emailSent: Boolean(emailSent) },
    { returnDocument: "after" }
  ).lean();
  return toApplication(doc);
}

async function deleteApplication(id) {
  const doc = await CareerApplication.findByIdAndDelete(id).lean();
  return toApplication(doc);
}

module.exports = {
  createApplication,
  listApplications,
  unreadCount,
  setRead,
  setEmailSent,
  deleteApplication,
};
