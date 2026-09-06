const LIMITS = {
  name: 100,
  email: 254,
  company: 120,
  phone: 40,
  enquiryType: 120,
  subject: 160,
  source: 40,
  message: 5000,
};

function tooLong(value, max) {
  return typeof value === "string" && value.trim().length > max;
}

function validateContact(req, res, next) {
  const { name, email, company, phone, enquiryType, subject, source, message } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  } else if (tooLong(name, LIMITS.name)) {
    errors.push("Name is too long.");
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email address is required.");
  } else if (tooLong(email, LIMITS.email)) {
    errors.push("Email is too long.");
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.push("Message is required and must be at least 10 characters.");
  } else if (tooLong(message, LIMITS.message)) {
    errors.push("Message is too long.");
  }

  if (tooLong(company, LIMITS.company)) errors.push("Company name is too long.");
  if (tooLong(phone, LIMITS.phone)) errors.push("Phone number is too long.");
  if (tooLong(enquiryType, LIMITS.enquiryType)) errors.push("Enquiry type is too long.");
  if (tooLong(subject, LIMITS.subject)) errors.push("Subject is too long.");
  if (tooLong(source, LIMITS.source)) errors.push("Source is too long.");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = validateContact;
