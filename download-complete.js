import { getFlowPage } from "./dist/chrome.js";
import { copyFileSync, mkdirSync } from "node:fs";

const page = await getFlowPage();

// Press Escape to reset any open menus
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

const tile = page.locator('flow-grid-tile-container').first();
await tile.hover();
await page.waitForTimeout(300);

const more = tile.getByRole("button", { name: "More options" });
if (await more.isVisible().catch(() => false)) {
  await more.click();
} else {
  await tile.click({ button: "right" });
}
await page.waitForTimeout(500);

const downloadMenu = page.getByRole("menuitem", { name: "Download", exact: true });
console.log("Download menuitem visible:", await downloadMenu.isVisible());
await downloadMenu.click();
await page.waitForTimeout(500);

// Check submenu for "Original"
const original = page.getByRole("menuitem", { name: /original/i }).first();
console.log("Original submenu visible:", await original.isVisible().catch(() => false));

const downloadPromise = page.waitForEvent('download', { timeout: 30000 });

if (await original.isVisible().catch(() => false)) {
  console.log("Clicking Original size option...");
  await original.click();
}

console.log("Waiting for MP4 file download...");
const download = await downloadPromise;
const target1 = "D:\\google flow\\viral-loop-scene-01.mp4";
const target2 = "C:\\Users\\hp\\flow-mcp-out\\viral-loop\\scene-01.mp4";

mkdirSync("C:\\Users\\hp\\flow-mcp-out\\viral-loop", { recursive: true });
await download.saveAs(target1);
copyFileSync(target1, target2);

console.log("FILE_DOWNLOADED_SUCCESSFULLY!");
console.log("File saved at:", target1);
process.exit(0);
