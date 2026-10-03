// Local development server. GitHub Pages serves the static files when published.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const phonePreview = process.argv.includes("--lan");
const host = phonePreview ? "0.0.0.0" : "127.0.0.1";
const files = {
  "/": "index.html",
  "/index.html": "index.html",
  "/outside.html": "outside.html",
  "/styles.css": "styles.css",
  "/script.js": "script.js"
};
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const imagePath = pathname.slice(1);
  const filename = files[pathname] || (
    /^[a-z0-9-]+\.png$/.test(imagePath) ? imagePath : null
  );

  if (!filename) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  fs.readFile(path.join(__dirname, filename), (error, contents) => {
    if (error) {
      response.writeHead(500);
      response.end("Could not load file");
      return;
    }

    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filename)] });
    response.end(contents);
  });
}).listen(port, host, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
  if (phonePreview) {
    console.log(`Phone preview enabled. Open http://YOUR-LAPTOP-IP:${port} on a phone using the same Wi-Fi.`);
  }
});
