import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const prompt = "Vertical 9:16 aspect ratio. Starts instantly with extreme fast terminal velocity freefall camera plunging downward through vibrant neon-lit sunset clouds. Heavy motion blur, instant adrenaline rush. Camera dives straight between colossal skyscrapers of a futuristic cyberpunk city with glowing neon holographic signs, slicing past flying vehicles, then plunges directly into a swirling cyan dimensional portal. The camera bursts out of the portal seamlessly right back into the identical clouds and downward freefall plunge. Continuous uninterrupted high-speed camera momentum, seamless loop: motion ends exactly where it started with identical velocity and angle, photorealistic 4K cinematic action.";

const editor = page.locator('.ProseMirror, [role="textbox"]').first();
console.log("Editor visible:", await editor.isVisible());

await editor.click();
await editor.fill(prompt);
await page.waitForTimeout(500);

const submitBtn = page.locator('button[aria-label="Start generation"]').first();
console.log("Submit button disabled:", await submitBtn.getAttribute("disabled"));

if (!(await submitBtn.getAttribute("disabled"))) {
  console.log("Clicking Start Generation...");
  await submitBtn.click();
  console.log("Clicked! Waiting 5s to check generation status...");
  await page.waitForTimeout(5000);
}

process.exit(0);
