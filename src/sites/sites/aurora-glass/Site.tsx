/**
 * AURORA GLASS — variant 1
 *
 * Look: near-black stage with a full-bleed WebGL aurora, glass panels,
 * Fraunces serif display type, violet→fuchsia→cyan accents.
 * Palette inspired by the rbp-portfolio template (dark, soft borders,
 * generous rounding, editorial serif) combined with ReactBits motion.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aurora, GradualBlur } from '@/sites/shared/bits';

import { siteTabs, type TabId, type TabFocus } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import Hero from './tabs/Hero';
import Experience from './tabs/Experience';
import Skills from './tabs/Skills';
import Projects from './tabs/Projects';
import About from './tabs/About';
import Contact from './tabs/Contact';

export type TabNavigate = (tab: TabId, focusId?: string) => void;

export interface TabProps {
  onNavigate?: TabNavigate;
  /** Cross-tab focus (e.g. a skill id from Experience) — undefined unless targeted. */
  focus?: TabFocus;
}

const TAB_VIEWS: Record<TabId, React.ComponentType<TabProps>> = {
  home: Hero,
  experience: Experience,
  skills: Skills,
  projects: Projects,
  about: About,
  contact: Contact,
};

const Site: React.FC = () => {
  const [tab, setTab] = useState<TabId>('home');
  const [focus, setFocus] = useState<({ tab: TabId } & TabFocus) | null>(null);
  const ActiveView = TAB_VIEWS[tab];

  // Each tab is its own page: reset the scroll position when it changes.
  // Without this, the viewport can stay parked past the new tab's content
  // (concept switches already reset scroll in Showcase — tab switches must too).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  // AnimatePresence mode="wait" can strand <main> (blank view) when the tab
  // key changes while an exit animation is still running. Serialize swaps:
  // ignore tab clicks until the running exit has fully completed. (Clicks
  // during the enter phase are fine — that exit runs to completion normally.)
  const swapLockRef = useRef(false);
  const navigate = (next: TabId, focusId?: string) => {
    if (focusId) setFocus({ tab: next, id: focusId, nonce: Date.now() });
    if (swapLockRef.current || next === tab) return;
    swapLockRef.current = true;
    setTab(next);
  };
  const settleSwap = () => {
    swapLockRef.current = false;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a10] font-sans text-zinc-100 selection:bg-violet-500/30">
      {/* ── Backdrop ── */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={['#5b21b6', '#c026d3', '#0891b2']}
          amplitude={0.9}
          speed={0.4}
        />
        <div className="absolute inset-0 bg-[#0a0a10]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0a10_78%)]" />
      </div>

      {/* ── Top bar with tabs ── */}
      <header className="fixed inset-x-0 top-7 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <button
            onClick={() => navigate('home')}
            className="group flex items-baseline gap-2"
            aria-label="Home"
          >
            <span className="font-serif text-xl font-semibold tracking-tight text-zinc-50">
              Roel<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">.</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500 transition group-hover:text-zinc-300 sm:block">
              Application Engineer
            </span>
          </button>

          <nav className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-black/45 p-1 backdrop-blur-xl">
            {siteTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(t.id)}
                className={cn(
                  'relative rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors sm:px-4',
                  tab === t.id ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-200'
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="ag-tab-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Active tab view ── */}
      <main className="relative z-10">
        <AnimatePresence mode="wait" onExitComplete={settleSwap}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveView onNavigate={navigate} focus={focus && focus.tab === tab ? focus : undefined} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom fade ── */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2.2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={0.9}
        zIndex={30}
      />
    </div>
  );
};

export default Site;
