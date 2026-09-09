/**
 * Noir Threads — Experience tab
 *
 * LEFT menu as an editorial index (mono number + serif title, hairline
 * bottom borders, blue left rule on active) + MAIN pane: serif masthead,
 * grayscale artwork plate, two-column body, numbered contributions, thin
 * stat rows and a deep-dive rendered as numbered footnotes.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coreSkills, experiences, type TabFocus, type TabNavigate } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import { Art, EASE, Footnote, Kicker, SectionHeading, StatRow, TechPill } from '../ui';

export interface ExperienceTabProps {
  onNavigate?: TabNavigate;
  focus?: TabFocus;
}

const Experience: React.FC<ExperienceTabProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  const notes = [
    ...(active.deepDive.challenge ? [{ title: 'Challenge', body: active.deepDive.challenge }] : []),
    ...(active.deepDive.solution ? [{ title: 'Solution', body: active.deepDive.solution }] : []),
    ...active.deepDive.learnings.filter(Boolean).map((l) => ({ title: 'Learning', body: l })),
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32 md:pt-36">
      <SectionHeading
        index="01"
        kicker="Experience"
        title="Four chapters of systems, research and craft."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[290px_1fr] lg:gap-16">
        {/* ── Editorial index (left) ── */}
        <aside className="h-max lg:sticky lg:top-28">
          <Kicker className="mb-4">Index — {experiences.length} roles</Kicker>
          <ul className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {experiences.map((e) => {
              const isActive = e.id === activeId;
              return (
                <li key={e.id} className="shrink-0 lg:min-w-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(e.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative flex w-full min-w-[250px] items-baseline gap-4 border-b border-[#262626] py-4 pl-2 pr-2 text-left transition-colors lg:min-w-0',
                      isActive ? 'text-[#fafafa]' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nt-exp-rule"
                        className="absolute inset-y-0 left-0 w-[2px] bg-[#3b82f6]"
                        transition={{ type: 'spring', stiffness: 480, damping: 40 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative font-mono text-[11px] transition-colors',
                        isActive ? 'text-[#3b82f6]' : 'text-[#525252] group-hover:text-[#a3a3a3]'
                      )}
                    >
                      {e.index}
                    </span>
                    <span className="relative min-w-0">
                      <span className="block truncate font-serif text-lg leading-snug">{e.shortCompany}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                        {e.period}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 hidden max-w-[260px] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#525252] lg:block">
            Consulting, research and engineering — select an entry to read the full record.
          </p>
        </aside>

        {/* ── Detail pane (main) ── */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-10"
            >
              {/* masthead */}
              <header>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight text-[#fafafa] [text-wrap:balance] sm:text-4xl">
                    {active.role}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3b82f6]">
                    {active.type}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#a3a3a3]">
                  <span className="text-[#fafafa]">{active.company}</span>
                  <span>{active.period}</span>
                  <span>{active.location}</span>
                </div>
              </header>

              {/* artwork plate */}
              <figure className="group overflow-hidden rounded-3xl border border-[#262626]">
                <div className="relative h-44 transition-colors duration-500 group-hover:bg-[#3b82f6]/5 sm:h-60">
                  <Art spec={active.art} seed={active.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
                <figcaption className="flex items-center justify-between border-t border-[#262626] bg-[#0f0f0f] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  <span>
                    Fig. {active.index} — <span className="text-[#a3a3a3]">{active.domain}</span>
                  </span>
                  <span>{active.location}</span>
                </figcaption>
              </figure>

              {/* story — serif lede + two-column body */}
              <div>
                <p className="max-w-3xl font-serif text-xl leading-relaxed text-[#e5e5e5]">{active.summary}</p>
                <div className="mt-6 gap-10 text-sm leading-relaxed text-[#a3a3a3] [column-rule:1px_solid_#262626] [&>p]:mb-4 md:columns-2">
                  {active.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* contributions */}
              <div>
                <Kicker>Selected contributions</Kicker>
                <ol className="mt-3 border-b border-[#262626]">
                  {active.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.05, duration: 0.45, ease: EASE }}
                      className="group flex gap-5 border-t border-[#262626] py-4"
                    >
                      <span className="shrink-0 font-mono text-[11px] text-[#525252] transition-colors group-hover:text-[#3b82f6]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed text-[#d4d4d4]">{b}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* metrics + stack */}
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <Kicker>Impact</Kicker>
                  <div className="mt-2 border-b border-[#262626]">
                    {active.metrics.map((m, i) => (
                      <StatRow key={m.label} label={m.label} value={m.value} delay={i * 0.06} />
                    ))}
                  </div>
                </div>
                <div>
                  <Kicker>Stack</Kicker>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <TechPill key={t}>{t}</TechPill>
                    ))}
                  </div>
                </div>
              </div>

              {/* skills demonstrated — click-through to the skills page */}
              {active.skillIds.length > 0 && (
                <div>
                  <Kicker>Skills demonstrated</Kicker>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {active.skillIds
                      .map((sid) => coreSkills.find((s) => s.id === sid))
                      .filter((s): s is NonNullable<typeof s> => Boolean(s))
                      .map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => onNavigate?.('skills', skill.id)}
                          className="group inline-flex items-center gap-3 rounded-full border border-[#262626] py-2 pl-4 pr-3 text-left transition-colors duration-300 hover:border-[#3b82f6]/50 hover:bg-white/[0.03]"
                        >
                          <span className="font-serif text-sm text-[#e5e5e5]">{skill.title}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#525252] group-hover:text-[#3b82f6]">
                            skill
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* deep dive — numbered footnotes */}
              <div className="rounded-3xl border border-[#262626] bg-[#0f0f0f] px-6 py-6 sm:px-8 sm:py-8">
                <Kicker>Deep dive — architecture notes</Kicker>
                <div className="mt-6 space-y-5">
                  {notes.map((note, i) => (
                    <Footnote key={i} n={i + 1} title={note.title} body={note.body} first={i === 0} />
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;