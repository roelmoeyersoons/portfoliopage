/** Plasma Bento — shared local primitives */
import React from 'react';
import { motion } from 'framer-motion';
import { CountUp } from '@/sites/shared/bits';
import { cn } from '@/demo/helpers';

export const ACCENT_GRADIENT = 'linear-gradient(92deg, #f97316 0%, #ec4899 52%, #8b5cf6 100%)';

/** Plasma glow colours as "R, G, B" triplets (used by BentoCard / Spotlight) */
export const GLOW = {
  orange: '249, 115, 22',
  pink: '236, 72, 153',
  violet: '139, 92, 246',
} as const;

/** Gradient text utility (light ends of the palette for dark bg) */
export const TEXT_GRADIENT = 'bg-gradient-to-r from-orange-300 via-pink-300 to-violet-300 bg-clip-text text-transparent';

export const Chip: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/75',
      className
    )}
  >
    {children}
  </span>
);

export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={cn(
      'rounded-3xl border border-white/[0.08] bg-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl',
      className
    )}
  >
    {children}
  </div>
);

/** Kicker + Space Grotesk display heading used at the top of every tab */
export const SectionHeading: React.FC<{
  kicker: string;
  title: string;
  align?: 'left' | 'center';
}> = ({ kicker, title, align = 'left' }) => (
  <div className={cn('mb-8', align === 'center' && 'text-center')}>
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-300/90"
    >
      {kicker}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
    >
      {title}
    </motion.h2>
  </div>
);

/**
 * Big metric value with counting number. Splits the raw value into a
 * prefix, the first number (counted), and the suffix — e.g. "< 10 cm",
 * "99.9%", "3x faster".
 */
export const Metric: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => {
  const match = value.match(/^(\D*?)(\d[\d.,]*)(.*)$/s);
  const hasNumber = !!match;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
    >
      <div className={cn('font-display text-xl font-bold', TEXT_GRADIENT)}>
        {hasNumber && match ? (
          <>
            {match[1]}
            <CountUp to={parseFloat(match[2].replace(/,/g, ''))} duration={1.6} separator="" />
            {match[3]}
          </>
        ) : (
          value
        )}
      </div>
      <div className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white/45">{label}</div>
    </motion.div>
  );
};
