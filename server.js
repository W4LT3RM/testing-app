const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT) || 4173;
const publicDirectory = __dirname;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    const requestedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
    const filePath = path.resolve(publicDirectory, `.${decodeURIComponent(requestedPath)}`);

    if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const content = await fs.readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    response.end(content);
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(status === 404 ? '页面不存在' : '服务器内部错误');
  }
});

server.listen(port, host, () => {
  console.log(`启明学院网站已启动：http://localhost:${port}`);
});
