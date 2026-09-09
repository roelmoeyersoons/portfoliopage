/** Aurora Glass — Home / Hero ("Aurora Atelier" — asymmetric editorial split) */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import {
  Aurora,
  CountUp,
  GradualBlur,
  GradientText,
  LogoLoop,
  MaskedHeading,
  RotatingText,
  SpecularButton,
} from '@/sites/shared/bits';
import { profile, rotatingRoles, techMarquee } from '@/sites/shared/content';
import { Chip } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Vertical aurora bands — the fill media inside the masked name heading.
 * Dark base with blurred violet/fuchsia/cyan ribbons running top-to-bottom,
 * inlined as an SVG data URI (same encodeURIComponent pattern as About.tsx).
 */
const NAME_MEDIA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="520">
      <defs>
        <linearGradient id="ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8b5cf6"/>
          <stop offset="0.5" stop-color="#d946ef"/>
          <stop offset="1" stop-color="#22d3ee"/>
        </linearGradient>
        <linearGradient id="ribbonR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#22d3ee"/>
          <stop offset="0.55" stop-color="#d946ef"/>
          <stop offset="1" stop-color="#8b5cf6"/>
        </linearGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14"/>
        </filter>
        <filter id="softer" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="42"/>
        </filter>
      </defs>
      <rect width="1400" height="520" fill="#0d0d16"/>
      <g filter="url(#softer)">
        <rect x="90" y="-80" width="190" height="680" fill="#8b5cf6" opacity="0.55"/>
        <rect x="430" y="-80" width="150" height="680" fill="#d946ef" opacity="0.5"/>
        <rect x="760" y="-80" width="200" height="680" fill="#22d3ee" opacity="0.45"/>
        <rect x="1120" y="-80" width="180" height="680" fill="url(#ribbon)" opacity="0.55"/>
      </g>
      <g filter="url(#soft)">
        <rect x="30" y="-90" width="64" height="700" fill="#a78bfa" opacity="0.85"/>
        <rect x="250" y="-90" width="46" height="700" fill="#c084fc" opacity="0.8"/>
        <rect x="368" y="-90" width="58" height="700" fill="#e879f9" opacity="0.85"/>
        <rect x="620" y="-90" width="70" height="700" fill="url(#ribbonR)" opacity="0.8"/>
        <rect x="880" y="-90" width="52" height="700" fill="#67e8f9" opacity="0.8"/>
        <rect x="1010" y="-90" width="66" height="700" fill="#d946ef" opacity="0.7"/>
        <rect x="1290" y="-90" width="74" height="700" fill="#22d3ee" opacity="0.75"/>
      </g>
    </svg>`
  );

/** "6" -> CountUp(6); "Azure" -> plain text. Stat suffix ("+") rendered after. */
const StatValue: React.FC<{ value: string; suffix?: string }> = ({ value, suffix }) => {
  const m = /^([^0-9]*)(\d+(?:\.\d+)?)([\s\S]*)$/.exec(value);
  return (
    <>
      {m ? (
        <>
          {m[1]}
          <CountUp to={parseFloat(m[2])} duration={1.7} separator="" />
          {m[3]}
        </>
      ) : (
        value
      )}
      {suffix ? (
        <span className="ml-1 font-mono text-[11px] font-medium tracking-wide text-zinc-400">{suffix}</span>
      ) : null}
    </>
  );
};

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-36">
    <div className="grid min-h-[88vh] items-center gap-12 lg:grid-cols-12 lg:gap-10">
      {/* ── Left — editorial column ── */}
      <div className="lg:col-span-7">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for new challenges
          <span aria-hidden className="text-zinc-700">/</span>
          <MapPin size={11} className="text-violet-300/80" />
          <span>{profile.location}</span>
        </motion.p>

        {/* Name — masked with vertical aurora bands */}
        <div className="mt-7">
          <MaskedHeading
            text={profile.name}
            tag="h1"
            align="left"
            reveal="rise"
            weight={500}
            tracking={-0.02}
            lineHeight={1.02}
            textScale={0.115}
            className="!font-serif"
          />
        </div>

        {/* Editorial role index — hairline rows instead of a rotating one-liner */}
        <div className="mt-9 border-t border-white/[0.07]">
          {rotatingRoles.map((role, i) => (
            <motion.div
              key={role}
              {...fadeUp}
              transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-baseline gap-5 border-b border-white/[0.07] py-3"
            >
              <span className="font-mono text-[11px] tracking-widest text-zinc-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i === 0 ? (
                <GradientText
                  colors={['#a78bfa', '#e879f9', '#67e8f9']}
                  animationSpeed={6}
                  className="font-serif text-xl font-medium tracking-tight sm:text-2xl"
                >
                  {role}
                </GradientText>
              ) : (
                <span className="font-serif text-xl font-medium tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-200 sm:text-2xl">
                  {role}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-7 max-w-md text-[13px] leading-relaxed text-zinc-500"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.58, duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <SpecularButton
            onClick={() => onNavigate?.('experience')}
            baseColor="#171225"
            lineColor="#c084fc"
            textColor="#fafafa"
            radius={999}
            tint="#a855f7"
            tintOpacity={0.18}
            shineSize={16}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              Explore experience <ArrowRight size={14} />
            </span>
          </SpecularButton>
          <button
            onClick={() => onNavigate?.('contact')}
            className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* ── Right — aurora pane ── */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5"
      >
        <div className="relative min-h-[480px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
          {/* Calm WebGL aurora in the violet/fuchsia/cyan family */}
          <div className="absolute inset-0" aria-hidden>
            <Aurora colorStops={['#7c3aed', '#d946ef', '#22d3ee']} amplitude={0.7} blend={0.5} speed={0.45} />
            <div className="absolute inset-0 bg-[#0a0a10]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,#0a0a10_85%)] opacity-70" />
          </div>

          <div className="relative z-10 flex min-h-[480px] flex-col px-6 py-6 sm:px-7 sm:py-7">
            {/* monogram + availability */}
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0d0d16]/60 font-serif text-sm font-semibold tracking-[0.08em] text-zinc-100 backdrop-blur">
                {profile.initials}
              </span>
              <Chip className="!bg-[#0d0d16]/50">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available
              </Chip>
            </div>

            {/* stats as hairline rows — no boxes */}
            <div className="mt-7 flex-1">
              <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {profile.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42 + i * 0.08, duration: 0.5 }}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                        {s.label}
                      </div>
                      {s.description && (
                        <div className="mt-0.5 truncate text-[10.5px] leading-snug text-zinc-600">
                          {s.description}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right font-serif text-xl font-semibold text-zinc-100">
                      <StatValue value={s.value} suffix={s.suffix} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* currently */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.5 }}
              className="mt-7 flex items-center gap-2.5 border-t border-white/[0.07] pt-4 font-mono text-[11px] text-zinc-500"
            >
              <span className="shrink-0 uppercase tracking-[0.18em]">currently —</span>
              <RotatingText
                texts={rotatingRoles}
                rotationInterval={2600}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="text-fuchsia-200/90"
              />
            </motion.div>

            {/* tech loop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="-mx-1 mt-5 overflow-hidden"
            >
              <LogoLoop
                logos={techMarquee.slice(0, 10).map((t) => ({
                  name: t,
                  node: (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400/80">
                      {t}
                    </span>
                  ),
                }))}
                speed={55}
                logoHeight={16}
                gap={26}
                fadeOut
                fadeOutColor="#0a0a10"
                ariaLabel="Core technologies"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* mono meta line */}
    <motion.p
      {...fadeUp}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/[0.06] pt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.24em] text-zinc-600"
    >
      <span>{profile.location}</span>
      <span aria-hidden className="text-zinc-800">·</span>
      <span>{profile.title}</span>
    </motion.p>

    {/* content dissolves at the section's bottom edge */}
    <GradualBlur
      target="parent"
      position="bottom"
      height="4rem"
      strength={1.3}
      divCount={5}
      curve="bezier"
      exponential
      opacity={0.75}
      zIndex={10}
    />
  </section>
);

export default Hero;
