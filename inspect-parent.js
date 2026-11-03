import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const parentHtml = await page.evaluate(() => {
  const editor = document.querySelector('flow-rich-text-editor');
  return editor?.parentElement?.outerHTML.slice(0, 2000);
});
console.log("PARENT_HTML:", parentHtml);

process.exit(0);
