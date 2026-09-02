import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface PillNavProps {
  className?: string;
}

const tabs = ['Overview', 'Experience', 'Projects', 'Skills'];

const PillNav: React.FC<PillNavProps> = ({ className }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <nav className="relative flex rounded-full border border-white/10 bg-surface-100 px-1 py-1">
        {/* Sliding pill */}
        <motion.div
          className="absolute inset-y-1 rounded-full bg-cyan-500/90 shadow-[0_0_15px_rgba(0,242,254,0.4)]"
          animate={{
            x: active * 108,
            width: 104,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ left: 4 }}
        />
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={cn(
              'relative z-10 w-[104px] rounded-full py-2 text-xs font-semibold transition-colors duration-200',
              active === i ? 'text-black' : 'text-slate-400 hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
      <p className="text-xs text-slate-500">Minimal sliding-pill nav — alternative to GooeyNav</p>
    </div>
  );
};

export default PillNav;