import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const tune = page.locator('.submit-controls button:has-text("tune"), .submit-controls button[aria-label="Settings"]').first();
console.log("Clicking tune button...");
await tune.click();
await page.waitForTimeout(1000);

const popover = await page.evaluate(() => {
  const radios = Array.from(document.querySelectorAll('[role="radio"], mat-radio-button, mat-button-toggle'));
  return radios.map(r => r.innerText.trim().replace(/\n/g, ' '));
});
console.log("POPOVER_RADIOS:", JSON.stringify(popover, null, 2));

process.exit(0);
