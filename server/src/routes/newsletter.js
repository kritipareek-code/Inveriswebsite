const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const { formLimiter } = require("../middleware/rateLimits");
const { sendNewsletterNotification } = require("../lib/mailer");
const {
  subscribe,
  listSubscribers,
  setEmailSent,
  deleteSubscriber,
} = require("../store/newsletterStore");

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post("/", formLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const { subscriber, created } = await subscribe(email);

    if (created) {
      try {
        const emailSent = await sendNewsletterNotification(subscriber.email);
        if (emailSent) await setEmailSent(subscriber.id, true);
      } catch (error) {
        console.error("[Newsletter email]", error);
      }
    }

    return res.status(200).json({
      success: true,
      message: created
        ? "Thanks for subscribing to our newsletter."
        : "You are already subscribed to our newsletter.",
    });
  } catch (error) {
    console.error("[Newsletter subscribe]", error);
    return res.status(500).json({
      success: false,
      message: "Unable to subscribe right now. Please try again later.",
    });
  }
});

router.get("/subscribers", requireAuth, async (_req, res) => {
  const subscribers = await listSubscribers();
  return res.json({ success: true, subscribers });
});

router.delete("/subscribers/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid subscriber id" });
  }

  const subscriber = await deleteSubscriber(req.params.id);
  if (!subscriber) {
    return res.status(404).json({ success: false, message: "Subscriber not found" });
  }

  return res.json({ success: true });
});

module.exports = router;
