/**
 * Prism Ribbons — Home / Hero.
 *
 * DecryptedText headline over a PlasmaWave band, RotatingText roles,
 * CountUp stats, an Artwork strip and a playful BounceCards fan.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { BounceCards, CountUp, DecryptedText, PlasmaWave, RotatingText, TextType } from '@/sites/shared/bits';

import { profile, experiences, projects, rotatingRoles, type TabId } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { artDataUri, Chip, PrismText, SectionHeading } from '../ui';
import type { TabNavigate } from '../Site';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const BOUNCE_TRANSFORMS = [
  'rotate(-8deg) translate(-150px)',
  'rotate(-3deg) translate(-50px)',
  'rotate(3deg) translate(50px)',
  'rotate(9deg) translate(150px)',
];

const Home: React.FC<{ onNavigate?: TabNavigate }> = ({ onNavigate }) => {
  const bounceImages = React.useMemo(
    () => experiences.map((e) => artDataUri(e.art, e.id, 480, 480)),
    []
  );

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        {/* PlasmaWave band flowing under the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] opacity-90 [mask-image:radial-gradient(72%_60%_at_50%_52%,black_28%,transparent_76%)]"
        >
          <PlasmaWave
            colors={['#22d3ee', '#a78bfa']}
            focalLength={0.9}
            speed1={0.055}
            speed2={0.042}
            bend1={1.2}
            bend2={0.55}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Chip className="mb-7">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              Available for new challenges · <MapPin className="mx-0.5 inline -mt-0.5" size={11} /> {profile.location}
            </Chip>
          </motion.div>

          <motion.h1 {...fadeUp} transition={{ duration: 0.55, delay: 0.06 }} className="font-serif leading-[1.02]">
            <DecryptedText
              text={profile.name}
              animateOn="view"
              speed={55}
              maxIterations={9}
              revealDirection="center"
              characters="!<>-_\\/[]{}=+*^?#PRISM01"
              className="text-slate-50 [text-shadow:0_0_44px_rgba(34,211,238,0.35)]"
              encryptedClassName="text-cyan-300/70"
              parentClassName="block text-[clamp(2.6rem,8vw,5.4rem)] font-medium tracking-tight"
            />
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xl text-slate-300 sm:text-2xl"
          >
            <span className="text-slate-400">Specialist in</span>
            <RotatingText
              texts={rotatingRoles}
              rotationInterval={2600}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="font-serif italic text-violet-200"
            />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-7 max-w-2xl">
            <TextType
              text={[profile.tagline]}
              typingSpeed={34}
              deleteSpeed={0}
              loop={false}
              showCursor
              cursorCharacter="▍"
              cursorClassName="text-pink-300"
              className="min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-slate-400 sm:text-sm"
            />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.('experience')}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-[#04121a] shadow-[0_8px_30px_rgba(34,211,238,0.3)]"
              style={{ backgroundImage: 'linear-gradient(92deg, #22d3ee 0%, #a78bfa 55%, #f472b6 100%)' }}
            >
              Trace the experience
            </motion.button>
            <button
              onClick={() => onNavigate?.('contact')}
              className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-violet-300/40 hover:bg-white/[0.08]"
            >
              Get in touch
            </button>
          </motion.div>

          {/* stats */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {profile.stats.map((s, i) => {
              const numeric = /^\d+/.test(s.value);
              const suffix = (s.suffix ?? '').trim();
              const symbolSuffix = suffix.length > 0 && suffix.length <= 2 ? suffix : '';
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 + i * 0.07 }}
                  className="rounded-2xl border border-white/[0.07] bg-[#0a0c14]/70 px-4 py-4 backdrop-blur-md"
                >
                  <div className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text font-serif text-2xl font-semibold text-transparent">
                    {numeric ? (
                      <>
                        <CountUp to={parseInt(s.value, 10)} duration={1.8} />
                        {s.value.replace(/^\d+/, '')}
                        {symbolSuffix}
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Artwork strip — one generated tile per project */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.55 }} className="mt-12 w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => onNavigate?.('projects')}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62 + i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="group relative h-24 overflow-hidden rounded-xl border border-white/[0.08] text-left sm:h-28"
                  aria-label={`Open projects — ${p.title}`}
                >
                  <Artwork
                    spec={p.art}
                    seed={p.id}
                    plate={false}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/90 via-transparent to-transparent" />
                  <span className="absolute inset-x-2 bottom-1.5 truncate text-[10.5px] font-medium text-slate-300 opacity-0 transition group-hover:opacity-100">
                    {p.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.8 }} className="mt-12">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <ArrowDown size={13} className="animate-bounce" /> scroll or use the capsule above
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Playful gallery fan ── */}
      <section className="mx-auto max-w-5xl px-5 pb-24">
        <SectionHeading kicker="Artifacts" title="Career, in the" accent="shuffle" align="center" />
        <p className="mx-auto -mt-4 mb-2 max-w-md text-center text-[13px] leading-relaxed text-slate-500">
          Hover a card to scatter the fan — every tile is generated from a role's prism spec.
        </p>
        <div className="flex h-[200px] justify-center sm:h-[280px] lg:h-[350px]">
          <div className="origin-top scale-[0.58] sm:scale-75 lg:scale-100">
            <BounceCards
              images={bounceImages}
              containerWidth={620}
              containerHeight={300}
              animationDelay={0.4}
              animationStagger={0.08}
              transformStyles={BOUNCE_TRANSFORMS}
            />
          </div>
        </div>
        <p className="mt-2 text-center">
          <PrismText className="font-serif text-lg italic">light, refraction, motion — same principles, different medium</PrismText>
        </p>
      </section>
    </div>
  );
};

export default Home;
