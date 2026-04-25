/**
 * Generates first-fold thumbnail screenshots for every case study.
 * Local routes are served from dist/. External URLs are visited directly.
 *
 * Usage: node scripts/screenshot-thumbnails.mjs
 * Output: public/images/thumbnails/case-01.png, case-02.png, case-03.png
 */

import puppeteer from "puppeteer";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST     = path.join(__dirname, "..", "dist");
const OUT_DIR  = path.join(__dirname, "..", "public", "images", "thumbnails");
const PORT     = 5181;

const VIEWPORT = { width: 1440, height: 820, deviceScaleFactor: 2 };

const CASES = [
  {
    slug:      "case-01",
    localPath: "/case/01",      // served from local dist
    waitFor:   "networkidle0",
    delay:     600,
  },
  {
    slug:    "case-02",
    url:     "https://wondrous-need-786173.framer.app/",
    waitFor: "networkidle2",
    delay:   1500,
  },
  {
    slug:    "case-03",
    url:     "https://www.behance.net/gallery/217296307/Fairsplits-UIUX-Case-study-Bill-splitting-app",
    waitFor: "networkidle2",
    delay:   2000,
  },
];

// ─── minimal static server for dist/ ────────────────────────────────────────

const MIME = {
  ".html":  "text/html; charset=utf-8",
  ".js":    "application/javascript",
  ".css":   "text/css",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".jpeg":  "image/jpeg",
  ".svg":   "image/svg+xml",
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".json":  "application/json",
};

function staticServer() {
  return createServer((req, res) => {
    const urlPath  = req.url.split("?")[0];
    let   filePath = path.join(DIST, urlPath);
    if (!path.extname(urlPath) || !fs.existsSync(filePath)) {
      filePath = path.join(DIST, "index.html");
    }
    try {
      const content = fs.readFileSync(filePath);
      const ext     = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404); res.end("Not found");
    }
  });
}

// ─── main ────────────────────────────────────────────────────────────────────

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = staticServer();
  await new Promise((r) => server.listen(PORT, r));
  console.log(`\n[thumbnails] static server → http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    for (const c of CASES) {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);

      // Block CDN/WebGL so local pages don't hang
      if (c.localPath) {
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          const u = req.url();
          if (u.includes("jsdelivr.net") || u.includes("unicornstudio")) req.abort();
          else req.continue();
        });
      }

      page.on("console",   () => {});
      page.on("pageerror", () => {});

      const url = c.localPath
        ? `http://localhost:${PORT}${c.localPath}`
        : c.url;

      console.log(`[thumbnails] capturing ${c.slug} — ${url}`);

      try {
        await page.goto(url, { waitUntil: c.waitFor, timeout: 30_000 });
        await new Promise((r) => setTimeout(r, c.delay));

        // Hide any cookie banners / modals on external sites
        await page.evaluate(() => {
          document.querySelectorAll(
            '[class*="cookie"], [id*="cookie"], [class*="modal"], [class*="overlay"], [class*="banner"], [id*="onetrust"]'
          ).forEach((el) => { el.style.display = "none"; });
        }).catch(() => {});

        const outPath = path.join(OUT_DIR, `${c.slug}.png`);
        await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height } });

        const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
        console.log(`[thumbnails] ✓ saved public/images/thumbnails/${c.slug}.png (${kb} kB)`);
      } catch (err) {
        console.warn(`[thumbnails] ✗ ${c.slug} failed: ${err.message}`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("[thumbnails] done.\n");
}

run().catch((err) => {
  console.error("[thumbnails] FAILED:", err.message);
  process.exit(1);
});
