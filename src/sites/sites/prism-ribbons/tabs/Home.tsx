/**
 * Prism Ribbons — Home / "Holo Stage".
 *
 * Full-bleed stage hero: PlasmaWave runs unmasked behind the lower half, the
 * name locks to the bottom-left, a vertical mono rail rides the right edge
 * and stats render as inline gradient lines (no boxes). The playful
 * BounceCards fan and the project tile strip stay below the stage.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { BounceCards, CountUp, DecryptedText, PlasmaWave, RotatingText, TextType } from '@/sites/shared/bits';

import { profile, experiences, projects, rotatingRoles } from '@/sites/shared/content';
import Artwork from '@/sites/shared/Artwork';
import { artDataUri, PrismText, SectionHeading } from '../ui';
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
      {/* ── Holo stage ── */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden pb-12 pt-32">
        {/* PlasmaWave flowing unmasked behind the lower half */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-90">
          <PlasmaWave
            colors={['#22d3ee', '#a78bfa']}
            focalLength={0.9}
            speed1={0.055}
            speed2={0.042}
            bend1={1.2}
            bend2={0.55}
          />
        </div>
        {/* soft fade where the wave meets the page background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[42%] h-[26%] bg-gradient-to-b from-transparent via-[#07080d]/40 to-[#07080d]/85"
        />

        {/* vertical mono rail — right edge */}
        <div
          aria-hidden
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
        >
          <span className="h-16 w-px bg-gradient-to-b from-transparent to-cyan-400/60" />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-slate-500"
            style={{ writingMode: 'vertical-rl' }}
          >
            Available for new challenges — {profile.location} — {profile.title}
          </span>
          <span className="h-16 w-px bg-gradient-to-t from-transparent to-pink-400/60" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-5">
          {/* kicker */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            Available for new challenges · <MapPin size={11} className="inline -mt-0.5" /> {profile.location}
          </motion.p>

          {/* name — left-locked over the wave */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-5 font-serif leading-[1.02]"
          >
            <DecryptedText
              text={profile.name}
              animateOn="view"
              speed={55}
              maxIterations={9}
              revealDirection="center"
              characters="!<>-_\\/[]{}=+*^?#PRISM01"
              className="text-slate-50 [text-shadow:0_0_44px_rgba(34,211,238,0.35)]"
              encryptedClassName="text-cyan-300/70"
              parentClassName="block text-left text-[clamp(2.8rem,8.5vw,6.2rem)] font-medium tracking-tight"
            />
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-xl text-slate-300 sm:text-2xl"
          >
            <span className="text-slate-400">Specialist in</span>
            <RotatingText
              texts={rotatingRoles}
              rotationInterval={2600}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="font-serif italic text-violet-200"
            />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.22 }} className="mt-6 max-w-xl">
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

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.3 }} className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* inline stat lines — no boxes */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-baseline gap-x-8 gap-y-3"
          >
            {profile.stats.map((s, i) => {
              const numeric = /^\d+/.test(s.value);
              const suffix = (s.suffix ?? '').trim();
              const symbolSuffix = suffix.length > 0 && suffix.length <= 2 ? suffix : '';
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 + i * 0.07 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text font-serif text-2xl font-semibold text-transparent">
                    {numeric ? (
                      <>
                        <CountUp to={parseInt(s.value, 10)} duration={1.8} />
                        {s.value.replace(/^\d+/, '')}
                        {symbolSuffix}
                      </>
                    ) : (
                      s.value
                    )}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {s.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Artwork strip — one generated tile per project */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.55 }} className="mt-11 w-full">
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

          <motion.div {...fadeUp} transition={{ delay: 0.8 }} className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
            <ArrowDown size={13} className="animate-bounce" /> scroll or use the capsule above
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
