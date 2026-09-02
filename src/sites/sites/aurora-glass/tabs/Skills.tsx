/**
 * Aurora Glass — Skills tab
 * LEFT menu of skill categories + MAIN pane with art banner,
 * animated level bars and badges.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillGroups } from '@/sites/shared/content';
import { resolveIcon } from '@/sites/shared/iconMap';
import Artwork from '@/sites/shared/Artwork';
import { LevelBar, Panel, SectionHeading } from '../ui';
import { cn } from '@/demo/helpers';

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((s) => s.id === activeId) ?? skillGroups[0];
  const Icon = resolveIcon(active.icon);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <SectionHeading kicker="Toolkit" title="Skills & proficiency" />

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* ── Left menu ── */}
        <Panel className="h-max overflow-hidden lg:sticky lg:top-24">
          <div className="border-b border-white/[0.07] px-4 pb-3 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Select a category</p>
          </div>
          <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible">
            {skillGroups.map((g) => {
              const GIcon = resolveIcon(g.icon);
              const isActive = g.id === activeId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(g.id)}
                    className={cn(
                      'group relative flex w-full min-w-[220px] items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors lg:min-w-0',
                      isActive ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-200'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="ag-skill-active"
                        className="absolute inset-0 rounded-xl border border-white/[0.09] bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        isActive
                          ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-violet-200'
                          : 'border-white/[0.07] bg-white/[0.03] text-zinc-500 group-hover:text-zinc-300'
                      )}
                    >
                      <GIcon size={14} />
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block truncate text-[13px] font-medium leading-tight">{g.title}</span>
                      <span className="mt-0.5 block text-[11px] text-zinc-500">{g.items.length} skills</span>
                    </span>
                  </button>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-black/40 text-violet-200 backdrop-blur">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white sm:text-2xl">{active.title}</h3>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">{active.index} · category</p>
                  </div>
                </div>
              </div>
              <p className="px-5 py-4 text-sm leading-relaxed text-zinc-400">{active.description}</p>
            </Panel>

            <Panel className="space-y-5 px-5 py-6">
              {active.items.map((s, i) => (
                <LevelBar key={s.name} name={s.name} level={s.level} badge={s.badge} delay={i * 0.06} />
              ))}
            </Panel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
