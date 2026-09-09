/**
 * NOIR THREADS — variant 3
 *
 * Editorial monochrome noir inspired by the rbp-portfolio template:
 * #0a0a0a stage, #fafafa ink, #a3a3a3 muted, #262626 hairlines, a single
 * #3b82f6 accent, Fraunces serif display and generous whitespace.
 * Minimal text tabs with a 1px sliding underline; restraint IS the identity.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { GradualBlur } from '@/sites/shared/bits';

import { siteTabs, profile, type TabId, type TabFocus } from '@/sites/shared/content';
import { useTabVeil } from '@/sites/shared/useTabVeil';
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
  // Tab swaps run through the shared fade-through-dark veil: the page dims
  // to the stage color, content swaps while covered, then the veil lifts.
  const { tab, focus, navigate, veil } = useTabVeil({ color: '#0a0a0a' });
  const ActiveView = TAB_VIEWS[tab];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] font-sans text-[#fafafa] selection:bg-blue-500/30 selection:text-blue-100">
      {/* ── Top bar: wordmark · minimal text tabs · status ── */}
      <header className="fixed inset-x-0 top-7 z-40 border-b border-[#262626] bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2.5 px-5 pb-3 pt-4 md:h-16 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:pb-0 md:pt-0">
          {/* wordmark */}
          <div className="flex items-center justify-between md:justify-start">
            <button
              onClick={() => navigate('home')}
              className="group flex items-baseline gap-2.5"
              aria-label="Back to home"
            >
              <span className="font-serif text-xl font-medium tracking-tight text-[#fafafa]">
                {profile.firstName}
                <span className="text-[#3b82f6]">.</span>
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.3em] text-[#525252] transition-colors group-hover:text-[#a3a3a3] sm:block">
                {profile.title}
              </span>
            </button>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252] md:hidden">
              <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
              Available
            </span>
          </div>

          {/* tabs — letter-spaced uppercase, 1px sliding underline */}
          <nav
            className="-mx-5 flex items-center gap-7 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:justify-center md:gap-8 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {siteTabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(t.id)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative whitespace-nowrap pb-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-300',
                    active ? 'text-[#fafafa]' : 'text-[#525252] hover:text-[#a3a3a3]'
                  )}
                >
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="nt-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-[#3b82f6]"
                      transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* status (desktop) */}
          <div className="hidden items-center justify-end gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252] lg:flex">
            <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
            {profile.location}
          </div>
        </div>
      </header>

      {/* ── Active tab view ── */}
      <main className="relative z-10">
        {/* Content swaps under the veil — the veil lift IS the transition. */}
        <div key={tab}>
          <ActiveView onNavigate={navigate} focus={focus && focus.tab === tab ? focus : undefined} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[#262626]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.24em] text-[#525252] sm:flex-row">
          <span>{profile.name}</span>
          <span>
            Concept 03 — <span className="text-[#a3a3a3]">Noir Threads</span>
          </span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* ── Bottom fade ── */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={0.85}
        zIndex={30}
      />

      {/* ── Tab-swap veil ── */}
      {veil}
    </div>
  );
};

export default Site;