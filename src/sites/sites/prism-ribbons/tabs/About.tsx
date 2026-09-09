/**
 * Prism Ribbons — About tab.
 *
 * Compact "what I do" grid of the six core skills (click-through to their
 * sections on the Skills tab), bio with serif-italic lead, education +
 * thesis cards.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { contact, coreSkills, education, profile, techMarquee, type TabNavigate } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import { Chip, Panel, SectionHeading } from '../ui';

export interface AboutTabProps {
  onNavigate?: TabNavigate;
}

const About: React.FC<AboutTabProps> = ({ onNavigate }) => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Profile" title="About, in" accent="technicolor" />

    {/* ── What I do — the six core skills, one click from their story ── */}
    <div className="mb-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {coreSkills.map((skill, i) => {
        const Icon = resolveIcon(skill.icon);
        return (
          <motion.button
            key={skill.id}
            onClick={() => onNavigate?.('skills', skill.id)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            whileHover={{ y: -3 }}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-left backdrop-blur-xl transition-colors hover:border-cyan-300/30"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-pink-500/10 text-cyan-200">
                <Icon size={15} />
              </span>
              <span className="font-mono text-[10px] text-slate-600">{skill.index}</span>
              <h3 className="min-w-0 flex-1 truncate font-serif text-[15px] font-medium text-slate-100">
                {skill.title}
              </h3>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-400">{skill.tagline}</p>
          </motion.button>
        );
      })}
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
                ? 'font-serif text-lg italic leading-relaxed text-slate-100'
                : 'text-sm leading-relaxed text-slate-400'
            }
          >
            {p}
          </motion.p>
        ))}

        <div className="flex flex-wrap gap-2 pt-2">
          {techMarquee.slice(0, 8).map((t) => (
            <Chip key={t} className="!bg-white/[0.04] font-mono !text-[10.5px] text-slate-400">
              {t}
            </Chip>
          ))}
        </div>
      </Panel>

      {/* education */}
      <div className="space-y-5">
        <Panel className="px-6 py-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-pink-500/10 text-cyan-200">
              <GraduationCap size={17} />
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium text-slate-50">Education</h3>
              <p className="font-mono text-[11px] text-pink-300/90">{education.period}</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-100">{education.degree}</p>
          <p className="mt-1 text-[13px] text-slate-400">{education.institution}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {education.location} · {education.grade}
          </p>
        </Panel>

        <Panel className="px-6 py-6">
          <div className="mb-3 flex items-center gap-2.5">
            <BookOpen size={14} className="text-violet-300" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">Master thesis</h4>
          </div>
          <p className="font-serif text-[15px] italic leading-snug text-slate-100">{education.thesis.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{education.thesis.abstract}</p>
          <ul className="mt-4 space-y-2">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-slate-300">
                <span
                  className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundImage: 'linear-gradient(92deg,#22d3ee,#a78bfa,#f472b6)' }}
                />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3.5">
            <Users size={12} className="text-slate-500" />
            <p className="text-[11px] text-slate-500">Supervised by {education.thesis.supervisors.join(' · ')}</p>
          </div>
        </Panel>

        <p className="px-1 text-[11px] leading-relaxed text-slate-600">
          Reach out at <span className="text-slate-400">{contact.email}</span> — always happy to talk protocol
          design, render pipelines or clean architecture.
        </p>
      </div>
    </div>
  </section>
);

export default About;
