import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIR  = '/tmp/thump01/design_handoff_before_after_mockup';
const PORT = 5183;
const OUT  = '/tmp/mockup-variants';

fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.otf':'font/otf','.woff2':'font/woff2' };
const server = createServer((req, res) => {
  const fp = path.join(DIR, req.url.split('?')[0]);
  try {
    const buf = fs.readFileSync(fp);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
    res.end(buf);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(PORT, r));

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 960, height: 580, deviceScaleFactor: 2 });
await page.goto(`http://localhost:${PORT}/viewer.html`, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

for (const [id, label] of [['vA','A'],['vA2','A2'],['vB','B'],['vC','C'],['vD','D']]) {
  const el = await page.$(`#${id}`);
  if (!el) { console.log(`#${id} not found`); continue; }
  const out = `${OUT}/variant-${label}.png`;
  await el.screenshot({ path: out });
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`variant ${label} → ${out} (${kb} kB)`);
}

await browser.close();
server.close();
console.log('done');
