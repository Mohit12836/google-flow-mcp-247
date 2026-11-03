import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const visibleElements = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('div, section, main, flow-project'));
  return all
    .filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 200 && r.height > 100 && el.children.length > 0;
    })
    .map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className,
      textPreview: el.innerText.slice(0, 100).replace(/\n/g, ' ')
    }))
    .slice(0, 15);
});
console.log("VISIBLE_ELEMENTS:", JSON.stringify(visibleElements, null, 2));

process.exit(0);
