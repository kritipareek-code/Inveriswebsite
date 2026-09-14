const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  location: 120,
  interest: 80,
  experience: 40,
  about: 5000,
  jobId: 80,
  jobTitle: 160,
  jobLocation: 120,
  jobLineOfService: 120,
};

function tooLong(value, max) {
  return typeof value === "string" && value.trim().length > max;
}

function trim(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateCareer(req, res, next) {
  const { name, email, phone, location, interest, experience, about } = req.body;

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

  if (tooLong(about, LIMITS.about)) errors.push("About section is too long.");

  const { jobId, jobTitle, jobLocation, jobLineOfService } = req.body;
  if (tooLong(jobId, LIMITS.jobId)) errors.push("Job reference is too long.");
  if (tooLong(jobTitle, LIMITS.jobTitle)) errors.push("Job title is too long.");
  if (tooLong(jobLocation, LIMITS.jobLocation)) errors.push("Job location is too long.");
  if (tooLong(jobLineOfService, LIMITS.jobLineOfService)) {
    errors.push("Line of service is too long.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = validateCareer;
