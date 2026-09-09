/**
 * Noir Threads — Skills tab
 *
 * Selector + stage: an editorial index lists the six core skills (mono
 * number + serif title, hairline rules, blue rule on active) plus a slim
 * appendix row for the "Other" toolbox — clicking one opens its record in
 * the stage below: serif masthead, artwork plate, narrative body, numbered
 * proof points and cross-references into Experience/Projects. Cross-tab
 * focus opens the requested skill and flashes the stage. The 1px blue
 * level bars live in the "Other" stage.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  coreSkills,
  otherSkills,
  type OtherSkillsGroup,
  type TabFocus,
  type TabNavigate,
} from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import { cn } from '@/demo/helpers';
import { Art, EASE, Kicker, LevelBar, SectionHeading } from '../ui';

export interface SkillsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

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
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32 md:pt-36">
      <SectionHeading index="02" kicker="Toolkit" title="Skills" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
        className="mt-6 max-w-2xl text-sm leading-relaxed text-[#a3a3a3]"
      >
        Six core skills — each linked to the roles and projects where it was applied. Select one for the record.
      </motion.p>

      {/* ── Selector: editorial index of the six skills ── */}
      <div className="mt-10 grid gap-x-10 border-t border-[#262626] sm:grid-cols-2 lg:grid-cols-3">
        {coreSkills.map((skill) => {
          const isActive = skill.id === activeId;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => setActiveId(skill.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative flex items-baseline gap-4 border-b border-[#262626] py-4 pl-3 pr-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50',
                isActive ? 'text-[#fafafa]' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nt-skill-rule"
                  className="absolute inset-y-0 left-0 w-[2px] bg-[#3b82f6]"
                  transition={{ type: 'spring', stiffness: 480, damping: 40 }}
                />
              )}
              <span
                className={cn(
                  'relative font-mono text-[11px] transition-colors',
                  isActive ? 'text-[#3b82f6]' : 'text-[#525252] group-hover:text-[#a3a3a3]'
                )}
              >
                {skill.index}
              </span>
              <span className="relative min-w-0">
                <span className="block truncate font-serif text-[15px] leading-snug">{skill.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Selector: the "Other" toolbox as an appendix row ── */}
      <button
        type="button"
        onClick={() => setActiveId(otherSkills.id)}
        aria-current={isOther ? 'true' : undefined}
        className={cn(
          'group relative flex w-full items-baseline gap-4 border-b border-[#262626] py-4 pl-3 pr-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50',
          isOther ? 'text-[#fafafa]' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'
        )}
      >
        {isOther && (
          <motion.span
            layoutId="nt-skill-rule"
            className="absolute inset-y-0 left-0 w-[2px] bg-[#3b82f6]"
            transition={{ type: 'spring', stiffness: 480, damping: 40 }}
          />
        )}
        <span
          className={cn(
            'relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
            isOther ? 'text-[#3b82f6]' : 'text-[#525252] group-hover:text-[#a3a3a3]'
          )}
        >
          App.
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="block truncate font-serif text-[15px] leading-snug">{otherSkills.title}</span>
        </span>
        <span className="relative shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#525252]">
          {otherSkills.items.length} tools
        </span>
      </button>

      {/* ── Stage: the record of the selection ── */}
      <div ref={stageRef} className="mt-12">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              'rounded-3xl border px-6 py-8 transition-all duration-500 sm:px-8 sm:py-10',
              flash
                ? 'border-[#3b82f6]/60 bg-[#3b82f6]/[0.04] shadow-[0_0_60px_-24px_rgba(59,130,246,0.5)]'
                : 'border-[#262626] bg-transparent'
            )}
          >
            {activeSkill ? (
              <>
                {/* masthead */}
                <header className="flex items-start gap-5">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#262626] bg-[#141414] text-[#a3a3a3]">
                    {(() => {
                      const Icon = resolveIcon(activeSkill.icon);
                      return <Icon size={17} />;
                    })()}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight text-[#fafafa] sm:text-4xl">
                        {activeSkill.title}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3b82f6]">
                        {activeSkill.index} / {String(coreSkills.length).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl font-serif text-lg italic leading-relaxed text-[#e5e5e5]">
                      {activeSkill.tagline}
                    </p>
                  </div>
                </header>

                {/* artwork plate */}
                <figure className="group mt-8 overflow-hidden rounded-3xl border border-[#262626]">
                  <div className="relative h-32 transition-colors duration-500 group-hover:bg-[#3b82f6]/5 sm:h-40">
                    <Art spec={activeSkill.art} seed={activeSkill.id} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-[#262626] bg-[#0f0f0f] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                    <span>
                      Skill {activeSkill.index} — <span className="text-[#a3a3a3]">the record</span>
                    </span>
                    <span>{activeSkill.experiences.length + activeSkill.projects.length} references</span>
                  </figcaption>
                </figure>

                {/* narrative body */}
                <div className="mt-8 max-w-3xl space-y-4">
                  {activeSkill.paragraphs.map((p, j) => (
                    <p key={j} className={cn('text-sm leading-relaxed', j === 0 ? 'text-[#e5e5e5]' : 'text-[#a3a3a3]')}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* numbered proof points */}
                <div className="mt-8">
                  <Kicker>The evidence</Kicker>
                  <ol className="mt-3 border-b border-[#262626]">
                    {activeSkill.proofPoints.map((proof, j) => (
                      <li key={j} className="flex gap-5 border-t border-[#262626] py-3.5">
                        <span className="shrink-0 font-mono text-[11px] text-[#525252]">[{j + 1}]</span>
                        <p className="text-[13px] leading-relaxed text-[#d4d4d4]">{proof}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* cross-references */}
                {(activeSkill.experiences.length > 0 || activeSkill.projects.length > 0) && (
                  <div className="mt-8">
                    <Kicker>Cross-references</Kicker>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {activeSkill.experiences.map((exp) => (
                        <button
                          key={exp.id}
                          onClick={() => onNavigate?.('experience', exp.id)}
                          className="group inline-flex items-center gap-3 rounded-full border border-[#262626] py-2 pl-4 pr-3 text-left transition-colors duration-300 hover:border-[#3b82f6]/50 hover:bg-white/[0.03]"
                        >
                          <span className="font-serif text-sm text-[#e5e5e5]">{exp.label}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#525252] group-hover:text-[#3b82f6]">
                            {exp.sublabel}
                          </span>
                          <ArrowUpRight size={12} className="text-[#525252] transition-colors group-hover:text-[#3b82f6]" />
                        </button>
                      ))}
                      {activeSkill.projects.map((proj) => (
                        <button
                          key={proj.id}
                          onClick={() => onNavigate?.('projects', proj.id)}
                          className="group inline-flex items-center gap-3 rounded-full border border-[#262626] py-2 pl-4 pr-3 text-left transition-colors duration-300 hover:border-[#3b82f6]/50 hover:bg-white/[0.03]"
                        >
                          <span className="font-serif text-sm text-[#e5e5e5]">{proj.label}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#525252] group-hover:text-[#3b82f6]">
                            project
                          </span>
                          <ArrowUpRight size={12} className="text-[#525252] transition-colors group-hover:text-[#3b82f6]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* ── Other: the long tail ── */
              <>
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-[#fafafa] sm:text-3xl">
                    {otherSkills.title}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#525252]">
                    appendix
                  </span>
                </header>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a3a3a3]">
                  {otherSkills.description}
                </p>
                <div className="mt-6 gap-x-14 md:columns-2">
                  {otherSkills.items.map((s, i) => (
                    <LevelBar
                      key={s.name}
                      name={s.name}
                      level={s.level}
                      years={yearsOf(s)}
                      badge={s.badge}
                      delay={i * 0.03}
                    />
                  ))}
                </div>
                <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#525252]">
                  Percentages = roughly how central each tool became in my work.
                </p>
              </>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
