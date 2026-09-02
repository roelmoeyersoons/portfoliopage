import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface BounceCardsProps {
  className?: string;
}

const cards = [
  { id: 1, title: 'Distributed', sub: 'UWB MAC', color: 'from-cyan-500/20 to-blue-500/20', icon: '📡' },
  { id: 2, title: 'Graphics', sub: 'GLSL / OpenGL', color: 'from-purple-500/20 to-pink-500/20', icon: '🎨' },
  { id: 3, title: 'Full-Stack', sub: 'React + Node', color: 'from-emerald-500/20 to-cyan-500/20', icon: '⚛️' },
  { id: 4, title: 'Systems', sub: 'C / Embedded', color: 'from-amber-500/20 to-red-500/20', icon: '⚙️' },
  { id: 5, title: 'Research', sub: 'IDLab Thesis', color: 'from-blue-500/20 to-purple-500/20', icon: '🔬' },
];

const BounceCards: React.FC<BounceCardsProps> = ({ className }) => {
  const [active, setActive] = useState(2);

  const handleClick = useCallback((id: number) => {
    setActive((prev) => (prev === id ? -1 : id));
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <p className="text-sm text-slate-500">Click a card to bounce it to the front</p>
      <div className="relative h-44 w-80">
        {cards.map((card, i) => {
          const isActive = active === card.id;
          const isAnyActive = active !== -1;
          // Position: active card center, others fan out behind
          const x = isActive ? 0 : (i - 2) * 52;
          const rotate = isActive ? 0 : (i - 2) * 5;
          const scale = isActive ? 1.15 : isAnyActive ? 0.8 : 1;

          return (
            <AnimatePresence key={card.id}>
              <motion.button
                onClick={() => handleClick(card.id)}
                className={`absolute left-1/2 top-8 h-32 w-24 -translate-x-1/2 cursor-pointer rounded-xl border border-white/15 bg-gradient-to-br ${card.color} bg-surface-100 p-3 text-left shadow-xl backdrop-blur-sm`}
                initial={{ opacity: 0, y: 40, scale: 0.6 }}
                animate={{
                  x,
                  rotate,
                  scale,
                  opacity: isAnyActive && !isActive ? 0.55 : 1,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                style={{ transformOrigin: '50% 100%' }}
              >
                <span className="text-xl">{card.icon}</span>
                <p className="mt-2 text-xs font-bold text-white">{card.title}</p>
                <p className="text-[9px] text-slate-400">{card.sub}</p>
              </motion.button>
            </AnimatePresence>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">Bounce-in spread card stack</p>
    </div>
  );
};

export default BounceCards;