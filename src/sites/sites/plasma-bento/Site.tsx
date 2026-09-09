/**
 * PLASMA BENTO — variant 4
 *
 * Look: vibrant gradient playground. A GradientBlinds band (orange → pink →
 * violet) burns across the top and fades into a near-black plum stage; the
 * rest of the page is solid with slow drifting glow blobs. Chunky rounded-3xl
 * bento surfaces, Space Grotesk display type, gooey tab nav.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientBlinds, GradualBlur } from '@/sites/shared/bits';

import { profile, siteTabs, type TabFocus, type TabId } from '@/sites/shared/content';
import GooeyTabs from './ui/GooeyTabs';
import './ui/plasma.css';
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0a12] font-sans text-white selection:bg-pink-500/30">
      {/* ── Backdrop: GradientBlinds band + glow blobs ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[46vh] [mask-image:linear-gradient(to_bottom,black_52%,transparent_100%)]">
          <GradientBlinds
            gradientColors={['#f97316', '#ec4899', '#8b5cf6']}
            blindCount={14}
            distortAmount={0.6}
            noise={0.25}
            angle={12}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            shineDirection="left"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a12]/25 via-transparent to-[#0d0a12]" />
        </div>
        <div
          className="pb-blob left-[-8%] top-[38%] h-[26rem] w-[26rem] bg-orange-500/10"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="pb-blob right-[-10%] top-[58%] h-[30rem] w-[30rem] bg-pink-500/[0.08]"
          style={{ animationDelay: '-9s' }}
        />
        <div
          className="pb-blob bottom-[-6%] left-[30%] h-[24rem] w-[24rem] bg-violet-500/[0.09]"
          style={{ animationDelay: '-13s' }}
        />
      </div>

      {/* ── Top bar with gooey tabs ── */}
      <header className="fixed inset-x-0 top-7 z-40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:gap-4">
          <button onClick={() => navigate('home')} className="group flex items-baseline gap-2" aria-label="Home">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Roel
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                .
              </span>
            </span>
            <span className="hidden font-mono text-[9.5px] font-medium uppercase tracking-[0.26em] text-white/40 transition group-hover:text-white/70 sm:block">
              {profile.title}
            </span>
          </button>

          <GooeyTabs items={siteTabs} activeId={tab} onSelect={(id) => navigate(id as TabId)} />
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

        {/* ── Footer ── */}
        <footer className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-5 pb-10 pt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/30">
          <span>{profile.name}</span>
          <span>
            concept 04 — <span className="text-pink-300/70">Plasma Bento</span>
          </span>
          <span>{new Date().getFullYear()}</span>
        </footer>
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
