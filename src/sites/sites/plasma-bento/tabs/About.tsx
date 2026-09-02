/**
 * Plasma Bento — About tab
 * Bio card + education/thesis card + the shared ReactBits Stepper re-themed
 * into a 4-step career timeline (one step per experience).
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, GraduationCap, Users } from 'lucide-react';
import { Stepper } from '@/sites/shared/bits';
import { education, experiences, profile, type TabId } from '@/sites/shared/content';
import { BentoCard, BentoGrid } from '../ui/BentoCard';
import { Chip, GLOW, Panel, SectionHeading, TEXT_GRADIENT } from '../ui';
import '../ui/plasma.css';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/** Plasma-styled step indicator replacing the Stepper default */
const PlasmaStepIndicator: React.FC<{
  step: number;
  currentStep: number;
  onStepClick: (step: number) => void;
}> = ({ step, currentStep, onStepClick }) => {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  return (
    <motion.button
      type="button"
      onClick={() => step !== currentStep && onStepClick(step)}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-orange-300/70"
      aria-label={`Step ${step}`}
    >
      {status === 'complete' ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-[#1a0f1e] shadow-[0_8px_20px_-8px_rgba(236,72,153,0.7)]">
          <Check size={15} strokeWidth={3} />
        </span>
      ) : status === 'active' ? (
        <>
          <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-30" />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 font-display text-[13px] font-bold text-[#1a0f1e] shadow-[0_8px_20px_-8px_rgba(236,72,153,0.7)]">
            {step}
          </span>
        </>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] font-display text-[13px] font-semibold text-white/45">
          {step}
        </span>
      )}
    </motion.button>
  );
};

const About: React.FC<{ onNavigate?: (tab: TabId) => void }> = ({ onNavigate }) => (
  <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Profile" title="About me" />

    <BentoGrid glowColor={GLOW.violet} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* bio */}
      <BentoCard glowColor={GLOW.orange} className="px-6 py-6 lg:row-span-2">
        <div className="space-y-4">
          {profile.bioParagraphs.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              className={
                i === 0
                  ? 'font-display text-[17px] font-medium leading-relaxed text-white/95 first-letter:float-left first-letter:mr-2 first-letter:bg-gradient-to-b first-letter:from-orange-300 first-letter:to-pink-400 first-letter:bg-clip-text first-letter:pr-1 first-letter:text-5xl first-letter:font-bold first-letter:text-transparent'
                  : 'text-[13.5px] leading-relaxed text-white/50'
              }
            >
              {p}
            </motion.p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {experiences.map((e) => (
            <Chip key={e.id} className="!bg-white/[0.04]">
              {e.domain}
            </Chip>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          {profile.location}
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </BentoCard>

      {/* education */}
      <BentoCard glowColor={GLOW.pink} className="px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-400/25 bg-gradient-to-br from-pink-500/20 to-violet-500/10 text-pink-200">
            <GraduationCap size={18} />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Education</h3>
            <p className="font-mono text-[11px] text-pink-300/90">{education.period}</p>
          </div>
        </div>
        <p className="font-display text-[15px] font-semibold text-white/95">{education.degree}</p>
        <p className="mt-1 text-[13px] text-white/55">{education.institution}</p>
        <p className="mt-0.5 text-xs text-white/40">
          {education.location} · {education.grade}
        </p>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <div className="mb-2 flex items-center gap-2.5">
            <BookOpen size={13} className="text-orange-300" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">Master thesis</h4>
          </div>
          <p className={cnTitle()}>{education.thesis.title}</p>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/50">{education.thesis.abstract}</p>
          <ul className="mt-3 space-y-1.5">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-white/55">
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-pink-400 to-violet-400" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
            <Users size={12} className="text-white/40" />
            <p className="text-[11px] text-white/40">Supervised by {education.thesis.supervisors.join(' · ')}</p>
          </div>
        </div>
      </BentoCard>
    </BentoGrid>

    {/* ── Career timeline stepper ── */}
    <Panel className="mt-6 px-4 py-6 sm:px-6">
      <div className="mb-2 flex items-baseline justify-between px-2">
        <h3 className="font-display text-lg font-bold text-white">The road so far</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">timeline</span>
      </div>
      <div className="pb-stepper">
        <Stepper
          initialStep={1}
          backButtonText="Back"
          nextButtonText="Next"
          onFinalStepCompleted={() => onNavigate?.('contact')}
          renderStepIndicator={PlasmaStepIndicator}
        >
          {experiences.map((e) => (
            <div key={e.id} className="pb-2 pt-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text font-mono text-xs font-bold text-transparent">
                  {e.index}
                </span>
                <h4 className="font-display text-xl font-bold text-white">{e.role}</h4>
              </div>
              <p className="mt-1 font-mono text-[11px] text-white/45">
                {e.company} · {e.period}
              </p>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-white/55">{e.summary}</p>
              {e.metrics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.metrics.slice(0, 3).map((m) => (
                    <Chip key={m.label} className="!border-orange-400/20 !bg-orange-500/[0.08] !text-[10.5px] text-orange-100/85">
                      <span className={cnStat()}>{m.value}</span>
                      <span className="ml-1.5 text-white/50">{m.label}</span>
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Stepper>
      </div>
    </Panel>
  </section>
);

const cnTitle = () => `font-display text-[15px] font-semibold leading-snug ${TEXT_GRADIENT}`;
const cnStat = () => 'font-display font-bold';

export default About;
