/**
 * Galaxy Drift — Projects tab
 * Grid of glass cards over generated constellation artwork with a cursor
 * spotlight + cyan hover glow; numeric stats count up on view.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { CountUp, SpotlightCard } from '@/sites/shared/bits';
import { projects, type ProjectEntry } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, SectionHeading, TechPill } from '../ui';
import { cn } from '@/demo/helpers';

/** Compact stat: numeric part counts up, prefix/suffix rendered outside. */
const StatBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const lead = /^(\d[\d.]*)/.exec(value);
  return (
    <div className="text-right">
      <div className="bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text font-mono text-[11px] font-bold text-transparent">
        {lead ? (
          <>
            {value.slice(0, lead.index)}
            <CountUp to={parseFloat(lead[0])} duration={1.6} />
            {value.slice(lead.index + lead[0].length)}
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-[9px] uppercase tracking-wider text-slate-600">{label}</div>
    </div>
  );
};

const ProjectCard: React.FC<{ p: ProjectEntry }> = ({ p }) => (
  <SpotlightCard
    className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/25 hover:shadow-[0_0_44px_-14px_rgba(103,232,249,0.4)]"
    spotlightColor="rgba(129, 140, 248, 0.14)"
  >
    <div className={cn('relative overflow-hidden', p.featured ? 'h-52 sm:h-64' : 'h-44')}>
      <Artwork
        spec={p.art}
        seed={p.id}
        className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-[#05060d]/20 to-transparent" />
      <div className="absolute left-4 top-4 flex gap-2">
        {p.featured && (
          <Chip className="!border-cyan-300/30 !bg-cyan-400/10 font-mono !text-[10px] uppercase tracking-[0.14em] text-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.25)]">
            Featured
          </Chip>
        )}
        <Chip className="font-mono !text-[10px] uppercase tracking-[0.14em] text-slate-400">{p.category}</Chip>
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-tight text-slate-50">{p.title}</h3>
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition hover:border-cyan-300/40 hover:text-cyan-200"
            aria-label={`${p.title} on GitHub`}
          >
            <Github size={14} />
          </a>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{p.tagline}</p>

      <ul className="mt-3.5 space-y-1.5">
        {p.highlights.slice(0, p.featured ? 3 : 2).map((h, j) => (
          <li key={j} className="flex gap-2 text-xs leading-relaxed text-slate-500">
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.slice(0, p.featured ? 5 : 3).map((t) => (
          <TechPill key={t}>{t}</TechPill>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5">
        {p.githubUrl ? (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300/90 transition hover:text-cyan-200"
          >
            <ExternalLink size={12} /> View repository
          </a>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">internal research</span>
        )}
        <div className="flex gap-4">
          {p.stats.slice(0, 2).map((s) => (
            <StatBadge key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </div>
  </SpotlightCard>
);

const Projects: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
    <SectionHeading kicker="// deep sky objects" title="Projects & research" />

    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(p.featured && 'md:col-span-2')}
        >
          <ProjectCard p={p} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
