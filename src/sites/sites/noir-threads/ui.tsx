/**
 * Noir Threads — shared local primitives
 *
 * Editorial monochrome noir (rbp-portfolio inspired):
 *   bg #0a0a0a · text #fafafa · muted #a3a3a3 · hairlines #262626
 *   single accent #3b82f6 · Fraunces display (font-serif) · rounded-3xl
 * Restraint IS the identity — no colorful gradients.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';
import Artwork from '@/sites/shared/Artwork';
import { CountUp } from '@/sites/shared/bits';
import type { ArtSpec } from '@/sites/shared/content';

// ── tokens ────────────────────────────────────────────────────────
export const INK = '#fafafa';
export const MUTED = '#a3a3a3';
export const FAINT = '#525252';
export const HAIRLINE = '#262626';
export const ACCENT = '#3b82f6';

/** Shared editorial ease (matches aurora-glass motion feel). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── seeded rng (same recipe as shared Artwork) ────────────────────
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── monochrome artwork as SVG data URIs ───────────────────────────
export interface ArtUriOptions {
  w?: number;
  h?: number;
  /** 0–1 — how much of the single blue accent may surface */
  hint?: number;
  bg?: string;
}

/**
 * Deterministic, grayscale-able SVG data URI mirroring the shared Artwork
 * styles — grays carry the drawing, blue appears only in small doses so the
 * AccordionGallery's active panel reveals a hint of accent.
 */
