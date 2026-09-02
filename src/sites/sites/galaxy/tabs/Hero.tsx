/** Galaxy Drift — Home / Hero */
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Radar } from 'lucide-react';
import { DecryptedText, RotatingText, TextType, CountUp } from '@/sites/shared/bits';

import { profile, rotatingRoles, type ArtSpec, type TabId } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { Chip, Panel } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/* Decorative hero banner art (deep-space constellation in the site's hues) */
const HERO_ART: ArtSpec = { style: 'constellation', hue: 218 };

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="relative mx-auto flex min-h-[94vh] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-36 text-center">
    {/* faint orbital halo behind the headline */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[540px] w-[540px] -translate-x-1/2 rounded-full border border-white/[0.04] [mask-image:radial-gradient(circle,black_40%,transparent_72%)]"
      style={{ background: 'conic-gradient(from 120deg, transparent, rgba(129,140,248,0.07), transparent 40%)' }}
    />

    <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
      <Chip className="mb-7 !border-cyan-300/20 !bg-cyan-400/[0.06] font-mono !text-[10.5px] uppercase tracking-[0.18em] text-cyan-200/90">
        <Radar size={11} className="mr-1.5 animate-pulse" />
        Signal locked · <MapPin size={11} className="mx-1 -mt-0.5 inline" /> {profile.location}
      </Chip>
    </motion.div>

    {/* headline — decrypted name over an indigo→cyan gradient */}
    <motion.h1
      {...fadeUp}
      transition={{ duration: 0.55, delay: 0.06 }}
      className="bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.98] tracking-tight text-transparent"
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
      className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg text-slate-400 sm:text-xl"
    >
      <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-slate-500">tracking</span>
      <RotatingText
        texts={rotatingRoles}
        rotationInterval={2400}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        mainClassName="font-display font-semibold text-cyan-200"
      />
    </motion.div>

    <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-7 max-w-2xl">
      <TextType
        text={[profile.tagline]}
        typingSpeed={30}
        deleteSpeed={0}
        loop={false}
        showCursor
        cursorCharacter="▍"
        cursorClassName="text-cyan-300"
        className="min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-slate-400 sm:text-sm"
      />
    </motion.div>

    <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.3 }} className="mt-9 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => onNavigate?.('experience')}
        className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03] hover:shadow-cyan-400/40"
      >
        Enter the observatory
      </button>
      <button
        onClick={() => onNavigate?.('contact')}
        className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        Transmit a message
      </button>
    </motion.div>

    {/* stats row */}
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {profile.stats.map((s, i) => {
        const lead = /^(\d[\d.]*)/.exec(s.value);
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 + i * 0.07 }}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-4 text-left backdrop-blur-md transition-colors hover:border-cyan-300/25"
          >
            <div className="bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text font-display text-2xl font-bold text-transparent">
              {lead ? (
                <>
                  <CountUp to={parseFloat(lead[0])} duration={1.8} />
                  {(s.suffix ?? s.value.replace(lead[0], '')) && (
                    <span>&thinsp;{s.suffix ?? s.value.replace(lead[0], '')}</span>
                  )}
                </>
              ) : (
                s.value
              )}
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{s.label}</div>
            <div className="mt-0.5 text-[10px] leading-snug text-slate-600 transition-colors group-hover:text-slate-500">
              {s.description}
            </div>
          </motion.div>
        );
      })}
    </motion.div>

    {/* artwork banner */}
    <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 w-full">
      <Panel className="group overflow-hidden">
        <div className="relative h-40 sm:h-52">
          <Artwork
            spec={HERO_ART}
            seed="galaxy-hero"
            className="absolute inset-0 h-full w-full opacity-90 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-[#05060d]/25 to-transparent" />
          <div className="absolute bottom-3.5 left-5 right-5 flex flex-wrap items-end justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">
              deep-space observatory · est. 2019
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              coordinates 51.05°N · 3.72°E
            </p>
          </div>
        </div>
      </Panel>
    </motion.div>
  </section>
);

export default Hero;
