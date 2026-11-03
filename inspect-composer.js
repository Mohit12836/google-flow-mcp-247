import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const promptArea = await page.evaluate(() => {
  const composer = document.querySelector('flow-composer, .composer, .prompt-box, flow-prompt-input, .input-container');
  if (composer) return composer.outerHTML.slice(0, 1000);
  const textareas = Array.from(document.querySelectorAll('textarea, [contenteditable="true"]'));
  return textareas.map(t => t.parentElement?.parentElement?.outerHTML.slice(0, 500));
});
console.log("PROMPT_AREA:", JSON.stringify(promptArea, null, 2));

process.exit(0);
