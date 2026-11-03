import { getFlowPage } from "./dist/chrome.js";
import { mkdirSync } from "node:fs";

const page = await getFlowPage();
const outDir = "C:\\Users\\hp\\flow-mcp-out\\viral-loop";
mkdirSync(outDir, { recursive: true });

console.log("Monitoring video rendering in Google Flow...");
let finished = false;
let iterations = 0;

while (!finished && iterations < 30) {
  iterations++;
  await page.waitForTimeout(6000);
  
  // Check if Stop button is still visible
  const stopBtn = page.getByRole("button", { name: /stop/i }).first();
  const isStopVisible = await stopBtn.isVisible().catch(() => false);
  
  // Check percentage progress
  const mainText = await page.locator("main").first().innerText();
  const pending = mainText.match(/\d+%/g);
  
  console.log(`[${iterations * 6}s] Generating... StopBtn: ${isStopVisible}, Progress: ${pending ? pending.join(', ') : 'rendering in progress'}`);
  
  if (!isStopVisible) {
    finished = true;
    console.log("VIDEO RENDERING COMPLETE!");
  }
}

// Inspect tiles and videos
const mediaDetails = await page.evaluate(() => {
  const videos = Array.from(document.querySelectorAll('video, flow-grid-tile-container, flow-media-tile')).map(v => ({
    tag: v.tagName,
    src: v.getAttribute('src') || (v.querySelector('video') ? v.querySelector('video').src : null),
    aria: v.getAttribute('aria-label')
  }));
  return videos;
});
console.log("MEDIA_DETAILS:", JSON.stringify(mediaDetails, null, 2));

process.exit(0);
