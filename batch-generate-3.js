import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();

// Focus ProseMirror
const editor = page.locator(".ProseMirror").first();
await editor.click();
await page.waitForTimeout(300);

// Clear any old text
await page.keyboard.press("Control+A");
await page.keyboard.press("Backspace");
await page.waitForTimeout(200);

const prompt = `Generate 3 separate 9:16 vertical videos with realistic human characters, expressive faces, and spoken dialogue with accurate lip sync:

Scene 1 (Suspense):
Vertical 9:16. Cinematic medium close-up of an intense 28-year-old man with sharp stubble and wide haunting brown eyes, wearing a black turtleneck in a dimly lit dark bedroom with volumetric moonlight shadows. He stares unblinkingly straight into the camera lens and whispers with chilling intensity and natural lip sync: "If you suddenly wake up at 3 AM tonight... never look at the dark corner of your ceiling." Audio: Deep eerie sub-bass drone, crisp intimate vocal whisper. Photorealistic 4K cinematic film suspense.

Scene 2 (Drama):
Vertical 9:16. Cinematic tight medium shot inside a luxury five-star restaurant. A young 24-year-old man in a simple hoodie sits calmly at a marble table. He looks up at the camera with a calm confident smirk, raises a black titanium credit card, and speaks clearly with sharp facial expressions and perfect lip sync: "You're firing me? Wait two minutes... your boss is transferring this whole hotel to my name." Audio: Soft ambient clinking of glasses, crisp confident vocal dialogue. Warm amber restaurant lighting, photorealistic 4K cinematic drama.

Scene 3 (Warrior):
Vertical 9:16. Low-angle powerful hero shot of a fierce ancient warrior king with long windblown dark hair, golden engraved royal armor, sweat and battle dust on his face, holding a heavy steel sword on a burning battlefield at sunset with flying embers. He glares fiercely into the camera lens and speaks with a thunderous commanding voice and accurate lip sync: "A throne is never begged for... it is carved with courage and fire!" Audio: Distant deep war drum, crackling fire embers, powerful booming voice. Epic blockbuster cinematic lighting, 8k.`;

console.log("Inserting batch prompt text...");
await page.keyboard.insertText(prompt);
await page.waitForTimeout(800);

const startBtn = page.getByRole("button", { name: "Start generation" });
console.log("Start generation enabled:", await startBtn.isEnabled());

if (await startBtn.isEnabled()) {
  console.log("CLICKING START GENERATION FOR ALL 3 SCENES!");
  await startBtn.click();
  console.log("Clicked! Waiting for Agent response and approval prompt...");
  
  // Wait up to 25s for the Agent to propose the batch and show Approve button
  for (let i = 0; i < 25; i++) {
    await page.waitForTimeout(1000);
    const approveRow = page.locator('.option-row').filter({ hasText: /approve/i }).first();
    if (await approveRow.isVisible().catch(() => false)) {
      console.log("FOUND APPROVE BUTTON! Clicking to start generation...");
      await approveRow.click();
      console.log("BATCH GENERATION APPROVED!");
      break;
    }
  }
}

process.exit(0);
