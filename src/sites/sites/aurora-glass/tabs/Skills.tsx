/**
 * Aurora Glass — Skills tab
 *
 * Selector + stage: a compact glass tile grid lists the six core skills
 * (plus a slim bar for the "Other" toolbox) — clicking one opens its
 * dossier in the stage below: artwork banner, tagline, narrative, proof
 * points, and links into Experience/Projects. Cross-tab focus (from
 * Experience/Projects) opens the requested skill and flashes the stage.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, FolderGit2 } from 'lucide-react';
import {
  coreSkills,
  otherSkills,
  type OtherSkillsGroup,
  type TabFocus,
  type TabNavigate,
} from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import Artwork from '@/sites/shared/Artwork';
import { Chip, LevelBar, Panel, SectionHeading } from '../ui';
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
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Toolkit" title="Skills" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-zinc-400"
      >
        Six core skills — each linked to the roles and projects where it was applied. Select one for the detail.
      </motion.p>

      {/* ── Selector: one glass tile per core skill ── */}
      <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
                'group relative overflow-hidden rounded-2xl border p-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-violet-400/50',
                isActive
                  ? 'border-white/[0.12] bg-white/[0.07]'
                  : 'border-white/[0.08] bg-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.06]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="ag-skill-bar"
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ background: 'linear-gradient(180deg,#8b5cf6,#d946ef)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl border transition-colors',
                  isActive
                    ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-violet-200'
                    : 'border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-zinc-300'
                )}
              >
                <GIcon size={15} />
              </span>
              <p
                className={cn(
                  'mt-3 text-[12.5px] font-medium leading-tight',
                  isActive ? 'text-zinc-50' : 'text-zinc-400 group-hover:text-zinc-200'
                )}
              >
                {skill.title}
              </p>
              <p className="mt-1 font-mono text-[10px] text-zinc-500">{skill.index}</p>
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
          'relative mb-4 flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-5 py-3.5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-violet-400/50',
          isOther
            ? 'border-white/[0.12] bg-white/[0.07]'
            : 'border-white/[0.08] bg-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.06]'
        )}
      >
        {isOther && (
          <motion.span
            layoutId="ag-skill-bar"
            className="absolute inset-y-0 left-0 w-1"
            style={{ background: 'linear-gradient(180deg,#8b5cf6,#d946ef)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        )}
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors',
            isOther
              ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-violet-200'
              : 'border-white/[0.08] bg-white/[0.03] text-zinc-500'
          )}
        >
          {(() => {
            const OIcon = resolveIcon(otherSkills.icon);
            return <OIcon size={15} />;
          })()}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-[13px] font-medium',
            isOther ? 'text-zinc-50' : 'text-zinc-400'
          )}
        >
          {otherSkills.title}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-zinc-500">
          {otherSkills.items.length} tools
        </span>
      </button>

      {/* ── Stage: the dossier of the selection ── */}
      <div ref={stageRef}>
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
                flash && 'ring-2 ring-violet-400/50 shadow-[0_0_70px_-18px_rgba(167,139,250,0.6)]'
              )}
            >
              {activeSkill ? (
                <>
                  {/* art banner */}
                  <div className="relative h-32 sm:h-40">
                    <Artwork spec={activeSkill.art} seed={activeSkill.id} className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-black/40 text-violet-200 backdrop-blur">
                        {(() => {
                          const Icon = resolveIcon(activeSkill.icon);
                          return <Icon size={17} />;
                        })()}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-medium text-white sm:text-2xl">{activeSkill.title}</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                          {activeSkill.index} / {String(coreSkills.length).padStart(2, '0')} · skill
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-5 sm:px-6">
                    {/* tagline */}
                    <p className="font-serif text-[15px] italic leading-relaxed text-violet-200/90">
                      {activeSkill.tagline}
                    </p>

                    {/* narrative */}
                    <div className="mt-4 space-y-3.5">
                      {activeSkill.paragraphs.map((p, j) => (
                        <p key={j} className={cn('text-sm leading-relaxed', j === 0 ? 'text-zinc-200' : 'text-zinc-400')}>
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
                          <span className="text-xs leading-relaxed text-zinc-300">{proof}</span>
                        </div>
                      ))}
                    </div>

                    {/* click-through evidence */}
                    {(activeSkill.experiences.length > 0 || activeSkill.projects.length > 0) && (
                      <div className="mt-5 border-t border-white/[0.07] pt-4">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                          Where this shows up
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeSkill.experiences.map((exp) => (
                            <button
                              key={exp.id}
                              onClick={() => onNavigate?.('experience', exp.id)}
                              className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-[11.5px] font-medium text-violet-200 transition-colors hover:border-violet-400/50 hover:bg-violet-500/20"
                            >
                              <Briefcase size={12} />
                              <span>{exp.label}</span>
                              <span className="font-mono text-[10px] text-violet-300/60">{exp.sublabel}</span>
                            </button>
                          ))}
                          {activeSkill.projects.map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => onNavigate?.('projects', proj.id)}
                              className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3.5 py-1.5 text-[11.5px] font-medium text-fuchsia-200 transition-colors hover:border-fuchsia-400/50 hover:bg-fuchsia-500/20"
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
                /* ── Other: the long tail ── */
                <div className="px-5 py-6 sm:px-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-violet-200">
                      {(() => {
                        const OIcon = resolveIcon(otherSkills.icon);
                        return <OIcon size={17} />;
                      })()}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-zinc-100 sm:text-2xl">{otherSkills.title}</h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{otherSkills.description}</p>
                  <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
                    {otherSkills.items.map((s, i) => (
                      <LevelBar
                        key={s.name}
                        name={s.name}
                        level={s.level}
                        badge={s.badge}
                        delay={i * 0.04}
                        years={yearsOf(s)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Panel>
          </motion.div>
        </AnimatePresence>
      </div>

      <Chip className="mt-6 !border-white/[0.08] !bg-transparent font-mono !text-[10px] text-zinc-500">
        Certifications: AZ-104 · AZ-305 · D365 Sales & Marketing Functional Consultant · Power Apps + D365 Developer
      </Chip>
    </section>
  );
};

export default Skills;
