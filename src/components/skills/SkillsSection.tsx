import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  Bot as BotIcon,
  Briefcase,
  CheckCircle2,
  Cloud as CloudIcon,
  Code2 as Code2Icon,
  Compass as CompassIcon,
  FolderGit2,
  GitBranch as GitBranchIcon,
  Terminal,
} from 'lucide-react';
import { coreSkillsData, otherSkillsData, marqueeTechList, experiencesData, projectsData } from '../../data/portfolioData';
import { GOTO_SKILL_EVENT, gotoAnchor } from '../../lib/skillNav';
import { InfiniteScrollMarquee } from '../reactbits/InfiniteScrollMarquee';
import { SpotlightCard } from '../reactbits/SpotlightCard';

const skillIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Cloud':
      return <CloudIcon className={className} />;
    case 'Bot':
      return <BotIcon className={className} />;
    case 'Code2':
      return <Code2Icon className={className} />;
    case 'GitBranch':
      return <GitBranchIcon className={className} />;
    case 'Compass':
      return <CompassIcon className={className} />;
    default:
      return <Terminal className={className} />;
  }
};

/**
 * Skills — six core skills, each its own section with narrative text and
 * linked evidence (experiences + projects). The long tail of technologies
 * keeps its compact bar list under "Other".
 */
export const SkillsSection: React.FC = () => {
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  // Click-through from Experience/Projects sections lands here.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!id) return;
      setHighlightedSkill(id);
      // Give the scroll a beat before focusing the card, then target it directly.
      setTimeout(() => {
        document.getElementById(`skill-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      // Auto-clear the highlight so the page returns to rest.
      setTimeout(() => setHighlightedSkill((cur) => (cur === id ? null : cur)), 3500);
    };
    window.addEventListener(GOTO_SKILL_EVENT, handler);
    return () => window.removeEventListener(GOTO_SKILL_EVENT, handler);
  }, []);

  return (
    <section id="skills" className="relative py-24 overflow-hidden scroll-mt-20">
      {/* Infinite Marquee Strip */}
      <div className="mb-20">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
          // Core Technology Ecosystem
        </p>
        <InfiniteScrollMarquee items={marqueeTechList} speed="medium" direction="left" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>Core Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            <span>Skills</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            My six core skills, each linked to the roles and projects where it was applied.
          </p>
        </div>

        {/* ── Core skills: one section each ── */}
        <div className="space-y-6">
          {coreSkillsData.map((skill, idx) => {
            const linkedExperiences = skill.relatedExperienceIds
              .map((id) => experiencesData.find((e) => e.id === id))
              .filter((e): e is NonNullable<typeof e> => Boolean(e));
            const linkedProjects = skill.relatedProjectIds
              .map((id) => projectsData.find((p) => p.id === id))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            const isHighlighted = highlightedSkill === skill.id;

            return (
              <motion.div
                key={skill.id}
                id={`skill-${skill.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.03 * idx }}
                className="scroll-mt-24"
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 242, 254, 0.10)"
                  borderColor={isHighlighted ? 'rgba(0, 242, 254, 0.8)' : 'rgba(0, 242, 254, 0.3)'}
                  className={`p-6 sm:p-8 lg:p-10 transition-all duration-500 ${
                    isHighlighted ? 'ring-2 ring-cyan-400/60 shadow-[0_0_60px_-15px_rgba(0,242,254,0.4)]' : ''
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-start gap-4 sm:gap-5 mb-6">
                    <span className="hidden sm:block font-mono text-4xl font-bold text-white/10 leading-none pt-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      {skillIcon(skill.iconName, 'h-5 w-5 text-cyan-400')}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{skill.title}</h3>
                      <p className="text-cyan-300/90 text-sm mt-1">{skill.tagline}</p>
                    </div>
                  </div>

                  {/* Narrative */}
                  <div className="space-y-3.5 max-w-3xl">
                    {skill.paragraphs.map((p, i) => (
                      <p key={i} className={`leading-relaxed ${i === 0 ? 'text-slate-200 text-sm sm:text-[15px]' : 'text-slate-400 text-sm'}`}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Proof points */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {skill.proofPoints.map((proof, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-3"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed text-slate-300">{proof}</span>
                      </div>
                    ))}
                  </div>

                  {/* Evidence: click-through to experiences & projects */}
                  {(linkedExperiences.length > 0 || linkedProjects.length > 0) && (
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">
                        // Where this shows up
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {linkedExperiences.map((exp) => (
                          <button
                            key={exp.id}
                            onClick={() => gotoAnchor(`exp-${exp.id}`)}
                            className="group inline-flex items-center gap-2 rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-2 text-xs font-mono text-cyan-200 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/20"
                          >
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{exp.company}</span>
                            <span className="text-cyan-400/60">{exp.period}</span>
                            <ArrowDownRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </button>
                        ))}
                        {linkedProjects.map((proj) => (
                          <button
                            key={proj.id}
                            onClick={() => gotoAnchor(`proj-${proj.id}`)}
                            className="group inline-flex items-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 px-3.5 py-2 text-xs font-mono text-purple-200 transition-all hover:border-purple-400/60 hover:bg-purple-500/20"
                          >
                            <FolderGit2 className="h-3.5 w-3.5" />
                            <span>{proj.title}</span>
                            <ArrowDownRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* ── Other: the long tail, kept honest ── */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <span className="text-slate-400">Other — </span>
              <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                used along the way
              </span>
            </h3>
            <p className="text-slate-500 text-sm mt-3">
              Technologies I've used at some point, with roughly how central each became in my work.
              A toolbox, not a billboard — the six skills above are the real profile.
            </p>
          </div>

          <SpotlightCard
            spotlightColor="rgba(121, 40, 202, 0.10)"
            borderColor="rgba(255, 255, 255, 0.15)"
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {otherSkillsData.map((skill, sIdx) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-medium text-slate-200 text-sm truncate">{skill.name}</span>
                      {skill.badge && (
                        <span className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shrink-0">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {skill.experienceYears && (
                        <span className="text-[11px] font-mono text-slate-500">{skill.experienceYears}</span>
                      )}
                      <span className="text-[11px] font-mono text-slate-400 w-8 text-right">{skill.level}</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-slate-400 to-slate-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: sIdx * 0.04 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
