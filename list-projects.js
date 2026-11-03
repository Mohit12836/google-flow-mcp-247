import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const projects = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('a[href*="/project/"]'));
  return links.map(l => ({ text: l.innerText.trim(), href: l.href }));
});
console.log("PROJECTS_FOUND:", JSON.stringify(projects, null, 2));

const createButtons = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('button, div, a'));
  return els.filter(e => /new project|create project|blank project|\+ /i.test(e.innerText))
            .map(e => ({ tag: e.tagName, text: e.innerText.trim(), className: e.className }));
});
console.log("CREATE_BUTTONS:", JSON.stringify(createButtons.slice(0, 10), null, 2));

process.exit(0);
