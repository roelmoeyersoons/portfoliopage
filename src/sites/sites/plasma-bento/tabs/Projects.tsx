/** Plasma Bento — Projects tab (bento cards with artwork, glow and links) */
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const GLOWS = [GLOW.pink, GLOW.orange, GLOW.violet] as const;

const Projects: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Selected work" title="Projects & research" />

    <BentoGrid glowColor={GLOW.pink} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn('min-w-0', p.featured ? 'sm:col-span-2 lg:col-span-2' : 'sm:col-span-1')}
        >
          <BentoCard glowColor={GLOWS[i % 3]} className="h-full p-0">
            <div className={cn('relative overflow-hidden', p.featured ? 'h-48 sm:h-60' : 'h-40')}>
              <Artwork spec={p.art} seed={p.id} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100b18] via-[#100b18]/25 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                {p.featured && (
                  <Chip className="!border-pink-400/30 !bg-pink-500/15 text-pink-200">Featured</Chip>
                )}
                <Chip>{p.category}</Chip>
              </div>
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 p-2 text-white/70 backdrop-blur transition hover:border-orange-400/50 hover:text-orange-200"
                >
                  <Github size={14} />
                </a>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{p.tagline}</p>

              <ul className="mt-3.5 space-y-1.5">
                {p.highlights.slice(0, p.featured ? 3 : 2).map((h, j) => (
                  <li key={j} className="flex gap-2 text-xs leading-relaxed text-white/45">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, p.featured ? 5 : 3).map((t) => (
                    <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10px] text-white/45">
                      {t}
                    </Chip>
                  ))}
                </div>
                {p.stats.length > 0 && (
                  <div className="flex gap-3">
                    {p.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="text-right">
                        <div className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                          {s.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-white/35">{s.label}</div>
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
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-300/90 transition hover:text-orange-200"
                >
                  <ExternalLink size={12} /> View repository
                </a>
              )}
            </div>
          </BentoCard>
        </motion.div>
      ))}
    </BentoGrid>
  </section>
);

export default Projects;
