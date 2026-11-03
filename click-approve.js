import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const approveBtn = page.getByRole("button", { name: /approve/i }).first();
console.log("Approve button visible:", await approveBtn.isVisible().catch(() => false));

if (await approveBtn.isVisible().catch(() => false)) {
  console.log("CLICKING APPROVE BUTTON!");
  await approveBtn.click();
  console.log("Approved! Waiting 5s to see rendering begin...");
  await page.waitForTimeout(5000);
}

process.exit(0);
