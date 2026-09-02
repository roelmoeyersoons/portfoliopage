/**
 * Plasma Bento — Experience tab
 *
 * Core layout pattern: LEFT menu (chunky rounded role items with an
 * orange→pink gradient bar on the active one) + MAIN detail pane rendered
 * as a MagicBento-style grid (cursor spotlight, gsap tilt, click burst).
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Sparkles } from 'lucide-react';
import { experiences } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, Metric, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [openDeepDive, setOpenDeepDive] = useState(false);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Career" title="Experience, in depth" />

      <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
        {/* ── Left menu ── */}
        <div className="h-max overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-5 pb-3 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/40">Select a role</p>
          </div>
          <ul className="flex gap-1 overflow-x-auto p-2.5 lg:flex-col lg:overflow-visible">
            {experiences.map((e) => {
              const isActive = e.id === activeId;
              return (
                <li key={e.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => {
                      setActiveId(e.id);
                      setOpenDeepDive(false);
                    }}
                    className={cn(
                      'group relative flex w-full min-w-[230px] items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors lg:min-w-0',
                      isActive ? 'text-white' : 'text-white/55 hover:text-white/85'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pb-exp-active"
                        className="absolute inset-0 rounded-2xl border border-white/[0.12] bg-white/[0.07] shadow-[0_10px_26px_-12px_rgba(236,72,153,0.45)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="pb-exp-bar"
                        className="absolute inset-y-2.5 left-0 w-1 rounded-full"
                        style={{ background: 'linear-gradient(180deg,#f97316,#ec4899)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 font-mono text-[11px] transition-colors',
                        isActive ? 'bg-gradient-to-b from-orange-300 to-pink-300 bg-clip-text text-transparent' : 'text-white/30'
                      )}
                    >
                      {e.index}
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate font-display text-[13px] font-semibold leading-tight">{e.shortCompany}</span>
                      <span className="mt-0.5 block truncate font-mono text-[10.5px] text-white/40">{e.period}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Detail pane: the bento ── */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <BentoGrid glowColor={GLOW.orange} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* artwork header — 2×2 */}
                <BentoCard glowColor={GLOW.pink} className="p-0 sm:col-span-2 lg:row-span-2">
                  <div className="relative h-52 sm:h-full sm:min-h-[300px]">
                    <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100b18] via-[#100b18]/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex flex-wrap gap-2">
                        <Chip className="!border-orange-400/25 !bg-orange-500/10 text-orange-200">{active.type}</Chip>
                        <Chip>{active.domain}</Chip>
                      </div>
                      <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {active.role}
                      </h3>
                    </div>
                  </div>
                </BentoCard>

                {/* story — 2×2 */}
                <BentoCard glowColor={GLOW.orange} className="px-5 py-5 sm:col-span-2 lg:row-span-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-pink-300/90">The story</p>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/90">{active.summary}</p>
                  <div className="mt-4 space-y-3.5">
                    {active.paragraphs.map((p, i) => (
                      <p key={i} className="text-[13px] leading-relaxed text-white/50">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-5 font-mono text-[11px] text-white/45">
                    <span className="font-semibold text-white/85">{active.company}</span>
                    <span className="text-pink-300/90">{active.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {active.location}
                    </span>
                  </div>
                </BentoCard>

                {/* contributions */}
                <BentoCard glowColor={GLOW.violet} className="px-5 py-5 sm:col-span-2">
                  <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    <Sparkles size={12} className="text-violet-300" /> Key contributions
                  </h4>
                  <ul className="space-y-2.5">
                    {active.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-white/70">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </BentoCard>

                {/* metrics */}
                <BentoCard glowColor={GLOW.pink} className="justify-center gap-3 px-4 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">Impact</p>
                  <div className="flex flex-col gap-2.5">
                    {active.metrics.map((m, i) => (
                      <Metric key={m.label} label={m.label} value={m.value} delay={0.1 + i * 0.08} />
                    ))}
                  </div>
                </BentoCard>

                {/* stack */}
                <BentoCard glowColor={GLOW.orange} className="justify-between px-4 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">Stack</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10.5px] text-white/60">
                        {t}
                      </Chip>
                    ))}
                  </div>
                </BentoCard>

                {/* deep dive — full width */}
                <BentoCard glowColor={GLOW.violet} className="col-span-1 px-5 py-5 sm:col-span-2 lg:col-span-4">
                  <button
                    onClick={() => setOpenDeepDive((v) => !v)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                      Deep dive — architecture notes
                    </span>
                    <ChevronDown
                      size={15}
                      className={cn('shrink-0 text-white/50 transition-transform duration-300', openDeepDive && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openDeepDive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 pt-5 md:grid-cols-3">
                          <div>
                            <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-orange-300/90">
                              Challenge
                            </h5>
                            <p className="text-[13px] leading-relaxed text-white/65">{active.deepDive.challenge}</p>
                          </div>
                          <div>
                            <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-pink-300/90">
                              Solution
                            </h5>
                            <p className="text-[13px] leading-relaxed text-white/65">{active.deepDive.solution}</p>
                          </div>
                          <div>
                            <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-violet-300/90">
                              Learnings
                            </h5>
                            <ul className="space-y-1.5">
                              {active.deepDive.learnings.map((l, i) => (
                                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-white/55">
                                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
                                  {l}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </BentoCard>
              </BentoGrid>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
