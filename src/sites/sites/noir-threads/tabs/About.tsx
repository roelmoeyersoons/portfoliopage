/**
 * Noir Threads — About tab
 *
 * Scroll-triggered SplitText bio lines, education + thesis in bordered
 * rounded-3xl cards, and a GradualBlur fading the bottom of the section.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { GradualBlur, SplitText } from '@/sites/shared/bits';
import { education, profile } from '@/sites/shared/content';
import { EASE, Kicker, Panel, SectionHeading } from '../ui';

const About: React.FC = () => (
  <section className="relative mx-auto max-w-6xl px-5 pb-32 pt-32 md:pt-36">
    <SectionHeading
      index="04"
      kicker="Profile"
      title="Precision is a personality trait."
      lede="Systems engineer by training, editor of details by temperament — the short version, set in serif."
    />

    <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* bio — SplitText, scroll-triggered */}
      <div className="space-y-8">
        {profile.bioParagraphs.map((p, i) => (
          <SplitText
            key={i}
            text={p}
            tag="p"
            splitType="lines"
            delay={i === 0 ? 60 : 90}
            duration={1.1}
            textAlign="left"
            threshold={0.2}
            rootMargin="-80px"
            from={{ opacity: 0, y: 26 }}
            to={{ opacity: 1, y: 0 }}
            className={
              i === 0
                ? 'font-serif text-xl leading-relaxed text-[#e5e5e5] sm:text-[1.35rem]'
                : 'text-sm leading-relaxed text-[#a3a3a3]'
            }
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#262626] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#525252]"
        >
          <span>
            Based in — <span className="text-[#a3a3a3]">{profile.location}</span>
          </span>
          <span>
            Title — <span className="text-[#a3a3a3]">{profile.title}</span>
          </span>
        </motion.div>
      </div>

      {/* education + thesis */}
      <div className="space-y-6">
        <Panel className="p-7 sm:p-8">
          <Kicker>Education</Kicker>
          <p className="mt-5 font-serif text-2xl font-medium leading-snug tracking-tight text-[#fafafa]">
            {education.degree}
          </p>
          <p className="mt-3 text-sm text-[#a3a3a3]">{education.institution}</p>
          <p className="mt-1 text-[13px] text-[#525252]">{education.location}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#262626] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#525252]">
            <span>{education.period}</span>
            {education.grade && <span className="text-[#3b82f6]">{education.grade}</span>}
          </div>
        </Panel>

        <Panel className="p-7 sm:p-8">
          <Kicker>Master thesis</Kicker>
          <p className="mt-5 font-serif text-lg font-medium leading-snug tracking-tight text-[#fafafa]">
            {education.thesis.title}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-[#a3a3a3]">{education.thesis.abstract}</p>

          <ol className="mt-5 border-b border-[#262626]">
            {education.thesis.keyContributions.map((c, i) => (
              <li key={i} className="flex gap-4 border-t border-[#262626] py-3">
                <span className="shrink-0 font-mono text-[11px] text-[#3b82f6]">
                  [{i + 1}]
                </span>
                <p className="text-[13px] leading-relaxed text-[#d4d4d4]">{c}</p>
              </li>
            ))}
          </ol>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#525252]">
            Supervised by —{' '}
            <span className="text-[#a3a3a3]">{education.thesis.supervisors.join(' · ')}</span>
          </p>
        </Panel>
      </div>
    </div>

    {/* editorial fade at the bottom of the section */}
    <GradualBlur
      target="parent"
      position="bottom"
      height="5rem"
      strength={1.6}
      divCount={5}
      curve="bezier"
      exponential
      opacity={0.8}
      zIndex={5}
    />
  </section>
);

export default About;