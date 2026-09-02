/** Aurora Glass — Projects tab (spotlight bento grid) */
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SpotlightCard } from '@/sites/shared/bits';
import { projects } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const Projects: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Selected work" title="Projects & research" />

    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(p.featured && 'md:col-span-2')}
        >
          <SpotlightCard
            className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-colors"
            spotlightColor="rgba(192, 132, 252, 0.14)"
          >
            <div className={cn('relative overflow-hidden', p.featured ? 'h-52 sm:h-64' : 'h-44')}>
              <Artwork
                spec={p.art}
                seed={p.id}
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/20 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                {p.featured && (
                  <Chip className="!border-fuchsia-400/25 !bg-fuchsia-500/10 text-fuchsia-200">Featured</Chip>
                )}
                <Chip>{p.category}</Chip>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-50">{p.title}</h3>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-400 transition hover:border-violet-400/40 hover:text-violet-200"
                    aria-label={`${p.title} on GitHub`}
                  >
                    <Github size={14} />
                  </a>
                )}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{p.tagline}</p>

              <ul className="mt-3.5 space-y-1.5">
                {p.highlights.slice(0, p.featured ? 3 : 2).map((h, j) => (
                  <li key={j} className="flex gap-2 text-xs leading-relaxed text-zinc-500">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-fuchsia-400/70" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, p.featured ? 5 : 3).map((t) => (
                    <Chip key={t} className="!bg-white/[0.03] font-mono !text-[10px] text-zinc-500">
                      {t}
                    </Chip>
                  ))}
                </div>
                {p.stats.length > 0 && (
                  <div className="flex gap-3">
                    {p.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="text-right">
                        <div className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                          {s.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-zinc-600">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-300/90 transition hover:text-violet-200"
                >
                  <ExternalLink size={12} /> View repository
                </a>
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
