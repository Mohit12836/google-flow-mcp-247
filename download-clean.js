import { getFlowPage } from "./dist/chrome.js";
import { copyFileSync, mkdirSync } from "node:fs";

const page = await getFlowPage();

console.log("1. Clearing backdrops...");
await page.evaluate(() => {
  document.querySelectorAll('.cdk-overlay-backdrop').forEach(el => el.click());
});
await page.waitForTimeout(500);

console.log("2. Locating tile...");
const tile = page.locator('flow-grid-tile-container').first();
await tile.scrollIntoViewIfNeeded();

// Real mouse move to trigger toolbar hover
const box = await tile.boundingBox();
if (box) {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(400);
}

console.log("3. Opening More options...");
const more = tile.getByRole("button", { name: "More options" });
if (await more.isVisible().catch(() => false)) {
  await more.click();
} else {
  await tile.click({ button: "right" });
}
await page.waitForTimeout(600);

console.log("4. Clicking Download item...");
const dlItem = page.getByRole("menuitem", { name: "Download", exact: true });
await dlItem.waitFor({ state: "visible", timeout: 5000 });
await dlItem.click();
await page.waitForTimeout(600);

console.log("5. Checking for Original/resolution submenu...");
const original = page.getByRole("menuitem", { name: /original/i }).first();
const downloadPromise = page.waitForEvent('download', { timeout: 35000 });

if (await original.isVisible().catch(() => false)) {
  console.log("Clicking Original size submenu...");
  await original.click();
}

console.log("6. Awaiting file download event...");
const download = await downloadPromise;
const target1 = "D:\\google flow\\viral-loop-scene-01.mp4";
const target2 = "C:\\Users\\hp\\flow-mcp-out\\viral-loop\\scene-01.mp4";

mkdirSync("C:\\Users\\hp\\flow-mcp-out\\viral-loop", { recursive: true });
await download.saveAs(target1);
copyFileSync(target1, target2);

console.log("SUCCESS! Video saved to:");
console.log(target1);
console.log(target2);

process.exit(0);
