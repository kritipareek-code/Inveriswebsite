const express = require("express");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");
const { loginLimiter } = require("../middleware/rateLimits");
const {
  credentialsMatch,
  getAdminEmail,
  getJwtSecret,
} = require("../lib/adminCredentials");

const router = express.Router();

router.post("/login", loginLimiter, (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  try {
    if (!credentialsMatch(email, password)) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const adminEmail = getAdminEmail();
    const token = jwt.sign({ email: adminEmail, role: "admin" }, getJwtSecret(), {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      admin: { email: adminEmail },
    });
  } catch (error) {
    console.error("[Auth login]", error);
    return res.status(500).json({
      success: false,
      message: "Admin login is not configured",
    });
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({
    success: true,
    admin: { email: req.admin.email },
  });
});

module.exports = router;
