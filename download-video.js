import { getFlowPage } from "./dist/chrome.js";
import { copyFileSync, mkdirSync } from "node:fs";

const page = await getFlowPage();

// If menu is open, find "download Download"
const downloadItem = page.locator('.mat-mdc-menu-item, [role="menuitem"]').filter({ hasText: /download/i }).first();

let downloadPromise;
if (await downloadItem.isVisible().catch(() => false)) {
  console.log("Download menuitem is visible! Setting up download listener...");
  downloadPromise = page.waitForEvent('download', { timeout: 30000 });
  await downloadItem.click();
} else {
  // Re-open menu
  console.log("Opening menu first...");
  const tile = page.locator('flow-grid-tile-container').first();
  await tile.hover();
  await page.waitForTimeout(300);
  const moreBtn = tile.locator('button[aria-label="More options"], button:has-text("more_vert")').first();
  await moreBtn.click();
  await page.waitForTimeout(600);
  const dl = page.locator('.mat-mdc-menu-item, [role="menuitem"]').filter({ hasText: /download/i }).first();
  downloadPromise = page.waitForEvent('download', { timeout: 30000 });
  await dl.click();
}

console.log("Waiting for file download...");
const download = await downloadPromise;
const targetPath1 = "D:\\google flow\\viral-loop-scene-01.mp4";
const targetPath2 = "C:\\Users\\hp\\flow-mcp-out\\viral-loop\\scene-01.mp4";

mkdirSync("C:\\Users\\hp\\flow-mcp-out\\viral-loop", { recursive: true });
await download.saveAs(targetPath1);
copyFileSync(targetPath1, targetPath2);

console.log("DOWNLOAD_SUCCESSFUL!");
console.log("Saved to:", targetPath1);
console.log("Saved to:", targetPath2);

process.exit(0);
