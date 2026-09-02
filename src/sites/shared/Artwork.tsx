/**
 * Artwork — deterministic generated SVG visuals for experience/skill/project
 * entries. No binary assets needed; each item gets a stable, hue-tinted
 * composition based on its id + ArtSpec.
 */
import React, { useId, useMemo } from 'react';
import type { ArtSpec } from './content';

// ── seeded rng ────────────────────────────────────────────────────
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

export interface ArtworkProps {
  spec: ArtSpec;
  seed: string;
  className?: string;
  /** Draw the dark backdrop plate (default true) */
  plate?: boolean;
}

const W = 800;
const H = 500;

export const Artwork: React.FC<ArtworkProps> = ({ spec, seed, className, plate = true }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const hue = spec.hue;

  const elements = useMemo(() => {
    const rng = mulberry32(hashString(seed + spec.style));
    const h1 = hue;
    const h2 = (hue + 42) % 360;
    const h3 = (hue + 320) % 360;
    const c = (h: number, s = 82, l = 60, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

    switch (spec.style) {
      case 'orbits': {
        const rings: React.ReactNode[] = [];
        const n = 6;
        for (let i = 0; i < n; i++) {
          const r = 40 + i * 38 + rng() * 14;
          const dash = rng() > 0.55;
          const col = i % 3 === 0 ? c(h2) : i % 3 === 1 ? c(h1) : c(h3);
          rings.push(
            <circle
              key={`r${i}`}
              cx={W / 2}
              cy={H / 2}
              r={r}
              fill="none"
              stroke={col}
              strokeOpacity={0.5 - i * 0.05}
              strokeWidth={dash ? 1.4 : 2.4}
              strokeDasharray={dash ? '3 10' : undefined}
            />
          );
          // satellites on some rings
          if (i % 2 === 0) {
            const ang = rng() * Math.PI * 2;
            const sx = W / 2 + Math.cos(ang) * r;
            const sy = H / 2 + Math.sin(ang) * r;
            rings.push(
              <circle key={`s${i}`} cx={sx} cy={sy} r={rng() > 0.5 ? 5 : 3.4} fill={col} fillOpacity={0.9} />
            );
          }
        }
        return (
          <g>
            <circle cx={W / 2} cy={H / 2} r={26} fill={`url(#core-${uid})`} />
            {rings}
          </g>
        );
      }

      case 'mesh': {
        const cols = 14;
        const rows = 9;
        const pts: { x: number; y: number }[][] = [];
        for (let r = 0; r <= rows; r++) {
          const row: { x: number; y: number }[] = [];
          for (let cIdx = 0; cIdx <= cols; cIdx++) {
            const x = (cIdx / cols) * (W + 80) - 40;
            const y = (r / rows) * (H + 60) - 30;
            const dx = Math.sin(r * 0.9 + cIdx * 0.55) * 26 + (rng() - 0.5) * 10;
            const dy = Math.cos(cIdx * 0.8 + r * 0.5) * 20;
            row.push({ x: x + dx, y: y + dy });
          }
          pts.push(row);
        }
        const lines: React.ReactNode[] = [];
        pts.forEach((row, r) => {
          lines.push(
            <polyline
              key={`h${r}`}
              points={row.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={c(r % 2 ? h1 : h2, 80, 62, 0.32)}
              strokeWidth={1.2}
            />
          );
        });
        for (let cIdx = 0; cIdx <= cols; cIdx += 1) {
          const colPts = pts.map((row) => row[cIdx]).map((p) => `${p.x},${p.y}`).join(' ');
          lines.push(
            <polyline key={`v${cIdx}`} points={colPts} fill="none" stroke={c(h3, 70, 65, 0.14)} strokeWidth={1} />
          );
        }
        const nodes: React.ReactNode[] = [];
        for (let i = 0; i < 7; i++) {
          const r = Math.floor(rng() * (rows + 1));
          const cIdx = Math.floor(rng() * (cols + 1));
          nodes.push(
            <circle key={`n${i}`} cx={pts[r][cIdx].x} cy={pts[r][cIdx].y} r={4.5} fill={c(h1, 90, 66, 0.95)} />
          );
        }
        return <g>{lines}{nodes}</g>;
      }

      case 'waves': {
        const bands: React.ReactNode[] = [];
        const n = 7;
        for (let i = 0; i < n; i++) {
          const base = H * (0.28 + (i / n) * 0.62);
          const amp = 18 + rng() * 34;
          const freq = 0.008 + rng() * 0.006;
          const phase = rng() * Math.PI * 2;
          const hh = [h1, h2, h3][i % 3];
          let d = `M 0 ${H} L 0 ${base}`;
          for (let x = 0; x <= W; x += 10) {
            d += ` L ${x} ${base + Math.sin(x * freq + phase) * amp}`;
          }
          d += ` L ${W} ${H} Z`;
          bands.push(<path key={`w${i}`} d={d} fill={c(hh, 85, 58, 0.34)} stroke={c(hh, 90, 70, 0.5)} strokeWidth={1} />);
        }
        return <g>{bands}</g>;
      }

      case 'constellation': {
        const P = 34;
        const stars = Array.from({ length: P }, () => ({
          x: rng() * W,
          y: rng() * H,
          r: 1.2 + rng() * 3.2,
          big: rng() > 0.85,
        }));
        const lines: React.ReactNode[] = [];
        for (let i = 0; i < P; i++) {
          for (let j = i + 1; j < P; j++) {
            const a = stars[i];
            const b = stars[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 130) {
              lines.push(
                <line
                  key={`l${i}-${j}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={c(h2, 80, 70, 0.28 * (1 - d / 130))}
                  strokeWidth={1}
                />
              );
            }
          }
        }
        return (
          <g>
            {lines}
            {stars.map((s, i) => (
              <circle
                key={`st${i}`}
                cx={s.x}
                cy={s.y}
                r={s.big ? s.r + 2.4 : s.r}
                fill={s.big ? c(h1, 95, 70) : c(h3, 80, 75, 0.85)}
                opacity={s.big ? 0.95 : 0.7}
              />
            ))}
          </g>
        );
      }

      case 'strata': {
        const bands: React.ReactNode[] = [];
        let y = 30 + rng() * 30;
        let i = 0;
        while (y < H - 20) {
          const hgt = 14 + rng() * 46;
          const hh = [h1, h2, h3][i % 3];
          const xoff = (rng() - 0.5) * 80;
          bands.push(
            <rect
              key={`b${i}`}
              x={40 + xoff}
              y={y}
              width={W - 80 - xoff * 1.6}
              height={hgt}
              rx={hgt / 2}
              fill={c(hh, 82, 58, 0.16 + rng() * 0.22)}
              stroke={c(hh, 85, 68, 0.35)}
              strokeWidth={1}
            />
          );
          y += hgt + 8 + rng() * 16;
          i++;
        }
        return <g>{bands}</g>;
      }

      case 'grid':
      default: {
        const dots: React.ReactNode[] = [];
        const cols = 26;
        const rows = 16;
        const cx = W * (0.3 + rng() * 0.4);
        const cy = H * (0.35 + rng() * 0.3);
        for (let r = 0; r < rows; r++) {
          for (let cIdx = 0; cIdx < cols; cIdx++) {
            const x = 20 + cIdx * ((W - 40) / (cols - 1));
            const y = 18 + r * ((H - 36) / (rows - 1));
            const dist = Math.hypot(x - cx, y - cy);
            const fall = Math.max(0, 1 - dist / 420);
            if (fall < 0.06) continue;
            const big = fall > 0.72 && rng() > 0.6;
            dots.push(
              <circle
                key={`d${r}-${cIdx}`}
                cx={x}
                cy={y}
                r={big ? 4.4 : 1.2 + fall * 2.4}
                fill={big ? c(h1, 92, 66, 0.95) : c(h2, 80, 66, 0.25 + fall * 0.5)}
              />
            );
          }
        }
        return <g>{dots}<circle cx={cx} cy={cy} r={130} fill={`url(#glow-${uid})`} opacity={0.5} /></g>;
      }
    }
  }, [seed, spec.style, hue, uid]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Generated abstract artwork"
    >
      <defs>
        <radialGradient id={`core-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`hsl(${hue}, 90%, 72%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 40) % 360}, 85%, 45%)`} />
        </radialGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`hsla(${hue}, 90%, 60%, 0.5)`} />
          <stop offset="100%" stopColor={`hsla(${hue}, 90%, 60%, 0)`} />
        </radialGradient>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 30%, 10%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 40) % 360}, 35%, 6%)`} />
        </linearGradient>
      </defs>
      {plate && <rect width={W} height={H} fill={`url(#bg-${uid})`} />}
      {elements}
    </svg>
  );
};

export default Artwork;
