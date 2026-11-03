import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const approveEls = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));
  return all
    .filter(el => el.children.length === 0 && /approve|always approve/i.test(el.innerText))
    .map(el => ({
      tag: el.tagName,
      text: el.innerText,
      parentTag: el.parentElement?.tagName,
      parentClass: el.parentElement?.className
    }));
});
console.log("APPROVE_ELEMENTS:", JSON.stringify(approveEls, null, 2));

process.exit(0);
