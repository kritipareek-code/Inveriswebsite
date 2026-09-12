const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { toFile } = require("@imagekit/nodejs");
const requireAuth = require("../middleware/requireAuth");
const validateCareer = require("../middleware/validateCareer");
const { formLimiter } = require("../middleware/rateLimits");
const { sendCareerNotification } = require("../lib/mailer");
const { getImageKit } = require("../lib/imagekit");
const {
  createApplication,
  listApplications,
  unreadCount,
  setRead,
  setEmailSent,
  deleteApplication,
} = require("../store/careerStore");

const router = express.Router();

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const name = file.originalname || "";
    if (ALLOWED_TYPES.has(file.mimetype) || /\.(pdf|doc|docx)$/i.test(name)) {
      return cb(null, true);
    }
    cb(new Error("Resume must be a PDF or Word document."));
  },
});

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function handleUpload(req, res, next) {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        errors: [err.message || "Unable to upload resume."],
      });
    }
    next();
  });
}

async function uploadResume(file) {
  if (!file) return { url: "", name: "" };

  try {
    const fileName = file.originalname || `resume-${Date.now()}.pdf`;
    const result = await getImageKit().files.upload({
      file: await toFile(file.buffer, fileName),
      fileName,
      folder: "/inveris/careers",
      useUniqueFileName: true,
    });
    return { url: result.url || "", name: fileName };
  } catch (error) {
    console.error("[Career resume upload]", error);
    return { url: "", name: file.originalname || "resume" };
  }
}

router.post("/", formLimiter, handleUpload, validateCareer, async (req, res) => {
  try {
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

    const resume = await uploadResume(req.file);

    const application = await createApplication({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      interest: interest.trim(),
      experience: experience.trim(),
      organization: typeof organization === "string" ? organization.trim() : "",
      designation: typeof designation === "string" ? designation.trim() : "",
      linkedin: typeof linkedin === "string" ? linkedin.trim() : "",
      about: typeof about === "string" ? about.trim() : "",
      resumeUrl: resume.url,
      resumeName: resume.name,
    });

    try {
      const emailSent = await sendCareerNotification(application, req.file);
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
