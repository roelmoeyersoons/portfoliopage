/**
 * Plasma Bento — Skills tab
 *
 * Selector + stage: a compact tile grid lists the six core skills (plus a
 * slim bar for the "Other" toolbox) — clicking one opens its dossier in the
 * stage below: artwork banner, narrative, proof points, and click-through
 * links into Experience/Projects. Cross-tab focus (from Experience/Projects)
 * opens the requested skill and flashes the stage.
 */
import React, { useEffect, useId, useRef, useState } from 'react';
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
import { Chip, GLOW, SectionHeading, TEXT_GRADIENT } from '../ui';
import { cn } from '@/demo/helpers';

export interface SkillsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SECTION_GLOWS = [GLOW.orange, GLOW.pink, GLOW.violet] as const;

/** Renders a data-driven lucide icon from content (iconMap name). */
const DataIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 17 }) => {
  const Icon = resolveIcon(name);
  return <Icon size={size} />;
};

/** Circular level ring with gradient stroke + counting percentage */
const LevelRing: React.FC<{ level: number; delay?: number }> = ({ level, delay = 0 }) => {
  const gradId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const R = 40;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
        <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <defs>
          <linearGradient id={`ring-${gradId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="48"
          cy="48"
          r={R}
          fill="none"
          stroke={`url(#ring-${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - level / 100) }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className={cn('font-display text-lg font-bold', TEXT_GRADIENT)}>
          <CountUp to={level} duration={1.2} delay={delay} />
          <span className="text-[11px] text-white/40">%</span>
        </span>
      </span>
    </div>
  );
};

/**
 * content.ts types other-skill items as `years?`, but the underlying shared
 * portfolio data actually carries `experienceYears` — read both defensively.
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
  const stageGlow = activeSkill ? SECTION_GLOWS[activeIndex % SECTION_GLOWS.length] : GLOW.violet;

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
        className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-white/55"
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
                'group relative overflow-hidden rounded-3xl border p-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-pink-400/50',
                isActive
                  ? 'border-white/[0.12] bg-white/[0.07]'
                  : 'border-white/[0.08] bg-white/[0.035] hover:border-white/[0.12] hover:bg-white/[0.05]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pb-skill-bar"
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ background: 'linear-gradient(180deg,#f97316,#ec4899)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl border transition-colors',
                  isActive
                    ? 'border-orange-400/30 bg-gradient-to-br from-orange-500/25 to-pink-500/15 text-orange-200'
                    : 'border-white/[0.08] bg-white/[0.03] text-white/45 group-hover:text-white/70'
                )}
              >
                <DataIcon name={skill.icon} size={15} />
              </span>
              <p
                className={cn(
                  'mt-3 font-display text-[12.5px] font-semibold leading-tight',
                  isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                )}
              >
                {skill.title}
              </p>
              <p className="mt-1 font-mono text-[10px] text-white/35">{skill.index}</p>
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
          'relative mb-4 flex w-full items-center gap-3 overflow-hidden rounded-3xl border px-5 py-3.5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-pink-400/50',
          isOther
            ? 'border-white/[0.12] bg-white/[0.07]'
            : 'border-white/[0.08] bg-white/[0.035] hover:border-white/[0.12] hover:bg-white/[0.05]'
        )}
      >
        {isOther && (
          <motion.span
            layoutId="pb-skill-bar"
            className="absolute inset-y-0 left-0 w-1"
            style={{ background: 'linear-gradient(180deg,#f97316,#ec4899)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        )}
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors',
            isOther
              ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-pink-500/15 text-violet-200'
              : 'border-white/[0.08] bg-white/[0.03] text-white/45'
          )}
        >
          <DataIcon name={otherSkills.icon} size={15} />
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate font-display text-[13px] font-semibold',
            isOther ? 'text-white' : 'text-white/70'
          )}
        >
          {otherSkills.title}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-white/35">
          {otherSkills.items.length} tools
        </span>
      </button>

      {/* ── Stage: the dossier of the selection ── */}
      <BentoGrid glowColor={GLOW.violet}>
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
                  flash && 'ring-2 ring-pink-400/60 shadow-[0_0_70px_-18px_rgba(236,72,153,0.65)]'
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100b18] to-transparent" />
                      <div className="absolute bottom-4 left-5 flex items-center gap-3 sm:left-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/30 bg-black/40 text-orange-200 backdrop-blur">
                          <DataIcon name={activeSkill.icon} />
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                            {activeSkill.title}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                            {activeSkill.index} / {String(coreSkills.length).padStart(2, '0')} · skill
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                      {/* tagline */}
                      <p className="text-[14px] font-medium leading-relaxed text-pink-200/90">
                        {activeSkill.tagline}
                      </p>

                      {/* narrative */}
                      <div className="mt-4 space-y-3.5">
                        {activeSkill.paragraphs.map((p, j) => (
                          <p
                            key={j}
                            className={cn('text-[13px] leading-relaxed', j === 0 ? 'text-white/80' : 'text-white/55')}
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
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-orange-300" />
                            <span className="text-xs leading-relaxed text-white/70">{proof}</span>
                          </div>
                        ))}
                      </div>

                      {/* click-through evidence */}
                      {(activeSkill.experiences.length > 0 || activeSkill.projects.length > 0) && (
                        <div className="mt-5 border-t border-white/[0.07] pt-4">
                          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-white/40">
                            Where this shows up
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activeSkill.experiences.map((exp) => (
                              <button
                                key={exp.id}
                                onClick={() => onNavigate?.('experience', exp.id)}
                                className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3.5 py-1.5 text-[11.5px] font-medium text-orange-200 transition-colors hover:border-orange-400/50 hover:bg-orange-500/20"
                              >
                                <Briefcase size={12} />
                                <span>{exp.label}</span>
                                <span className="font-mono text-[10px] text-orange-300/60">{exp.sublabel}</span>
                              </button>
                            ))}
                            {activeSkill.projects.map((proj) => (
                              <button
                                key={proj.id}
                                onClick={() => onNavigate?.('projects', proj.id)}
                                className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-[11.5px] font-medium text-violet-200 transition-colors hover:border-violet-400/50 hover:bg-violet-500/20"
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
                  /* ── Other: the long tail, kept as a toolbox ── */
                  <div className="px-5 py-6 sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-pink-500/15 text-violet-200">
                        <DataIcon name={otherSkills.icon} />
                      </span>
                      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                        {otherSkills.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-white/55">
                      {otherSkills.description}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4">
                      {otherSkills.items.map((s, i) => {
                        const years = yearsOf(s);
                        return (
                          <div key={s.name} className="flex flex-col items-center gap-2 text-center">
                            <LevelRing level={s.level} delay={0.1 + i * 0.05} />
                            <p className="font-display text-[12px] font-semibold leading-tight text-white/85">
                              {s.name}
                            </p>
                            <div className="flex flex-col items-center gap-1">
                              {s.badge && (
                                <Chip className="!border-violet-400/25 !bg-violet-500/10 !px-2 !py-0.5 !text-[9.5px] text-violet-200">
                                  {s.badge}
                                </Chip>
                              )}
                              {years && <span className="font-mono text-[9.5px] text-white/40">{years}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
