/**
 * Noir Threads — Skills tab
 *
 * LEFT menu of skill categories (editorial index, blue rule on active) +
 * MAIN pane: serif masthead, grayscale artwork plate and 1px-track level
 * bars with a blue fill and mono percentages.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillGroups } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import { cn } from '@/demo/helpers';
import { Art, EASE, Kicker, LevelBar, SectionHeading } from '../ui';

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((s) => s.id === activeId) ?? skillGroups[0];
  const Icon = resolveIcon(active.icon);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-32 md:pt-36">
      <SectionHeading index="02" kicker="Toolkit" title="Proficiency, measured honestly." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[290px_1fr] lg:gap-16">
        {/* ── Editorial index (left) ── */}
        <aside className="h-max lg:sticky lg:top-28">
          <Kicker className="mb-4">Categories</Kicker>
          <ul className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {skillGroups.map((g) => {
              const isActive = g.id === activeId;
              return (
                <li key={g.id} className="shrink-0 lg:min-w-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(g.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative flex w-full min-w-[250px] items-baseline gap-4 border-b border-[#262626] py-4 pl-2 pr-2 text-left transition-colors lg:min-w-0',
                      isActive ? 'text-[#fafafa]' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nt-skill-rule"
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
                      {g.index}
                    </span>
                    <span className="relative min-w-0">
                      <span className="block truncate font-serif text-lg leading-snug">{g.title}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                        {g.items.length} skills
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 hidden max-w-[260px] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#525252] lg:block">
            Levels are self-assessed against production use, not tutorial familiarity.
          </p>
        </aside>

        {/* ── Detail pane (main) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="min-w-0"
          >
            {/* masthead */}
            <header className="flex items-start gap-5">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#262626] bg-[#141414] text-[#a3a3a3]">
                <Icon size={17} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight text-[#fafafa] sm:text-4xl">
                    {active.title}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3b82f6]">
                    {active.index} / 0{skillGroups.length}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a3a3a3]">{active.description}</p>
              </div>
            </header>

            {/* artwork plate */}
            <figure className="group mt-8 overflow-hidden rounded-3xl border border-[#262626]">
              <div className="relative h-36 transition-colors duration-500 group-hover:bg-[#3b82f6]/5 sm:h-44">
                <Art spec={active.art} seed={active.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
              <figcaption className="flex items-center justify-between border-t border-[#262626] bg-[#0f0f0f] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                <span>
                  Category {active.index} — <span className="text-[#a3a3a3]">{active.items.length} proficiencies</span>
                </span>
                <span>Skill record</span>
              </figcaption>
            </figure>

            {/* level bars */}
            <div className="mt-4 border-b border-[#262626]">
              {active.items.map((s, i) => (
                <LevelBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  years={s.years}
                  badge={s.badge}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;