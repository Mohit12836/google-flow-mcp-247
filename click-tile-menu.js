import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const tile = page.locator('flow-grid-tile-container').first();
const moreBtn = tile.locator('button[aria-label="More options"], button:has-text("more_vert")').first();
await moreBtn.click();
await page.waitForTimeout(600);

const menuItems = await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('.mat-mdc-menu-item, [role="menuitem"]'));
  return items.map(it => it.innerText.trim().replace(/\n/g, ' '));
});
console.log("MENU_ITEMS:", JSON.stringify(menuItems, null, 2));

process.exit(0);
