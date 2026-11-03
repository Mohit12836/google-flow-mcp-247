import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const thoughtText = await page.evaluate(() => {
  const el = Array.from(document.querySelectorAll('*')).find(e => /Defining the Parameters/i.test(e.innerText) && e.children.length === 0);
  return el ? el.parentElement?.parentElement?.innerText : 'Not found';
});
console.log("AGENT_PROGRESS:", thoughtText);

process.exit(0);
