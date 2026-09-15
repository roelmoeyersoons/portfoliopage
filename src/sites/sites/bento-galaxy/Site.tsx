/**
 * BENTO GALAXY — the one site
 *
 * Layout: Plasma Bento's skeleton, 1:1 — chunky rounded bento surfaces on a
 * BentoGrid with cursor-spotlight cards, the gooey pill tab nav, and the
 * fade-through-dark veil on every tab swap. Tab structure and ordering are
 * exactly the bento concept's.
 *
 * Look: Galaxy Drift's deep-space observatory — full-bleed WebGL starfield
 * (Galaxy, hueShift 210) over #05060d with a soft vignette; white/[0.04]
 * glass panels with white/[0.08] borders; indigo #818cf8, violet #a78bfa
 * and cyan #67e8f9 accents; Space Grotesk display type + Inter body; mono
 * telemetry chrome sprinkled through the tabs.
 */
import React from 'react';
import { Galaxy, GradualBlur } from '@/sites/shared/bits';

import { profile, siteTabs, type TabFocus, type TabId } from '@/sites/shared/content';
import { useTabVeil } from '@/sites/shared/useTabVeil';
import GooeyTabs from './ui/GooeyTabs';
import './ui/station.css';
import Hero from './tabs/Hero';
import Experience from './tabs/Experience';
import Skills from './tabs/Skills';
import Projects from './tabs/Projects';
import About from './tabs/About';
import Contact from './tabs/Contact';
import TerminalTab from './tabs/TerminalTab';

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
  terminal: TerminalTab,
};

/* Stable array references — Galaxy re-initialises its WebGL context when
   these props change identity, so never inline them in JSX. */
const GALAXY_FOCAL: [number, number] = [0.5, 0.5];
const GALAXY_ROTATION: [number, number] = [1.0, 0.0];

const Site: React.FC = () => {
  // Tab swaps run through the shared fade-through-dark veil: the page dims
  // to the stage color, content swaps while covered, then the veil lifts.
  const { tab, focus, navigate, veil } = useTabVeil({ color: '#05060d' });
  const ActiveView = TAB_VIEWS[tab];

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

      {/* ── Top bar with gooey tabs (bento layout) ── */}
      <header className="fixed inset-x-0 top-7 z-40">
        {/* Scrim: content scrolling under the transparent bar dims + blurs
            into deep space instead of colliding with the title/tabs. Full
            strength across the bar, then a short (~32px) fade below it so
            section headings become legible again soon after passing under. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-7 -bottom-8 -z-10 bg-[#05060d]/85 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:gap-4">
          <button onClick={() => navigate('home')} className="group flex items-baseline gap-2" aria-label="Home">
            <span className="font-display text-xl font-bold tracking-tight text-slate-50">
              Roel
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                .
              </span>
            </span>
            <span className="hidden font-mono text-[9.5px] font-medium uppercase tracking-[0.26em] text-slate-500 transition group-hover:text-cyan-300/80 sm:block">
              {profile.title}
            </span>
          </button>

          <GooeyTabs items={siteTabs} activeId={tab} onSelect={(id) => navigate(id as TabId)} />
        </div>
      </header>

      {/* ── Active tab view ── */}
      <main className="relative z-10">
        {/* Content swaps under the veil — the veil lift IS the transition. */}
        <div key={tab}>
          <ActiveView onNavigate={navigate} focus={focus && focus.tab === tab ? focus : undefined} />
        </div>

        {/* ── Footer ── */}
        <footer className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-5 pb-10 pt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">
          <span>{profile.name}</span>
          <span>
            bento · <span className="text-cyan-300/70">galaxy drift</span>
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

      {/* ── Tab-swap veil ── */}
      {veil}
    </div>
  );
};

export default Site;
