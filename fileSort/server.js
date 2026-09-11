const http =require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const PORT =8080;
const watch_dir = path.join(__dirname ,'watch');
const { EventEmitter } = require('events');
const fileEvents = new EventEmitter();

async function getStats(){
    const categories= await fs.readdir(watch_dir,{ withFileTypes: true});
    const stats = {};
    for (const entry of categories) {
        if (entry.isDirectory()) {
        const files = await fs.readdir(path.join(WATCH_DIR, entry.name));
        stats[entry.name] = files.length;
        }
    }
    return stats;
}
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === '/api/stats') {
    const stats = await getStats();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats));
    return;
  }
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>FileSort Dashboard</h1>
          <pre id="stats">Loading...</pre>
          <script>
            fetch('/api/stats')
              .then(r => r.json())
              .then(data => {
                document.getElementById('stats').textContent =
                  JSON.stringify(data, null, 2);
              });
          </script>
        </body>
      </html>
    `);
    return;
  }
  if (pathname === '/favicon.ico') {
  res.writeHead(204); // No Content
  res.end();
  return;
}
  if (pathname === '/api/live') {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
  fileEvents.on('sorted', send);

  req.on('close', () => fileEvents.off('sorted', send));
  return;
    }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
     console.log(`Dashboard at http://localhost:${PORT}`)
    });