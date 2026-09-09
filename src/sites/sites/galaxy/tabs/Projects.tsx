/**
 * Galaxy Drift — Projects tab ("Deep-sky Catalog").
 *
 * An interactive master/detail targeting console instead of a card grid:
 * catalog rows on the left (click to acquire a target), a locked target-scan
 * pane on the right with radar rings, decrypted title, stats and repository.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';
import { CountUp, DecryptedText } from '@/sites/shared/bits';
import { coreSkills, projects, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Panel, SectionHeading, TechPill } from '../ui';
import { cn } from '@/demo/helpers';

export interface ProjectsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

/** Compact stat: numeric part counts up, prefix/suffix rendered outside. */
const StatBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const lead = /^(\d[\d.]*)/.exec(value);
  return (
    <div className="text-right">
      <div className="bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text font-mono text-[11px] font-bold text-transparent">
        {lead ? (
          <>
            {value.slice(0, lead.index)}
            <CountUp to={parseFloat(lead[1])} duration={1.6} />
            {value.slice(lead.index + lead[1].length)}
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-[9px] uppercase tracking-wider text-slate-600">{label}</div>
    </div>
  );
};

/** Faint constellation sketch behind the catalog rows (purely decorative). */
const ConstellationSketch: React.FC = () => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-0 h-full w-full"
    viewBox="0 0 400 320"
    preserveAspectRatio="none"
  >
    <polyline points="36,54 132,142 238,86 338,196" fill="none" stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
    <polyline points="58,244 132,142 296,262" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
    {[
      [36, 54],
      [132, 142],
      [238, 86],
      [338, 196],
      [58, 244],
      [296, 262],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r={2} fill="rgba(103,232,249,0.28)" />
    ))}
  </svg>
);

const Projects: React.FC<ProjectsTabProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState(
    projects.find((p) => p.featured)?.id ?? projects[0].id
  );
  const active = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <SectionHeading kicker="// deep sky objects" title="Projects & research" />

      <div className="grid gap-5 lg:grid-cols-[1fr_440px]">
        {/* ── catalog ── */}
        <Panel className="relative overflow-hidden">
          <ConstellationSketch />
          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
              catalog // {String(projects.length).padStart(2, '0')} objects
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
              <motion.span
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="h-1 w-1 rounded-full bg-cyan-300"
              />
              live
            </span>
          </div>
          <div className="relative z-10 divide-y divide-white/[0.06]">
            {projects.map((p, i) => {
              const isActive = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-left transition-colors sm:gap-4 sm:px-5',
                    isActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gd-target-bar"
                      className="absolute inset-y-0 left-0 w-[2px] bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={cn(
                      'font-mono text-[11px] tracking-[0.14em]',
                      isActive ? 'text-cyan-200' : 'text-slate-600'
                    )}
                  >
                    DS-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block truncate font-display text-sm font-semibold sm:text-base',
                        isActive ? 'text-cyan-100' : 'text-slate-300 group-hover:text-slate-100'
                      )}
                    >
                      {p.title}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                      {p.category}
                      {p.featured ? ' · flagship' : ''}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      p.featured
                        ? 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]'
                        : 'bg-slate-600'
                    )}
                  />
                </button>
              );
            })}
          </div>
          <div className="relative z-10 border-t border-white/[0.06] px-4 py-2.5 sm:px-5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-600">
              select a row to acquire target
            </span>
          </div>
        </Panel>

        {/* ── target scan pane ── */}
        <Panel className="overflow-hidden lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/90">
              target locked
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
              DS-{String(projects.indexOf(active) + 1).padStart(2, '0')}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* scan viewport */}
              <div className="relative h-44 overflow-hidden sm:h-52">
                <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060d]/85 via-transparent to-[#05060d]/30" />
                {[0, 1.3].map((delay) => (
                  <motion.span
                    key={delay}
                    aria-hidden
                    animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeOut', delay }}
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30"
                  />
                ))}
                <span aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l border-t border-cyan-300/50" />
                <span aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r border-t border-cyan-300/50" />
                <span aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-cyan-300/50" />
                <span aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-cyan-300/50" />
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-50">
                  <DecryptedText
                    text={active.title}
                    animateOn="view"
                    speed={45}
                    maxIterations={8}
                    characters="!<>-_\\/[]{}—=+*^?#01"
                    encryptedClassName="!text-cyan-400/70"
                    parentClassName="block"
                  />
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{active.tagline}</p>

                <ul className="mt-3.5 space-y-1.5">
                  {active.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex gap-2 text-xs leading-relaxed text-slate-500">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {active.tags.slice(0, 5).map((t) => (
                    <TechPill key={t}>{t}</TechPill>
                  ))}
                </div>

                {/* skills demonstrated — click-through to the skills page */}
                {active.skillIds.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                      <Zap size={11} className="text-cyan-300/70" /> skills
                    </span>
                    {active.skillIds
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

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5">
                  {active.githubUrl ? (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300/90 transition hover:text-cyan-200"
                    >
                      <ExternalLink size={12} /> Open repository
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                      internal research
                    </span>
                  )}
                  <div className="flex gap-4">
                    {active.stats.slice(0, 2).map((s) => (
                      <StatBadge key={s.label} label={s.label} value={s.value} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Panel>
      </div>
    </section>
  );
};

export default Projects;
