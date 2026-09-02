import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface GooeyNavProps {
  className?: string;
}

const tabs = ['Languages', 'Distributed', 'Web', 'Backend'];

const GooeyNav: React.FC<GooeyNavProps> = ({ className }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      {/* SVG filter for gooey blob merging */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="gooey-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <nav
        className="relative flex rounded-full border border-white/10 bg-surface-100 p-1.5"
        style={{ filter: 'url(#gooey-filter)' }}
      >
        {/* Liquid moving indicator */}
        <motion.div
          className="absolute inset-y-1.5 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80"
          animate={{ x: active * 108 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          style={{ width: 104 }}
        />
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={cn(
              'relative z-10 w-[104px] rounded-full py-2 text-xs font-semibold transition-colors',
              active === i ? 'text-black' : 'text-slate-400 hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      <p className="text-xs text-slate-500">Liquid sliding tab indicator (SVG gooey filter)</p>
    </div>
  );
};

export default GooeyNav;