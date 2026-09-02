/**
 * Noir Threads — Home / Hero
 *
 * Subtle white WebThreads canvas behind the hero only, a huge MaskedHeading
 * with grayscale media, mono metadata rows (location · availability · focus),
 * a neutral SpecularButton CTA and a hairline stats strip.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MaskedHeading, SpecularButton, CountUp, WebThreads } from '@/sites/shared/bits';

import { profile, rotatingRoles } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import { EASE, noirMediaUri } from '../ui';
import type { TabNavigate } from '../Site';

const HERO_MEDIA = noirMediaUri();

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="relative overflow-hidden">
    {/* WebThreads — white filaments, hero only */}
    <div className="absolute inset-0 opacity-25" aria-hidden="true">
      <WebThreads
        color1="#d4d4d4"
        color2="#fafafa"
        color3="#ffffff"
        threadCount={5}
        speed={0.22}
        frequency={4.2}
        spread={0.16}
        brightness={0.55}
        opacity={0.7}
        shimmer
        grain
        grainIntensity={0.035}
        mouseInteraction={false}
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_88%)]" />
    </div>

    <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-36">
      {/* mono metadata row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[#525252]"
      >
        <span className="flex items-center gap-2 text-[#a3a3a3]">
          <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
          {profile.location}
        </span>
        <span>Available for select engagements</span>
        <span className="hidden md:inline">{rotatingRoles.slice(0, 3).join(' · ')}</span>
      </motion.div>

      {/* huge masked display name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <MaskedHeading
          text={profile.name}
          tag="h1"
          mediaType="image"
          src={HERO_MEDIA}
          reveal="rise"
          duration={1.25}
          stagger={0.09}
          align="center"
          weight={500}
          tracking={-0.02}
          lineHeight={1.02}
          textScale={0.15}
          className="!font-serif"
        />
      </motion.div>

      {/* role + tagline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        className="mt-8 text-center font-serif text-xl italic text-[#a3a3a3] sm:text-2xl"
      >
        {profile.title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
        className="mx-auto mt-4 max-w-2xl text-center font-mono text-[12px] leading-relaxed tracking-wide text-[#525252]"
      >
        {profile.tagline}
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
      >
        <SpecularButton
          onClick={() => onNavigate?.('experience')}
          size="md"
          radius={999}
          baseColor="#1a1a1a"
          lineColor="#fafafa"
          textColor="#fafafa"
          tint="#3b82f6"
          tintOpacity={0.1}
          shineSize={16}
          autoAnimate
          proximity={340}
        >
          <span className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.2em]">
            View experience
            <ArrowUpRight size={13} className="text-[#3b82f6]" />
          </span>
        </SpecularButton>
        <button
          onClick={() => onNavigate?.('contact')}
          className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#525252] transition-colors hover:text-[#fafafa]"
        >
          Get in touch
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        className="mt-20 grid grid-cols-2 border-y border-[#262626] md:grid-cols-4"
      >
        {profile.stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              'px-4 py-6 sm:px-6',
              i % 2 === 1 && 'border-l border-[#262626]',
              'md:border-l md:border-[#262626] md:first:border-l-0',
              i > 1 && 'max-md:border-t max-md:border-[#262626]'
            )}
          >
            <div className="font-serif text-3xl font-medium text-[#fafafa]">
              {/^\d+/.test(s.value) ? (
                <>
                  <CountUp to={parseInt(s.value, 10)} duration={1.8} />
                  {s.value.replace(/^\d+/, '')}
                </>
              ) : (
                s.value
              )}
              {s.suffix && (
                <span className="ml-1.5 align-middle font-mono text-[10px] uppercase tracking-[0.18em] text-[#3b82f6]">
                  {s.suffix}
                </span>
              )}
            </div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#525252]">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-14 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#525252]"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex"
        >
          <ArrowDown size={12} />
        </motion.span>
        Scroll
      </motion.div>
    </div>
  </section>
);

export default Hero;