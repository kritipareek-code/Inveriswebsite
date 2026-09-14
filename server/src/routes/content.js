const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { readHome, writeHome, resetHome } = require("../store/homeStore");
const { readFooter, writeFooter } = require("../store/footerStore");
const { readAbout, writeAbout, resetAbout } = require("../store/aboutStore");
const { readServices, writeServices, resetServices } = require("../store/servicesStore");
const {
  readIndustries,
  writeIndustries,
  resetIndustries,
} = require("../store/industriesStore");
const {
  readApproach,
  writeApproach,
  resetApproach,
} = require("../store/approachStore");
const {
  readLeadership,
  writeLeadership,
  resetLeadership,
} = require("../store/leadershipStore");
const {
  readContact,
  writeContact,
  resetContact,
} = require("../store/contactStore");
const {
  readCareersPage,
  writeCareersPage,
  resetCareersPage,
} = require("../store/careersPageStore");
const { cleanupRemovedImageKitUrls } = require("../lib/imagekitCleanup");

const router = express.Router();

async function saveContent(readFn, writeFn, body) {
  const previous = await readFn();
  const content = await writeFn(body);
  try {
    await cleanupRemovedImageKitUrls(previous, content);
  } catch (error) {
    console.error("[ImageKit cleanup after save]", error);
  }
  return content;
}

async function resetContent(readFn, resetFn) {
  const previous = await readFn();
  const content = await resetFn();
  try {
    await cleanupRemovedImageKitUrls(previous, content);
  } catch (error) {
    console.error("[ImageKit cleanup after reset]", error);
  }
  return content;
}

function isHomeContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    Array.isArray(body.valuePropositions) &&
    body.about &&
    body.services &&
    body.approach &&
    body.cta
  );
}

function isAboutContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    body.whoWeAre &&
    Array.isArray(body.whoWeAre.paragraphs) &&
    body.missionVision &&
    body.missionVision.mission &&
    body.missionVision.vision &&
    Array.isArray(body.missionVision.mission.items) &&
    Array.isArray(body.missionVision.vision.items) &&
    body.cta
  );
}

function isServicesContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    body.offer &&
    Array.isArray(body.offer.serviceLines) &&
    body.consultingCall &&
    Array.isArray(body.consultingCall.images) &&
    body.cta
  );
}

function isIndustriesContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    body.industriesWeServe &&
    Array.isArray(body.industriesWeServe.industries) &&
    body.valueBar &&
    Array.isArray(body.valueBar.items) &&
    body.cta
  );
}

function isApproachContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    Array.isArray(body.hero.pathSteps) &&
    body.fourSteps &&
    Array.isArray(body.fourSteps.steps) &&
    body.connectedExpertise &&
    Array.isArray(body.connectedExpertise.nodes) &&
    body.cta
  );
}

function isLeadershipContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    Array.isArray(body.hero.paragraphs) &&
    body.philosophy &&
    Array.isArray(body.philosophy.items) &&
    body.team &&
    Array.isArray(body.team.members) &&
    body.values &&
    Array.isArray(body.values.items) &&
    body.cta
  );
}

function isContactContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    body.form &&
    Array.isArray(body.form.enquiryTypes) &&
    body.contactInfo &&
    Array.isArray(body.contactInfo.emails) &&
    Array.isArray(body.contactInfo.phones) &&
    Array.isArray(body.contactInfo.addresses) &&
    body.office &&
    body.faq &&
    Array.isArray(body.faq.items)
  );
}

function isCareersContent(body) {
  return (
    body &&
    typeof body === "object" &&
    body.hero &&
    body.intro &&
    typeof body.intro.statement === "string" &&
    body.expect &&
    Array.isArray(body.expect.items) &&
    body.network &&
    Array.isArray(body.network.interestOptions) &&
    Array.isArray(body.network.experienceOptions) &&
    body.next &&
    Array.isArray(body.next.steps) &&
    body.faq &&
    Array.isArray(body.faq.items) &&
    body.cta
  );
}

function isFooterContent(body) {
  return (
    body &&
    typeof body === "object" &&
    typeof body.companyName === "string" &&
    typeof body.description === "string" &&
    Array.isArray(body.links) &&
    body.contact &&
    typeof body.contact.title === "string" &&
    Array.isArray(body.contact.social) &&
    typeof body.copyright === "string"
  );
}

router.get("/home", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readHome() });
  } catch (error) {
    console.error("[Home content read]", error);
    return res.status(500).json({ success: false, message: "Failed to load home content" });
  }
});

router.put("/home", requireAuth, async (req, res) => {
  if (!isHomeContent(req.body)) {
    return res.status(400).json({ success: false, message: "Invalid home content payload" });
  }

  try {
    const content = await saveContent(readHome, writeHome, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Home content write]", error);
    return res.status(500).json({ success: false, message: "Failed to save home content" });
  }
});

