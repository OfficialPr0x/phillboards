const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
  // Serve static files from public directory
  if (req.url.startsWith('/assets/')) {
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      
      // Set appropriate content type based on file extension
      const ext = path.extname(filePath);
      let contentType = 'text/plain';
      
      if (ext === '.js') contentType = 'text/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg') contentType = 'image/jpg';
      
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    });
    return;
  }
  
  // Serve bundle.js
  if (req.url === '/bundle.js') {
    fs.readFile(path.join(__dirname, 'public', 'bundle.js'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(data);
    });
    return;
  }
  
  // Default: serve index.html
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading index.html');
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Web demo running at http://localhost:${port}`);
});
