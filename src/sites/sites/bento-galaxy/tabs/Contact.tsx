/**
 * Bento Galaxy — Contact tab
 *
 * Bento's centered contact layout (SpecularButton CTA + three link cards),
 * voiced in Galaxy Drift's transmission-console language, and closing on
 * the observatory sign-off: "signal ends · awaiting your reply".
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SpecularButton } from '@/sites/shared/bits';
import { contact } from '@/sites/shared/content';
import { Panel, TEXT_GRADIENT } from '../ui';

const Contact: React.FC = () => (
  <section className="mx-auto flex min-h-[86vh] max-w-4xl flex-col items-center justify-center px-5 pb-28 pt-32 text-center">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.3em] text-cyan-300/80"
    >
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
      transmission channel open
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 }}
      className="font-display text-[clamp(2.3rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-tight text-slate-50"
    >
      Let's build something{' '}
      <span className={TEXT_GRADIENT}>precise</span>.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400"
    >
      A Dynamics 365 platform that has to hold up in production, an Azure architecture that needs proper
      guardrails, or an AI integration that deserves real engineering — send a signal, and it will be heard.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mt-9"
    >
      <SpecularButton
        onClick={() => (window.location.href = `mailto:${contact.email}`)}
        baseColor="#0e1526"
        lineColor="#67e8f9"
        textColor="#e0f2fe"
        radius={999}
        tint="#818cf8"
        tintOpacity={0.16}
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
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-indigo-300/35 group-hover:bg-white/[0.06]">
          <Linkedin size={16} className="text-indigo-300" />
          <span className="text-left">
            <span className="block font-display text-[13px] font-semibold text-slate-100">LinkedIn</span>
            <span className="block text-[11px] text-slate-500">Connect with me</span>
          </span>
        </Panel>
      </a>
      <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-violet-300/35 group-hover:bg-white/[0.06]">
          <Github size={16} className="text-violet-300" />
          <span className="text-left">
            <span className="block font-display text-[13px] font-semibold text-slate-100">GitHub</span>
            <span className="block text-[11px] text-slate-500">Code & research</span>
          </span>
        </Panel>
      </a>
      <Panel className="flex items-center gap-3 px-4 py-4">
        <MapPin size={16} className="text-cyan-300" />
        <span className="text-left">
          <span className="block font-display text-[13px] font-semibold text-slate-100">{contact.location}</span>
          <span className="block text-[11px] text-slate-500">CET / remote friendly</span>
        </span>
      </Panel>
    </motion.div>

    <div className="mt-16">
      <motion.span
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        className="text-[10.5px] uppercase tracking-[0.28em] text-slate-500"
      >
        signal ends · awaiting your reply
      </motion.span>
    </div>
  </section>
);

export default Contact;
