import { LocalCore } from "./dist/core.js";
const core = new LocalCore();
try {
  const status = await core.status({ detailed: true });
  console.log("DETAILED_STATUS:", JSON.stringify(status, null, 2));
} catch (e) {
  console.error("STATUS_ERROR:", e.message || e);
}
process.exit(0);
