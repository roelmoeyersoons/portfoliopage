/**
 * Prism Ribbons — Contact tab.
 *
 * DotGrid interactive field behind a centered CTA, SpecularButton with
 * cyan/violet tints, and link cards.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { DotGrid, SpecularButton, ShinyText } from '@/sites/shared/bits';

import { contact } from '@/sites/shared/content';
import { Panel, PrismText } from '../ui';

const Contact: React.FC = () => (
  <section className="mx-auto max-w-4xl px-5 pb-28 pt-28">
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
      {/* interactive dot field */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <DotGrid
          dotSize={4}
          gap={26}
          baseColor="#232838"
          activeColor="#22d3ee"
          proximity={150}
          shockRadius={240}
          shockStrength={4}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080d_88%)]"
      />

      {/* centered CTA */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80"
        >
          <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/70" />
          Open for opportunities
          <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-pink-400/70" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="font-serif text-[clamp(2.2rem,5.6vw,4rem)] font-medium leading-[1.05] tracking-tight text-slate-50"
        >
          Let's bend some <PrismText className="italic">light</PrismText> together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400"
        >
          Whether it's distributed systems that need to hold up under pressure, a GPU pipeline to push further, or a
          product that deserves real engineering — my inbox is open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-9"
        >
          <SpecularButton
            onClick={() => (window.location.href = `mailto:${contact.email}`)}
            baseColor="#171b28"
            lineColor="#22d3ee"
            textColor="#e0f2fe"
            radius={999}
            tint="#a78bfa"
            tintOpacity={0.16}
            shineSize={18}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Mail size={14} /> {contact.email}
            </span>
          </SpecularButton>
        </motion.div>
      </div>
    </div>

    {/* link cards */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32 }}
      className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
    >
      <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-cyan-400/30 group-hover:bg-white/[0.06]">
          <Linkedin size={16} className="text-cyan-300" />
          <span className="text-left">
            <span className="block text-[13px] font-medium text-slate-200">LinkedIn</span>
            <span className="block text-[11px] text-slate-500">Connect with me</span>
          </span>
        </Panel>
      </a>
      <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex items-center gap-3 px-4 py-4 transition group-hover:border-violet-400/30 group-hover:bg-white/[0.06]">
          <Github size={16} className="text-violet-300" />
          <span className="text-left">
            <span className="block text-[13px] font-medium text-slate-200">GitHub</span>
            <span className="block text-[11px] text-slate-500">Code & research</span>
          </span>
        </Panel>
      </a>
      <Panel className="flex items-center gap-3 px-4 py-4">
        <MapPin size={16} className="text-pink-300" />
        <span className="text-left">
          <span className="block text-[13px] font-medium text-slate-200">{contact.location}</span>
          <span className="block text-[11px] text-slate-500">CET / remote friendly</span>
        </span>
      </Panel>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-14 text-center"
    >
      <ShinyText
        text="designed & engineered with far too much attention to detail"
        speed={5}
        className="text-[11px] uppercase tracking-[0.22em]"
      />
    </motion.div>
  </section>
);

export default Contact;
