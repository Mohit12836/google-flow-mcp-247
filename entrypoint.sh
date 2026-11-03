#!/usr/bin/env bash
set -e

echo "=== [1/3] Starting Virtual Framebuffer (Xvfb) on display :99 ==="
Xvfb :99 -screen 0 1920x1080x24 -nolisten tcp &
sleep 2

PROFILE_DIR="/app/chrome-profile"
mkdir -p "$PROFILE_DIR"

echo "=== [2/3] Launching Chromium with Remote Debugging on port 9333 ==="
chromium \
  --remote-debugging-port=9333 \
  --remote-debugging-address=0.0.0.0 \
  --user-data-dir="$PROFILE_DIR" \
  --no-sandbox \
  --disable-setuid-sandbox \
  --disable-dev-shm-usage \
  --disable-gpu \
  --window-size=1920,1080 \
  --start-maximized \
  --no-first-run \
  --no-default-browser-check \
  "https://flow.google.com" &

echo "Waiting for Chromium CDP to be ready on port 9333..."
for i in {1..30}; do
  if curl -s http://127.0.0.1:9333/json/version > /dev/null 2>&1; then
    echo "✅ Chromium CDP is live and ready on port 9333!"
    break
  fi
  sleep 1
done

echo "=== [3/3] Starting Google Flow MCP Server ==="
node dist/index.js
