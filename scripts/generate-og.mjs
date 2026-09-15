/**
 * OG image generator — deterministic deep-space banner, 1200×630 PNG.
 *
 * Renders an SVG (site palette: #05060d stage, indigo/violet/cyan accents,
 * DejaVu fonts — the only ones guaranteed present in this environment) and
 * rasterizes it with sharp into public/og.png, which Vite copies into dist/.
 *
 * Run: npm run og   (regenerate after changing copy here)
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og.png');

/** Deterministic PRNG so the starfield is stable between runs. */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260915);

const W = 1200;
const H = 630;

// ── starfield ─────────────────────────────────────────────────────
let stars = '';
for (let i = 0; i < 150; i++) {
  const x = rand() * W;
  const y = rand() * H;
  const r = 0.5 + rand() * 1.2;
  const o = 0.2 + rand() * 0.65;
  const c = rand() > 0.82 ? '#67e8f9' : rand() > 0.5 ? '#c7d2fe' : '#e2e8f0';
  stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c}" opacity="${o.toFixed(2)}"/>`;
}
// a few glowing "locked" stars
let glowStars = '';
for (let i = 0; i < 8; i++) {
  const x = 60 + rand() * (W - 120);
  const y = 50 + rand() * (H - 100);
  glowStars +=
    `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#67e8f9" opacity="0.14" filter="url(#soft)"/>` +
    `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="#a5f3fc" opacity="0.9"/>`;
}
// constellation lines between some of the glowing stars
let lines = '';
const pts = [];
for (let i = 0; i < 6; i++) pts.push([60 + rand() * (W - 120), 50 + rand() * (H - 100)]);
for (let i = 0; i < pts.length - 1; i++) {
  lines += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[i + 1][0].toFixed(1)}" y2="${pts[i + 1][1].toFixed(1)}" stroke="#818cf8" stroke-width="0.7" opacity="0.14"/>`;
}

// ── cert chips ────────────────────────────────────────────────────
const chips = ['AZ-305', 'AZ-104', 'D365 ×3', 'TERRAFORM', 'APPLIED AI'];
const MONO_W = 13.2; // approx px per char at 22px DejaVu Sans Mono
const CHIP_H = 44;
let chipX = 84;
let chipsSvg = '';
for (const label of chips) {
  const w = Math.ceil(label.length * MONO_W + 44);
  chipsSvg +=
    `<rect x="${chipX}" y="424" width="${w}" height="${CHIP_H}" rx="${CHIP_H / 2}" fill="#0e1526" stroke="#67e8f9" stroke-opacity="0.35" stroke-width="1.4"/>` +
    `<text x="${chipX + w / 2}" y="453" font-family="DejaVu Sans Mono" font-size="21" letter-spacing="1" fill="#a5f3fc" text-anchor="middle">${label}</text>`;
  chipX += w + 14;
}

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="neb1" cx="86%" cy="14%" r="55%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="neb2" cx="8%" cy="92%" r="50%">
      <stop offset="0%" stop-color="#0891b2" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="neb3" cx="55%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-120%" y="-120%" width="340%" height="340%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="55%" stop-color="#c7d2fe"/>
      <stop offset="100%" stop-color="#a5f3fc"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#05060d"/>
  <rect width="${W}" height="${H}" fill="url(#neb1)"/>
  <rect width="${W}" height="${H}" fill="url(#neb2)"/>
  <rect width="${W}" height="${H}" fill="url(#neb3)"/>
  ${lines}
  ${stars}
  ${glowStars}

  <!-- telemetry frame -->
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#818cf8" stroke-opacity="0.22" stroke-width="1"/>
  <circle cx="28" cy="28" r="3.5" fill="#67e8f9" opacity="0.9"/>
  <circle cx="${W - 28}" cy="${H - 28}" r="3.5" fill="#67e8f9" opacity="0.9"/>

  <!-- top telemetry row -->
  <text x="84" y="96" font-family="DejaVu Sans Mono" font-size="20" letter-spacing="4" fill="#67e8f9" opacity="0.85">GHENT, BE · CET · REMOTE FRIENDLY</text>
  <text x="${W - 84}" y="96" text-anchor="end" font-family="DejaVu Sans Mono" font-size="20" letter-spacing="4" fill="#818cf8" opacity="0.9">OPEN FOR ENGAGEMENTS</text>
  <line x1="84" y1="116" x2="${W - 84}" y2="116" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="1"/>

  <!-- identity -->
  <text x="80" y="252" font-family="DejaVu Sans" font-weight="bold" font-size="82" letter-spacing="-1" fill="url(#nameGrad)">Roel Moeyersoons</text>
  <text x="84" y="330" font-family="DejaVu Sans" font-size="33" fill="#94a3b8">Application Engineer — Dynamics 365 &amp; Power Platform</text>
  <text x="84" y="376" font-family="DejaVu Sans Mono" font-size="20" letter-spacing="2" fill="#64748b">C#/.NET ENGINEERING · AZURE PLATFORM · APPLIED AI</text>

  ${chipsSvg}

  <!-- bottom telemetry -->
  <line x1="84" y1="524" x2="${W - 84}" y2="524" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="1"/>
  <text x="84" y="562" font-family="DejaVu Sans Mono" font-size="20" letter-spacing="3" fill="#64748b">SIG · LOCKED — 6+ YEARS ENGINEERING</text>
  <text x="${W - 84}" y="562" text-anchor="end" font-family="DejaVu Sans Mono" font-size="20" letter-spacing="3" fill="#64748b">AZURE · D365 · .NET</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`OG image written: ${OUT}`);
