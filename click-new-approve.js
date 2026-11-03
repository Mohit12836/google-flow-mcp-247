import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();

// Find the enabled option-row
const activeApprove = page.locator('.option-row[aria-disabled="false"]').filter({ hasText: /approve/i }).first();
console.log("Active approve row found:", await activeApprove.isVisible());

if (await activeApprove.isVisible()) {
  console.log("CLICKING ACTIVE APPROVE ROW...");
  await activeApprove.click();
  console.log("CLICKED SUCCESSFULLY!");
  await page.waitForTimeout(5000);
}

process.exit(0);
