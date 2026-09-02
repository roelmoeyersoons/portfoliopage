/**
 * Galaxy Drift — Experience tab
 *
 * The core layout pattern: LEFT menu (numbered mission rows, cyan glow on
 * active) + MAIN detail pane with artwork, decrypted role heading,
 * paragraphs, contributions, mono tech pills, counting metrics and a
 * deep-dive disclosure. On <lg the menu becomes a horizontal strip.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Radar, Satellite, Sparkles } from 'lucide-react';
import { experiences } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { DecryptedText } from '@/sites/shared/bits';
import { ACTIVE_GLOW, Chip, Metric, Panel, SectionHeading, TechPill } from '../ui';
import { cn } from '@/demo/helpers';

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [openDeepDive, setOpenDeepDive] = useState(false);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <SectionHeading kicker="// mission log" title="Experience, in depth" />

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* ── Left menu ── */}
        <Panel className="h-max overflow-hidden lg:sticky lg:top-32">
          <div className="border-b border-white/[0.07] px-4 pb-3 pt-4">
            <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.3em] text-slate-500">
              select a mission
            </p>
          </div>
          <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible">
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
                      'group relative flex w-full min-w-[230px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 lg:min-w-0',
                      isActive
                        ? 'border-cyan-300/30 text-cyan-50'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gx-exp-active"
                        className={cn('absolute inset-0 rounded-xl border border-cyan-300/25 bg-cyan-400/[0.07]', ACTIVE_GLOW)}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 font-mono text-[11px] transition-colors',
                        isActive ? 'text-cyan-300' : 'text-slate-600'
                      )}
                    >
                      {e.index}
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate font-display text-[13px] font-medium leading-tight">
                        {e.shortCompany}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] text-slate-500">{e.period}</span>
                    </span>
                    {isActive && <Radar size={13} className="relative z-10 ml-auto shrink-0 animate-pulse text-cyan-300/80" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* ── Detail pane ── */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* header */}
              <Panel className="overflow-hidden">
                <div className="relative h-44 sm:h-56">
                  <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-[#05060d]/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex flex-wrap gap-2">
                      <Chip className="!border-indigo-400/25 !bg-indigo-500/10 font-mono !text-[10px] uppercase tracking-[0.14em] text-indigo-200">
                        {active.type}
                      </Chip>
                      <Chip className="font-mono !text-[10px] uppercase tracking-[0.14em] text-slate-400">{active.domain}</Chip>
                    </div>
                    <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      <DecryptedText
                        text={active.role}
                        animateOn="view"
                        speed={38}
                        maxIterations={8}
                        sequential
                        characters="!<>-_\\/[]{}—=+*^?#01"
                        encryptedClassName="!text-cyan-400/60"
                      />
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-4">
                  <span className="text-sm font-semibold text-slate-100">{active.company}</span>
                  <span className="font-mono text-xs text-cyan-300/90">{active.period}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={11} /> {active.location}
                  </span>
                </div>
              </Panel>

              {/* story */}
              <Panel className="space-y-4 px-5 py-5">
                <p className="text-[15px] leading-relaxed text-slate-200">{active.summary}</p>
                {active.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-slate-400">
                    {p}
                  </p>
                ))}
              </Panel>

              {/* contributions + metrics */}
              <div className="grid gap-5 md:grid-cols-2">
                <Panel className="px-5 py-5">
                  <h4 className="mb-3 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-slate-400">
                    <Satellite size={12} className="text-violet-300" /> Key contributions
                  </h4>
                  <ul className="space-y-2.5">
                    {active.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-300 to-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.7)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Panel>
                <div className="flex flex-col gap-3">
                  {active.metrics.map((m, i) => (
                    <Metric key={m.label} label={m.label} value={m.value} delay={0.1 + i * 0.08} />
                  ))}
                  <Panel className="flex-1 px-4 py-4">
                    <h4 className="mb-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-slate-400">
                      Stack manifest
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tech.map((t) => (
                        <TechPill key={t}>{t}</TechPill>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>

              {/* deep dive */}
              <Panel className="overflow-hidden">
                <button
                  onClick={() => setOpenDeepDive((v) => !v)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-slate-300">
                    <Sparkles size={12} className="text-cyan-300" />
                    Deep dive — architecture notes
                  </span>
                  <ChevronDown
                    size={15}
                    className={cn('text-slate-500 transition-transform duration-300', openDeepDive && 'rotate-180')}
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
                      <div className="space-y-4 border-t border-white/[0.07] px-5 py-5">
                        <div>
                          <h5 className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-300/90">
                            Challenge
                          </h5>
                          <p className="text-[13px] leading-relaxed text-slate-300">{active.deepDive.challenge}</p>
                        </div>
                        <div>
                          <h5 className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-violet-300/90">
                            Solution
                          </h5>
                          <p className="text-[13px] leading-relaxed text-slate-300">{active.deepDive.solution}</p>
                        </div>
                        <div>
                          <h5 className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                            Learnings
                          </h5>
                          <ul className="space-y-1.5">
                            {active.deepDive.learnings.map((l, i) => (
                              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Panel>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
