import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface CardSwapProps {
  className?: string;
}

const initialCards = [
  { id: 1, title: 'OpenGL Mandelbrot', cat: 'Graphics', color: 'border-cyan-500/30' },
  { id: 2, title: 'Multi-Radio MAC', cat: 'IoT / Research', color: 'border-purple-500/30' },
  { id: 3, title: 'Discord SongBot', cat: 'Backend', color: 'border-emerald-500/30' },
  { id: 4, title: 'ArchConfig', cat: 'DevOps', color: 'border-amber-500/30' },
];

const cardStyles = [
  'from-cyan-500/10 to-blue-500/10',
  'from-purple-500/10 to-pink-500/10',
  'from-emerald-500/10 to-cyan-500/10',
  'from-amber-500/10 to-red-500/10',
];

const CardSwap: React.FC<CardSwapProps> = ({ className }) => {
  const [cards, setCards] = useState(initialCards);
  const [order, setOrder] = useState<number[]>(cards.map((_, i) => i));

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      // Move first card to front positions cyclically
      const first = next.shift();
      if (first !== undefined) next.push(first);
      return next;
    });
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <p className="text-sm text-slate-500">Cards swap positions with a springy layout animation</p>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        <AnimatePresence>
          {order.map((cardIdx) => {
            const card = cards[cardIdx % cards.length];
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${cardStyles[cardIdx % cardStyles.length]} bg-surface-100 p-4`}
              >
                <p className="text-[10px] font-semibold text-slate-500">{card.cat}</p>
                <h4 className="mt-1 text-sm font-bold text-white">{card.title}</h4>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <button
        onClick={handleShuffle}
        className="rounded-lg border border-white/10 bg-surface-100 px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
      >
        ↻ Rotate positions
      </button>
    </div>
  );
};

export default CardSwap;