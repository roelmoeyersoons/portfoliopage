/** Aurora Glass — Projects tab ("Aurora Ledger" — full-width editorial rows) */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Zap } from 'lucide-react';
import { GradualBlur, GradientText } from '@/sites/shared/bits';
import { coreSkills, projects, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

export interface ProjectsTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const Projects: React.FC<ProjectsTabProps> = ({ onNavigate }) => (
  <section className="relative mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Selected work" title="Projects & research" />

    {/* The ledger — no cards, no tile grid: full-width feature rows on hairlines */}
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {projects.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative"
        >
          {/* radial violet glow sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(620px circle at 22% 38%, rgba(139,92,246,0.09), transparent 62%), radial-gradient(520px circle at 80% 78%, rgba(217,70,239,0.06), transparent 66%)',
            }}
          />

          <div className="relative grid items-center gap-7 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:py-14">
            {/* artwork slit — side alternates per row */}
            <div className={cn('relative lg:col-span-5', i % 2 === 1 && 'lg:order-last')}>
              <div className="relative h-56 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d16] sm:h-64 lg:h-72">
                <Artwork
                  spec={p.art}
                  seed={p.id}
                  className="absolute inset-0 h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10]/60 via-transparent to-transparent" />
                {p.featured && (
                  <Chip className="absolute left-4 top-4 !border-fuchsia-400/25 !bg-fuchsia-500/10 text-fuchsia-200">
                    Featured
                  </Chip>
                )}
              </div>
            </div>

            {/* content */}
            <div className="relative lg:col-span-7">
              {/* giant mono index watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-7 right-0 select-none font-mono text-5xl font-medium leading-none text-white/[0.07] sm:text-6xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500">{p.category}</p>

              <h3 className="mt-2.5 max-w-lg font-serif text-2xl font-medium leading-tight tracking-tight sm:text-[1.75rem]">
                {p.featured ? (
                  <GradientText colors={['#a78bfa', '#e879f9', '#67e8f9']} animationSpeed={7}>
                    {p.title}
                  </GradientText>
                ) : (
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-zinc-50 transition-colors duration-500 group-hover:text-transparent">
                    {p.title}
                  </span>
                )}
              </h3>

              <p className="mt-2.5 max-w-xl font-serif text-[15px] italic leading-relaxed text-zinc-400">
                {p.tagline}
              </p>

              <ul className="mt-5 max-w-xl space-y-2">
                {p.highlights.slice(0, 3).map((h, j) => (
                  <li key={j} className="flex gap-3 text-[13px] leading-relaxed text-zinc-400">
                    <span
                      aria-hidden
                      className="mt-[6px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gradient-to-br from-violet-400 to-fuchsia-400"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Chip key={t} className="!bg-white/[0.03] font-mono !text-[10px] text-zinc-500">
                      {t}
                    </Chip>
                  ))}
                </div>

                {p.stats.length > 0 && (
                  <div className="flex gap-5">
                    {p.stats.slice(0, 2).map((s) => (
                      <div key={s.label}>
                        <div className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                          {s.value}
                        </div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-violet-300/90 transition hover:border-violet-400/40 hover:bg-white/[0.06] hover:text-violet-200"
                  >
                    <Github size={12} /> View repository
                  </a>
                )}
              </div>

              {/* skills demonstrated — click-through to the skills page */}
              {p.skillIds.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    <Zap size={11} className="text-violet-400/70" /> skills
                  </span>
                  {p.skillIds
                    .map((sid) => coreSkills.find((s) => s.id === sid))
                    .filter((s): s is NonNullable<typeof s> => Boolean(s))
                    .map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => onNavigate?.('skills', skill.id)}
                        className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-200 transition-colors hover:border-violet-400/50 hover:bg-violet-500/20"
                      >
                        {skill.title}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>

    {/* the ledger dissolves at the section's bottom edge */}
    <GradualBlur
      target="parent"
      position="bottom"
      height="4.5rem"
      strength={1.4}
      divCount={5}
      curve="bezier"
      exponential
      opacity={0.75}
      zIndex={10}
    />
  </section>
);

export default Projects;
