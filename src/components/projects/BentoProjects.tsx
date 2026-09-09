import React from 'react';
import { Layers, Github, ExternalLink, Zap } from 'lucide-react';
import { projectsData, coreSkillsData } from '../../data/portfolioData';
import { gotoSkill } from '../../lib/skillNav';
import { SpotlightCard } from '../reactbits/SpotlightCard';

/** Skill chips row shared by all project cards — click-through to skills. */
const SkillLinks: React.FC<{ projectId: string }> = ({ projectId }) => {
  const project = projectsData.find((p) => p.id === projectId);
  const skills = (project?.skillIds ?? [])
    .map((sid) => coreSkillsData.find((s) => s.id === sid))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (skills.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
        <Zap className="h-3 w-3" /> Skills:
      </span>
      {skills.map((skill) => (
        <button
          key={skill.id}
          onClick={() => gotoSkill(skill.id)}
          className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-mono text-cyan-200 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/20"
        >
          {skill.title}
        </button>
      ))}
    </div>
  );
};

export const BentoProjects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300 mb-3">
              <Layers className="h-3.5 w-3.5" />
              <span>Engineered Systems & Open Source</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <span>Featured </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Projects & Builds
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              From GPU shader mathematics to cryptographic ledgers and distributed wireless protocols.
            </p>
          </div>

          <a
            href="https://github.com/roelmoeyersoons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-slate-200 transition-all hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-white self-start md:self-auto"
          >
            <Github className="h-4 w-4 text-purple-400" />
            <span>github.com/roelmoeyersoons</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Project 1: OpenGL Mandelbrot (Span 7 cols) */}
          <SpotlightCard
            id={`proj-${projectsData[0].id}`}
            spotlightColor="rgba(0, 242, 254, 0.15)"
            borderColor="rgba(0, 242, 254, 0.4)"
            className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-xs font-mono text-cyan-300">
                  {projectsData[0].category}
                </span>
                {projectsData[0].githubUrl && (
                  <a
                    href={projectsData[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {projectsData[0].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {projectsData[0].description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-6">
                {projectsData[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {projectsData[0].tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
                <span>60+ FPS</span>
                <span>•</span>
                <span>GLSL Shaders</span>
              </div>
            </div>
            <SkillLinks projectId={projectsData[0].id} />
          </SpotlightCard>

          {/* Project 2: Distributed Multi-Radio MAC Protocol (Span 5 cols) */}
          <SpotlightCard
            id={`proj-${projectsData[1].id}`}
            spotlightColor="rgba(121, 40, 202, 0.18)"
            borderColor="rgba(121, 40, 202, 0.4)"
            className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="rounded-md bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-xs font-mono text-purple-300">
                  {projectsData[1].category}
                </span>
                <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 bg-emerald-500/10">
                  M.Sc. Thesis · UGent
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {projectsData[1].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {projectsData[1].description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-6">
                {projectsData[1].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-purple-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {projectsData[1].tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-purple-300">&lt; 10cm Ranging</span>
            </div>
            <SkillLinks projectId={projectsData[1].id} />
          </SpotlightCard>

          {/* Project 3: Discord SongBot (Span 6 cols) */}
          <SpotlightCard
            id={`proj-${projectsData[2].id}`}
            spotlightColor="rgba(245, 158, 11, 0.15)"
            borderColor="rgba(245, 158, 11, 0.4)"
            className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-mono text-amber-300">
                  {projectsData[2].category}
                </span>
                {projectsData[2].githubUrl && (
                  <a
                    href={projectsData[2].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {projectsData[2].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {projectsData[2].description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {projectsData[2].tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-amber-300">C# / .NET Core</span>
            </div>
            <SkillLinks projectId={projectsData[2].id} />
          </SpotlightCard>

          {/* Project 4: ArchConfig Tooling (Span 6 cols) */}
          <SpotlightCard
            id={`proj-${projectsData[3].id}`}
            spotlightColor="rgba(16, 185, 129, 0.15)"
            borderColor="rgba(16, 185, 129, 0.4)"
            className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-mono text-emerald-300">
                  {projectsData[3].category}
                </span>
                {projectsData[3].githubUrl && (
                  <a
                    href={projectsData[3].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {projectsData[3].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {projectsData[3].description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {projectsData[3].tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-emerald-300">Python + Arch Linux</span>
            </div>
            <SkillLinks projectId={projectsData[3].id} />
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
