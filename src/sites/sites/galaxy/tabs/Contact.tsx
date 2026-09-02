/**
 * Galaxy Drift — Contact tab
 * Centered transmission console: SpecularButton CTA (cyan/indigo tints),
 * link cards and a mono LogoLoop "frequency band" of technologies.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { LogoLoop, ShinyText, SpecularButton } from '@/sites/shared/bits';

import { contact, techMarquee } from '@/sites/shared/content';
import { Panel } from '../ui';

const Contact: React.FC = () => (
  <section className="mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-center px-5 pb-24 pt-36 text-center">
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
      className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-tight text-slate-50"
    >
      Let's build something{' '}
      <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
        precise
      </span>
      .
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400"
    >
      Whether it's a protocol that has to hold up under pressure, a GPU pipeline to push further, or a product that
      deserves real engineering — send a signal, and it will be heard.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mt-9 flex flex-wrap items-center justify-center gap-4"
    >
      <SpecularButton
        onClick={() => (window.location.href = `mailto:${contact.email}`)}
        baseColor="#0e1526"
        lineColor="#67e8f9"
        textColor="#e0f2fe"
        radius={999}
        tint="#818cf8"
        tintOpacity={0.16}
        shineSize={18}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Mail size={14} /> {contact.email}
        </span>
      </SpecularButton>
    </motion.div>

    {/* link cards */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32 }}
      className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <a href={`mailto:${contact.email}`} className="group">
        <Panel className="flex h-full items-center gap-3 px-4 py-4 transition group-hover:border-cyan-300/30 group-hover:bg-white/[0.06]">
          <Mail size={16} className="shrink-0 text-cyan-300" />
          <span className="min-w-0 text-left">
            <span className="block text-[13px] font-medium text-slate-200">Email</span>
            <span className="block truncate font-mono text-[10px] text-slate-500">{contact.email}</span>
          </span>
        </Panel>
      </a>
      <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex h-full items-center gap-3 px-4 py-4 transition group-hover:border-indigo-300/30 group-hover:bg-white/[0.06]">
          <Linkedin size={16} className="shrink-0 text-indigo-300" />
          <span className="min-w-0 text-left">
            <span className="block text-[13px] font-medium text-slate-200">LinkedIn</span>
            <span className="block text-[11px] text-slate-500">Connect with me</span>
          </span>
        </Panel>
      </a>
      <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="group">
        <Panel className="flex h-full items-center gap-3 px-4 py-4 transition group-hover:border-violet-300/30 group-hover:bg-white/[0.06]">
          <Github size={16} className="shrink-0 text-violet-300" />
          <span className="min-w-0 text-left">
            <span className="block text-[13px] font-medium text-slate-200">GitHub</span>
            <span className="block text-[11px] text-slate-500">Code & research</span>
          </span>
        </Panel>
      </a>
      <Panel className="flex h-full items-center gap-3 px-4 py-4">
        <MapPin size={16} className="shrink-0 text-slate-400" />
        <span className="min-w-0 text-left">
          <span className="block text-[13px] font-medium text-slate-200">{contact.location}</span>
          <span className="block text-[11px] text-slate-500">CET · remote friendly</span>
        </span>
      </Panel>
    </motion.div>

    {/* tech frequency band */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.44 }}
      className="mt-14 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] py-4"
    >
      <LogoLoop
        logos={techMarquee}
        renderItem={(name: string) => (
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
            {name}
          </span>
        )}
        speed={70}
        gap={36}
        logoHeight={16}
        fadeOut
        fadeOutColor="#05060d"
        pauseOnHover
        ariaLabel="Technologies"
      />
    </motion.div>

    <div className="mt-12">
      <ShinyText
        text="signal ends · awaiting your reply"
        speed={5}
        className="text-[10.5px] uppercase tracking-[0.28em]"
      />
    </div>
  </section>
);

export default Contact;
