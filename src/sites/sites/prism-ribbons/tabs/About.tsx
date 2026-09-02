/**
 * Prism Ribbons — About tab.
 *
 * FlowingMenu "what I do" rows (skill categories with generated art pills),
 * bio with serif-italic lead, education + thesis cards.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { FlowingMenu } from '@/sites/shared/bits';
import { contact, education, profile, skillGroups, techMarquee } from '@/sites/shared/content';
import { artDataUri, Chip, Panel, SectionHeading } from '../ui';

const MENU_ITEMS = skillGroups.map((g) => ({
  link: '#what-i-do',
  text: g.title,
  image: artDataUri(g.art, g.id, 400, 120),
}));

const About: React.FC = () => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Profile" title="About, in" accent="technicolor" />

    {/* ── What I do — flowing menu ── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 h-[340px] overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:h-[420px]"
    >
      <FlowingMenu
        items={MENU_ITEMS}
        speed={14}
        textColor="#dbe3f4"
        bgColor="#090b12"
        marqueeBgColor="#ece9ff"
        marqueeTextColor="#141126"
        borderColor="rgba(148,163,184,0.16)"
      />
    </motion.div>

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
