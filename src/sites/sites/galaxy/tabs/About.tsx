/**
 * Galaxy Drift — About tab
 * Bio with a gradient drop cap, focus clusters, and the education card
 * with a muted MagicRings nebula (~280px, three.js) drifting behind it,
 * plus the thesis panel.
 */
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Telescope, Users } from 'lucide-react';
import { MagicRings } from '@/sites/shared/bits';
import { education, profile, skillGroups } from '@/sites/shared/content';
import { Chip, Panel, SectionHeading } from '../ui';

const About: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-32">
    <SectionHeading kicker="// the observer" title="About me" />

    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      {/* bio */}
      <Panel className="space-y-4 px-6 py-6">
        <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
          <Telescope size={13} />
          biographical transmission
        </div>
        {profile.bioParagraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={
              i === 0
                ? 'font-display text-[17px] leading-relaxed text-slate-100 first-letter:float-left first-letter:mr-2.5 first-letter:bg-gradient-to-b first-letter:from-indigo-300 first-letter:to-cyan-300 first-letter:bg-clip-text first-letter:pr-1 first-letter:text-5xl first-letter:font-bold first-letter:text-transparent'
                : 'text-sm leading-relaxed text-slate-400'
            }
          >
            {p}
          </motion.p>
        ))}

        <div className="border-t border-white/[0.06] pt-4">
          <p className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.28em] text-slate-500">
            observed domains
          </p>
          <div className="flex flex-wrap gap-2">
            {skillGroups.map((g) => (
              <Chip key={g.id} className="!bg-white/[0.04] transition-colors hover:!border-cyan-300/30 hover:text-cyan-100">
                {g.title}
              </Chip>
            ))}
          </div>
        </div>
      </Panel>

      {/* education + thesis */}
      <div className="space-y-5">
        <Panel className="relative overflow-hidden px-6 py-6">
          {/* MagicRings nebula — decorative, ~280px, muted indigo/cyan.
              Lazily code-split (three.js); local Suspense keeps the fallback silent. */}
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] opacity-80">
            <Suspense fallback={null}>
              <MagicRings
                color="#5b6cf0"
                colorTwo="#3fc2d8"
                ringCount={5}
                baseRadius={0.3}
                radiusStep={0.08}
                lineThickness={1.5}
                attenuation={12}
                noiseAmount={0.05}
                speed={0.6}
                opacity={0.9}
              />
            </Suspense>
          </div>

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 text-indigo-200">
                <GraduationCap size={17} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-50">Education</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">{education.period}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-100">{education.degree}</p>
            <p className="mt-1 text-[13px] text-slate-400">{education.institution}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {education.location} · {education.grade}
            </p>
          </div>
        </Panel>

        <Panel className="px-6 py-6">
          <div className="mb-3 flex items-center gap-2.5">
            <BookOpen size={14} className="text-cyan-300" />
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-slate-300">
              Master thesis
            </h4>
          </div>
          <p className="font-display text-[15px] font-medium leading-snug text-slate-100">{education.thesis.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{education.thesis.abstract}</p>
          <ul className="mt-4 space-y-2">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-slate-300">
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-indigo-300 to-cyan-300" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3.5">
            <Users size={12} className="text-slate-500" />
            <p className="text-[11px] text-slate-500">Supervised by {education.thesis.supervisors.join(' · ')}</p>
          </div>
        </Panel>
      </div>
    </div>
  </section>
);

export default About;
