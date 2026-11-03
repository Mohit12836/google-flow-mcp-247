import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const btn = page.locator("button.new-project-button, button:has-text('New project')").first();
if (await btn.isVisible().catch(() => false)) {
  console.log("Clicking New Project button...");
  await btn.click();
  await page.waitForURL(/\/project\//, { timeout: 15000 }).catch(() => {});
  console.log("Project URL:", page.url());
} else {
  const firstProj = page.locator("a[href*='/project/']").first();
  console.log("Clicking first existing project...");
  await firstProj.click();
  await page.waitForURL(/\/project\//, { timeout: 15000 }).catch(() => {});
  console.log("Project URL:", page.url());
}
process.exit(0);
