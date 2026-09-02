import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, Code2 } from 'lucide-react';
import { cn } from '@/demo/helpers';
import {
  demoRegistry,
  categoryLabels,
  categoryOrder,
  getEntriesByCategory,
  type CategoryId,
  type DemoTabMeta,
} from '@/demo/registry';

interface DemoLabProps {
  onExit: () => void;
}

/** Read "#/reactbits/<id>" from the hash (if present) and return the entry */
function entryFromHash(): DemoTabMeta | null {
  const match = window.location.hash.match(/^#\/reactbits\/([a-z0-9-]+)/);
  if (!match) return null;
  return demoRegistry.find((e) => e.id === match[1]) ?? null;
}

// ── Sidebar ──────────────────────────────────────────────────────
interface SidebarProps {
  activeCategory: CategoryId;
  activeId: string | null;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectComponent: (meta: DemoTabMeta) => void;
  onExit: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  activeId,
  onSelectCategory,
  onSelectComponent,
  onExit,
}) => (
  <aside className="flex w-64 flex-shrink-0 flex-col overflow-hidden border-r border-white/10 bg-surface-100/80 backdrop-blur-xl">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <button
        onClick={onExit}
        className="flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-400"
      >
        <ChevronLeft className="h-4 w-4" />
        Exit
      </button>
      <span className="text-xs font-semibold tracking-wider text-cyan-400">React Bits Lab</span>
    </div>

    {/* Category nav */}
    <nav className="flex-shrink-0 space-y-0.5 border-b border-white/5 px-2 py-2">
      {categoryOrder.map((cat) => {
        const count = getEntriesByCategory(cat).length;
        const isActive = cat === activeCategory;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              isActive
                ? 'bg-cyan-500/10 text-cyan-300'
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
            )}
          >
            <span>{categoryLabels[cat]}</span>
            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] tabular-nums text-slate-600">
              {count}
            </span>
          </button>
        );
      })}
    </nav>

    {/* Component list */}
    <div className="flex-1 overflow-y-auto px-2 py-2">
      {getEntriesByCategory(activeCategory).map((meta) => {
        const selected = meta.id === activeId;
        return (
          <button
            key={meta.id}
            onClick={() => onSelectComponent(meta)}
            className={cn(
              'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs transition-all',
              selected
                ? 'bg-cyan-500/15 text-cyan-300'
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 flex-shrink-0 rounded-full',
                meta.deps === 'canvas'
                  ? 'bg-amber-500'
                  : meta.deps !== 'none'
                    ? 'bg-purple-500'
                    : selected
                      ? 'bg-cyan-400'
                      : 'bg-slate-600'
              )}
            />
            <span className="truncate">{meta.name}</span>
            {meta.stretch && (
              <span className="ml-auto text-[10px] text-purple-500/70">(stretch)</span>
            )}
          </button>
        );
      })}
    </div>
  </aside>
);

// ── Deps Badge ───────────────────────────────────────────────────
const DepsBadge: React.FC<{ deps: string }> = ({ deps }) => {
  const colors: Record<string, string> = {
    none: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    canvas: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    ogl: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    gsap: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    three: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span
      className={cn(
        'rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
        colors[deps] || 'bg-slate-500/10 text-slate-400'
      )}
    >
      {deps}
    </span>
  );
};

// ── Main Lab Shell ───────────────────────────────────────────────
export const DemoLab: React.FC<DemoLabProps> = ({ onExit }) => {
  const firstCategory = categoryOrder[0];
  const firstEntry = getEntriesByCategory(firstCategory)[0];

  const [activeCategory, setActiveCategory] = useState<CategoryId>(firstCategory);
  const [activeEntry, setActiveEntry] = useState<DemoTabMeta | null>(firstEntry || null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Deep links: #/reactbits/<id> selects the component on load
  useEffect(() => {
    const target = entryFromHash();
    if (target) {
      setActiveEntry(target);
      setActiveCategory(target.category);
    }
    const onHashChange = () => {
      const t = entryFromHash();
      if (t) {
        setActiveEntry(t);
        setActiveCategory(t.category);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectCategory = useCallback((cat: CategoryId) => {
    setActiveCategory(cat);
    const entries = getEntriesByCategory(cat);
    if (entries.length > 0) {
      setActiveEntry(entries[0]);
    } else {
      setActiveEntry(null);
    }
  }, []);

  const handleSelectComponent = useCallback((meta: DemoTabMeta) => {
    setActiveEntry(meta);
    setActiveCategory(meta.category);
    // Update hash for deep-linkable state (no history spam)
    window.history.replaceState(null, '', `#/reactbits/${meta.id}`);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-shrink-0"
          >
            <Sidebar
              activeCategory={activeCategory}
              activeId={activeEntry?.id ?? null}
              onSelectCategory={handleSelectCategory}
              onSelectComponent={handleSelectComponent}
              onExit={onExit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar toggle (thin strip) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex w-6 flex-shrink-0 items-center justify-center border-r border-white/10 bg-surface-200 text-xs text-slate-500 transition hover:bg-surface-100 hover:text-cyan-400"
          title="Open sidebar"
        >
          ▶
        </button>
      )}

      {/* Main stage */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-white/10 bg-surface-100/50 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-xs text-slate-500 transition hover:text-slate-300"
                title="Close sidebar"
              >
                ◀
              </button>
            )}
            <span className="text-sm font-medium text-white">
              {activeEntry?.name ?? 'Select a component'}
            </span>
            {activeEntry && <DepsBadge deps={activeEntry.deps} />}
          </div>
          <div className="flex items-center gap-3">
            {activeEntry?.url && (
              <a
                href={activeEntry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-cyan-400"
              >
                <ExternalLink className="h-3 w-3" />
                Docs
              </a>
            )}
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-red-400"
            >
              <X className="h-3.5 w-3.5" />
              Close
            </button>
          </div>
        </header>

        {/* Preview area */}
        <div className="flex flex-1 items-center justify-center overflow-auto p-6">
          <AnimatePresence mode="wait">
            {activeEntry ? (
              <motion.div
                key={activeEntry.id}
                className="w-full max-w-4xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Description */}
                <p className="mb-4 text-xs text-slate-500">{activeEntry.description}</p>

                {/* Component preview */}
                <React.Suspense
                  fallback={
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-surface-200/50">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Code2 className="h-4 w-4 animate-pulse" />
                        Loading...
                      </div>
                    </div>
                  }
                >
                  <activeEntry.component />
                </React.Suspense>
              </motion.div>
            ) : (
              <div className="text-center text-sm text-slate-600">
                Select a component from the sidebar to preview it
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
};
