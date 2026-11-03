import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const bottomControls = await page.evaluate(() => {
  const bc = document.querySelector('.bottom-controls');
  return bc ? bc.innerHTML : 'No bottom-controls';
});
console.log("BOTTOM_CONTROLS:", bottomControls);

process.exit(0);
