import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const closeBtn = page.locator('.agent-panel-wrapper button:has-text("close"), .agent-panel-wrapper button[aria-label="Close"], button:has-text("arrow_back")').first();
console.log("Close button found:", await closeBtn.isVisible().catch(() => false));
if (await closeBtn.isVisible().catch(() => false)) {
  await closeBtn.click();
  await page.waitForTimeout(1000);
  console.log("Clicked close!");
}

const editor = page.locator('.ProseMirror, [role="textbox"]').first();
console.log("Editor visible now:", await editor.isVisible().catch(() => false));
const box = await editor.boundingBox().catch(() => null);
console.log("Editor box:", box);

process.exit(0);
