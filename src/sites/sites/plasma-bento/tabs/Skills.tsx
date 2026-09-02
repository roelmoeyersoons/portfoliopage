/**
 * Plasma Bento — Skills tab
 * LEFT menu of skill categories + MAIN pane: description card with artwork
 * on top, then a bento grid — one card per skill with an animated level ring.
 */
import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillGroups, type SkillGroupEntry } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import { CountUp } from '@/sites/shared/bits';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, SectionHeading, TEXT_GRADIENT } from '../ui';
import { cn } from '@/demo/helpers';

/** Circular level ring with gradient stroke + counting percentage */
const LevelRing: React.FC<{ level: number; delay?: number }> = ({ level, delay = 0 }) => {
  const gradId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const R = 40;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
        <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <defs>
          <linearGradient id={`ring-${gradId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="48"
          cy="48"
          r={R}
          fill="none"
          stroke={`url(#ring-${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - level / 100) }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className={cn('font-display text-lg font-bold', TEXT_GRADIENT)}>
          <CountUp to={level} duration={1.2} delay={delay} />
          <span className="text-[11px] text-white/40">%</span>
        </span>
      </span>
    </div>
  );
};

const RING_GLOWS = [GLOW.orange, GLOW.pink, GLOW.violet] as const;

/**
 * content.ts declares skill items as `years?`, but the underlying shared
 * portfolio data actually carries `experienceYears` — read both defensively.
 */
const yearsOf = (s: SkillGroupEntry['items'][number]): string | undefined =>
  (s as { experienceYears?: string }).experienceYears ?? s.years;

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((s) => s.id === activeId) ?? skillGroups[0];
  const Icon = resolveIcon(active.icon);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Toolkit" title="Skills & proficiency" />

      <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
        {/* ── Left menu ── */}
        <div className="h-max overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-5 pb-3 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/40">Select a category</p>
          </div>
          <ul className="flex gap-1 overflow-x-auto p-2.5 lg:flex-col lg:overflow-visible">
            {skillGroups.map((g) => {
              const GIcon = resolveIcon(g.icon);
              const isActive = g.id === activeId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(g.id)}
                    className={cn(
                      'group relative flex w-full min-w-[230px] items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors lg:min-w-0',
                      isActive ? 'text-white' : 'text-white/55 hover:text-white/85'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pb-skill-active"
                        className="absolute inset-0 rounded-2xl border border-white/[0.12] bg-white/[0.07] shadow-[0_10px_26px_-12px_rgba(236,72,153,0.45)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="pb-skill-bar"
                        className="absolute inset-y-2.5 left-0 w-1 rounded-full"
                        style={{ background: 'linear-gradient(180deg,#f97316,#ec4899)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors',
                        isActive
                          ? 'border-orange-400/30 bg-gradient-to-br from-orange-500/25 to-pink-500/15 text-orange-200'
                          : 'border-white/[0.08] bg-white/[0.03] text-white/45 group-hover:text-white/70'
                      )}
                    >
                      <GIcon size={15} />
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate font-display text-[13px] font-semibold leading-tight">{g.title}</span>
                      <span className="mt-0.5 block font-mono text-[10.5px] text-white/40">{g.items.length} skills</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Detail pane ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <BentoGrid glowColor={GLOW.violet} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* description card with artwork */}
              <BentoCard glowColor={GLOW.orange} className="col-span-1 p-0 sm:col-span-2 lg:col-span-3">
                <div className="relative flex h-full flex-col sm:flex-row">
                  <div className="relative h-36 w-full shrink-0 sm:h-auto sm:min-h-[150px] sm:w-2/5">
                    <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100b18] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-[#100b18]/10 sm:to-[#100b18]" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-2.5 px-6 py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-500/25 to-pink-500/15 text-orange-200">
                        <Icon size={17} />
                      </span>
                      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{active.title}</h3>
                      <Chip className="font-mono !text-[10px] text-white/50">{active.index}</Chip>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-white/55">{active.description}</p>
                  </div>
                </div>
              </BentoCard>

              {/* one card per skill */}
              {active.items.map((s, i) => (
                <BentoCard
                  key={s.name}
                  glowColor={RING_GLOWS[i % 3]}
                  className="items-center px-5 py-6 text-center"
                >
                  <LevelRing level={s.level} delay={0.15 + i * 0.06} />
                  <p className="mt-3.5 font-display text-[13.5px] font-semibold leading-tight text-white/90">{s.name}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                    {s.badge && (
                      <Chip className="!border-violet-400/25 !bg-violet-500/10 !px-2 !py-0.5 !text-[10px] text-violet-200">
                        {s.badge}
                      </Chip>
                    )}
                    {yearsOf(s) && (
                      <span className="font-mono text-[10px] text-white/40">{yearsOf(s)}</span>
                    )}
                  </div>
                </BentoCard>
              ))}
            </BentoGrid>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
