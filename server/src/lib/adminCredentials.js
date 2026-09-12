const crypto = require("crypto");

function requiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`${name} must be set in the environment`);
  }
  return value;
}

function getAdminEmail() {
  return requiredEnv("ADMIN_EMAIL").toLowerCase();
}

function getAdminPassword() {
  return requiredEnv("ADMIN_PASSWORD");
}

function getJwtSecret() {
  return requiredEnv("JWT_SECRET");
}

function assertAdminConfig() {
  getAdminEmail();
  getAdminPassword();
  getJwtSecret();
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  if (a.length !== b.length) {
    crypto.timingSafeEqual(a, a);
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

function credentialsMatch(email, password) {
  const expectedEmail = getAdminEmail();
  const expectedPassword = getAdminPassword();
  const emailOk = safeEqual(email, expectedEmail);
  const passwordOk = safeEqual(password, expectedPassword);
  return emailOk && passwordOk;
}

module.exports = {
  assertAdminConfig,
  getAdminEmail,
  getJwtSecret,
  credentialsMatch,
};
