import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
console.log("Current URL:", page.url());

const promptInput = page.getByPlaceholder(/describe|prompt|ask/i).or(page.locator("textarea, [contenteditable='true']")).first();
console.log("Prompt input visible:", await promptInput.isVisible().catch(() => false));

const generateBtn = page.getByRole("button", { name: /generate|create/i }).first();
console.log("Generate button visible:", await generateBtn.isVisible().catch(() => false));

process.exit(0);
