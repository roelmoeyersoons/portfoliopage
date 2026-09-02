/**
 * Galaxy Drift — Skills tab
 *
 * LEFT menu of skill categories + MAIN pane rendered as a star chart:
 * a DotGrid canvas (low opacity) backs the whole detail column, and each
 * skill is drawn as a glowing orbit ring with its level counting up in
 * the core. On <lg the menu becomes a horizontal strip.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotGrid } from '@/sites/shared/bits';
import { skillGroups } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import Artwork from '@/sites/shared/Artwork';
import { ACTIVE_GLOW, OrbitRing, Panel, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((s) => s.id === activeId) ?? skillGroups[0];
  const Icon = resolveIcon(active.icon);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <SectionHeading kicker="// star chart" title="Skills & proficiency" />

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* ── Left menu ── */}
        <Panel className="h-max overflow-hidden lg:sticky lg:top-32">
          <div className="border-b border-white/[0.07] px-4 pb-3 pt-4">
            <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.3em] text-slate-500">
              select a cluster
            </p>
          </div>
          <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible">
            {skillGroups.map((g) => {
              const GIcon = resolveIcon(g.icon);
              const isActive = g.id === activeId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(g.id)}
                    className={cn(
                      'group relative flex w-full min-w-[230px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 lg:min-w-0',
                      isActive
                        ? 'border-cyan-300/30 text-cyan-50'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gx-skill-active"
                        className={cn('absolute inset-0 rounded-xl border border-cyan-300/25 bg-cyan-400/[0.07]', ACTIVE_GLOW)}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        isActive
                          ? 'border-indigo-300/30 bg-gradient-to-br from-indigo-500/25 to-cyan-500/15 text-cyan-200'
                          : 'border-white/[0.07] bg-white/[0.03] text-slate-500 group-hover:text-slate-300'
                      )}
                    >
                      <GIcon size={14} />
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate font-display text-[13px] font-medium leading-tight">{g.title}</span>
                      <span className="mt-0.5 block font-mono text-[10px] text-slate-500">
                        {g.index} · {g.items.length} bodies
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* ── Detail pane, floating over an interactive dot starfield ── */}
        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 opacity-45 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_78%)]"
          >
            <DotGrid
              dotSize={3}
              gap={26}
              baseColor="#2a3352"
              activeColor="#67e8f9"
              proximity={130}
              speedTrigger={140}
              shockRadius={170}
              shockStrength={2.6}
              maxSpeed={2200}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 min-w-0 space-y-5"
            >
              <Panel className="overflow-hidden">
                <div className="relative h-32 sm:h-40">
                  <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] to-[#05060d]/20" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-black/40 text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.25)] backdrop-blur">
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{active.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        cluster {active.index}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="px-5 py-4 text-sm leading-relaxed text-slate-400">{active.description}</p>
              </Panel>

              <Panel className="px-5 py-6">
                <p className="mb-6 flex items-center justify-between font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500">
                  orbit chart
                  <span className="text-cyan-300/60">level 0–100</span>
                </p>
                <div className="grid grid-cols-2 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-3">
                  {active.items.map((s, i) => (
                    <OrbitRing
                      key={s.name}
                      name={s.name}
                      level={s.level}
                      years={(s as { years?: string; experienceYears?: string }).years ??
                        (s as { experienceYears?: string }).experienceYears}
                      badge={s.badge}
                      delay={i * 0.06}
                    />
                  ))}
                </div>
              </Panel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
