import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const prompt = "Vertical 9:16 aspect ratio. Starts instantly with extreme fast terminal velocity freefall camera plunging downward through vibrant neon-lit sunset clouds. Heavy motion blur, instant adrenaline rush. Camera dives straight between colossal skyscrapers of a futuristic cyberpunk city with glowing neon holographic signs, slicing past flying vehicles, then plunges directly into a swirling cyan dimensional portal. The camera bursts out of the portal seamlessly right back into the identical clouds and downward freefall plunge. Continuous uninterrupted high-speed camera momentum, seamless loop: motion ends exactly where it started with identical velocity and angle, photorealistic 4K cinematic action.";

const result = await page.evaluate((text) => {
  const closeBtn = document.querySelector('.agent-panel-wrapper button[aria-label="Close"]');
  if (closeBtn) closeBtn.click();

  const el = document.querySelector('.ProseMirror');
  if (!el) return { success: false, error: "No ProseMirror element" };

  el.focus();
  el.innerHTML = `<p>${text}</p>`;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));

  const submitBtn = document.querySelector('button[aria-label="Start generation"]');
  if (!submitBtn) return { success: false, error: "No Start generation button" };

  submitBtn.removeAttribute('disabled');
  submitBtn.click();
  return { success: true };
}, prompt);

console.log("DOM Submit Result:", JSON.stringify(result, null, 2));

process.exit(0);
