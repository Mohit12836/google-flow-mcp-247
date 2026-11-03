import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const text = await page.evaluate(() => {
  const messages = Array.from(document.querySelectorAll('.session-history-message, flow-session-message, .agent-message, [role="log"] *'));
  return messages.map(m => m.innerText.trim()).filter(t => t.length > 20).slice(-5);
});
console.log("LAST_MESSAGES:", JSON.stringify(text, null, 2));

const approveRows = await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('.option-row'));
  return rows.map((r, i) => ({
    index: i,
    text: r.innerText.trim(),
    ariaChecked: r.getAttribute('aria-checked'),
    ariaDisabled: r.getAttribute('aria-disabled'),
    className: r.className
  }));
});
console.log("ALL_APPROVE_ROWS:", JSON.stringify(approveRows, null, 2));

process.exit(0);
