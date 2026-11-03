import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const info = await page.evaluate(() => {
  const el = document.querySelector('.ProseMirror, [role="textbox"]');
  if (!el) return 'Element not found';
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return {
    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    display: style.display,
    visibility: style.visibility,
    opacity: style.opacity,
    offsetParent: el.offsetParent !== null,
    parentTag: el.parentElement?.tagName,
    parentClass: el.parentElement?.className
  };
});
console.log("INFO:", JSON.stringify(info, null, 2));

process.exit(0);
