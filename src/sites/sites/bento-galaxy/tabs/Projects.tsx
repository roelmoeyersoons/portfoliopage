/**
 * Bento Galaxy — Projects tab — proof shelf + "Signal Slabs".
 *
 * Conversion-first structure (owner decision, 2026-09): the tab opens with
 * named CLIENT CASE STUDIES — the professional proof, always visible, no
 * accordion hiding it — then hands off to the "Lab": the hobby/research
 * signal slabs from Bento's original project pattern (vertical stack of
 * full-width expandable slabs, one open at a time), now explicitly framed
 * as experiments rather than professional work.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, ExternalLink, Zap } from 'lucide-react';
import {
  caseStudies,
  coreSkills,
  projects,
  type CaseStudyEntry,
  type TabFocus,
  type TabNavigate,
} from '@/sites/shared/content';
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

/** Mono section label used inside the case-study dossier. */
const DossierLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-cyan-300/70">{children}</span>
);

/**
 * Client case study — always-visible proof card (no accordion): artwork
 * spine on the left, the situation / what I did / outcomes on the right.
 */
const CaseCard: React.FC<{ study: CaseStudyEntry; index: number; onNavigate?: TabNavigate }> = ({
  study,
  index,
  onNavigate,
}) => (
  <motion.div custom={index} variants={slabV} initial="hidden" animate="show" className="min-w-0">
    <BentoCard glowColor={index % 2 === 0 ? GLOW.cyan : GLOW.indigo} className="overflow-hidden">
      <div className="grid sm:grid-cols-[190px_1fr]">
        {/* artwork spine */}
        <div className="relative h-32 sm:h-auto sm:min-h-[250px]">
          <Artwork spec={study.art} seed={study.id} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/25 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-[#0a0f1e]/10 sm:to-[#0a0f1e]" />
          <div className="absolute left-4 top-4">
            <Chip className="!border-cyan-300/30 !bg-cyan-400/15 font-mono !text-[10px] uppercase tracking-[0.18em] text-cyan-100">
              Case {String(index + 1).padStart(2, '0')}
            </Chip>
          </div>
        </div>

        {/* dossier */}
        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-50 sm:text-xl">{study.client}</h3>
            <span className="font-mono text-[10.5px] text-slate-500">
              {study.industry} · {study.period}
            </span>
          </div>
          <p className="mt-0.5 text-[12px] font-medium text-slate-400">{study.role}</p>
          <p className="mt-3 font-display text-[14.5px] font-semibold leading-snug text-slate-100">{study.title}</p>

          <div className="mt-4 space-y-3.5">
            <div>
              <DossierLabel>the situation</DossierLabel>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{study.challenge}</p>
            </div>
            <div>
              <DossierLabel>what I did</DossierLabel>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{study.approach}</p>
            </div>
            <div>
              <DossierLabel>outcomes</DossierLabel>
              <ul className="mt-1.5 space-y-1.5">
                {study.outcomes.map((o, j) => (
                  <li key={j} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.techStack.map((t) => (
              <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10px] text-slate-400">
                {t}
              </Chip>
            ))}
          </div>

          {study.skillIds.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                <Zap size={11} className="text-cyan-300/80" /> skills
              </span>
              {study.skillIds
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
        </div>
      </div>
    </BentoCard>
  </motion.div>
);

const Projects: React.FC<ProjectsTabProps> = ({ onNavigate }) => {
  // The first featured project starts expanded; opening a slab closes the last.
  const [openId, setOpenId] = useState<string | null>(() => projects.find((p) => p.featured)?.id ?? null);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      {/* ── Client case studies — the professional proof shelf ── */}
      <SectionHeading kicker="Proof of work" title="Case studies" />
      <BentoGrid glowColor={GLOW.indigo} className="flex flex-col gap-4">
        {caseStudies.map((c, i) => (
          <CaseCard key={c.id} study={c} index={i} onNavigate={onNavigate} />
        ))}
      </BentoGrid>

      {/* ── Hand-off to the Lab ── */}
      <div className="mb-8 mt-16 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          Lab · experiments &amp; side quests
        </span>
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>
      <SectionHeading kicker="Experiments &amp; research" title="The Lab" />

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
