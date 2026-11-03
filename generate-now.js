import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
// First press escape to close settings popover if open
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

const prompt = "Vertical 9:16 aspect ratio. Starts instantly with extreme fast terminal velocity freefall camera plunging downward through vibrant neon-lit sunset clouds. Heavy motion blur, instant adrenaline rush. Camera dives straight between colossal skyscrapers of a futuristic cyberpunk city with glowing neon holographic signs, slicing past flying vehicles, then plunges directly into a swirling cyan dimensional portal. The camera bursts out of the portal seamlessly right back into the identical clouds and downward freefall plunge. Continuous uninterrupted high-speed camera momentum, seamless loop: motion ends exactly where it started with identical velocity and angle, photorealistic 4K cinematic action.";

const editor = page.locator('.ProseMirror, [role="textbox"]').first();
await editor.click();
// Type or insert text into ProseMirror
await page.evaluate((text) => {
  const el = document.querySelector('.ProseMirror');
  if (el) {
    el.innerHTML = `<p>${text}</p>`;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}, prompt);

await page.waitForTimeout(800);

const submitBtn = page.locator('button[aria-label="Start generation"]').first();
console.log("Start generation visible:", await submitBtn.isVisible());
console.log("Start generation disabled:", await submitBtn.getAttribute("disabled"));

if (!(await submitBtn.getAttribute("disabled"))) {
  console.log("CLICKING START GENERATION NOW!");
  await submitBtn.click();
  console.log("Clicked successfully! Waiting 10s to inspect initial response...");
  await page.waitForTimeout(10000);
}

process.exit(0);
