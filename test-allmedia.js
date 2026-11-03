import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const allMedia = page.getByRole("button", { name: /all media/i }).or(page.locator('button:has-text("All media")')).first();
console.log("All media button visible:", await allMedia.isVisible().catch(() => false));
if (await allMedia.isVisible()) {
  await allMedia.click();
  await page.waitForTimeout(1000);
  console.log("Clicked All Media. Now checking Setting btn 1 (Settings trigger)...");
  const b1 = page.locator('button.settings-trigger-button, button[aria-label="Settings trigger"]');
  console.log("Settings trigger isVisible:", await b1.isVisible().catch(() => false));
  console.log("Settings trigger text:", await b1.innerText().catch(() => ''));
}

process.exit(0);
