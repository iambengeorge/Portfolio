/**
 * Post-build prerender script.
 * Spins up a local static server over dist/, visits each route with
 * headless Chrome (puppeteer), waits for React to finish rendering,
 * then writes the serialised DOM back to dist/ as static HTML.
 *
 * Run automatically via the `postbuild` npm script.
 */

import puppeteer from "puppeteer";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const PORT = 5179;

// Routes to prerender. /design-system is an internal dev tool, skip it.
const ROUTES = ["/", "/case/01", "/case/01-figma"];

// Requests to block so Puppeteer doesn't hang waiting for CDNs
const BLOCKED_HOSTS = ["cdn.jsdelivr.net", "unicornstudio", "app.unicornstudio.com"];

// ─── static file server ─────────────────────────────────────────────────────

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".json": "application/json",
  ".ico":  "image/x-icon",
};

function staticServer() {
  return createServer((req, res) => {
    const urlPath = req.url.split("?")[0];
    let filePath = path.join(DIST, urlPath);

    // SPA fallback: if the path has no extension or the file doesn't exist,
    // serve index.html so React Router can handle the route client-side.
    if (!path.extname(urlPath) || !fs.existsSync(filePath)) {
      filePath = path.join(DIST, "index.html");
    }

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] ?? "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}

// ─── main ────────────────────────────────────────────────────────────────────

async function prerender() {
  const server = staticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`\n[prerender] static server → http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();

      // Block CDN/WebGL requests so networkidle0 doesn't hang
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (BLOCKED_HOSTS.some((h) => url.includes(h))) {
          req.abort();
        } else {
          req.continue();
        }
      });

      // Suppress expected console errors from blocked requests
      page.on("console", () => {});
      page.on("pageerror", () => {});

      const url = `http://localhost:${PORT}${route}`;
      console.log(`[prerender] rendering ${route} …`);

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });

      // Extra tick so any deferred state updates settle
      await new Promise((r) => setTimeout(r, 500));

      const html = await page.content();

      // Write to the right location in dist/
      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, "index.html");
      fs.writeFileSync(outFile, html, "utf-8");

      const relativePath = "dist" + (route === "/" ? "/index.html" : route + "/index.html");
      console.log(`[prerender] ✓ wrote ${relativePath} (${(html.length / 1024).toFixed(1)} kB)`);

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("[prerender] done.\n");
}

prerender().catch((err) => {
  console.error("[prerender] FAILED:", err.message);
  process.exit(1);
});
