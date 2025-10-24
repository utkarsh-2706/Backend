const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, Utkarsh! Welcome to Node.js Server');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
