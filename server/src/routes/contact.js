const express = require("express");
const mongoose = require("mongoose");
const validateContact = require("../middleware/validateContact");
const requireAuth = require("../middleware/requireAuth");
const { sendContactNotification } = require("../lib/mailer");
const {
  createSubmission,
  listSubmissions,
  unreadCount,
  setRead,
  setEmailSent,
  deleteSubmission,
} = require("../store/submissionStore");

const router = express.Router();

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post("/", validateContact, async (req, res) => {
  try {
    const { name, email, company, phone, enquiryType, subject, source, message } = req.body;

    const submission = await createSubmission({
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      phone: typeof phone === "string" ? phone.trim() : "",
      enquiryType: typeof enquiryType === "string" ? enquiryType.trim() : "",
      subject: typeof subject === "string" ? subject.trim() : "",
      source: typeof source === "string" && source.trim() ? source.trim() : "contact",
      message: message.trim(),
    });

    try {
      const emailSent = await sendContactNotification(submission);
      if (emailSent) {
        await setEmailSent(submission.id, true);
      }
    } catch (error) {
      console.error("[Contact email]", error);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out. We will get back to you soon.",
    });
  } catch (error) {
    console.error("[Contact Submission]", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
});

router.get("/submissions", requireAuth, async (_req, res) => {
  const [submissions, unread] = await Promise.all([listSubmissions(), unreadCount()]);
  return res.json({ success: true, submissions, unread });
});

router.get("/submissions/unread-count", requireAuth, async (_req, res) => {
  const unread = await unreadCount();
  return res.json({ success: true, unread });
});

router.patch("/submissions/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid submission id" });
  }

  const submission = await setRead(req.params.id, req.body?.read !== false);
  if (!submission) {
    return res.status(404).json({ success: false, message: "Submission not found" });
  }

  return res.json({ success: true, submission });
});

router.delete("/submissions/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid submission id" });
  }

  const submission = await deleteSubmission(req.params.id);
  if (!submission) {
    return res.status(404).json({ success: false, message: "Submission not found" });
  }

  return res.json({ success: true });
});

module.exports = router;
