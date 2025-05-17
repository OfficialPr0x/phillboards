const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup logging
app.use(morgan('tiny'));

// Enable gzip compression
app.use(compression());

// Serve static files from the web-build directory
const webBuildDir = path.join(__dirname, 'web-build');

// Check if web-build directory exists, if not, prompt to build first
if (!fs.existsSync(webBuildDir)) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: web-build directory not found!');
  console.log('\x1b[33m%s\x1b[0m', 'Please build the web app first using:');
  console.log('\x1b[36m%s\x1b[0m', 'node web-build.js');
  process.exit(1);
}

// Serve static assets
app.use(express.static(webBuildDir, {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set cache headers for different file types
    if (path.endsWith('.html')) {
      // HTML files - no cache
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
      // Static assets - cache for 1 week
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  },
}));

// Handle all other routes by serving index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(webBuildDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `✅ Phillboards web server running on port ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `   Local:  http://localhost:${PORT}`);
  
  // Try to get network IP
  try {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        if (net.family === 'IPv4' && !net.internal) {
          console.log(`\x1b[36m%s\x1b[0m`, `   Network: http://${net.address}:${PORT}`);
          break;
        }
      }
    }
  } catch (err) {
    // Silently fail if we can't get network info
  }
  
  console.log('\x1b[33m%s\x1b[0m', '📱 Open the app in your browser or access it from other devices on your network');
}); 