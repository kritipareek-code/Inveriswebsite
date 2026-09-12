const { rateLimit } = require("express-rate-limit");

function jsonHandler(req, res, _next, options) {
  res.status(options.statusCode).json({
    success: false,
    message: options.message,
  });
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests. Please try again later.",
  handler: jsonHandler,
  skip: (req) => req.method === "OPTIONS" || req.path === "/health",
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many login attempts. Please wait and try again.",
  handler: jsonHandler,
});

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many submissions. Please try again later.",
  handler: jsonHandler,
});

module.exports = { apiLimiter, loginLimiter, formLimiter };
