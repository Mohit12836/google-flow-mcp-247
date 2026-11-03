# 🚀 Google Flow MCP 24/7 (Production Server & VPS Deployer)

Autonomous 24/7 Model Context Protocol (MCP) Server for **Google Flow / Veo 3.1 AI Video Generation**, pre-configured for headless Linux VPS (Ubuntu/Debian) and local systems with persistent sessions, Xvfb virtual display, and auto-recovery.

---

## 🌟 Key Features
- **24/7 Autonomous Daemon:** Runs continuously in the background via Docker or PM2/Systemd.
- **Persistent Google Login:** Mounts `./chrome-profile` volume so you log in once; sessions survive container restarts and server reboots.
- **Headless Xvfb + Chromium:** Renders full Google Flow web UI in a headless Linux environment without requiring a physical monitor or GPU.
- **Agent Mode & UI Selectors Patched:** Includes full fixes for Google Flow's recent UI updates, ProseMirror text input, and download menus.
- **High-Speed MP4 Downloader:** Automatically monitors generation status, fetches rendered MP4 videos, and outputs to `./flow-mcp-out/`.

---

## ⚡ 1-Click VPS Deployment (Ubuntu / Debian)

On your VPS terminal, run the following commands:

```bash
# 1. Clone this repository
git clone https://github.com/Mohit12836/google-flow-mcp-247.git
cd google-flow-mcp-247

# 2. Run the 1-click installer
chmod +x deploy_vps.sh
./deploy_vps.sh
```

That's it! Docker will automatically install Chromium, setup Xvfb, build the TypeScript MCP server, and start running 24/7.

---

## 🔑 One-Time Google Login Setup (2 Minutes)

Because your VPS is running headless without a monitor, follow this simple and secure method to log in to your Google Account on the VPS:

1. **On your local PC (Windows PowerShell or Mac/Linux Terminal), run:**
   ```bash
   ssh -L 9333:localhost:9333 root@YOUR_VPS_IP
   ```
   *(Replace `root` with your VPS username, and `YOUR_VPS_IP` with your actual VPS IP address).*

2. **Open your local browser (Chrome/Edge) and go to:**
   ```
   http://localhost:9333
   ```
   You will see the list of open tabs on your VPS Chromium.

3. **Click on `Google Flow`:**
   A remote DevTools inspection window will open. Click "Sign in" with your Google Account (with Pro credits).

4. **Done!** The session cookies and tokens are permanently saved inside `./chrome-profile` on your VPS. You can now close the SSH tunnel. The bot will stay logged in 24/7!

---

## 🛠️ Management & Monitoring Commands

| Action | Command |
| :--- | :--- |
| **Check Live Status** | `docker ps` |
| **View Live Real-Time Logs** | `docker logs -f google-flow-mcp-247` |
| **Restart Service** | `docker compose restart` |
| **Stop Service** | `docker compose down` |
| **Update to Latest Code** | `git pull && docker compose up -d --build` |

---

## 🔌 Connecting to Claude Code / Antigravity / Cursor

Add this to your `claude.json` or MCP configuration file on your local PC or client machine:

```json
{
  "mcpServers": {
    "google-flow": {
      "command": "node",
      "args": ["/path/to/google-flow-mcp-247/dist/index.js"],
      "env": {
        "CDP_PORT": "9333"
      }
    }
  }
}
```

Or connect over SSH tunnel / HTTP proxy from your external automation flows (n8n, Make, WhatsApp bots).

---

## 🛡️ License & Credit Safety
This project interacts with your authorized Google Flow account via standard Chrome DevTools Protocol (CDP). No prompts or generations are executed without your explicit instruction. Your Pro credits remain completely safe.
