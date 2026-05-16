import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'fs';

const get = (f) => { const i = process.argv.indexOf(f); return i !== -1 ? process.argv[i+1] : null; };
const url    = get('--url')    ?? 'http://localhost:3000';
const name   = get('--name')   ?? 'screen';
const width  = parseInt(get('--width')  ?? '1280');
const height = parseInt(get('--height') ?? '900');
const auth   = get('--auth');

mkdirSync('/tmp/uicolor', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  ...(auth ? { storageState: auth } : {}),
});
const page = await context.newPage();
try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
} catch {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
}

// Screenshot for visual reading
await page.screenshot({ path: `/tmp/uicolor/${name}.png`, fullPage: true });

// Extract color distribution from rendered elements
const palette = await page.evaluate(() => {
  const colorArea = new Map();
  const totalArea = document.documentElement.scrollHeight * window.innerWidth;

  document.querySelectorAll('*').forEach(el => {
    const rect   = el.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    const area   = rect.width * (rect.height || 1);
    if (area < 100) return;

    const style = getComputedStyle(el);
    const props = ['backgroundColor', 'color', 'borderTopColor', 'outlineColor'];

    props.forEach(prop => {
      const val = style[prop];
      if (!val || val === 'rgba(0, 0, 0, 0)' || val === 'transparent') return;
      colorArea.set(val, (colorArea.get(val) ?? 0) + (prop === 'backgroundColor' ? area : area * 0.1));
    });
  });

  return [...colorArea.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([color, area]) => ({
      color,
      coverage: Math.round((area / totalArea) * 1000) / 10,
    }));
});

const toHex = (rgb) => {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return rgb;
  return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
};

const result = {
  url,
  viewport: `${width}x${height}`,
  palette: palette.map(p => ({ ...p, hex: toHex(p.color) })),
};

writeFileSync(`/tmp/uicolor/${name}-palette.json`, JSON.stringify(result, null, 2));
await browser.close();

console.log(`screenshot: /tmp/uicolor/${name}.png`);
console.log(`palette:    /tmp/uicolor/${name}-palette.json`);
palette.slice(0, 10).forEach(p => console.log(`  ${toHex(p.color).padEnd(10)} ${p.coverage}%`));
