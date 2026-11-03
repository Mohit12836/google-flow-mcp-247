#!/usr/bin/env bash
# ==============================================================================
# Google Flow MCP 24/7 VPS One-Click Auto-Deployer
# Supported OS: Ubuntu 20.04/22.04/24.04, Debian 11/12
# ==============================================================================

set -e

echo "🚀 [1/5] Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

echo "📦 [2/5] Checking Docker & Docker Compose..."
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Installing Docker Compose plugin..."
    sudo apt-get install -y docker-compose-plugin docker-compose
fi

echo "📁 [3/5] Setting up persistent storage directories..."
mkdir -p chrome-profile flow-mcp-out
chmod 777 chrome-profile flow-mcp-out

echo "🔨 [4/5] Building and Launching Docker 24/7 Container..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d --build
else
    docker compose up -d --build
fi

echo "=============================================================================="
echo "🎉 SUCCESS: Google Flow MCP is now running 24/7 on your VPS!"
echo "=============================================================================="
echo ""
echo "🔑 ONE-TIME GOOGLE ACCOUNT LOGIN SETUP:"
echo "From your local PC (laptop/desktop), run this command in your terminal:"
echo ""
echo "    ssh -L 9333:localhost:9333 <your-vps-user>@<your-vps-ip>"
echo ""
echo "Then on your local PC browser, open:"
echo "    http://localhost:9333"
echo "Click the page inspecting Flow, and log in to your Google Account once!"
echo "Your login session will be saved permanently in ./chrome-profile."
echo ""
echo "📊 Check Status: docker ps"
echo "📜 View Logs:    docker logs -f google-flow-mcp-247"
echo "⏹️ Stop Server:  docker compose down"
echo "=============================================================================="
