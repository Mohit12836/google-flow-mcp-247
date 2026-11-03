import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const approveRow = page.locator('.option-row').filter({ hasText: /^check\s*Approve$/i }).or(page.locator('.option-row:has-text("Approve")')).first();
console.log("Approve row visible:", await approveRow.isVisible());

if (await approveRow.isVisible()) {
  console.log("CLICKING APPROVE ROW...");
  await approveRow.click();
  console.log("Clicked! Waiting 8s to check rendering progress...");
  await page.waitForTimeout(8000);
}

process.exit(0);
