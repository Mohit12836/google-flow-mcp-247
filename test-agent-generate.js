import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();

// Close any open side drawers if any
const closeBtn = page.locator('.agent-panel-wrapper button:has-text("close"), .agent-panel-wrapper button[aria-label="Close"]').first();
if (await closeBtn.isVisible().catch(() => false)) {
  await closeBtn.click();
  await page.waitForTimeout(500);
}

// Focus ProseMirror
const editor = page.locator(".ProseMirror").first();
console.log("Clicking ProseMirror...");
await editor.click();
await page.waitForTimeout(300);

// Clear any old text
await page.keyboard.press("Control+A");
await page.keyboard.press("Backspace");
await page.waitForTimeout(200);

const prompt = "Generate a 9:16 vertical video. Starts instantly with extreme fast terminal velocity freefall camera plunging downward through vibrant neon-lit sunset clouds. Heavy motion blur, instant adrenaline rush. Camera dives straight between colossal skyscrapers of a futuristic cyberpunk city with glowing neon holographic signs, slicing past flying vehicles, then plunges directly into a swirling cyan dimensional portal. The camera bursts out of the portal seamlessly right back into the identical clouds and downward freefall plunge. Continuous uninterrupted high-speed camera momentum, seamless loop: motion ends exactly where it started with identical velocity and angle, photorealistic 4K cinematic action.";

console.log("Inserting prompt text...");
await page.keyboard.insertText(prompt);
await page.waitForTimeout(800);

const startBtn = page.getByRole("button", { name: "Start generation" });
console.log("Start generation enabled:", await startBtn.isEnabled());

if (await startBtn.isEnabled()) {
  console.log("CLICKING START GENERATION NOW!");
  await startBtn.click();
  console.log("Start generation clicked! Waiting 5s to confirm generation started...");
  await page.waitForTimeout(5000);
}

process.exit(0);
