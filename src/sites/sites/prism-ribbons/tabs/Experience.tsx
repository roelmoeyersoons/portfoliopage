/**
 * Prism Ribbons — Experience tab.
 *
 * LEFT menu as 3D tilt cards (the active card lifts with rotateY and a
 * prism-gradient border) + MAIN detail pane: artwork, story, contributions,
 * CountUp metrics, tech pills and a deep-dive accordion.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, MapPin, Sparkles, Zap } from 'lucide-react';
import { coreSkills, experiences, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, Metric, Panel, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const Experience: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [openDeepDive, setOpenDeepDive] = useState(false);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Career" title="Experience, through the" accent="prism" />

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* ── Left menu: 3D tilt cards ── */}
        <Panel className="h-max overflow-hidden lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-4 pb-3 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Select a role</p>
          </div>
          <ul className="flex gap-1.5 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible">
            {experiences.map((e) => {
              const isActive = e.id === activeId;
              return (
                <li key={e.id} className="shrink-0 lg:shrink" style={{ perspective: '900px' }}>
                  <motion.button
                    onClick={() => {
                      setActiveId(e.id);
                      setOpenDeepDive(false);
                    }}
                    animate={{ rotateY: isActive ? 4 : 0, x: isActive ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className={cn(
                      'group relative block w-full min-w-[232px] rounded-2xl p-[1px] text-left transition-[background] duration-300 lg:min-w-0',
                      isActive
                        ? 'bg-gradient-to-br from-cyan-400/70 via-violet-400/60 to-pink-400/70 shadow-[0_10px_32px_rgba(167,139,250,0.22)]'
                        : 'bg-transparent hover:bg-white/[0.06]'
                    )}
                  >
                    <span
                      className={cn(
                        'relative flex items-center gap-3 rounded-[15px] px-3.5 py-3 transition-colors duration-300',
                        isActive ? 'bg-[#0b0d15]/95' : 'bg-transparent'
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-[11px] transition-colors',
                          isActive
                            ? 'bg-gradient-to-b from-cyan-300 to-pink-300 bg-clip-text text-transparent'
                            : 'text-slate-600'
                        )}
                      >
                        {e.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-[13px] font-medium leading-tight transition-colors',
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          )}
                        >
                          {e.shortCompany}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-slate-500">{e.period}</span>
                      </span>
                      <ChevronRight
                        size={13}
                        className={cn(
                          'shrink-0 transition-all duration-300',
                          isActive ? 'translate-x-0 text-cyan-300 opacity-100' : '-translate-x-1 text-slate-600 opacity-0'
                        )}
                      />
                    </span>
                  </motion.button>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex flex-wrap gap-2">
                      <Chip className="!border-cyan-400/25 !bg-cyan-500/10 text-cyan-200">{active.type}</Chip>
                      <Chip>{active.domain}</Chip>
                    </div>
                    <h3 className="mt-2.5 font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
                      {active.role}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-4">
                  <span className="text-sm font-semibold text-slate-100">{active.company}</span>
                  <span className="font-mono text-xs text-pink-300/90">{active.period}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={11} /> {active.location}
                  </span>
                </div>
              </Panel>

              {/* story */}
              <Panel className="space-y-4 px-5 py-5">
                <p className="font-serif text-[16px] italic leading-relaxed text-slate-100">{active.summary}</p>
                {active.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-slate-400">
                    {p}
                  </p>
                ))}
              </Panel>

              {/* contributions + metrics */}
              <div className="grid gap-5 md:grid-cols-2">
                <Panel className="px-5 py-5">
                  <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <Sparkles size={12} className="text-pink-300" /> Key contributions
                  </h4>
                  <ul className="space-y-2.5">
                    {active.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundImage: 'linear-gradient(92deg,#22d3ee,#a78bfa,#f472b6)' }}
                        />
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
                    <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tech.map((t) => (
                        <Chip key={t} className="!bg-white/[0.03] font-mono !text-[10.5px] text-slate-400">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>

              {/* skills demonstrated — click-through to the skills page */}
              {active.skillIds.length > 0 && (
                <Panel className="flex flex-wrap items-center gap-2 px-5 py-4">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <Zap size={11} className="text-cyan-300/70" /> skills demonstrated
                  </span>
                  {active.skillIds
                    .map((sid) => coreSkills.find((s) => s.id === sid))
                    .filter((s): s is NonNullable<typeof s> => Boolean(s))
                    .map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => onNavigate?.('skills', skill.id)}
                        className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/20"
                      >
                        {skill.title}
                      </button>
                    ))}
                </Panel>
              )}

              {/* deep dive */}
              <Panel className="overflow-hidden">
                <button
                  onClick={() => setOpenDeepDive((v) => !v)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
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
                          <h5 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/90">
                            Challenge
                          </h5>
                          <p className="text-[13px] leading-relaxed text-slate-300">{active.deepDive.challenge}</p>
                        </div>
                        <div>
                          <h5 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300/90">
                            Solution
                          </h5>
                          <p className="text-[13px] leading-relaxed text-slate-300">{active.deepDive.solution}</p>
                        </div>
                        <div>
                          <h5 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-pink-300/90">
                            Learnings
                          </h5>
                          <ul className="space-y-1.5">
                            {active.deepDive.learnings.map((l, i) => (
                              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-pink-400/70" />
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
