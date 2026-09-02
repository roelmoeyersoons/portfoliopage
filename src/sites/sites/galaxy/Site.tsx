/**
 * GALAXY DRIFT — variant 2
 *
 * Look: a deep-space observatory. Full-bleed WebGL starfield (Galaxy,
 * hueShift 210) over #05060d with a soft vignette; white/[0.04] glass
 * panels with white/[0.08] borders; indigo #818cf8, violet #a78bfa and
 * cyan #67e8f9 accents; Space Grotesk display type + Inter body.
 *
 * Navigation is a ReactBits `Dock` pinned top-center (macOS-style
 * magnification) with a wordmark on the left.
 */
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Cpu, FolderGit2, Home, Mail, User } from 'lucide-react';
import { Dock, Galaxy, GradualBlur } from '@/sites/shared/bits';

import { profile, siteTabs, type TabId } from '@/sites/shared/content';
import { cn } from '@/demo/helpers';
import Hero from './tabs/Hero';
import Experience from './tabs/Experience';
import Skills from './tabs/Skills';
import Projects from './tabs/Projects';
import About from './tabs/About';
import Contact from './tabs/Contact';

export type TabNavigate = (tab: TabId) => void;

const TAB_VIEWS: Record<TabId, React.ComponentType<{ onNavigate?: TabNavigate }>> = {
  home: Hero,
  experience: Experience,
  skills: Skills,
  projects: Projects,
  about: About,
  contact: Contact,
};

/* Stable array references — Galaxy re-initialises its WebGL context when
   these props change identity, so never inline them in JSX. */
const GALAXY_FOCAL: [number, number] = [0.5, 0.5];
const GALAXY_ROTATION: [number, number] = [1.0, 0.0];

const TAB_ICONS = { home: Home, experience: Briefcase, skills: Cpu, projects: FolderGit2, about: User, contact: Mail } as const;

const Site: React.FC = () => {
  const [tab, setTab] = useState<TabId>('home');
  const ActiveView = TAB_VIEWS[tab];

  const dockItems = useMemo(
    () =>
      siteTabs.map((t) => {
        const Icon = TAB_ICONS[t.id];
        const active = tab === t.id;
        return {
          icon: (
            <Icon
              size={17}
              strokeWidth={1.9}
              className={cn('transition-colors', active ? 'text-cyan-200' : 'text-slate-300')}
            />
          ),
          label: t.label,
          onClick: () => setTab(t.id),
          className: active
            ? '!border-cyan-300/40 !bg-cyan-400/10 !shadow-[0_0_24px_rgba(103,232,249,0.4)]'
            : '!border-white/[0.08] !bg-white/[0.04] hover:!border-white/25',
        };
      }),
    [tab]
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05060d] font-sans text-slate-200 selection:bg-cyan-400/25">
      {/* ── Backdrop: full-bleed galaxy + vignette ── */}
      <div className="fixed inset-0 -z-10">
        <Galaxy
          focal={GALAXY_FOCAL}
          rotation={GALAXY_ROTATION}
          starSpeed={0.35}
          density={0.9}
          hueShift={210}
          speed={0.55}
          mouseInteraction
          saturation={0.4}
          glowIntensity={0.26}
          twinkleIntensity={0.45}
          rotationSpeed={0.04}
          repulsionStrength={1.8}
          transparent
        />
        <div className="absolute inset-0 bg-[#05060d]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(5,6,13,0.88)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060d]/70 via-transparent to-[#05060d]/70" />
      </div>

      {/* ── Top bar: wordmark + Dock ── */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-5">
          {/* wordmark (left) */}
          <button
            onClick={() => setTab('home')}
            className="group relative z-10 hidden h-[72px] items-center gap-2.5 sm:flex"
            aria-label="Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10 font-display text-sm font-bold text-indigo-200 shadow-[0_0_18px_rgba(129,140,248,0.35)]">
              {profile.initials[0]}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block font-display text-[15px] font-semibold leading-none tracking-tight text-slate-50">
                {profile.firstName}
                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">.</span>
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 transition group-hover:text-cyan-300/80">
                galaxy drift
              </span>
            </span>
          </button>

          {/* Dock (top-center) — the wrapper is the positioned ancestor for the
              dock panel; pointer-events stay on the panel itself so the fixed
              header never swallows clicks over the page. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <div className="relative h-[72px]">
              <Dock
                items={dockItems}
                panelHeight={52}
                baseItemSize={34}
                magnification={48}
                distance={120}
                dockHeight={110}
                spring={{ mass: 0.12, stiffness: 190, damping: 14 }}
                className="pointer-events-auto !bottom-auto !top-5 !rounded-2xl !border-white/[0.08] !bg-[#0a0e1d]/80 !shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              />
            </div>
          </div>
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
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-slate-600">
          {profile.name} · concept 02 — galaxy drift · {new Date().getFullYear()}
        </p>
      </footer>

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
