import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const modals = await page.evaluate(() => {
  const dialogs = Array.from(document.querySelectorAll('dialog, [role="dialog"], .cdk-overlay-container, mat-dialog-container'));
  return dialogs.map(d => ({
    tag: d.tagName,
    role: d.getAttribute('role'),
    text: d.innerText.slice(0, 200).replace(/\n/g, ' ')
  })).filter(d => d.text.trim().length > 0);
});
console.log("MODALS_OPEN:", JSON.stringify(modals, null, 2));

process.exit(0);
