import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface FallingTextProps {
  className?: string;
}

const greeting = 'Hey there! 👋';

const FallingText: React.FC<FallingTextProps> = ({ className }) => {
  const [trigger, setTrigger] = useState(false);

  const handleClick = () => {
    setTrigger(true);
    setTimeout(() => setTrigger(false), 1500);
  };

  const letters = greeting.split('');

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <p className="text-sm text-slate-500">Click the button to drop letters</p>
      <div className="flex flex-wrap justify-center">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            animate={
              trigger
                ? {
                    y: [0, 60, 60],
                    opacity: [1, 1, 0],
                    rotate: [0, Math.random() * 360],
                  }
                : { y: 0, opacity: 1, rotate: 0 }
            }
            transition={{
              duration: 0.8,
              delay: trigger ? i * 0.06 : 0,
              ease: 'easeIn',
            }}
            className="inline-block text-4xl font-bold"
            style={{ color: ['#00f2fe', '#4facfe', '#7928ca', '#ff0080', '#10b981'][i % 5] }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
      <button
        onClick={handleClick}
        className="rounded-lg border border-white/10 bg-surface-100 px-4 py-2 text-sm text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
      >
        Drop Letters
      </button>
    </div>
  );
};

export default FallingText;
