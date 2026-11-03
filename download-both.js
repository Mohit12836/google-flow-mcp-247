import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();

async function downloadTileByIndex(index, targetPath) {
  console.log(`Starting download for Tile ${index} -> ${targetPath}`);
  
  // Clear any open backdrops
  await page.evaluate(() => {
    document.querySelectorAll('.cdk-overlay-backdrop').forEach(el => el.click());
  });
  await page.waitForTimeout(500);

  const tile = page.locator('flow-grid-tile-container').nth(index);
  await tile.scrollIntoViewIfNeeded();

  const box = await tile.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(400);
  }

  const more = tile.getByRole("button", { name: "More options" });
  if (await more.isVisible().catch(() => false)) {
    await more.click();
  } else {
    await tile.click({ button: "right" });
  }
  await page.waitForTimeout(600);

  const dlItem = page.getByRole("menuitem", { name: "Download", exact: true });
  await dlItem.waitFor({ state: "visible", timeout: 5000 });
  await dlItem.click();
  await page.waitForTimeout(600);

  const original = page.getByRole("menuitem", { name: /original/i }).first();
  const downloadPromise = page.waitForEvent('download', { timeout: 35000 });

  if (await original.isVisible().catch(() => false)) {
    await original.click();
  }

  const download = await downloadPromise;
  await download.saveAs(targetPath);
  console.log(`Successfully saved Tile ${index} to ${targetPath}`);
}

// Download Tile 0 (Warrior King)
await downloadTileByIndex(0, "D:\\google flow\\warrior-king-scene-03.mp4");
await page.waitForTimeout(1500);

// Download Tile 1 (Suspense Man)
await downloadTileByIndex(1, "D:\\google flow\\suspense-scene-01.mp4");

console.log("ALL DOWNLOADS COMPLETE!");
process.exit(0);
