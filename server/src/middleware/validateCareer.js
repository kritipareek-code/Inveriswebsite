const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  location: 120,
  interest: 80,
  experience: 40,
  organization: 160,
  designation: 120,
  linkedin: 300,
  about: 5000,
};

function tooLong(value, max) {
  return typeof value === "string" && value.trim().length > max;
}

function trim(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateCareer(req, res, next) {
  const {
    name,
    email,
    phone,
    location,
    interest,
    experience,
    organization,
    designation,
    linkedin,
    about,
  } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Full name is required and must be at least 2 characters.");
  } else if (tooLong(name, LIMITS.name)) {
    errors.push("Full name is too long.");
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email address is required.");
  } else if (tooLong(email, LIMITS.email)) {
    errors.push("Email is too long.");
  }

  if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
    errors.push("A valid phone number is required.");
  } else if (tooLong(phone, LIMITS.phone)) {
    errors.push("Phone number is too long.");
  }

  if (!location || typeof location !== "string" || location.trim().length < 2) {
    errors.push("Current location is required.");
  } else if (tooLong(location, LIMITS.location)) {
    errors.push("Location is too long.");
  }

  const interestValue = trim(interest);
  if (!interestValue) {
    errors.push("Please select a valid area of interest.");
  } else if (tooLong(interestValue, LIMITS.interest)) {
    errors.push("Area of interest is too long.");
  }

  const experienceValue = trim(experience);
  if (!experienceValue) {
    errors.push("Please select a valid years of experience option.");
  } else if (tooLong(experienceValue, LIMITS.experience)) {
    errors.push("Experience option is too long.");
  }

  if (tooLong(organization, LIMITS.organization)) errors.push("Organization name is too long.");
  if (tooLong(designation, LIMITS.designation)) errors.push("Designation is too long.");
  if (tooLong(about, LIMITS.about)) errors.push("About section is too long.");

  const linkedinValue = trim(linkedin);
  if (linkedinValue) {
    if (tooLong(linkedinValue, LIMITS.linkedin)) {
      errors.push("LinkedIn URL is too long.");
    } else if (!/^https?:\/\/.+/i.test(linkedinValue)) {
      errors.push("LinkedIn profile must be a valid URL.");
    }
  }

  if (!req.file) {
    errors.push("Please upload your latest resume.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = validateCareer;
