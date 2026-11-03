import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const overlays = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.cdk-overlay-pane, [role="menu"], [role="dialog"], [role="radiogroup"]')).map(el => ({
    tag: el.tagName,
    role: el.getAttribute('role'),
    text: el.innerText.slice(0, 300).replace(/\n/g, ' ')
  }));
});
console.log("OVERLAYS:", JSON.stringify(overlays, null, 2));

process.exit(0);
