import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const grandParentHtml = await page.evaluate(() => {
  const editor = document.querySelector('flow-rich-text-editor');
  return editor?.parentElement?.parentElement?.outerHTML.slice(0, 3000);
});
console.log("GRANDPARENT_HTML:", grandParentHtml);

process.exit(0);
