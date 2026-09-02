/** Aurora Glass — shared local primitives */
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';
import { CountUp } from '@/sites/shared/bits';

export const ACCENT_GRADIENT = 'linear-gradient(92deg, #8b5cf6 0%, #d946ef 48%, #22d3ee 100%)';

export const Chip: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-300',
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

/** Kicker + serif display heading used at the top of every tab */
export const SectionHeading: React.FC<{
  kicker: string;
  title: string;
  align?: 'left' | 'center';
}> = ({ kicker, title, align = 'left' }) => (
  <div className={cn('mb-8', align === 'center' && 'text-center')}>
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300/80"
    >
      {kicker}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="font-serif text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl"
    >
      {title}
    </motion.h2>
  </div>
);

/** Animated skill level bar with gradient fill */
export const LevelBar: React.FC<{ name: string; level: number; badge?: string; delay?: number }> = ({
  name,
  level,
  badge,
  delay = 0,
}) => (
  <div>
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium text-zinc-200">{name}</span>
      <span className="flex items-center gap-2">
        {badge && <Chip className="!px-2 !py-0.5 !text-[10px] text-violet-300/90">{badge}</Chip>}
        <span className="font-mono text-[11px] text-zinc-500">{level}%</span>
      </span>
    </div>
    <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.07]">
      <motion.div
        className="h-full rounded-full"
        style={{ background: ACCENT_GRADIENT }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

/** Big metric card with counting number when the value is numeric */
export const Metric: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => {
  // Split "< 10 cm" into prefix + first number + suffix so CountUp only owns the digits
  const m = /^([^0-9]*)(\d+(?:\.\d+)?)([\s\S]*)$/.exec(value);
  const hasNumber = !!m;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
    >
      <div className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text font-serif text-xl font-semibold text-transparent">
        {hasNumber ? (
          <>
            {m![1]}
            <CountUp to={parseFloat(m![2])} duration={1.6} separator="" />
            {m![3]}
          </>
        ) : (
          value
        )}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">{label}</div>
    </motion.div>
  );
};
