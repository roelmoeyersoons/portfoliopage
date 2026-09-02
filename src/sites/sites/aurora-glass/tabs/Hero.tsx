/** Aurora Glass — Home / Hero */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { GradientText, RotatingText, TextType, CountUp, ShinyText } from '@/sites/shared/bits';




import { profile, rotatingRoles, type TabId } from '@/sites/shared/content';
import { Chip } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Hero: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => (
  <section className="mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center">
    <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
      <Chip className="mb-7">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Available for new challenges · <MapPin className="mx-0.5 inline -mt-0.5" size={11} /> {profile.location}
      </Chip>
    </motion.div>

    <motion.h1 {...fadeUp} transition={{ duration: 0.55, delay: 0.06 }} className="font-serif leading-[0.98]">
      <GradientText
        colors={['#a78bfa', '#e879f9', '#67e8f9', '#a78bfa']}
        animationSpeed={7}
        className="text-[clamp(2.9rem,8.5vw,6.2rem)] font-medium tracking-tight"
      >
        {profile.name}
      </GradientText>
    </motion.h1>

    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, delay: 0.14 }}
      className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xl text-zinc-300 sm:text-2xl"
    >
      <span className="text-zinc-400">Specialist in</span>
      <RotatingText
        texts={rotatingRoles}
        rotationInterval={2400}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="font-serif text-fuchsia-200"
      />
    </motion.div>

    <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-7 max-w-2xl">
      <TextType
        text={[profile.tagline]}
        typingSpeed={38}
        deleteSpeed={0}
        loop={false}
        showCursor
        cursorCharacter="▍"
        cursorClassName="text-fuchsia-300"
        className="min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-zinc-400 sm:text-sm"
      />
    </motion.div>

    <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.3 }} className="mt-9 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => onNavigate?.('experience')}
        className="rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.03] hover:shadow-fuchsia-500/40"
      >
        Explore experience
      </button>
      <button
        onClick={() => onNavigate?.('contact')}
        className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
      >
        Get in touch
      </button>
    </motion.div>

    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {profile.stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46 + i * 0.07 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-4 backdrop-blur-md"
        >
          <div className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text font-serif text-2xl font-semibold text-transparent">
            {/^\d+/.test(s.value) ? (
              <>
                <CountUp to={parseInt(s.value, 10)} duration={1.8} />
                {s.value.replace(/^\d+/, '')}
              </>
            ) : (
              s.value
            )}
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">{s.label}</div>
        </motion.div>
      ))}
    </motion.div>

    <motion.div {...fadeUp} transition={{ delay: 0.7 }} className="mt-12">
      <ShinyText className="text-xs uppercase tracking-[0.3em]" text="scroll to explore" speed={4} />
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="mt-2 flex justify-center text-zinc-500"
      >
        <ArrowDown size={15} />
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
