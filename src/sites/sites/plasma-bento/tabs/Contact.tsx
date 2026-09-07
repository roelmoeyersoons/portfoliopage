/** Plasma Bento — Contact tab (SpecularButton CTA + link cards) */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SpecularButton, ShinyText } from '@/sites/shared/bits';
import { contact } from '@/sites/shared/content';
import { Panel, TEXT_GRADIENT } from '../ui';

const Contact: React.FC = () => (
  <section className="mx-auto flex min-h-[86vh] max-w-4xl flex-col items-center justify-center px-5 pb-28 pt-32 text-center">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-300/90"
    >
      Open for opportunities
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 }}
      className="font-display text-[clamp(2.3rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-tight text-white"
    >
      Let's make something{' '}
      <span className={TEXT_GRADIENT}>electric</span>.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mt-5 max-w-xl text-sm leading-relaxed text-white/50"
    >
      A Dynamics 365 solution that needs to land well, an Azure platform that deserves proper engineering, or an AI
      integration that has to do more than demo well — my inbox is open.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mt-9"
    >
      <SpecularButton
        onClick={() => (window.location.href = `mailto:${contact.email}`)}
        baseColor="#221730"
        lineColor="#fb923c"
        textColor="#fff7ed"
        radius={999}
        tint="#f97316"
        tintOpacity={0.24}
        shineSize={16}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Mail size={14} /> {contact.email}
        </span>
      </SpecularButton>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32 }}
      className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
    >
      <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-orange-400/35 group-hover:bg-white/[0.06]">
          <Linkedin size={16} className="text-orange-300" />
          <span className="text-left">
            <span className="block font-display text-[13px] font-semibold text-white/90">LinkedIn</span>
            <span className="block text-[11px] text-white/45">Connect with me</span>
          </span>
        </Panel>
      </a>
      <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-pink-400/35 group-hover:bg-white/[0.06]">
          <Github size={16} className="text-pink-300" />
          <span className="text-left">
            <span className="block font-display text-[13px] font-semibold text-white/90">GitHub</span>
            <span className="block text-[11px] text-white/45">Code & research</span>
          </span>
        </Panel>
      </a>
      <Panel className="flex items-center gap-3 px-4 py-4">
        <MapPin size={16} className="text-violet-300" />
        <span className="text-left">
          <span className="block font-display text-[13px] font-semibold text-white/90">{contact.location}</span>
          <span className="block text-[11px] text-white/45">CET / remote friendly</span>
        </span>
      </Panel>
    </motion.div>

    <div className="mt-16">
      <ShinyText
        text="designed & engineered with far too much attention to detail"
        speed={5}
        className="text-[11px] uppercase tracking-[0.22em]"
      />
    </div>
  </section>
);

export default Contact;
