/**
 * Prism Ribbons — Projects tab ("Spectrum Bands").
 *
 * Full-width hover-image bands (a local FlowingMenu fork with selection);
 * selecting a band opens its dossier panel beneath. The old CardSwap deck
 * was removed — it never fit this tab.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';
import { coreSkills, projects, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, Panel, SectionHeading } from '../ui';
import SpectrumBands from '../ui/SpectrumBands';

const PRISM_DOT = 'linear-gradient(92deg, #22d3ee, #a78bfa, #f472b6)';

export interface ProjectsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const Projects: React.FC<ProjectsTabProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState(
    projects.find((p) => p.featured)?.id ?? projects[0].id
  );
  const active = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Selected work" title="Projects in" accent="dispersion" />

      <SpectrumBands projects={projects} selectedId={selectedId} onSelect={setSelectedId} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <Panel className="overflow-hidden">
            <div className="grid md:grid-cols-[300px_1fr]">
              {/* artwork slit */}
              <div className="relative min-h-[180px] overflow-hidden">
                <Artwork
                  spec={active.art}
                  seed={active.id}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/70 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  {active.featured && (
                    <Chip className="!border-cyan-400/25 !bg-cyan-500/10 text-cyan-200">Featured</Chip>
                  )}
                  <Chip>{active.category}</Chip>
                </div>
              </div>

              {/* dossier */}
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-50">
                  {active.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{active.tagline}</p>

                <ul className="mt-4 space-y-1.5">
                  {active.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span
                        className="mt-[6px] h-1.5 w-1.5 shrink-0 rotate-45 rounded-[2px]"
                        style={{ backgroundImage: PRISM_DOT }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags.slice(0, 5).map((t) => (
                      <Chip key={t} className="!bg-white/[0.03] font-mono !text-[10px] text-slate-500">
                        {t}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {active.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="text-right">
                        <div className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                          {s.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-600">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* skills demonstrated — click-through to the skills page */}
                {active.skillIds.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
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
                          className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/20"
                        >
                          {skill.title}
                        </button>
                      ))}
                  </div>
                )}

                {active.githubUrl && (
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300/90 transition hover:text-cyan-200"
                  >
                    <ExternalLink size={12} /> View repository
                  </a>
                )}
              </div>
            </div>
          </Panel>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-slate-600">
        hover a band to refract its light · select one to open its dossier
      </p>
    </section>
  );
};

export default Projects;
