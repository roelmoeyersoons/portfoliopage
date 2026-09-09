/**
 * Prism Ribbons — local primitives & helpers.
 *
 * Identity: one prism gradient (cyan #22d3ee → violet #a78bfa → pink #f472b6)
 * reused across the tab indicator, level bars, buttons and headings; serif
 * (Fraunces) italic accents over an Inter body on near-black #07080d.
 */
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountUp, Ribbons } from '@/sites/shared/bits';
import { cn } from '@/demo/helpers';
import type { ArtSpec } from '@/sites/shared/content';

// ── identity tokens ───────────────────────────────────────────────
export const PRISM = 'linear-gradient(92deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)';

/** Ribbon palette — module-level constant so the WebGL effect never remounts. */
export const RIBBON_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#67e8f9', '#c4b5fd'];

// ── primitives ────────────────────────────────────────────────────
export const Chip: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-300',
      className
    )}
  >
    {children}
  </span>
);

export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={cn(
      'rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl',
      className
    )}
  >
    {children}
  </div>
);

/** Prism-gradient text span (bg-clip-text). */
export const PrismText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn('bg-clip-text text-transparent', className)}
    style={{ backgroundImage: PRISM }}
  >
    {children}
  </span>
);

/** Kicker + serif display heading used at the top of every tab. */
export const SectionHeading: React.FC<{
  kicker: string;
  title: string;
  /** Trailing word(s) rendered in the prism gradient + italic */
  accent?: string;
  align?: 'left' | 'center';
}> = ({ kicker, title, accent, align = 'left' }) => (
  <div className={cn('mb-8', align === 'center' && 'text-center')}>
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80"
    >
      <span className="inline-block h-px w-8 bg-gradient-to-r from-cyan-400/70 to-transparent" />
      {kicker}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="font-serif text-3xl font-medium tracking-tight text-slate-50 sm:text-4xl"
    >
      {title}
      {accent && (
        <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text font-medium italic text-transparent">
          {' '}
          {accent}
        </span>
      )}
    </motion.h2>
  </div>
);

/** Animated skill level bar with the prism gradient fill + soft glow. */
export const LevelBar: React.FC<{ name: string; level: number; badge?: string; years?: string; delay?: number }> = ({
  name,
  level,
  badge,
  years,
  delay = 0,
}) => (
  <div>
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium text-slate-200">{name}</span>
      <span className="flex items-center gap-2">
        {badge && <Chip className="!px-2 !py-0.5 !text-[10px] text-violet-200/90">{badge}</Chip>}
        {years && <span className="font-mono text-[10px] text-slate-600">{years}</span>}
        <span className="font-mono text-[11px] text-slate-500">{level}%</span>
      </span>
    </div>
    <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="h-full rounded-full"
        style={{ background: PRISM, boxShadow: '0 0 14px rgba(167,139,250,0.45)' }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

/** Big metric card with a counting number when the value is numeric. */
export const Metric: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasNumber = !Number.isNaN(numeric) && /\d/.test(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundImage: PRISM }}
      />
      <div className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text font-serif text-xl font-semibold text-transparent">
        {hasNumber ? <CountUp to={numeric} duration={1.6} separator="" /> : value}
        {hasNumber && value.replace(/[\d.,]/g, '')}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </motion.div>
  );
};

// ── seeded SVG data-URI art (feeds image-hungry bits) ─────────────
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t ^ (t >>> 14)) >>> 0;
    return t / 4294967296;
  };
}

/**
 * Render an ArtSpec ({style, hue}) into a deterministic SVG data URI so
 * CardSwap / FlowingMenu / BounceCards can consume the same generated art
 * as the <Artwork /> React component.
 */
