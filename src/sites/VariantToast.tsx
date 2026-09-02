/**
 * VariantToast — the floating bottom switcher between showcase sites.
 * Neutral dark-glass styling that sits on top of every design.
 *
 * Keyboard: 1..9 selects a site, ArrowLeft/ArrowRight cycles, Esc collapses.
 */
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, X } from 'lucide-react';
import { sites } from './registry';
import { useKeydown } from './shared/hooks';

interface VariantToastProps {
  current: string;
  onSelect: (id: string) => void;
}

export const VariantToast: React.FC<VariantToastProps> = ({ current, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const idx = Math.max(0, sites.findIndex((s) => s.id === current));
  const site = sites[idx] ?? sites[0];

  const cycle = useCallback(
    (dir: 1 | -1) => {
      const next = (idx + dir + sites.length) % sites.length;
      onSelect(sites[next].id);
    },
    [idx, onSelect]
  );

  useKeydown(
    useCallback(
      (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
        if (e.key === 'Escape') setExpanded(false);
        // Only cycle sites with arrows when focus is not on an interactive element
        // inside a site (buttons/links may use arrows for their own navigation).
        const onInteractive =
          !!target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.getAttribute('role') === 'menuitem');
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !onInteractive) {
          cycle(e.key === 'ArrowRight' ? 1 : -1);
        }
        const n = parseInt(e.key, 10);
        if (!Number.isNaN(n) && n >= 1 && n <= sites.length) {
          onSelect(sites[n - 1].id);
        }
      },
      [cycle, onSelect]
    )
  );

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="w-[min(94vw,640px)] overflow-hidden rounded-2xl border border-white/15 bg-black/85 shadow-2xl shadow-black/60 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                <Layers size={13} />
                Design Lab — {sites.length} site concepts
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-[10px] text-white/40 sm:block">← → cycle · 1–{sites.length} jump</span>
                <button
                  onClick={() => setExpanded(false)}
                  className="rounded-full border border-white/15 p-1 text-white/60 transition hover:border-white/40 hover:text-white"
                  aria-label="Collapse switcher"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {sites.map((s, i) => {
                const active = s.id === current;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelect(s.id);
                      setExpanded(false);
                    }}
                    className={`group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active ? 'bg-white/12' : 'hover:bg-white/6'
                    }`}
                  >
                    <span className="mt-0.5 flex w-6 shrink-0 items-center justify-center">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-bold ${
                          active ? 'border-white/50 bg-white/20 text-white' : 'border-white/15 text-white/45'
                        }`}
                      >
                        {i + 1}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="flex gap-1">
                          {s.palette.map((c) => (
                            <span
                              key={c}
                              className="h-2.5 w-2.5 rounded-full ring-1 ring-white/25"
                              style={{ background: c }}
                            />
                          ))}
                        </span>
                        <span className={`truncate text-sm font-semibold ${active ? 'text-white' : 'text-white/85'}`}>
                          {s.name}
                        </span>
                        {active && (
                          <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                            viewing
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-white/50">{s.tagline}</span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {s.components.slice(0, 5).map((c) => (
                          <span
                            key={c}
                            className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-white/45"
                          >
                            {c}
                          </span>
                        ))}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="flex items-center gap-1 rounded-full border border-white/15 bg-black/80 py-1.5 pl-2 pr-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            <button
              onClick={() => cycle(-1)}
              className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Previous site"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-2.5 rounded-full px-2 py-1 transition hover:bg-white/8"
              aria-label="Expand site switcher"
            >
              <span className="flex gap-1">
                {site.palette.map((c) => (
                  <span key={c} className="h-2 w-2 rounded-full ring-1 ring-white/25" style={{ background: c }} />
                ))}
              </span>
              <span className="max-w-[38vw] truncate text-xs font-semibold text-white/90 sm:max-w-none">{site.name}</span>
              <span className="font-mono text-[10px] text-white/40">
                {idx + 1}/{sites.length}
              </span>
            </button>
            <button
              onClick={() => cycle(1)}
              className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Next site"
            >
              <ChevronRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VariantToast;
