import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const b1 = page.locator('button[aria-label="Settings trigger"]');
console.log("b1 box:", await b1.boundingBox().catch(() => null));
console.log("b1 parent html:", await b1.evaluate(el => el.parentElement?.outerHTML.slice(0, 300)).catch(() => null));

const b2 = page.locator('button:has-text("tune"), button[aria-label="Settings"]').last();
console.log("b2 box:", await b2.boundingBox().catch(() => null));
console.log("b2 isVisible:", await b2.isVisible().catch(() => false));
console.log("b2 html:", await b2.evaluate(el => el.outerHTML).catch(() => null));

process.exit(0);
