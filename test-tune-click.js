import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const tuneBtn = page.locator('button:has-text("tune"), button[aria-label="Settings"]').last();
console.log("Clicking tune button...");
await tuneBtn.click();
await page.waitForTimeout(1000);

const radioImage = page.getByRole("radio", { name: "Image", exact: true });
console.log("Radio Image visible:", await radioImage.isVisible().catch(() => false));

const radioVideo = page.getByRole("radio", { name: "Video", exact: true });
console.log("Radio Video visible:", await radioVideo.isVisible().catch(() => false));

process.exit(0);
