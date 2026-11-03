import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const buttons = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.bottom-controls button')).map(b => ({
    text: b.innerText.trim(),
    aria: b.getAttribute('aria-label'),
    visible: b.offsetParent !== null
  }));
});
console.log("BOTTOM_BUTTONS_NOW:", JSON.stringify(buttons, null, 2));

process.exit(0);
