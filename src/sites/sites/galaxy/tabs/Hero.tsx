/**
 * Galaxy Drift — Home / "Observatory Console".
 *
 * A mission instrument instead of a landing page: a slim telemetry bar,
 * the decrypted name framed in a HUD reticle with a rotating radar sweep,
 * a terminal readout for the roles, one divided telemetry strip instead of
 * stat boxes, and a DotGrid scan panel with crosshair + coordinates.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';
import { CountUp, DecryptedText, DotGrid, RotatingText, SpecularButton, TextType } from '@/sites/shared/bits';

import { profile, rotatingRoles } from '@/sites/shared/content';
import { Panel } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/** The stat that encodes years of experience drives the telemetry EXP cell. */
const yearsStat = profile.stats.find((s) => /year/i.test(s.label));
const yearsLead = yearsStat ? /^(\d[\d.]*)/.exec(yearsStat.value) : null;

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="mx-auto flex min-h-[94vh] w-full max-w-5xl flex-col justify-center gap-7 px-5 pb-24 pt-32">
    {/* ── telemetry bar ── */}
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-wrap items-stretch justify-center border-y border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500"
    >
      <span className="flex items-center gap-2 border-r border-white/[0.07] px-4 py-2.5 text-cyan-200/90">
        <motion.span
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]"
        />
        SIG · LOCKED
      </span>
      <span className="flex items-center border-r border-white/[0.07] px-4 py-2.5">LOC · {profile.location}</span>
      {yearsStat && yearsLead && (
        <span className="flex items-center border-r border-white/[0.07] px-4 py-2.5">
          EXP ·&nbsp;
          <CountUp to={parseFloat(yearsLead[1])} duration={1.6} separator="" />
          {yearsStat.value.replace(yearsLead[1], '')}&nbsp;{yearsStat.label}
        </span>
      )}
      <span className="flex items-center px-4 py-2.5">SYS · NOMINAL</span>
    </motion.div>

    {/* ── reticle readout ── */}
    <div className="relative mx-auto w-full max-w-3xl px-6 py-10 text-center sm:py-12">
      {/* rotating radar sweep */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(103,232,249,0.14), transparent 70deg, transparent 360deg)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 100%)',
          maskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 100%)',
        }}
      />
      {/* static reference rings */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

      {/* corner brackets */}
      <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-300/40" />
      <span aria-hidden className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cyan-300/40" />
      <span aria-hidden className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cyan-300/40" />
      <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-300/40" />
      {/* edge ticks */}
      <span aria-hidden className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-cyan-300/30" />
      <span aria-hidden className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-300/30" />
      <span aria-hidden className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300/30" />
      <span aria-hidden className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300/30" />

      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.55, delay: 0.06 }}
        className="bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-tight text-transparent"
      >
        <DecryptedText
          text={profile.name}
          animateOn="view"
          speed={55}
          maxIterations={12}
          sequential
          revealDirection="start"
          characters="!<>-_\\/[]{}—=+*^?#01"
          encryptedClassName="text-cyan-400/70 !text-cyan-400/70"
        />
      </motion.h1>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.55, delay: 0.14 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-x-2 font-mono text-sm sm:text-base"
      >
        <span className="text-slate-600">&gt; tracking ::</span>
        <RotatingText
          texts={rotatingRoles}
          rotationInterval={2400}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          mainClassName="font-mono font-semibold text-cyan-200"
        />
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-5 min-h-[3.5rem] text-left font-mono text-[13px] leading-relaxed text-slate-400 sm:text-sm">
        <span className="text-slate-600">sys.log&gt; </span>
        <TextType
          text={[profile.tagline]}
          typingSpeed={30}
          deleteSpeed={0}
          loop={false}
          showCursor
          cursorCharacter="▍"
          cursorClassName="text-cyan-300"
          className="text-[13px] leading-relaxed text-slate-400 sm:text-sm"
        />
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.3 }} className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <SpecularButton
          onClick={() => onNavigate?.('experience')}
          baseColor="#0a1428"
          lineColor="#67e8f9"
          textColor="#e0f2fe"
          radius={999}
          tint="#22d3ee"
          tintOpacity={0.18}
          shineSize={16}
        >
          <span className="flex items-center gap-2 text-sm font-semibold">Enter the observatory</span>
        </SpecularButton>
        <button
          onClick={() => onNavigate?.('contact')}
          className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
        >
          Transmit a message
        </button>
      </motion.div>
    </div>

    {/* ── telemetry strip (replaces the stat boxes) ── */}
    <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }}>
      <Panel className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] overflow-hidden sm:grid-cols-4 sm:divide-y-0">
        {profile.stats.map((s, i) => {
          const lead = /^(\d[\d.]*)/.exec(s.value);
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46 + i * 0.07 }}
              className="px-4 py-4 sm:px-5"
            >
              <div className="bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text font-display text-2xl font-bold text-transparent">
                {lead ? (
                  <>
                    <CountUp to={parseFloat(lead[1])} duration={1.8} />
                    <span>&thinsp;{s.suffix ?? s.value.replace(lead[1], '')}</span>
                  </>
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{s.label}</div>
              <div className="mt-0.5 text-[10px] leading-snug text-slate-600">{s.description}</div>
            </motion.div>
          );
        })}
      </Panel>
    </motion.div>

    {/* ── scan panel (replaces the artwork banner) ── */}
    <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.55 }} className="w-full">
      <Panel className="relative h-48 overflow-hidden sm:h-56">
        <div className="absolute inset-0 opacity-60">
          <DotGrid
            dotSize={3}
            gap={24}
            baseColor="#1b2333"
            activeColor="#67e8f9"
            proximity={140}
            shockRadius={220}
            shockStrength={4}
          />
        </div>
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(103,232,249,0.20), transparent 55deg, transparent 360deg)' }}
        />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
        {/* locked marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.span
            animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-cyan-300/40"
          />
          <span className="relative block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.95)]" />
        </div>
        {/* corner captions */}
        <span className="absolute left-4 top-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-cyan-200/70">
          scan · active sector
        </span>
        <span className="absolute right-4 top-3 hidden font-mono text-[9.5px] uppercase tracking-[0.26em] text-slate-500 sm:block">
          deep-space observatory · est. 2019
        </span>
        <span className="absolute bottom-3 left-4 font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-500">
          coordinates 51.05°N · 3.72°E
        </span>
        <span className="absolute bottom-3 right-4 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-cyan-200/80">
          <Crosshair size={10} className="text-cyan-300" /> {profile.location}
        </span>
      </Panel>
    </motion.div>
  </section>
);

export default Hero;