router.post("/home/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readHome, resetHome);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Home content reset]", error);
    return res.status(500).json({ success: false, message: "Failed to reset home content" });
  }
});

router.get("/about", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readAbout() });
  } catch (error) {
    console.error("[About content read]", error);
    return res.status(500).json({ success: false, message: "Failed to load about content" });
  }
});

router.put("/about", requireAuth, async (req, res) => {
  if (!isAboutContent(req.body)) {
    return res.status(400).json({ success: false, message: "Invalid about content payload" });
  }

  try {
    const content = await saveContent(readAbout, writeAbout, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[About content write]", error);
    return res.status(500).json({ success: false, message: "Failed to save about content" });
  }
});

router.post("/about/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readAbout, resetAbout);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[About content reset]", error);
    return res.status(500).json({ success: false, message: "Failed to reset about content" });
  }
});

router.get("/services", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readServices() });
  } catch (error) {
    console.error("[Services content read]", error);
    return res.status(500).json({ success: false, message: "Failed to load services content" });
  }
});

router.put("/services", requireAuth, async (req, res) => {
  if (!isServicesContent(req.body)) {
    return res.status(400).json({ success: false, message: "Invalid services content payload" });
  }

  try {
    const content = await saveContent(readServices, writeServices, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Services content write]", error);
    return res.status(500).json({ success: false, message: "Failed to save services content" });
  }
});

router.post("/services/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readServices, resetServices);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Services content reset]", error);
    return res.status(500).json({ success: false, message: "Failed to reset services content" });
  }
});

router.get("/industries", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readIndustries() });
  } catch (error) {
    console.error("[Industries content read]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load industries content" });
  }
});

router.put("/industries", requireAuth, async (req, res) => {
  if (!isIndustriesContent(req.body)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid industries content payload" });
  }

  try {
    const content = await saveContent(readIndustries, writeIndustries, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Industries content write]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save industries content" });
  }
});

router.post("/industries/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readIndustries, resetIndustries);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Industries content reset]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reset industries content" });
  }
});

router.get("/approach", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readApproach() });
  } catch (error) {
    console.error("[Approach content read]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load approach content" });
  }
});

router.put("/approach", requireAuth, async (req, res) => {
  if (!isApproachContent(req.body)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid approach content payload" });
  }

  try {
    const content = await saveContent(readApproach, writeApproach, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Approach content write]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save approach content" });
  }
});

router.post("/approach/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readApproach, resetApproach);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Approach content reset]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reset approach content" });
  }
});

router.get("/leadership", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readLeadership() });
  } catch (error) {
    console.error("[Leadership content read]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load leadership content" });
  }
});

router.put("/leadership", requireAuth, async (req, res) => {
  if (!isLeadershipContent(req.body)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid leadership content payload" });
  }

  try {
    const content = await saveContent(readLeadership, writeLeadership, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Leadership content write]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save leadership content" });
  }
});

router.post("/leadership/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readLeadership, resetLeadership);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Leadership content reset]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reset leadership content" });
  }
});

router.get("/contact", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readContact() });
  } catch (error) {
    console.error("[Contact content read]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load contact content" });
  }
});

router.put("/contact", requireAuth, async (req, res) => {
  if (!isContactContent(req.body)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid contact content payload" });
  }

  try {
    const content = await saveContent(readContact, writeContact, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Contact content write]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save contact content" });
  }
});

router.post("/contact/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readContact, resetContact);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Contact content reset]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reset contact content" });
  }
});

router.get("/careers", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readCareersPage() });
  } catch (error) {
    console.error("[Careers content read]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load careers content" });
  }
});

router.put("/careers", requireAuth, async (req, res) => {
  if (!isCareersContent(req.body)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid careers content payload" });
  }

  try {
    const content = await saveContent(readCareersPage, writeCareersPage, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Careers content write]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save careers content" });
  }
});

router.post("/careers/reset", requireAuth, async (_req, res) => {
  try {
    const content = await resetContent(readCareersPage, resetCareersPage);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Careers content reset]", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reset careers content" });
  }
});

router.get("/footer", async (_req, res) => {
  try {
    return res.json({ success: true, content: await readFooter() });
  } catch (error) {
    console.error("[Footer content read]", error);
    return res.status(500).json({ success: false, message: "Failed to load footer content" });
  }
});

router.put("/footer", requireAuth, async (req, res) => {
  if (!isFooterContent(req.body)) {
    return res.status(400).json({ success: false, message: "Invalid footer content payload" });
  }

  try {
    const content = await saveContent(readFooter, writeFooter, req.body);
    return res.json({ success: true, content });
  } catch (error) {
    console.error("[Footer content write]", error);
    return res.status(500).json({ success: false, message: "Failed to save footer content" });
  }
});

module.exports = router;
