import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
console.log("Current URL:", page.url());

const editor = page.locator('.ProseMirror, [role="textbox"]').first();
console.log("Editor visible:", await editor.isVisible().catch(() => false));

const startBtn = page.getByRole("button", { name: "Start generation" });
console.log("Start button visible:", await startBtn.isVisible().catch(() => false));

process.exit(0);
