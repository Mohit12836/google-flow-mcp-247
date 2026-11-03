import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
console.log("URL:", page.url());

const b1 = page.getByRole("button", { name: "Settings trigger" });
console.log("getByRole Settings trigger visible:", await b1.isVisible().catch(() => false));

const b2 = page.locator('button[aria-label="Settings trigger"]');
console.log("locator Settings trigger visible:", await b2.isVisible().catch(() => false));

const b3 = page.locator('button[aria-label*="Settings"], button:has-text("Settings")');
console.log("Other settings buttons count:", await b3.count());
for (let i = 0; i < await b3.count(); i++) {
  const el = b3.nth(i);
  console.log(`Setting btn ${i}: text='${await el.innerText().catch(() => '')}', aria='${await el.getAttribute('aria-label').catch(() => '')}'`);
}

process.exit(0);
