/**
 * Noir Threads — Projects tab
 *
 * A horizontal AccordionGallery (grayscale-able monochrome SVG data URIs
 * generated from each project's art spec, accent #3b82f6) above an
 * editorial index of project rows with links, tags and stats.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AccordionGallery } from '@/sites/shared/bits';
import { projects, type ProjectEntry } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import { artDataUri, EASE, Kicker, SectionHeading, TechPill } from '../ui';

const GALLERY_ITEMS = projects.map((p) => ({
  image: artDataUri(p.art, p.id),
  label: p.title,
  alt: p.tagline,
  link: p.githubUrl,
}));

const ProjectRow: React.FC<{ project: ProjectEntry; index: number }> = ({ project: p, index: i }) => (
  <motion.li
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
    className="group border-t border-[#262626] last:border-b"
  >
    <div className="grid gap-4 px-1 py-7 transition-colors duration-300 group-hover:bg-white/[0.02] md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-6 md:px-3">
      <span className="pt-1.5 font-mono text-[11px] text-[#525252] transition-colors duration-300 group-hover:text-[#3b82f6]">
        {String(i + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-serif text-xl font-medium tracking-tight text-[#fafafa] transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
            {p.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252]">{p.category}</span>
          {p.featured && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3b82f6]">Featured</span>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#a3a3a3]">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.slice(0, 5).map((t) => (
            <TechPill key={t}>{t}</TechPill>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 md:justify-end md:pt-1">
        {p.stats.length > 0 && (
          <div className="flex gap-5">
            {p.stats.slice(0, 2).map((s) => (
              <div key={s.label} className="text-right">
                <div className="font-mono text-[11px] font-medium text-[#fafafa]">{s.value}</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#525252]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
        {p.githubUrl ? (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.title} on GitHub`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262626] text-[#a3a3a3] transition-colors duration-300 group-hover:border-[#3b82f6]/50 group-hover:text-[#fafafa]"
          >
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="flex h-10 items-center justify-center rounded-full border border-[#262626] px-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#525252]">
            Internal
          </span>
        )}
      </div>
    </div>
  </motion.li>
);

const Projects: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-32 md:pt-36">
    <SectionHeading index="03" kicker="Selected work" title="Projects & research, filed in mono." />

    {/* gallery */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      className="mt-12"
    >
      <AccordionGallery
        items={GALLERY_ITEMS}
        defaultIndex={0}
        accentColor="#3b82f6"
        overlayColor="#0a0a0a"
        textColor="#fafafa"
        height={360}
        gap={10}
        radius={24}
        expandRatio={0.5}
        tilt={6}
        parallax={0.5}
        trigger="hover"
        grayscale
        className="w-full"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252]">
        <span>
          {projects.length} records — <span className="text-[#a3a3a3]">hover or focus to expand</span>
        </span>
        <span className="hidden sm:inline">Expanded panels reveal their accent</span>
      </div>
    </motion.div>

    {/* editorial index */}
    <div className="mt-16">
      <Kicker>Project index</Kicker>
      <ul className={cn('mt-4')}>
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </ul>
    </div>
  </section>
);

export default Projects;