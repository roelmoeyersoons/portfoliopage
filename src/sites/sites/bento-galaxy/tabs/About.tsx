/**
 * Bento Galaxy — About tab
 *
 * Bento's About skeleton, re-skinned: bio card, education/thesis card and
 * an honors & certifications card in the bento grid, then the career
 * timeline as a vertical rail — newest role at the top, oldest at the
 * bottom. (The old numbered stepper was retired: it started on an empty
 * step and only revealed history one "Next" at a time, which read
 * backwards.) The interactive terminal moved to its own icon-only
 * 'terminal' tab — an easter egg in the nav.
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
} from 'lucide-react';
import {
  certifications,
  education,
  experiences,
  honors,
  profile,
  type ExperienceEntry,
} from '@/sites/shared/content';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, Panel, SectionHeading, TechPill, TEXT_GRADIENT } from '../ui';
import '../ui/station.css';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/** One vertical-timeline row: rail node + role summary. Newest first. */
const TimelineRow: React.FC<{
  entry: ExperienceEntry;
  index: number;
  current: boolean;
  onNavigate?: TabNavigate;
}> = ({ entry, index, current, onNavigate }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.12 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="group relative pb-9 pl-9 last:pb-1"
  >
    {/* rail node — the current role gets the ping, the rest stay hollow */}
    <span className="absolute left-0 top-[3px] flex h-[15px] w-[15px] items-center justify-center">
      {current && <span className="gx-ping text-cyan-300/80" aria-hidden="true" />}
      <span
        className={
          current
            ? 'relative block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.95)]'
            : 'relative block h-2.5 w-2.5 rounded-full border border-cyan-300/40 bg-[#0a0f1e] shadow-[inset_0_0_0_1.5px_rgba(129,140,248,0.5)]'
        }
      />
    </span>

    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-mono text-[11px] font-semibold text-cyan-300/90">{entry.period}</span>
      <span className="font-mono text-[10.5px] text-slate-500">{entry.location}</span>
    </div>
    <h4 className="mt-1.5 font-display text-lg font-bold tracking-tight text-slate-50">{entry.role}</h4>
    <p className="mt-0.5 font-mono text-[11px] text-slate-400">{entry.company}</p>
    <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-slate-400">{entry.summary}</p>

    {entry.metrics.length > 0 && (
      <div className="mt-3.5 flex flex-wrap gap-2">
        {entry.metrics.map((m) => (
          <Chip key={m.label} className="!border-cyan-300/20 !bg-cyan-400/[0.08] !text-[10.5px] text-cyan-100/85">
            <span className="font-display font-bold">{m.value}</span>
            <span className="ml-1.5 text-slate-400">{m.label}</span>
          </Chip>
        ))}
      </div>
    )}
    {entry.tech.length > 0 && (
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {entry.tech.slice(0, 6).map((t) => (
          <TechPill key={t}>{t}</TechPill>
        ))}
      </div>
    )}
    <button
      type="button"
      onClick={() => onNavigate?.('experience', entry.id)}
      className="mt-4 inline-flex items-center gap-1.5 rounded-full px-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
    >
      open in experience <ArrowUpRight size={12} />
    </button>
  </motion.article>
);

const About: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Profile" title="About me" />

    <BentoGrid glowColor={GLOW.violet} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* bio */}
      <BentoCard glowColor={GLOW.indigo} className="px-6 py-6 lg:row-span-2">
        <div className="space-y-4">
          {profile.bioParagraphs.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              className={
                i === 0
                  ? 'font-display text-[17px] font-medium leading-relaxed text-slate-100 first-letter:float-left first-letter:mr-2 first-letter:bg-gradient-to-b first-letter:from-indigo-300 first-letter:to-cyan-300 first-letter:bg-clip-text first-letter:pr-1 first-letter:text-5xl first-letter:font-bold first-letter:text-transparent'
                  : 'text-[13.5px] leading-relaxed text-slate-400'
              }
            >
              {p}
            </motion.p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {experiences.map((e) => (
            <Chip key={e.id} className="!bg-white/[0.04]">
              {e.domain}
            </Chip>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] text-slate-400">
          <span className="h-px flex-1 bg-white/10" />
          {profile.location}
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </BentoCard>

      {/* education */}
      <BentoCard glowColor={GLOW.cyan} className="px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 text-cyan-200">
            <GraduationCap size={18} />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-50">Education</h3>
            <p className="font-mono text-[11px] text-cyan-300/90">{education.period}</p>
          </div>
        </div>
        <p className="font-display text-[15px] font-semibold text-slate-100">{education.degree}</p>
        <p className="mt-1 text-[13px] text-slate-300">{education.institution}</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {education.location} · {education.grade}
        </p>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <div className="mb-2 flex items-center gap-2.5">
            <BookOpen size={13} className="text-indigo-300" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">Master thesis</h4>
          </div>
          <p className={cnTitle()}>{education.thesis.title}</p>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-400">{education.thesis.abstract}</p>
          <ul className="mt-3 space-y-1.5">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-slate-400">
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
            <Users size={12} className="text-slate-500" />
            <p className="text-[11px] text-slate-500">Supervised by {education.thesis.supervisors.join(' · ')}</p>
          </div>
        </div>
      </BentoCard>

      {/* honors & certifications — kept apart from education on purpose */}
      <BentoCard glowColor={GLOW.violet} className="px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 text-violet-200">
            <Award size={18} />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-50">Honors &amp; certifications</h3>
            <p className="font-mono text-[11px] text-violet-300/90">external recognition</p>
          </div>
        </div>

        <ul className="space-y-2">
          {honors.map((h) => (
            <li
              key={h.id}
              className="flex items-start gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5"
            >
              <Trophy size={13} className="mt-1 shrink-0 text-amber-300/90" />
              <div>
                <p className="text-[13px] font-medium leading-snug text-slate-100">{h.title}</p>
                <p className="mt-0.5 font-mono text-[10.5px] text-slate-500">{h.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-300">
            <BadgeCheck size={12} className="text-cyan-300" /> Microsoft certifications
          </p>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.id} className="flex items-center gap-2.5">
                <span className="shrink-0 rounded-md border border-cyan-300/25 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[9.5px] font-bold tracking-wide text-cyan-200">
                  {c.code}
                </span>
                {c.verifyUrl ? (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/verify flex items-center gap-1.5 text-[12.5px] leading-snug text-slate-300 transition-colors hover:text-cyan-200"
                  >
                    {c.name}
                    <ArrowUpRight
                      size={11}
                      aria-label={`${c.name} — official Microsoft credential page`}
                      className="shrink-0 text-slate-600 transition-colors group-hover/verify:text-cyan-300"
                    />
                  </a>
                ) : (
                  <span className="text-[12.5px] leading-snug text-slate-300">{c.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </BentoCard>
    </BentoGrid>

    {/* ── Career timeline — vertical rail, newest first ── */}
    <Panel className="mt-6 px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-baseline justify-between px-2">
        <h3 className="font-display text-lg font-bold text-slate-50">The road so far</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">timeline · newest first</span>
      </div>
      <div className="relative ml-1 sm:ml-3">
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[7px] top-2 w-px bg-gradient-to-b from-cyan-300/60 via-white/15 to-transparent"
        />
        {experiences.map((e, i) => (
          <TimelineRow key={e.id} entry={e} index={i} current={i === 0} onNavigate={onNavigate} />
        ))}
      </div>
    </Panel>
  </section>
);

const cnTitle = () => `font-display text-[15px] font-semibold leading-snug ${TEXT_GRADIENT}`;

export default About;
