const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../lib/adminCredentials");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired session" });
  }
}

module.exports = requireAuth;
