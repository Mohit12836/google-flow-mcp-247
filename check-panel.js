import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const textarea = page.locator('textarea, [contenteditable="true"]').first();
console.log("Textarea isVisible:", await textarea.isVisible().catch(() => false));

const sideMenu = page.locator('.side-menu, flow-session-history, flow-agent-session');
console.log("Side menu / Agent session count:", await sideMenu.count());
for (let i = 0; i < await sideMenu.count(); i++) {
  console.log(`Panel ${i}:`, await sideMenu.nth(i).evaluate(el => ({ tag: el.tagName, class: el.className, visible: el.offsetParent !== null })));
}

// Check close buttons
const closeButtons = page.locator('button[aria-label="Close"], button:has-text("Close")');
console.log("Close buttons:", await closeButtons.count());
for (let i = 0; i < await closeButtons.count(); i++) {
  console.log(`Close ${i}:`, await closeButtons.nth(i).evaluate(el => ({ aria: el.getAttribute('aria-label'), text: el.innerText })));
}

process.exit(0);
