/** Plasma Bento — Home / Hero */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { GradientText, RotatingText, TextType, CountUp, SpecularButton, LogoLoop } from '@/sites/shared/bits';

import { profile, rotatingRoles, techMarquee, type TabId } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, TEXT_GRADIENT } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

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
        <div className={cnStat()} >
          {numeric ? (
            <>
              <CountUp to={parseFloat(value.replace(/,/g, ''))} duration={1.8} />
              {value.replace(/^[\d.,]+/, '')}
            </>
          ) : (
            value
          )}
          {suffix && <span className="ml-1 text-base font-semibold text-pink-300/90">{suffix}</span>}
        </div>
        <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{label}</div>
        <p className="mt-1 text-[11px] leading-relaxed text-white/40">{description}</p>
      </BentoCard>
    </motion.div>
  );
};

const cnStat = () => `font-display text-3xl font-bold tracking-tight ${TEXT_GRADIENT}`;

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-36">
    <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      {/* ── Left: identity ── */}
      <div className="text-center lg:text-left">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex justify-center lg:justify-start">
          <Chip className="!border-orange-400/25 !bg-orange-500/10 !px-3 !py-1.5 text-orange-200">
            <span className="relative mr-1.5 inline-flex h-2 w-2 text-orange-400">
              <span className="pb-ping" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-current" />
            </span>
            Open for new challenges
            <MapPin className="mx-1.5 inline -mt-0.5" size={11} /> {profile.location}
          </Chip>
        </motion.div>

        <motion.h1 {...fadeUp} transition={{ duration: 0.55, delay: 0.06 }} className="mt-6 font-display leading-[0.95]">
          <GradientText
            colors={['#f97316', '#ec4899', '#8b5cf6', '#f97316']}
            animationSpeed={7}
            className="text-[clamp(2.9rem,8.5vw,5.6rem)] font-bold tracking-tight"
          >
            {profile.name}
          </GradientText>
        </motion.h1>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-lg text-white/55 sm:text-xl lg:justify-start"
        >
          <span>{profile.title.split('&')[0].trim()} focused on</span>
          <span className="inline-flex rounded-2xl border border-pink-400/25 bg-gradient-to-r from-orange-500/15 via-pink-500/15 to-violet-500/15 px-3 py-1 text-pink-200">
            <RotatingText
              texts={rotatingRoles}
              rotationInterval={2400}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            />
          </span>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-6">
          <TextType
            text={[profile.tagline]}
            typingSpeed={34}
            deleteSpeed={0}
            loop={false}
            showCursor
            cursorCharacter="▍"
            cursorClassName="text-orange-300"
            className="min-h-[3.6rem] font-mono text-[13px] leading-relaxed text-white/45 sm:text-sm"
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <SpecularButton
            onClick={() => onNavigate?.('experience')}
            baseColor="#221730"
            lineColor="#fb923c"
            textColor="#fff7ed"
            radius={999}
            tint="#f97316"
            tintOpacity={0.22}
            shineSize={16}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              Enter the bento <ArrowDown size={14} />
            </span>
          </SpecularButton>
          <button
            onClick={() => onNavigate?.('contact')}
            className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/85 transition hover:border-pink-400/40 hover:bg-white/[0.08]"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* ── Right: artwork bento card ── */}
      <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
        <BentoCard glowColor={GLOW.pink} className="h-[300px] p-0 sm:h-[360px] lg:h-[430px]">
          <Artwork spec={{ style: 'mesh', hue: 300 }} seed="plasma-hero" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a12] via-[#0d0a12]/25 to-transparent" />
          <div className="absolute left-5 top-5 flex gap-2">
            <Chip className="!border-orange-400/30 !bg-orange-500/15 text-orange-200">concept 04</Chip>
            <Chip>plasma · bento</Chip>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-black/50 font-display text-sm font-bold text-white backdrop-blur">
                {profile.initials}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-white">{profile.title}</p>
                <p className="font-mono text-[11px] text-white/50">{profile.stats[0]?.description ?? ''}</p>
              </div>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 sm:block">
              bento://plasma
            </span>
          </div>
        </BentoCard>
      </motion.div>
    </div>

    {/* ── Stats bento row ── */}
    <BentoGrid glowColor={GLOW.orange} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {profile.stats.map((s, i) => (
        <StatCard
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
          description={s.description}
          delay={0.4 + i * 0.08}
          glow={[GLOW.orange, GLOW.pink, GLOW.violet, GLOW.orange][i % 4]}
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
        fadeOutColor="#0d0a12"
        className="font-mono uppercase tracking-[0.2em] text-white/35"
      />
    </motion.div>

    <motion.div {...fadeUp} transition={{ delay: 0.8 }} className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={() => onNavigate?.('experience')}
        aria-label="Go to the next chapter — Experience"
        title="Jump to the next chapter"
        className="group cursor-pointer rounded-full px-5 py-2.5 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-pink-400/60"
      >
        <motion.span
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="text-[10px] uppercase tracking-[0.32em]"
        >
          scroll to explore
        </motion.span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="mt-1.5 flex justify-center text-white/40 transition-colors group-hover:text-pink-300"
        >
          <ArrowDown size={14} />
        </motion.span>
      </button>
    </motion.div>
  </section>
);

export default Hero;
