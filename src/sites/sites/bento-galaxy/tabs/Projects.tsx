/**
 * Bento Galaxy — Projects tab — "Signal Slabs".
 *
 * Bento's project pattern, unchanged: a vertical stack of full-width
 * horizontal slabs. Each slab is a BentoCard whose collapsed state is a
 * single row — gradient edge bar, mono index, title, category chip, mono
 * tag previews and a rotating chevron — and whose expanded state is a
 * two-column dossier: generated artwork (left) and tagline / highlights /
 * tags / stats / repo link (right). Accordion behaviour: at most one slab
 * is open at a time. Re-skinned to the observatory palette.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, ExternalLink, Zap } from 'lucide-react';
import { coreSkills, projects, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, SectionHeading } from '../ui';
import { cn } from '@/sites/shared/cn';

const GLOWS = [GLOW.cyan, GLOW.indigo, GLOW.violet] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slabV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 + i * 0.07, duration: 0.5, ease: EASE },
  }),
};

export interface ProjectsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const Projects: React.FC<ProjectsTabProps> = ({ onNavigate }) => {
  // The first featured project starts expanded; opening a slab closes the last.
  const [openId, setOpenId] = useState<string | null>(() => projects.find((p) => p.featured)?.id ?? null);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Selected work" title="Projects & research" />

      <BentoGrid glowColor={GLOW.cyan} className="flex flex-col gap-4">
        {projects.map((p, i) => {
          const open = p.id === openId;
          return (
            <motion.div key={p.id} custom={i} variants={slabV} initial="hidden" animate="show" className="min-w-0">
              <BentoCard glowColor={GLOWS[i % 3]} className="p-0">
                {/* ── Collapsed slab header ── */}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  aria-expanded={open}
                  className={cn(
                    'relative flex w-full items-center gap-3 py-4 pl-6 pr-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300/50 sm:gap-4 sm:py-5 sm:pl-7 sm:pr-5',
                    open ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1"
                    style={{ background: 'linear-gradient(180deg, #818cf8, #67e8f9)' }}
                  />
                  <span
                    className={cn(
                      'shrink-0 font-mono text-[11px]',
                      open
                        ? 'bg-gradient-to-b from-indigo-300 to-cyan-300 bg-clip-text text-transparent'
                        : 'text-slate-600'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-display text-[15px] font-bold tracking-tight text-slate-50 sm:text-lg">
                    {p.title}
                  </span>
                  <Chip className="shrink-0 !px-2 !text-[10px]">{p.category}</Chip>
                  <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] text-slate-500 sm:flex">
                    {p.tags.slice(0, 2).map((t, j) => (
                      <span key={t} className="flex items-center gap-2">
                        {j > 0 && <span className="text-slate-700">/</span>}
                        {t}
                      </span>
                    ))}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn('shrink-0 text-slate-400 transition-transform duration-300', open && 'rotate-180')}
                  />
                </button>

                {/* ── Expanded dossier ── */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="dossier"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid border-t border-white/[0.07] sm:grid-cols-2">
                        {/* left: generated artwork with badges */}
                        <div className="relative h-44 sm:h-full sm:min-h-[190px]">
                          <Artwork spec={p.art} seed={p.id} className="absolute inset-0 h-full w-full" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent" />
                          <div className="absolute left-4 top-4 flex gap-2">
                            {p.featured && (
                              <Chip className="!border-cyan-300/30 !bg-cyan-400/15 text-cyan-100">Featured</Chip>
                            )}
                            <Chip>{p.category}</Chip>
                          </div>
                        </div>

                        {/* right: dossier content */}
                        <div className="flex min-w-0 flex-col p-5">
                          <p className="text-[13.5px] font-medium leading-relaxed text-slate-200">{p.tagline}</p>
                          <ul className="mt-3 space-y-2">
                            {p.highlights.slice(0, 3).map((h, j) => (
                              <li key={j} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                              <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10px] text-slate-400">
                                {t}
                              </Chip>
                            ))}
                          </div>

                          {/* skills demonstrated — click-through to the skills page */}
                          {p.skillIds.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                <Zap size={11} className="text-cyan-300/80" /> skills
                              </span>
                              {p.skillIds
                                .map((sid) => coreSkills.find((s) => s.id === sid))
                                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                                .map((skill) => (
                                  <button
                                    key={skill.id}
                                    onClick={() => onNavigate?.('skills', skill.id)}
                                    className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/20"
                                  >
                                    {skill.title}
                                  </button>
                                ))}
                            </div>
                          )}
                          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-5 gap-y-3 pt-4">
                            {p.stats.length > 0 && (
                              <div className="flex gap-4">
                                {p.stats.map((s) => (
                                  <div key={s.label}>
                                    <div className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                                      {s.value}
                                    </div>
                                    <div className="text-[9px] uppercase tracking-wider text-slate-500">{s.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${p.title} on GitHub`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300/90 transition hover:text-cyan-200"
                              >
                                <ExternalLink size={12} /> View repository
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BentoCard>
            </motion.div>
          );
        })}
      </BentoGrid>

      <p className="mt-7 text-center font-mono text-[10px] tracking-[0.18em] text-slate-500">
        select a slab to expand its dossier
      </p>
    </section>
  );
};

export default Projects;
