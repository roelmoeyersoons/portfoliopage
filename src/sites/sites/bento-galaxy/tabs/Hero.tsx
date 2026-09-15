/**
 * Bento Galaxy — Home / Hero
 *
 * Bento's hero skeleton: identity column left, a feature card right, the
 * stat bento row and the tech marquee — in that order. The identity column
 * carries a compact "Microsoft certified ::" chip strip (certifications
 * surfaced on the hero per feedback); the old scroll cue was removed.
 * The feature card is the Galaxy Drift scan station: a DotGrid field with
 * a rotating radar sweep, reference rings, a locked marker and observatory
 * captions. Galaxy's telemetry tidbits ride along: the SIG/LOC/EXP/SYS
 * bar on top, "> tracking ::" before the rotating roles and "sys.log>"
 * before the typed tagline.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, BadgeCheck, Crosshair, MapPin } from 'lucide-react';
import { CountUp, DotGrid, GradientText, LogoLoop, RotatingText, SpecularButton, TextType } from '@/sites/shared/bits';

import { certifications, profile, rotatingRoles, techMarquee } from '@/sites/shared/content';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, TEXT_GRADIENT } from '../ui';
import '../ui/station.css';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/** The stat that encodes years of experience drives the telemetry EXP cell. */
const yearsStat = profile.stats.find((s) => /year/i.test(s.label));
const yearsLead = yearsStat ? /^(\d[\d.]*)/.exec(yearsStat.value) : null;

const StatCard: React.FC<{
  value: string;
  suffix?: string;
  label: string;
  description: string;
  delay: number;
  glow: string;
}> = ({ value, suffix, label, description, delay, glow }) => {
  const numeric = /^\d[\d.,]*$/.test(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <BentoCard glowColor={glow} className="h-full px-5 py-5">
        <div className={`font-display text-3xl font-bold tracking-tight ${TEXT_GRADIENT}`}>
          {numeric ? (
            <>
              <CountUp to={parseFloat(value.replace(/,/g, ''))} duration={1.8} />
              {value.replace(/^[\d.,]+/, '')}
            </>
          ) : (
            value
          )}
          {suffix && <span className="ml-1 text-base font-semibold text-cyan-200/90">{suffix}</span>}
        </div>
        <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">{label}</div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{description}</p>
      </BentoCard>
    </motion.div>
  );
};

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-36">
    {/* ── telemetry bar (observatory tidbits) ── */}
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5 }}
      className="mb-8 flex w-full flex-wrap items-stretch justify-center border-y border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500"
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

    <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      {/* ── Left: identity ── */}
      <div className="text-center lg:text-left">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex justify-center lg:justify-start">
          <Chip className="!border-cyan-300/25 !bg-cyan-400/10 !px-3 !py-1.5 text-cyan-100">
            <span className="relative mr-1.5 inline-flex h-2 w-2 text-cyan-300">
              <span className="gx-ping" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-current" />
            </span>
            Available for engagements
            <MapPin className="mx-1.5 inline -mt-0.5" size={11} /> {profile.location}
          </Chip>
        </motion.div>

        <motion.h1 {...fadeUp} transition={{ duration: 0.55, delay: 0.06 }} className="mt-6 font-display leading-[0.95]">
          <GradientText
            colors={['#818cf8', '#a78bfa', '#67e8f9', '#818cf8']}
            animationSpeed={7}
            className="text-[clamp(2.9rem,8.5vw,5.6rem)] font-bold tracking-tight"
          >
            {profile.name}
          </GradientText>
        </motion.h1>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm text-slate-400 sm:text-base lg:justify-start"
        >
          <span className="text-slate-600">&gt; tracking ::</span>
          <span className="inline-flex rounded-2xl border border-indigo-400/25 bg-gradient-to-r from-indigo-500/15 via-violet-500/15 to-cyan-500/15 px-3 py-1">
            <RotatingText
              texts={rotatingRoles}
              rotationInterval={2400}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              mainClassName="font-mono font-semibold text-cyan-200"
            />
          </span>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-6 text-left">
          <span className="font-mono text-[13px] text-slate-600">sys.log&gt; </span>
          <TextType
            text={[profile.tagline]}
            typingSpeed={30}
            deleteSpeed={0}
            loop={false}
            showCursor
            cursorCharacter="▍"
            cursorClassName="text-cyan-300"
            className="min-h-[3.6rem] font-mono text-[13px] leading-relaxed text-slate-400 sm:text-sm"
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
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
            <span className="flex items-center gap-2 text-sm font-semibold">
              Enter the observatory <ArrowDown size={14} />
            </span>
          </SpecularButton>
          <button
            onClick={() => onNavigate?.('contact')}
            className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            Transmit a message
          </button>
        </motion.div>

        {/* ── certification chip strip ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
        >
          <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <BadgeCheck size={13} className="text-cyan-300" />
            Microsoft certified ::
          </span>
          {certifications.map((c) => {
            const chipClass =
              'inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-slate-400 transition-colors hover:border-cyan-300/30 hover:text-cyan-100';
            const chipContent = (
              <>
                <span className="font-semibold text-cyan-300/90">{c.code}</span>
                {c.short}
              </>
            );
            return c.verifyUrl ? (
              <a key={c.id} href={c.verifyUrl} target="_blank" rel="noreferrer" title={`${c.name} — official credential page`} className={chipClass}>
                {chipContent}
              </a>
            ) : (
              <span key={c.id} title={c.name} className={chipClass}>
                {chipContent}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* ── Right: the scan station (bento card, galaxy scan) ── */}
      <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
        <BentoCard glowColor={GLOW.cyan} className="h-[300px] p-0 sm:h-[360px] lg:h-[430px]">
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

          {/* rotating radar sweep */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, rgba(103,232,249,0.20), transparent 55deg, transparent 360deg)' }}
          />
          {/* static reference rings */}
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
          <span className="absolute left-5 top-5 font-mono text-[9.5px] uppercase tracking-[0.26em] text-cyan-200/70">
            scan · active sector
          </span>
          <span className="absolute right-5 top-5 hidden font-mono text-[9.5px] uppercase tracking-[0.26em] text-slate-500 sm:block">
            deep-space observatory · est. 2019
          </span>
          <span className="absolute bottom-5 left-5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-500">
            coordinates 51.05°N · 3.72°E
          </span>
          <span className="absolute bottom-5 right-5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-cyan-200/80">
            <Crosshair size={10} className="text-cyan-300" /> {profile.location}
          </span>
        </BentoCard>
      </motion.div>
    </div>

    {/* ── Stats bento row ── */}
    <BentoGrid glowColor={GLOW.indigo} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {profile.stats.map((s, i) => (
        <StatCard
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
          description={s.description}
          delay={0.4 + i * 0.08}
          glow={[GLOW.indigo, GLOW.violet, GLOW.cyan, GLOW.indigo][i % 4]}
        />
      ))}
    </BentoGrid>

    {/* ── Tech marquee ── */}
    <motion.div {...fadeUp} transition={{ delay: 0.7 }} className="mt-8 overflow-hidden">
      <LogoLoop
        logos={techMarquee.map((t) => ({ name: t }))}
        speed={70}
        logoHeight={14}
        gap={44}
        fadeOut
        fadeOutColor="#05060d"
        className="font-mono uppercase tracking-[0.2em] text-slate-500"
      />
    </motion.div>

  </section>
);

export default Hero;
