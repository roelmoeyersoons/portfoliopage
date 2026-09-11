/**
 * Bento Galaxy — Experience tab
 *
 * Bento's core layout pattern, unchanged: LEFT menu (chunky rounded role
 * items with an indigo→cyan bar on the active one) + MAIN detail pane
 * rendered as a MagicBento-style grid (cursor spotlight, gsap tilt, click
 * burst), re-skinned to the observatory palette.
 *
 * Pane grid anatomy (lg, 4 cols — the artwork is a modest 1×1 tile):
 *   row 1   story (2×2, cols 1–2)   · contributions (cols 3–4)
 *   row 2   story continues         · artwork (col 3) · metrics (col 4)
 *   row 3   stack (col 1)           · skills demonstrated (cols 2–4)
 *   row 4   deep dive (full row; shrinks to cols 2–4 when the role has no
 *           linked skills and the panel above is omitted)
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, MapPin, Sparkles, Zap } from 'lucide-react';
import { coreSkills, experiences, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, Metric, SectionHeading } from '../ui';
import { cn } from '@/sites/shared/cn';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const paneV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: EASE, staggerChildren: 0.055 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.26, ease: 'easeIn' } },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export interface ExperienceTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const Experience: React.FC<ExperienceTabProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [openDeepDive, setOpenDeepDive] = useState(false);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];
  const hasSkills = active.skillIds.length > 0;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Career" title="Experience, in depth" />

      <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
        {/* ── Left menu ── */}
        <div className="h-max overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-5 pb-3 pt-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">Select a role</p>
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
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gx-exp-active"
                        className="absolute inset-0 rounded-2xl border border-white/[0.12] bg-white/[0.07] shadow-[0_0_26px_-6px_rgba(103,232,249,0.45)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="gx-exp-bar"
                        className="absolute inset-y-2.5 left-0 w-1 rounded-full"
                        style={{ background: 'linear-gradient(180deg,#818cf8,#67e8f9)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 font-mono text-[11px] transition-colors',
                        isActive ? 'bg-gradient-to-b from-indigo-300 to-cyan-300 bg-clip-text text-transparent' : 'text-slate-600'
                      )}
                    >
                      {e.index}
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate font-display text-[13px] font-semibold leading-tight">{e.shortCompany}</span>
                      <span className="mt-0.5 block truncate font-mono text-[10.5px] text-slate-500">{e.period}</span>
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
            <motion.div key={active.id} variants={paneV} initial="hidden" animate="show" exit="exit">
              <BentoGrid glowColor={GLOW.indigo} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* story — the 2×2 anchor (rows 1–2, cols 1–2); carries the role heading */}
                <motion.div variants={cardV} className="min-w-0 sm:col-span-2 lg:row-span-2">
                  <BentoCard glowColor={GLOW.indigo} className="h-full px-5 py-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">The story</p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-50">{active.role}</h3>
                    <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-100">{active.summary}</p>
                    <div className="mt-4 space-y-3.5">
                      {active.paragraphs.map((p, i) => (
                        <p key={i} className="text-[13px] leading-relaxed text-slate-400">
                          {p}
                        </p>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-5 font-mono text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-100">{active.company}</span>
                      <span className="text-cyan-300/90">{active.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {active.location}
                      </span>
                    </div>
                  </BentoCard>
                </motion.div>

                {/* contributions — row 1, cols 3–4 */}
                <motion.div variants={cardV} className="min-w-0 sm:col-span-2">
                  <BentoCard glowColor={GLOW.violet} className="h-full px-5 py-5">
                    <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                      <Sparkles size={12} className="text-indigo-300" /> Key contributions
                    </h4>
                    <ul className="space-y-2.5">
                      {active.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </BentoCard>
                </motion.div>

                {/* artwork — modest 1×1 tile (row 2, col 3) */}
                <motion.div variants={cardV} className="min-w-0">
                  <BentoCard glowColor={GLOW.cyan} className="h-full p-0">
                    <div className="relative h-44 min-h-[176px] sm:h-full sm:min-h-[190px]">
                      <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                        <Chip className="!border-cyan-300/25 !bg-cyan-400/10 !px-2 !py-0.5 !text-[9.5px] text-cyan-200">
                          {active.type}
                        </Chip>
                        <Chip className="!px-2 !py-0.5 !text-[9.5px]">{active.domain}</Chip>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>

                {/* metrics — row 2, col 4 */}
                <motion.div variants={cardV} className="min-w-0">
                  <BentoCard glowColor={GLOW.cyan} className="h-full justify-center gap-3 px-4 py-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">Impact</p>
                    <div className="flex flex-col gap-2.5">
                      {active.metrics.map((m, i) => (
                        <Metric key={m.label} label={m.label} value={m.value} delay={0.1 + i * 0.08} />
                      ))}
                    </div>
                  </BentoCard>
                </motion.div>

                {/* stack — row 3, col 1 */}
                <motion.div variants={cardV} className="min-w-0 sm:col-span-2 lg:col-span-1">
                  <BentoCard glowColor={GLOW.indigo} className="h-full justify-between px-4 py-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">Stack</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {active.tech.map((t) => (
                        <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10.5px] text-slate-400">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </BentoCard>
                </motion.div>

                {/* skills demonstrated — click-through to the skills page */}
                {hasSkills && (
                  <motion.div variants={cardV} className="min-w-0 sm:col-span-2 lg:col-span-3">
                    <BentoCard glowColor={GLOW.cyan} className="h-full px-5 py-5">
                      <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                        <Zap size={12} className="text-cyan-300" /> Skills demonstrated
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.skillIds
                          .map((sid) => coreSkills.find((s) => s.id === sid))
                          .filter((s): s is NonNullable<typeof s> => Boolean(s))
                          .map((skill) => (
                            <button
                              key={skill.id}
                              onClick={() => onNavigate?.('skills', skill.id)}
                              className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-[11.5px] font-medium text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/20"
                            >
                              {skill.title}
                            </button>
                          ))}
                      </div>
                    </BentoCard>
                  </motion.div>
                )}

                {/* deep dive — full row after the skills panel (cols 2–4 when the panel is absent) */}
                <motion.div
                  variants={cardV}
                  className={cn('min-w-0 sm:col-span-2', hasSkills ? 'lg:col-span-4' : 'lg:col-span-3')}
                >
                  <BentoCard glowColor={GLOW.violet} className="h-full px-5 py-5">
                    <button
                      onClick={() => setOpenDeepDive((v) => !v)}
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                        Deep dive — architecture notes
                      </span>
                      <ChevronDown
                        size={15}
                        className={cn('shrink-0 text-slate-400 transition-transform duration-300', openDeepDive && 'rotate-180')}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openDeepDive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-5 pt-5 md:grid-cols-3">
                            <div>
                              <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-indigo-300/90">
                                Challenge
                              </h5>
                              <p className="text-[13px] leading-relaxed text-slate-400">{active.deepDive.challenge}</p>
                            </div>
                            <div>
                              <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-cyan-300/90">
                                Solution
                              </h5>
                              <p className="text-[13px] leading-relaxed text-slate-400">{active.deepDive.solution}</p>
                            </div>
                            <div>
                              <h5 className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-violet-300/90">
                                Learnings
                              </h5>
                              <ul className="space-y-1.5">
                                {active.deepDive.learnings.map((l, i) => (
                                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
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
                </motion.div>
              </BentoGrid>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
