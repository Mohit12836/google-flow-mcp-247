import { getFlowPage } from "./dist/chrome.js";

const page = await getFlowPage();
const messages = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('.session-history-message, .agent-message, flow-session-message, .chat-message, [role="log"], .agent-thought'));
  return all.map(m => m.innerText.trim().replace(/\n/g, ' '));
});
console.log("AGENT_MESSAGES:", JSON.stringify(messages, null, 2));

process.exit(0);
