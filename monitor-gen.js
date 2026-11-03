import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const mainText = await page.locator("main").first().innerText();
console.log("MAIN_TEXT_PREVIEW:", mainText.slice(0, 300).replace(/\n/g, ' '));

const pending = mainText.match(/\d+%/g);
console.log("Pending progress percentages:", pending);

const stopBtn = page.getByRole("button", { name: /stop/i }).first();
console.log("Stop button visible:", await stopBtn.isVisible().catch(() => false));

const tiles = await page.evaluate(() => {
  const ts = Array.from(document.querySelectorAll('flow-grid-tile-container, flow-media-tile, .media-tile'));
  return ts.length;
});
console.log("Media tiles in project:", tiles);

process.exit(0);
