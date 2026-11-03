FROM node:20-bookworm-slim

# Install system dependencies, Chromium, and Xvfb for headless virtual display
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    procps \
    curl \
    git \
    xvfb \
    chromium \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build TypeScript
COPY . .
RUN npm run build

# Make entrypoint script executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose CDP Remote Debugging Port and MCP/Webhook Port
EXPOSE 9333 3000

ENV DISPLAY=:99
ENV CHROME_PATH=/usr/bin/chromium
ENV CDP_PORT=9333

ENTRYPOINT ["/app/entrypoint.sh"]
