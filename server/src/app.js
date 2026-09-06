const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contact");
const careersRouter = require("./routes/careers");
const newsletterRouter = require("./routes/newsletter");
const authRouter = require("./routes/auth");
const contentRouter = require("./routes/content");
const uploadRouter = require("./routes/upload");

const app = express();

function parseOrigins(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim().replace(/^['"]|['"]$/g, "").replace(/\/$/, ""))
    .filter(Boolean);
}

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const allowed = new Set([
    "http://localhost:3000",
    "http://localhost:3001",
    "https://www.inverissolutions.com",
    "https://inverissolutions.com",
    ...parseOrigins(process.env.CLIENT_URL),
  ]);

  if (allowed.has(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (hostname.endsWith(".vercel.app")) return true;
    if (hostname === "inverissolutions.com" || hostname.endsWith(".inverissolutions.com")) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      console.warn(`[CORS] blocked origin: ${origin}`);
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactRouter);
app.use("/api/careers", careersRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/upload", uploadRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;
