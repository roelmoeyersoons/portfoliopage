/** Aurora Glass — Contact tab (SpecularButton CTA + links) */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SpecularButton } from '@/sites/shared/bits';

import { contact } from '@/sites/shared/content';
import { Panel } from '../ui';

const Contact: React.FC = () => (
  <section className="mx-auto flex min-h-[86vh] max-w-4xl flex-col items-center justify-center px-5 pb-28 pt-32 text-center">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-300/80"
    >
      Open for opportunities
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 }}
      className="font-serif text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-zinc-50"
    >
      Let's build something{' '}
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
        precise
      </span>
      .
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400"
    >
      Whether it's a Dynamics 365 solution that needs to land well, an Azure platform that deserves proper
      engineering, or an AI integration that has to do more than demo well — my inbox is open.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mt-9 flex flex-wrap items-center justify-center gap-4"
    >
      <SpecularButton
        onClick={() => (window.location.href = `mailto:${contact.email}`)}
        baseColor="#2a2a35"
        lineColor="#e879f9"
        textColor="#fafafa"
        radius={999}
        tint="#d946ef"
        tintOpacity={0.18}
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
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-violet-400/30 group-hover:bg-white/[0.06]">
          <Linkedin size={16} className="text-violet-300" />
          <span className="text-left">
            <span className="block text-[13px] font-medium text-zinc-200">LinkedIn</span>
            <span className="block text-[11px] text-zinc-500">Connect with me</span>
          </span>
        </Panel>
      </a>
      <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-fuchsia-400/30 group-hover:bg-white/[0.06]">
          <Github size={16} className="text-fuchsia-300" />
          <span className="text-left">
            <span className="block text-[13px] font-medium text-zinc-200">GitHub</span>
            <span className="block text-[11px] text-zinc-500">Code & research</span>
          </span>
        </Panel>
      </a>
      <Panel className="flex items-center gap-3 px-4 py-4">
        <MapPin size={16} className="text-cyan-300" />
        <span className="text-left">
          <span className="block text-[13px] font-medium text-zinc-200">{contact.location}</span>
          <span className="block text-[11px] text-zinc-500">CET / remote friendly</span>
        </span>
      </Panel>
    </motion.div>

    <div className="mt-16">
      <motion.span
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        className="block text-[11px] uppercase tracking-[0.22em] text-zinc-500"
      >
        designed &amp; engineered with far too much attention to detail
      </motion.span>
    </div>
  </section>
);

export default Contact;
