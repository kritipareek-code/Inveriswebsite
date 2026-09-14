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
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES },
  fileFilter: (_req, file, cb) => {
    const name = String(file.originalname || "").toLowerCase();
    const extOk = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
    if (RESUME_TYPES.has(file.mimetype) || extOk) {
      return cb(null, true);
    }
    cb(new Error("Resume must be a PDF or Word document."));
  },
});

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function handleResumeUpload(req, res, next) {
  resumeUpload.single("resume")(req, res, (err) => {
    if (!err) return next();
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Resume must be 5MB or smaller."
        : err.message || "Could not upload resume.";
    return res.status(400).json({ success: false, errors: [message] });
  });
}

async function storeResume(file) {
  const fileName = file.originalname || `resume-${Date.now()}.pdf`;
  try {
    const result = await getImageKit().files.upload({
      file: await toFile(file.buffer, fileName),
      fileName,
      folder: "/inveris/resumes",
      useUniqueFileName: true,
    });
    return { url: result.url || "", name: fileName };
  } catch (error) {
    console.error("[Career resume upload]", error);
    return { url: "", name: fileName };
  }
}

router.post("/", formLimiter, handleResumeUpload, validateCareer, async (req, res) => {
  try {
    const { name, email, phone, location, interest, experience, about } = req.body;
    const jobId = typeof req.body.jobId === "string" ? req.body.jobId.trim() : "";
    const jobTitle = typeof req.body.jobTitle === "string" ? req.body.jobTitle.trim() : "";
    const jobLocation = typeof req.body.jobLocation === "string" ? req.body.jobLocation.trim() : "";
    const jobLineOfService =
      typeof req.body.jobLineOfService === "string" ? req.body.jobLineOfService.trim() : "";
    const resumeFile = req.file;
    let resumeUrl = "";
    let resumeName = "";

    if (resumeFile) {
      const stored = await storeResume(resumeFile);
      resumeUrl = stored.url;
      resumeName = stored.name;
    }

    const application = await createApplication({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      interest: interest.trim(),
      experience: experience.trim(),
      about: typeof about === "string" ? about.trim() : "",
      jobId,
      jobTitle,
      jobLocation,
      jobLineOfService,
      resumeUrl,
      resumeName,
    });

    try {
      const emailSent = await sendCareerNotification(application, resumeFile);
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
