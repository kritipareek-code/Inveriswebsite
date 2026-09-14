const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const validateCareer = require("../middleware/validateCareer");
const { formLimiter } = require("../middleware/rateLimits");
const { sendCareerNotification } = require("../lib/mailer");
const {
  createApplication,
  listApplications,
  unreadCount,
  setRead,
  setEmailSent,
  deleteApplication,
} = require("../store/careerStore");

const router = express.Router();

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post("/", formLimiter, validateCareer, async (req, res) => {
  try {
    const { name, email, phone, location, interest, experience, about } = req.body;

    const application = await createApplication({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      interest: interest.trim(),
      experience: experience.trim(),
      about: typeof about === "string" ? about.trim() : "",
    });

    try {
      const emailSent = await sendCareerNotification(application);
      if (emailSent) {
        await setEmailSent(application.id, true);
      }
    } catch (error) {
      console.error("[Career email]", error);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for sharing your profile. Our team will review it and be in touch if there is a fit.",
    });
  } catch (error) {
    console.error("[Career Application]", error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now. Please try again later.",
    });
  }
});

router.get("/applications", requireAuth, async (_req, res) => {
  const [applications, unread] = await Promise.all([listApplications(), unreadCount()]);
  return res.json({ success: true, applications, unread });
});

router.get("/applications/unread-count", requireAuth, async (_req, res) => {
  const unread = await unreadCount();
  return res.json({ success: true, unread });
});

router.patch("/applications/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid application id" });
  }

  const application = await setRead(req.params.id, req.body?.read !== false);
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }

  return res.json({ success: true, application });
});

router.delete("/applications/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid application id" });
  }

  const application = await deleteApplication(req.params.id);
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }

  return res.json({ success: true });
});

module.exports = router;
