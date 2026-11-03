import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const sessionText = await page.evaluate(() => {
  const container = document.querySelector('.aisandbox-content, .session-container, flow-agent-session, flow-session-history');
  return container ? container.innerText.slice(0, 1500) : 'No container';
});
console.log("SESSION_TEXT:\n", sessionText);

const images = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img, video')).map(m => ({
    tag: m.tagName,
    src: m.src?.slice(0, 80),
    dataMediaId: m.getAttribute('data-media-id')
  }));
});
console.log("MEDIA_FOUND:", JSON.stringify(images, null, 2));

process.exit(0);
