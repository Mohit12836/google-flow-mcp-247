import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const tile = page.locator('flow-grid-tile-container').first();
console.log("Hovering on tile...");
await tile.hover();
await page.waitForTimeout(500);

// Look for buttons inside or around the tile
const tileButtons = await tile.evaluate((el) => {
  const btns = Array.from(el.querySelectorAll('button, a'));
  return btns.map(b => ({
    text: b.innerText.trim(),
    aria: b.getAttribute('aria-label')
  }));
});
console.log("TILE_BUTTONS:", JSON.stringify(tileButtons, null, 2));

process.exit(0);
