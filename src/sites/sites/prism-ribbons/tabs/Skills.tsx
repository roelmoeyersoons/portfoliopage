/**
 * Prism Ribbons — Skills tab.
 *
 * LEFT menu (same pattern as Experience) + MAIN pane: art banner, prism
 * gradient level bars and an AnimatedList of category highlights.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import { AnimatedList } from '@/sites/shared/bits';
import { skillGroups } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import Artwork from '@/sites/shared/Artwork';
import { Chip, LevelBar, Panel, PrismText, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

/** content.ts types items as {name, level, years?, badge?} — the raw data
 *  actually carries `experienceYears`; read it defensively. */
type SkillItem = { name: string; level: number; badge?: string; experienceYears?: string };

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((s) => s.id === activeId) ?? skillGroups[0];
  const Icon = resolveIcon(active.icon);

  const highlights = (active.items as SkillItem[])
    .slice()
    .sort((a, b) => b.level - a.level)
    .slice(0, 4)
    .map((s) => {
      const bits = [`${s.name} — ${s.level}%`];
      if (s.experienceYears) bits.push(s.experienceYears);
      if (s.badge) bits.push(s.badge);
      return bits.join('  ·  ');
    });

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Toolkit" title="Skills, split into" accent="spectrum" />

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* ── Left menu ── */}
        <Panel className="h-max overflow-hidden lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-4 pb-3 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Select a category</p>
          </div>
          <ul className="flex gap-1.5 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible">
            {skillGroups.map((g) => {
              const GIcon = resolveIcon(g.icon);
              const isActive = g.id === activeId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink" style={{ perspective: '900px' }}>
                  <motion.button
                    onClick={() => setActiveId(g.id)}
                    animate={{ rotateY: isActive ? 4 : 0, x: isActive ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className={cn(
                      'relative block w-full min-w-[232px] rounded-2xl p-[1px] text-left transition-[background] duration-300 lg:min-w-0',
                      isActive
                        ? 'bg-gradient-to-br from-cyan-400/70 via-violet-400/60 to-pink-400/70 shadow-[0_10px_32px_rgba(167,139,250,0.22)]'
                        : 'bg-transparent hover:bg-white/[0.06]'
                    )}
                  >
                    <span
                      className={cn(
                        'relative flex items-center gap-3 rounded-[15px] px-3.5 py-3 transition-colors duration-300',
                        isActive ? 'bg-[#0b0d15]/95' : 'bg-transparent'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                          isActive
                            ? 'border-violet-400/30 bg-gradient-to-br from-cyan-500/25 via-violet-500/20 to-pink-500/15 text-violet-200'
                            : 'border-white/[0.07] bg-white/[0.03] text-slate-500'
                        )}
                      >
                        <GIcon size={14} />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block truncate text-[13px] font-medium leading-tight transition-colors',
                            isActive ? 'text-white' : 'text-slate-400'
                          )}
                        >
                          {g.title}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-slate-500">{g.items.length} skills</span>
                      </span>
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* ── Detail pane ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 space-y-5"
          >
            <Panel className="overflow-hidden">
              <div className="relative h-32 sm:h-40">
                <Artwork spec={active.art} seed={active.id} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-black/40 text-cyan-200 backdrop-blur">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white sm:text-2xl">{active.title}</h3>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {active.index} · spectrum band
                    </p>
                  </div>
                </div>
              </div>
              <p className="px-5 py-4 text-sm leading-relaxed text-slate-400">{active.description}</p>
            </Panel>

            <Panel className="space-y-5 px-5 py-6">
              {active.items.map((s, i) => (
                <LevelBar key={s.name} name={s.name} level={s.level} badge={s.badge} delay={i * 0.06} />
              ))}
            </Panel>

            <Panel className="px-5 py-5">
              <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                <Award size={12} className="text-cyan-300" />
                <span>
                  Highlights — <PrismText className="italic">top of the stack</PrismText>
                </span>
              </h4>
              <AnimatedList
                items={highlights}
                enableArrowNavigation={false}
                showGradients={false}
                displayScrollbar={false}
                className="max-w-full"
                itemClassName="!rounded-xl !bg-white/[0.045] border border-white/[0.08]"
              />
            </Panel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
