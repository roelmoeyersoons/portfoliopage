import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface AnimatedListProps {
  className?: string;
}

interface Item {
  id: number;
  text: string;
  tag: string;
  color: string;
}

const initialItems: Item[] = [
  { id: 1, text: 'Contract-first API design prevents breaking downstream clients', tag: 'LEARNING', color: 'text-cyan-300' },
  { id: 2, text: 'Deterministic time-slotting beats randomized backoff in dense clusters', tag: 'PROTOCOL', color: 'text-purple-300' },
  { id: 3, text: 'Hardware constraints must dictate protocol abstractions', tag: 'EMBEDDED', color: 'text-emerald-300' },
  { id: 4, text: 'Pragmatic observability pinpoints bottlenecks fast', tag: 'OPS', color: 'text-amber-300' },
];

const seedItems = [
  { id: 5, text: 'Client-side normalization prevents cascading re-renders', tag: 'REACT', color: 'text-cyan-300' },
  { id: 6, text: 'Strict types across the stack cut runtime exceptions', tag: 'TYPES', color: 'text-blue-300' },
  { id: 7, text: 'Profiling with Valgrind reinforces memory discipline', tag: 'NATIVE', color: 'text-pink-300' },
  { id: 8, text: 'Optimistic UI + debounced batching keeps 60fps', tag: 'PERF', color: 'text-emerald-300' },
];

const AnimatedList: React.FC<AnimatedListProps> = ({ className }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [nextId, setNextId] = useState(5);

  const handleAdd = () => {
    const seed = seedItems[(nextId - 5) % seedItems.length];
    setItems((prev) => [{ ...seed, id: nextId }, ...prev]);
    setNextId((n) => n + 1);
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className={cn('flex w-full max-w-md flex-col items-center gap-4', className)}>
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-semibold text-white">Deep-Dive Learnings</p>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/25"
        >
          + Add item
        </button>
      </div>
      <div className="w-full space-y-2">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-surface-100 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-600">{item.id}</span>
                <div>
                  <p className="text-xs text-slate-300">{item.text}</p>
                  <p className={`mt-0.5 text-[10px] font-semibold ${item.color}`}>{item.tag}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="ml-2 rounded p-1 text-slate-600 transition hover:text-red-400"
                title="Remove"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedList;