/**
 * Galaxy Drift — shared local primitives
 *
 * Deep-space observatory styling: white/[0.04] glass panels on #05060d,
 * white/[0.08] borders, indigo #818cf8 / violet #a78bfa / cyan #67e8f9
 * accents, Space Grotesk (font-display) headings, mono telemetry details.
 */
import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';
import { CountUp } from '@/sites/shared/bits';

export const ACCENTS = {
  indigo: '#818cf8',
  violet: '#a78bfa',
  cyan: '#67e8f9',
};

/** indigo → violet → cyan, the one gradient everything drifts through */
export const ACCENT_GRADIENT = 'linear-gradient(92deg, #818cf8 0%, #a78bfa 46%, #67e8f9 100%)';

/** Cyan glow used by active rows in the left menus */
export const ACTIVE_GLOW = 'shadow-[0_0_26px_-6px_rgba(103,232,249,0.55)]';

export const Chip: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-300',
      className
    )}
  >
    {children}
  </span>
);

export const TechPill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-slate-400 transition-colors hover:border-cyan-300/25 hover:text-cyan-200',
      className
    )}
  >
    {children}
  </span>
);

export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl', className)}>
    {children}
  </div>
);

/** Kicker + display heading used at the top of every tab */
export const SectionHeading: React.FC<{
  kicker: string;
  title: string;
  align?: 'left' | 'center';
}> = ({ kicker, title, align = 'left' }) => (
  <div className={cn('mb-8', align === 'center' && 'text-center')}>
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.3em] text-cyan-300/80"
    >
      <span className="inline-block h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
      {kicker}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
    >
      {title}
    </motion.h2>
  </div>
);

/**
 * Skill "orbit ring" — a conic progress ring drawn as an SVG arc with a
 * glow, wrapped by a faint dashed outer orbit. Level counts up in the core.
 */
export const OrbitRing: React.FC<{
  name: string;
  level: number;
  years?: string;
  badge?: string;
  delay?: number;
  size?: number;
}> = ({ name, level, years, badge, delay = 0, size = 96 }) => {
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center gap-3"
    >
      <div className="relative transition-transform duration-500 group-hover:scale-[1.06]" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id={`gx-ring-${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
          </defs>
          {/* static outer orbit */}
          <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="1.5 5" />
          {/* track */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
          {/* progress arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`url(#gx-ring-${gid})`}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: level / 100 }}
            transition={{ duration: 1.3, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(103,232,249,0.45))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[15px] font-semibold text-slate-100">
            <CountUp to={level} duration={1.4} delay={delay + 0.2} />
            <span className="text-[10px] text-cyan-300/80">%</span>
          </span>
        </div>
      </div>
      <div className="max-w-[150px] text-center">
        <p className="text-[12.5px] font-medium leading-tight text-slate-200">{name}</p>
        {(badge || years) && (
          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-cyan-300/60">
            {[badge, years].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </motion.div>
  );
};

/** Big metric card with counting number when the value contains a number */
export const Metric: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => {
  const m = /^(\D*?)(\d[\d.]*)(.*)$/.exec(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
    >
      <div className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text font-display text-xl font-semibold text-transparent">
        {m ? (
          <>
            {m[1]}
            <CountUp to={parseFloat(m[2])} duration={1.6} separator="" />
            {m[3]}
          </>
        ) : (
          value
        )}
      </div>
      <div className="mt-0.5 text-[10.5px] uppercase tracking-[0.16em] text-slate-500">{label}</div>
    </motion.div>
  );
};
