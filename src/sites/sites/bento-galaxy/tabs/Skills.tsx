/**
 * Bento Galaxy — Skills tab
 *
 * Bento's selector + stage: a compact tile grid lists the six core skills
 * (plus a slim bar for the "Other" toolbox) — clicking one opens its
 * dossier in the stage below: artwork banner, narrative, proof points, and
 * click-through links into Experience/Projects. Cross-tab focus opens the
 * requested skill and flashes the stage. All chrome is observatory-
 * skinned, and the "Other" toolbox renders Galaxy Drift's OrbitRings.
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
import { CountUp } from '@/sites/shared/bits';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, OrbitRing, SectionHeading } from '../ui';
import { cn } from '@/sites/shared/cn';

export interface SkillsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SECTION_GLOWS = [GLOW.indigo, GLOW.violet, GLOW.cyan] as const;

/** Renders a data-driven lucide icon from content (iconMap name). */
const DataIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 17 }) => {
  const Icon = resolveIcon(name);
  return <Icon size={size} />;
};

/**
 * content.ts types other-skill items as years?, but the underlying shared
 * portfolio data actually carries experienceYears — read both defensively.
 */
const yearsOf = (s: OtherSkillsGroup['items'][number]): string | undefined =>
  s.years ?? (s as { experienceYears?: string }).experienceYears;

const Skills: React.FC<SkillsTabProps> = ({ onNavigate, focus }) => {
  const [activeId, setActiveId] = useState(coreSkills[0].id);
  const [flash, setFlash] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeIndex = coreSkills.findIndex((s) => s.id === activeId);
  const activeSkill = activeIndex >= 0 ? coreSkills[activeIndex] : null;
  const isOther = activeId === otherSkills.id;
  const stageGlow = activeSkill ? SECTION_GLOWS[activeIndex % SECTION_GLOWS.length] : GLOW.cyan;

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
        className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-slate-400"
      >
        Six core skills — each linked to the roles and projects where it was applied. Select one for the detail.
      </motion.p>

      {/* ── Selector: one tile per core skill ── */}
      <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {coreSkills.map((skill) => {
          const isActive = skill.id === activeId;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => setActiveId(skill.id)}
              aria-pressed={isActive}
              className={cn(
                'group relative overflow-hidden rounded-3xl border p-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/50',
                isActive
                  ? 'border-white/[0.12] bg-white/[0.07]'
                  : 'border-white/[0.08] bg-white/[0.035] hover:border-white/[0.12] hover:bg-white/[0.05]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="gx-skill-bar"
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ background: 'linear-gradient(180deg,#818cf8,#67e8f9)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl border transition-colors',
                  isActive
                    ? 'border-cyan-300/30 bg-gradient-to-br from-indigo-500/25 to-cyan-500/15 text-cyan-200'
                    : 'border-white/[0.08] bg-white/[0.03] text-slate-400 group-hover:text-slate-200'
                )}
              >
                <DataIcon name={skill.icon} size={15} />
              </span>
              <p
                className={cn(
                  'mt-3 font-display text-[12.5px] font-semibold leading-tight',
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-100'
                )}
              >
                {skill.title}
              </p>
              <p className="mt-1 font-mono text-[10px] text-slate-500">{skill.index}</p>
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
          'relative mb-4 flex w-full items-center gap-3 overflow-hidden rounded-3xl border px-5 py-3.5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/50',
          isOther
            ? 'border-white/[0.12] bg-white/[0.07]'
            : 'border-white/[0.08] bg-white/[0.035] hover:border-white/[0.12] hover:bg-white/[0.05]'
        )}
      >
        {isOther && (
          <motion.span
            layoutId="gx-skill-bar"
            className="absolute inset-y-0 left-0 w-1"
            style={{ background: 'linear-gradient(180deg,#818cf8,#67e8f9)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        )}
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors',
            isOther
              ? 'border-violet-300/30 bg-gradient-to-br from-violet-500/25 to-indigo-500/15 text-violet-200'
              : 'border-white/[0.08] bg-white/[0.03] text-slate-400'
          )}
        >
          <DataIcon name={otherSkills.icon} size={15} />
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate font-display text-[13px] font-semibold',
            isOther ? 'text-white' : 'text-slate-300'
          )}
        >
          {otherSkills.title}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-slate-500">
          {otherSkills.items.length} tools
        </span>
      </button>

      {/* ── Stage: the dossier of the selection ── */}
      <BentoGrid glowColor={GLOW.cyan}>
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
              <BentoCard
                glowColor={stageGlow}
                className={cn(
                  'p-0',
                  flash && 'ring-2 ring-cyan-300/60 shadow-[0_0_70px_-18px_rgba(103,232,249,0.65)]'
                )}
              >
                {activeSkill ? (
                  <>
                    {/* art banner */}
                    <div className="relative h-32 sm:h-40">
                      <Artwork
                        spec={activeSkill.art}
                        seed={activeSkill.id}
                        className="absolute inset-0 h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent" />
                      <div className="absolute bottom-4 left-5 flex items-center gap-3 sm:left-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-black/40 text-cyan-200 backdrop-blur">
                          <DataIcon name={activeSkill.icon} />
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-50 sm:text-2xl">
                            {activeSkill.title}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                            {activeSkill.index} / {String(coreSkills.length).padStart(2, '0')} · skill
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                      {/* tagline */}
                      <p className="text-[14px] font-medium leading-relaxed text-cyan-200/90">
                        {activeSkill.tagline}
                      </p>

                      {/* narrative */}
                      <div className="mt-4 space-y-3.5">
                        {activeSkill.paragraphs.map((p, j) => (
                          <p
                            key={j}
                            className={cn('text-[13px] leading-relaxed', j === 0 ? 'text-slate-200' : 'text-slate-400')}
                          >
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* proof points */}
                      <div className="mt-5 grid gap-2.5 md:grid-cols-3">
                        {activeSkill.proofPoints.map((proof, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3"
                          >
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-cyan-300" />
                            <span className="text-xs leading-relaxed text-slate-300">{proof}</span>
                          </div>
                        ))}
                      </div>

                      {/* click-through evidence */}
                      {(activeSkill.experiences.length > 0 || activeSkill.projects.length > 0) && (
                        <div className="mt-5 border-t border-white/[0.07] pt-4">
                          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
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
                                className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3.5 py-1.5 text-[11.5px] font-medium text-violet-200 transition-colors hover:border-violet-300/50 hover:bg-violet-400/20"
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
                  /* ── Other: the long tail, kept as a toolbox of orbit rings ── */
                  <div className="px-5 py-6 sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/30 bg-gradient-to-br from-violet-500/25 to-indigo-500/15 text-violet-200">
                        <DataIcon name={otherSkills.icon} />
                      </span>
                      <h3 className="font-display text-xl font-bold text-slate-50 sm:text-2xl">
                        {otherSkills.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-slate-400">
                      {otherSkills.description}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4">
                      {otherSkills.items.map((s, i) => (
                        <OrbitRing
                          key={s.name}
                          name={s.name}
                          level={s.level}
                          years={yearsOf(s)}
                          badge={s.badge}
                          delay={0.1 + i * 0.05}
                        />
                      ))}
                    </div>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
                      <CountUp to={otherSkills.items.length} duration={1.2} /> tools tracked · usage centrality, not
                      proficiency
                    </p>
                  </div>
                )}
              </BentoCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </BentoGrid>
    </section>
  );
};

export default Skills;
