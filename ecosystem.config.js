module.exports = {
  apps: [
    {
      name: 'flow-chromium',
      script: 'bash',
      args: '-c "Xvfb :99 -screen 0 1920x1080x24 -nolisten tcp & sleep 1; chromium --remote-debugging-port=9333 --user-data-dir=./chrome-profile --no-sandbox --disable-dev-shm-usage --window-size=1920,1080 https://flow.google.com"',
      env: {
        DISPLAY: ':99'
      },
      restart_delay: 5000,
      autorestart: true
    },
    {
      name: 'flow-mcp-server',
      script: 'node',
      args: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        CDP_PORT: '9333'
      },
      restart_delay: 3000,
      autorestart: true
    }
  ]
};
