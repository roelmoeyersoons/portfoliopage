/**
 * Prism Ribbons — Projects tab.
 *
 * Featured projects live in a CardSwap deck (artwork SVG data-URIs, click to
 * open the repository); the remaining projects render in a wide grid.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, MousePointerClick } from 'lucide-react';
import { CardSwap } from '@/sites/shared/bits';
import { projects } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { artDataUri, Chip, SectionHeading } from '../ui';

const Projects: React.FC = () => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Selected work" title="Projects in" accent="dispersion" />

      {/* ── Featured deck ── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
        <div aria-hidden className="absolute -left-24 top-4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div aria-hidden className="absolute right-8 top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div aria-hidden className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-500/[0.07] blur-3xl" />

        <div className="relative z-10 max-w-[250px] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Featured builds</p>
          <p className="mt-3 font-serif text-xl italic leading-snug text-slate-200">
            Three flagship efforts, reshuffling in the deck.
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">
            <MousePointerClick size={13} className="mt-0.5 shrink-0 text-violet-300/80" />
            Click a card to open its repository.
          </p>
        </div>

        <div className="relative h-[420px] sm:h-[460px]">
          <CardSwap
            width={430}
            height={290}
            cardDistance={58}
            verticalDistance={66}
            delay={4600}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
          >
            {featured.map((p) => (
              <div
                key={p.id}
                onClick={() => p.githubUrl && window.open(p.githubUrl, '_blank', 'noopener')}
                className="overflow-hidden"
                style={{
                  borderRadius: 18,
                  border: '1px solid rgba(148,163,184,0.22)',
                  background: '#0a0c13',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={artDataUri(p.art, p.id, 800, 560)}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/95 via-[#07080d]/10 to-[#07080d]/35" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                    {p.category}
                  </p>
                  <h4 className="mt-1 font-serif text-lg font-medium text-white">{p.title}</h4>
                </div>
                {p.githubUrl && (
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/50 text-slate-300 backdrop-blur">
                    <Github size={12} />
                  </span>
                )}
              </div>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* ── Remaining projects ── */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-colors hover:border-cyan-300/25 md:col-span-2"
          >
            <div className="grid md:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-[220px] overflow-hidden">
                <Artwork
                  spec={p.art}
                  seed={p.id}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/70 via-transparent to-transparent md:bg-gradient-to-r" />
                <div className="absolute left-4 top-4">
                  <Chip className="!border-cyan-400/25 !bg-cyan-500/10 text-cyan-200">{p.category}</Chip>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-50">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{p.tagline}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span
                        className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundImage: 'linear-gradient(92deg,#22d3ee,#f472b6)' }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <Chip key={t} className="!bg-white/[0.03] font-mono !text-[10px] text-slate-500">
                        {t}
                      </Chip>
                    ))}
                  </div>
                  {p.stats.length > 0 && (
                    <div className="flex gap-4">
                      {p.stats.slice(0, 2).map((s) => (
                        <div key={s.label} className="text-right">
                          <div className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text font-mono text-[11px] font-bold text-transparent">
                            {s.value}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-600">{s.label}</div>
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
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300/90 transition hover:text-cyan-200"
                  >
                    <ExternalLink size={12} /> View repository
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