export function artDataUri(spec: ArtSpec, seed: string, w = 800, h = 500): string {
  const rng = mulberry32(hashString(seed + ':' + spec.style));
  const hue = spec.hue;
  const h2 = (hue + 46) % 360;
  const h3 = (hue + 316) % 360;
  const c = (hn: number, s = 82, l = 62, a = 1) => `hsla(${hn},${s}%,${l}%,${a})`;
  const parts: string[] = [];

  switch (spec.style) {
    case 'waves': {
      for (let i = 0; i < 7; i++) {
        const base = h * (0.26 + (i / 7) * 0.64);
        const amp = 14 + rng() * 30;
        const freq = 0.006 + rng() * 0.007;
        const phase = rng() * Math.PI * 2;
        const col = [hue, h2, h3][i % 3];
        let d = `M 0 ${h} L 0 ${base.toFixed(1)}`;
        for (let x = 0; x <= w; x += 20) d += ` L ${x} ${(base + Math.sin(x * freq + phase) * amp).toFixed(1)}`;
        d += ` L ${w} ${h} Z`;
        parts.push(
          `<path d="${d}" fill="${c(col, 85, 58, 0.3)}" stroke="${c(col, 90, 70, 0.5)}" stroke-width="1"/>`
        );
      }
      break;
    }
    case 'orbits': {
      parts.push(`<circle cx="${w / 2}" cy="${h / 2}" r="24" fill="${c(hue, 90, 70, 0.9)}"/>`);
      for (let i = 0; i < 6; i++) {
        const r = 48 + i * ((Math.min(w, h) / 2 - 64) / 6) + rng() * 10;
        const col = i % 2 ? hue : h2;
        const dash = rng() > 0.6 ? ' stroke-dasharray="4 12"' : '';
        parts.push(
          `<circle cx="${w / 2}" cy="${h / 2}" r="${r.toFixed(1)}" fill="none" stroke="${c(col, 80, 64, Math.max(0.12, 0.5 - i * 0.06))}" stroke-width="${i % 2 ? 1.2 : 2.2}"${dash}/>`
        );
        if (i % 2 === 0) {
          const ang = rng() * Math.PI * 2;
          parts.push(
            `<circle cx="${(w / 2 + Math.cos(ang) * r).toFixed(1)}" cy="${(h / 2 + Math.sin(ang) * r).toFixed(1)}" r="${(3 + rng() * 3).toFixed(1)}" fill="${c(h3, 85, 68, 0.9)}"/>`
          );
        }
      }
      break;
    }
    case 'constellation': {
      const pts = Array.from({ length: 30 }, () => ({ x: rng() * w, y: rng() * h }));
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 150) {
            parts.push(
              `<line x1="${pts[i].x.toFixed(1)}" y1="${pts[i].y.toFixed(1)}" x2="${pts[j].x.toFixed(1)}" y2="${pts[j].y.toFixed(1)}" stroke="${c(h2, 80, 70, 0.25 * (1 - d / 150))}" stroke-width="1"/>`
            );
          }
        }
      }
      pts.forEach((p) =>
        parts.push(
          `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(1.5 + rng() * 3).toFixed(1)}" fill="${c(hue, 90, 72, 0.85)}"/>`
        )
      );
      break;
    }
    case 'strata': {
      let y = 24 + rng() * 30;
      let i = 0;
      while (y < h - 24) {
        const hgt = 14 + rng() * 44;
        const xoff = (rng() - 0.5) * 90;
        const col = [hue, h2, h3][i % 3];
        parts.push(
          `<rect x="${(40 + xoff).toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(60, w - 80 - xoff * 1.6).toFixed(1)}" height="${hgt.toFixed(1)}" rx="${(hgt / 2).toFixed(1)}" fill="${c(col, 80, 60, 0.16 + rng() * 0.2)}" stroke="${c(col, 85, 68, 0.35)}" stroke-width="1"/>`
        );
        y += hgt + 10 + rng() * 16;
        i++;
      }
      break;
    }
    case 'mesh': {
      const cols = 13;
      const rows = 8;
      const pt = (ci: number, ri: number): [number, number] => {
        const x = (ci / cols) * (w + 60) - 30;
        const y = (ri / rows) * (h + 50) - 25;
        return [x + Math.sin(ri * 0.9 + ci * 0.55) * 22, y + Math.cos(ci * 0.8 + ri * 0.5) * 18];
      };
      const ptsStr = (list: [number, number][]) => list.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ');
      for (let r = 0; r <= rows; r++) {
        parts.push(
          `<polyline points="${ptsStr(Array.from({ length: cols + 1 }, (_, ci) => pt(ci, r)))}" fill="none" stroke="${c(r % 2 ? hue : h2, 78, 64, 0.3)}" stroke-width="1.2"/>`
        );
      }
      for (let ci = 0; ci <= cols; ci++) {
        parts.push(
          `<polyline points="${ptsStr(Array.from({ length: rows + 1 }, (_, r) => pt(ci, r)))}" fill="none" stroke="${c(h3, 70, 66, 0.14)}" stroke-width="1"/>`
        );
      }
      break;
    }
    case 'grid':
    default: {
      const cols = 24;
      const rows = 15;
      const cx = w * (0.32 + rng() * 0.36);
      const cy = h * (0.36 + rng() * 0.28);
      for (let r = 0; r < rows; r++) {
        for (let ci = 0; ci < cols; ci++) {
          const x = 20 + ci * ((w - 40) / (cols - 1));
          const y = 18 + r * ((h - 36) / (rows - 1));
          const fall = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / 420);
          if (fall < 0.06) continue;
          const big = fall > 0.72 && rng() > 0.6;
          parts.push(
            `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(big ? 4.2 : 1.2 + fall * 2.2).toFixed(1)}" fill="${big ? c(hue, 90, 68, 0.95) : c(h2, 80, 66, 0.25 + fall * 0.5)}"/>`
          );
        }
      }
      break;
    }
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="hsl(${hue},34%,10%)"/>` +
    `<stop offset="100%" stop-color="hsl(${(hue + 40) % 360},36%,6%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#pbg)"/>` +
    parts.join('') +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ── Ribbons backdrop driver ───────────────────────────────────────
/**
 * The Ribbons canvas only flows when its own container receives mousemove
 * events — but it lives in a fixed backdrop *behind* the page content, so
 * real pointer events almost never reach it (and a pointer-less Ribbons
 * collapses to a static line). Steer a gentle virtual pointer along a
 * Lissajous path instead; recent real mouse movement takes precedence.
 */
export const RibbonsField: React.FC<{ className?: string }> = ({ className }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;
    let lastDispatch = 0;
    let lastReal = 0;
    const onReal = () => {
      lastReal = performance.now();
    };
    window.addEventListener('mousemove', onReal, { passive: true });

    const start = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - lastDispatch < 55) return; // ~18Hz is plenty
      lastDispatch = now;
      if (now - lastReal < 2500) return; // let real movement win
      const stage = host.firstElementChild;
      if (!stage) return;
      const t = (now - start) / 1000;
      const rect = host.getBoundingClientRect();
      const x = rect.left + rect.width * (0.5 + 0.44 * Math.sin(t * 0.31) * Math.cos(t * 0.13));
      const y = rect.top + rect.height * (0.46 + 0.4 * Math.sin(t * 0.23 + 1.6));
      stage.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onReal);
    };
  }, []);

  return (
    <div ref={hostRef} className={cn('h-full w-full', className)}>
      <Ribbons colors={RIBBON_COLORS} baseThickness={24} speedMultiplier={0.6} enableFade />
    </div>
  );
};
