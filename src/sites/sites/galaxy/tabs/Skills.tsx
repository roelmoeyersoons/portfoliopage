/**
 * Galaxy Drift — Skills tab
 *
 * Selector + stage: a compact constellation grid lists the six core skills
 * (plus a slim bar for the "Other" toolbox) — clicking one opens its
 * dossier in the stage below: artwork banner, tagline, narrative, proof
 * points, and links into Experience/Projects. Cross-tab focus (from
 * Experience/Projects) opens the requested skill and flashes the stage.
 * The signature OrbitRing primitive lives in the "Other" stage.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, FolderGit2 } from 'lucide-react';
import { DotGrid } from '@/sites/shared/bits';
import {
  coreSkills,
  otherSkills,
  type OtherSkillsGroup,
  type TabFocus,
  type TabNavigate,
} from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import Artwork from '@/sites/shared/Artwork';
import { ACTIVE_GLOW, OrbitRing, Panel, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

export interface SkillsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** content.ts types other-skill items as `years?`; the shared data may carry `experienceYears`. */
const yearsOf = (s: OtherSkillsGroup['items'][number]): string | undefined =>
  s.years ?? (s as { experienceYears?: string }).experienceYears;

const Skills: React.FC<SkillsTabProps> = ({ onNavigate, focus }) => {
  const [activeId, setActiveId] = useState(coreSkills[0].id);
  const [flash, setFlash] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeSkill = coreSkills.find((s) => s.id === activeId) ?? null;
  const isOther = activeId === otherSkills.id;

  // Cross-tab focus (from Experience/Projects): open that skill and flash
  // the stage. Site resets scroll on tab switch; a gentle nudge keeps the
  // stage in view on small screens.
  useEffect(() => {
    if (!focus) return;
    if (focus.id !== otherSkills.id && !coreSkills.some((s) => s.id === focus.id)) return;
    setActiveId(focus.id);
    setFlash(true);
    const t = window.setTimeout(() => {
      stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
    const clear = window.setTimeout(() => setFlash(false), 4000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clear);
    };
  }, [focus?.nonce, focus?.id]);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <SectionHeading kicker="// star chart" title="Skills" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-slate-400"
      >
        Six core skills — each linked to the roles and projects where it was applied. Select one for the detail.
      </motion.p>

      {/* ── Selector: one constellation tile per core skill ── */}
      <div className="mb-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {coreSkills.map((skill) => {
          const isActive = skill.id === activeId;
          const GIcon = resolveIcon(skill.icon);
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => setActiveId(skill.id)}
              aria-pressed={isActive}
              className={cn(
                'group relative overflow-hidden rounded-xl border p-3.5 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/50',
                isActive
                  ? 'border-cyan-300/30 text-cyan-50'
                  : 'border-white/[0.07] text-slate-400 hover:border-white/[0.14] hover:text-slate-200'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="gx-skill-bar"
                  className={cn('absolute inset-0 rounded-xl border border-cyan-300/25 bg-cyan-400/[0.07]', ACTIVE_GLOW)}
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors',
                  isActive
                    ? 'border-indigo-300/30 bg-gradient-to-br from-indigo-500/25 to-cyan-500/15 text-cyan-200'
                    : 'border-white/[0.07] bg-white/[0.03] text-slate-500 group-hover:text-slate-300'
                )}
              >
                <GIcon size={14} />
              </span>
              <p
                className={cn(
                  'relative z-10 mt-2.5 font-display text-[12px] font-medium leading-tight',
                  isActive ? 'text-cyan-50' : 'text-slate-400 group-hover:text-slate-200'
                )}
              >
                {skill.title}
              </p>
              <p className="relative z-10 mt-1 font-mono text-[9.5px] text-slate-500">{skill.index}</p>
            </button>
          );
        })}
      </div>

      {/* ── Selector: the "Other" toolbox as a slim bar ── */}
      <button
        type="button"
        onClick={() => setActiveId(otherSkills.id)}
        aria-pressed={isOther}
        className={cn(
          'relative mb-4 flex w-full items-center gap-3 overflow-hidden rounded-xl border px-5 py-3 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/50',
          isOther
            ? 'border-cyan-300/30 text-cyan-50'
            : 'border-white/[0.07] text-slate-400 hover:border-white/[0.14] hover:text-slate-200'
        )}
      >
        {isOther && (
          <motion.span
            layoutId="gx-skill-bar"
            className={cn('absolute inset-0 rounded-xl border border-cyan-300/25 bg-cyan-400/[0.07]', ACTIVE_GLOW)}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        )}
        <span
          className={cn(
            'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
            isOther
              ? 'border-indigo-300/30 bg-gradient-to-br from-indigo-500/25 to-cyan-500/15 text-cyan-200'
              : 'border-white/[0.07] bg-white/[0.03] text-slate-500'
          )}
        >
          {(() => {
            const OIcon = resolveIcon(otherSkills.icon);
            return <OIcon size={14} />;
          })()}
        </span>
        <span
          className={cn(
            'relative z-10 min-w-0 flex-1 truncate font-display text-[13px] font-medium',
            isOther ? 'text-cyan-50' : 'text-slate-400'
          )}
        >
          {otherSkills.title}
        </span>
        <span className="relative z-10 shrink-0 font-mono text-[10px] text-slate-500">
          {otherSkills.items.length} tools
        </span>
      </button>

      {/* ── Stage: the dossier of the selection, floating over the starfield ── */}
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

        <div ref={stageRef} className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: EASE }}
              className="min-w-0"
            >
              <Panel
                className={cn(
                  'overflow-hidden transition-shadow duration-500',
                  flash && 'ring-2 ring-cyan-300/50 shadow-[0_0_70px_-18px_rgba(103,232,249,0.55)]'
                )}
              >
                {activeSkill ? (
                  <>
                    {/* art banner */}
                    <div className="relative h-32 sm:h-40">
                      <Artwork spec={activeSkill.art} seed={activeSkill.id} className="absolute inset-0 h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] to-[#05060d]/20" />
                      <div className="absolute bottom-4 left-5 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-black/40 text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.25)] backdrop-blur">
                          {(() => {
                            const Icon = resolveIcon(activeSkill.icon);
                            return <Icon size={17} />;
                          })()}
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{activeSkill.title}</h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                            {activeSkill.index} / {String(coreSkills.length).padStart(2, '0')} · skill
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      {/* tagline */}
                      <p className="font-display text-[14px] font-medium leading-relaxed text-cyan-200/90">
                        {activeSkill.tagline}
                      </p>

                      {/* narrative */}
                      <div className="mt-4 space-y-3.5">
                        {activeSkill.paragraphs.map((p, j) => (
                          <p key={j} className={cn('text-[13px] leading-relaxed', j === 0 ? 'text-slate-200' : 'text-slate-400')}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* proof points */}
                      <div className="mt-5 grid gap-2.5 md:grid-cols-3">
                        {activeSkill.proofPoints.map((proof, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3"
                          >
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-300/90" />
                            <span className="text-xs leading-relaxed text-slate-300">{proof}</span>
                          </div>
                        ))}
                      </div>

                      {/* click-through evidence */}
                      {(activeSkill.experiences.length > 0 || activeSkill.projects.length > 0) && (
                        <div className="mt-5 border-t border-white/[0.07] pt-4">
                          <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-slate-500">
                            Where this shows up
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activeSkill.experiences.map((exp) => (
                              <button
                                key={exp.id}
                                onClick={() => onNavigate?.('experience', exp.id)}
                                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3.5 py-1.5 text-[11.5px] font-medium text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/20"
                              >
                                <Briefcase size={12} />
                                <span>{exp.label}</span>
                                <span className="font-mono text-[10px] text-cyan-300/60">{exp.sublabel}</span>
                              </button>
                            ))}
                            {activeSkill.projects.map((proj) => (
                              <button
                                key={proj.id}
                                onClick={() => onNavigate?.('projects', proj.id)}
                                className="inline-flex items-center gap-2 rounded-full border border-indigo-300/25 bg-indigo-400/10 px-3.5 py-1.5 text-[11.5px] font-medium text-indigo-200 transition-colors hover:border-indigo-300/50 hover:bg-indigo-400/20"
                              >
                                <FolderGit2 size={12} />
                                <span>{proj.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* ── Other: the long tail, drawn as a star chart ── */
                  <div className="px-5 py-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-black/40 text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.25)] backdrop-blur">
                        {(() => {
                          const OIcon = resolveIcon(otherSkills.icon);
                          return <OIcon size={17} />;
                        })()}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{otherSkills.title}</h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-slate-400">{otherSkills.description}</p>
                    <div className="mt-7 grid grid-cols-2 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-3">
                      {otherSkills.items.map((s, i) => (
                        <OrbitRing
                          key={s.name}
                          name={s.name}
                          level={s.level}
                          years={yearsOf(s)}
                          badge={s.badge}
                          delay={i * 0.05}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Panel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
