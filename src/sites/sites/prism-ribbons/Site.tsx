/**
 * PRISM RIBBONS — variant 5
 *
 * Look: flowing holographic. Full-bleed WebGL Ribbons over #07080d, a
 * PlasmaWave band in the hero, one prism gradient (cyan → violet → pink)
 * carrying the identity: capsule tab indicator, level bars, buttons,
 * serif italic accents.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GradualBlur } from '@/sites/shared/bits';

import { profile, siteTabs, type TabId } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import { PRISM, RibbonsField } from './ui';
import Home from './tabs/Home';
import Experience from './tabs/Experience';
import Skills from './tabs/Skills';
import Projects from './tabs/Projects';
import About from './tabs/About';
import Contact from './tabs/Contact';

export type TabNavigate = (tab: TabId) => void;

const TAB_VIEWS: Record<TabId, React.ComponentType<{ onNavigate?: TabNavigate }>> = {
  home: Home,
  experience: Experience,
  skills: Skills,
  projects: Projects,
  about: About,
  contact: Contact,
};

const Site: React.FC = () => {
  const [tab, setTab] = useState<TabId>('home');
  const ActiveView = TAB_VIEWS[tab];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07080d] font-sans text-slate-200 selection:bg-cyan-400/30">
      {/* ── Backdrop: flowing ribbons ── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.55]">
          <RibbonsField />
        </div>
        <div className="absolute inset-0 bg-[#07080d]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#07080d_82%)]" />
      </div>

      {/* ── Top bar: wordmark + floating capsule tabs ── */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-4 sm:flex-row sm:justify-between">
          <button onClick={() => setTab('home')} className="group flex items-baseline gap-2" aria-label="Home">
            <span className="font-serif text-xl font-semibold tracking-tight text-slate-50">
              {profile.firstName}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: PRISM }}
              >
                .
              </span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 transition group-hover:text-slate-300 sm:block">
              {profile.title}
            </span>
          </button>

          <nav
            className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/[0.08] bg-[#0a0c14]/70 p-1 shadow-[0_10px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Site sections"
          >
            {siteTabs.map((t) => (
              <motion.button
                key={t.id}
                onClick={() => setTab(t.id)}
                whileHover={{ rotate: -1.5, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors',
                  tab === t.id ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="prism-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: PRISM, boxShadow: '0 0 24px rgba(167,139,250,0.45)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Active tab view ── */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveView onNavigate={setTab} />
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/[0.06] py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-[11px] uppercase tracking-[0.2em] text-slate-500 sm:flex-row">
            <span>{profile.name}</span>
            <span className="font-serif normal-case italic tracking-normal text-slate-400">
              concept 5 — Prism Ribbons
            </span>
            <span>{new Date().getFullYear()}</span>
          </div>
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
