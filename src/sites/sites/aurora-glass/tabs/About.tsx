/** Aurora Glass — About tab (bio, education, thesis) */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { MaskedHeading } from '@/sites/shared/bits';
import { education, profile } from '@/sites/shared/content';
import { Chip, Panel, SectionHeading } from '../ui';

/** Inline SVG gradient used as the masked media inside MaskedHeading */
const ART_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stop-color="#7c3aed"/>
        <stop offset="45%" stop-color="#d946ef"/>
        <stop offset="100%" stop-color="#22d3ee"/>
      </linearGradient></defs>
      <rect width="1200" height="300" fill="#0a0a10"/>
      <rect width="1200" height="300" fill="url(#g)"/>
    </svg>`
  );

const About: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Profile" title="About me" />

    <div className="mb-10">
      <MaskedHeading
        text="Curiosity drives craft"
        mediaType="image"
        src={ART_URI}
        reveal="rise"
        weight={600}
        tracking={-0.02}
        textScale={0.14}
        className="!font-serif"
      />
    </div>

    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      {/* bio */}
      <Panel className="space-y-4 px-6 py-6">
        {profile.bioParagraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={
              i === 0
                ? 'font-serif text-lg leading-relaxed text-zinc-100 first-letter:float-left first-letter:mr-2 first-letter:bg-gradient-to-b first-letter:from-violet-300 first-letter:to-fuchsia-400 first-letter:bg-clip-text first-letter:pr-1 first-letter:text-5xl first-letter:font-semibold first-letter:text-transparent'
                : 'text-sm leading-relaxed text-zinc-400'
            }
          >
            {p}
          </motion.p>
        ))}

        <div className="flex flex-wrap gap-2 pt-2">
          {['Distributed Systems', 'Embedded & Wireless', 'GPU / Graphics', 'Full-Stack', 'Cloud Architecture'].map(
            (t) => (
              <Chip key={t} className="!bg-white/[0.04]">
                {t}
              </Chip>
            )
          )}
        </div>
      </Panel>

      {/* education */}
      <div className="space-y-5">
        <Panel className="px-6 py-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-200">
              <GraduationCap size={17} />
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium text-zinc-50">Education</h3>
              <p className="font-mono text-[11px] text-fuchsia-300/90">{education.period}</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-zinc-100">{education.degree}</p>
          <p className="mt-1 text-[13px] text-zinc-400">{education.institution}</p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {education.location} · {education.grade}
          </p>
        </Panel>

        <Panel className="px-6 py-6">
          <div className="mb-3 flex items-center gap-2.5">
            <BookOpen size={14} className="text-cyan-300" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">Master thesis</h4>
          </div>
          <p className="font-serif text-[15px] leading-snug text-zinc-100">{education.thesis.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{education.thesis.abstract}</p>
          <ul className="mt-4 space-y-2">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-zinc-300">
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3.5">
            <Users size={12} className="text-zinc-500" />
            <p className="text-[11px] text-zinc-500">
              Supervised by {education.thesis.supervisors.join(' · ')}
            </p>
          </div>
        </Panel>
      </div>
    </div>
  </section>
);

export default About;
