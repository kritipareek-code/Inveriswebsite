require("dotenv").config();

const { connectDb } = require("./db/connect");
const { assertAdminConfig } = require("./lib/adminCredentials");
const app = require("./app");

const PORT = process.env.PORT || 5001;

async function start() {
  assertAdminConfig();
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Inveris API running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