export function artDataUri(spec: ArtSpec, seed: string, opts: ArtUriOptions = {}): string {
  const W = opts.w ?? 960;
  const H = opts.h ?? 1200;
  const bg = opts.bg ?? '#111111';
  const hint = Math.min(1, Math.max(0, opts.hint ?? 0.55));
  const rng = mulberry32(hashString(`${seed}:${spec.style}`));
  const g = (l: number, a = 1) => `hsla(0,0%,${Math.round(l)}%,${a})`;
  const b = (a: number) => `rgba(59,130,246,${a})`;
  const p: string[] = [];

  switch (spec.style) {
    case 'orbits': {
      const cx = W / 2;
      const cy = H / 2;
      const base = Math.min(W, H) / 2;
      p.push(`<circle cx="${cx}" cy="${cy}" r="${(10 + rng() * 14).toFixed(1)}" fill="none" stroke="${g(76)}" stroke-width="1.4"/>`);
      const n = 7;
      for (let i = 0; i < n; i++) {
        const r = base * (0.16 + (i / n) * 0.82) + (rng() - 0.5) * 24;
        const dashed = rng() > 0.6;
        const accent = i === 2 || i === 5;
        p.push(
          `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${accent ? b(0.9 * hint) : g(26 + (i / n) * 52, 0.9)}" stroke-width="${dashed ? 1 : 1.6}"${dashed ? ' stroke-dasharray="5 14"' : ''}/>`
        );
        if (i % 2 === 0) {
          const ang = rng() * Math.PI * 2;
          p.push(
            `<circle cx="${(cx + Math.cos(ang) * r).toFixed(1)}" cy="${(cy + Math.sin(ang) * r).toFixed(1)}" r="${(2.5 + rng() * 4).toFixed(1)}" fill="${accent ? b(0.95) : g(70, 0.9)}"/>`
          );
        }
      }
      break;
    }
    case 'mesh': {
      const cols = 8;
      const rows = 11;
      const pts: string[][] = [];
      for (let r = 0; r <= rows; r++) {
        const row: string[] = [];
        for (let c = 0; c <= cols; c++) {
          const x = (c / cols) * (W + 120) - 60;
          const y = (r / rows) * (H + 120) - 60;
          const dx = Math.sin(r * 0.9 + c * 0.55) * 34 + (rng() - 0.5) * 14;
          const dy = Math.cos(c * 0.8 + r * 0.5) * 26;
          row.push(`${(x + dx).toFixed(1)},${(y + dy).toFixed(1)}`);
        }
        pts.push(row);
      }
      pts.forEach((row, r) => {
        p.push(`<polyline points="${row.join(' ')}" fill="none" stroke="${g(30 + (r % 3) * 14, 0.5)}" stroke-width="1.1"/>`);
      });
      for (let c = 0; c <= cols; c += 2) {
        p.push(`<polyline points="${pts.map((row) => row[c]).join(' ')}" fill="none" stroke="${g(22, 0.35)}" stroke-width="1"/>`);
      }
      for (let i = 0; i < 6; i++) {
        const r = Math.floor(rng() * (rows + 1));
        const c = Math.floor(rng() * (cols + 1));
        const [x, y] = pts[r][c].split(',');
        p.push(`<circle cx="${x}" cy="${y}" r="${(3 + rng() * 4).toFixed(1)}" fill="${i < 2 ? b(0.85 * hint) : g(72, 0.9)}"/>`);
      }
      break;
    }
    case 'waves': {
      const n = 7;
      for (let i = 0; i < n; i++) {
        const baseY = H * (0.2 + (i / n) * 0.72);
        const amp = 24 + rng() * 44;
        const freq = 0.006 + rng() * 0.005;
        const phase = rng() * Math.PI * 2;
        let d = `M 0 ${H} L 0 ${baseY.toFixed(1)}`;
        for (let x = 0; x <= W; x += 12) {
          d += ` L ${x} ${(baseY + Math.sin(x * freq + phase) * amp).toFixed(1)}`;
        }
        d += ` L ${W} ${H} Z`;
        const accent = i === 2;
        p.push(
          `<path d="${d}" fill="${accent ? b(0.14 * hint + 0.04) : g(15 + i * 4, 0.5)}" stroke="${accent ? b(0.8 * hint) : g(40 + i * 5, 0.7)}" stroke-width="1"/>`
        );
      }
      break;
    }
    case 'constellation': {
      const P = 30;
      const stars = Array.from({ length: P }, () => ({
        x: rng() * W,
        y: rng() * H,
        r: 1.2 + rng() * 3.4,
        big: rng() > 0.86,
      }));
      for (let i = 0; i < P; i++) {
        for (let j = i + 1; j < P; j++) {
          const a = stars[i];
          const c2 = stars[j];
          const d = Math.hypot(a.x - c2.x, a.y - c2.y);
          if (d < 170) {
            p.push(
              `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${c2.x.toFixed(1)}" y2="${c2.y.toFixed(1)}" stroke="${g(46, 0.4 * (1 - d / 170))}" stroke-width="1"/>`
            );
          }
        }
      }
      stars.forEach((s, i) => {
        const accent = s.big && i % 5 === 0;
        p.push(
          `<circle cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${(s.big ? s.r + 2.6 : s.r).toFixed(1)}" fill="${accent ? b(0.9) : g(s.big ? 80 : 58, s.big ? 0.95 : 0.7)}"/>`
        );
      });
      break;
    }
    case 'strata': {
      let y = 40 + rng() * 50;
      let i = 0;
      while (y < H - 30) {
        const hgt = 16 + rng() * 52;
        const xoff = (rng() - 0.5) * 110;
        const accent = i % 5 === 2;
        p.push(
          `<rect x="${(50 + xoff).toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(60, W - 100 - xoff * 1.7).toFixed(1)}" height="${hgt.toFixed(1)}" rx="${(hgt / 2).toFixed(1)}" fill="${accent ? b(0.18 * hint + 0.05) : g(20 + i * 3, 0.16 + rng() * 0.2)}" stroke="${accent ? b(0.75 * hint) : g(52, 0.5)}" stroke-width="1"/>`
        );
        y += hgt + 10 + rng() * 18;
        i++;
      }
      break;
    }
    case 'grid':
    default: {
      const cols = 14;
      const rows = 19;
      const cx = W * (0.3 + rng() * 0.4);
      const cy = H * (0.32 + rng() * 0.36);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = 24 + c * ((W - 48) / (cols - 1));
          const y = 24 + r * ((H - 48) / (rows - 1));
          const dist = Math.hypot(x - cx, y - cy);
          const fall = Math.max(0, 1 - dist / 560);
          if (fall < 0.07) continue;
          const big = fall > 0.75 && rng() > 0.62;
          p.push(
            `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(big ? 5 : 1.1 + fall * 2.6).toFixed(1)}" fill="${big && c % 6 === 0 ? b(0.9) : g(big ? 76 : 30 + fall * 42, big ? 0.95 : 0.25 + fall * 0.5)}"/>`
          );
        }
      }
      break;
    }
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${bg}"/>` +
    p.join('') +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/**
 * Media for MaskedHeading — grayscale plate with fine hatching and a few
 * light "threads" (one in accent blue) so the display type reads as
 * etched metal with a single colored filament.
 */
export function noirMediaUri(w = 1600, h = 480): string {
  const rng = mulberry32(hashString('noir-threads:hero-media'));
  const g = (l: number, a = 1) => `hsla(0,0%,${Math.round(l)}%,${a})`;
  const p: string[] = [
    `<defs><linearGradient id="sheen" x1="0" y1="0" x2="0.85" y2="1">` +
      `<stop offset="0%" stop-color="${g(26)}"/>` +
      `<stop offset="46%" stop-color="${g(60)}"/>` +
      `<stop offset="100%" stop-color="${g(18)}"/>` +
      `</linearGradient></defs>`,
    `<rect width="${w}" height="${h}" fill="url(#sheen)"/>`,
  ];
  for (let x = -h; x < w + h; x += 20 + Math.floor(rng() * 26)) {
    p.push(`<line x1="${x}" y1="${h + 10}" x2="${x + h}" y2="-10" stroke="${g(6, 0.55)}" stroke-width="1"/>`);
  }
  for (let i = 0; i < 5; i++) {
    const baseY = h * (0.18 + rng() * 0.64);
    const amp = 12 + rng() * 30;
    const freq = 0.004 + rng() * 0.004;
    const phase = rng() * Math.PI * 2;
    let d = `M 0 ${(baseY + Math.sin(phase) * amp).toFixed(1)}`;
    for (let x = 14; x <= w; x += 14) {
      d += ` L ${x} ${(baseY + Math.sin(x * freq + phase) * amp).toFixed(1)}`;
    }
    const accent = i === 2;
    p.push(
      `<path d="${d}" fill="none" stroke="${accent ? 'rgba(59,130,246,0.85)' : g(90, 0.5)}" stroke-width="${accent ? 1.6 : 1.1}"/>`
    );
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${p.join('')}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ── primitives ────────────────────────────────────────────────────

/** Rounded-3xl card on the #0f0f0f plate. */
export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('rounded-3xl border border-[#262626] bg-[#0f0f0f]', className)}>{children}</div>
);

/** Tiny mono uppercase label. */
export const Kicker: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn('font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#525252]', className)}>{children}</p>
);

/** Editorial section opener: numbered kicker row with rule + serif display title. */
export const SectionHeading: React.FC<{
  index: string;
  kicker: string;
  title: React.ReactNode;
  lede?: string;
}> = ({ index, kicker, title, lede }) => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#525252]"
    >
      <span className="text-[#3b82f6]">{index}</span>
      <span>{kicker}</span>
      <span className="h-px flex-1 bg-[#262626]" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
      className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-[#fafafa] [text-wrap:balance] sm:text-5xl"
    >
      {title}
    </motion.h2>
    {lede && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
        className="mt-4 max-w-xl text-sm leading-relaxed text-[#a3a3a3]"
      >
        {lede}
      </motion.p>
    )}
  </div>
);

/** Shared Artwork, pushed into monochrome with CSS filters. */
export const Art: React.FC<{ spec: ArtSpec; seed: string; className?: string }> = ({ spec, seed, className }) => (
  <Artwork
    spec={spec}
    seed={seed}
    className={cn(
      'absolute inset-0 h-full w-full opacity-90 brightness-[0.82] contrast-[1.08] grayscale',
      className
    )}
  />
);

/** Mono pill for stack items. */
export const TechPill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-[#262626] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a3a3a3] transition-colors hover:border-[#3b82f6]/40 hover:text-[#fafafa]',
      className
    )}
  >
    {children}
  </span>
);

/** Thin metric row: label left, serif value right, 1px separators. */
export const StatRow: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => {
  const hasNumber = /\d/.test(value);
  const numeric = hasNumber ? parseFloat(value.replace(/[^0-9.]/g, '')) : null;
  const suffix = hasNumber ? value.replace(/[\d.,]/g, '') : '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="flex items-baseline justify-between gap-6 border-t border-[#262626] py-4"
    >
      <span className="text-[13px] text-[#a3a3a3]">{label}</span>
      <span className="font-serif text-[22px] font-medium leading-none text-[#fafafa]">
        {numeric !== null ? <CountUp to={numeric} duration={1.6} separator="" /> : value}
        {numeric !== null && suffix}
      </span>
    </motion.div>
  );
};

/** 1px-track skill bar with blue fill, mono percentage, subtle hover. */
export const LevelBar: React.FC<{
  name: string;
  level: number;
  years?: string;
  badge?: string;
  delay?: number;
}> = ({ name, level, years, badge, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay, duration: 0.5, ease: EASE }}
    className="group py-4"
  >
    <div className="flex items-baseline justify-between gap-4">
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[15px] text-[#e5e5e5] transition-colors group-hover:text-[#fafafa]">{name}</span>
        {badge && (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3b82f6]">{badge}</span>
        )}
      </span>
      <span className="font-mono text-[11px] text-[#525252] transition-colors group-hover:text-[#a3a3a3]">
        {level}%{years ? ` · ${years}` : ''}
      </span>
    </div>
    <div className="mt-3 h-px w-full bg-[#262626]">
      <motion.div
        className="h-px bg-[#3b82f6] transition-colors duration-300 group-hover:bg-[#60a5fa]"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.1, delay: delay + 0.1, ease: EASE }}
      />
    </div>
  </motion.div>
);

/** Numbered editorial footnote (deep-dive notes). */
export const Footnote: React.FC<{ n: number; title?: string; body: string; first?: boolean }> = ({
  n,
  title,
  body,
  first,
}) => (
  <div className={cn('flex gap-5', !first && 'border-t border-[#262626] pt-5')}>
    <span className="mt-0.5 shrink-0 font-mono text-[11px] leading-relaxed text-[#3b82f6]">[{n}]</span>
    <div className="min-w-0">
      {title && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a3a3a3]">{title}</p>
      )}
      <p className={cn('text-[13px] leading-relaxed text-[#a3a3a3]', title && 'mt-1.5')}>{body}</p>
    </div>
  </div>
);