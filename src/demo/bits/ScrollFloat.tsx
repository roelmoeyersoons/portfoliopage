import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface ScrollFloatProps {
  className?: string;
}

const words = 'Building high-performance distributed systems, low-level protocols, and modern web architectures.'.split(' ');

const ScrollFloat: React.FC<ScrollFloatProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <h3 className="text-sm font-semibold tracking-wider text-cyan-400">PROJECTS HEADER</h3>
      <p className="flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1 text-lg leading-relaxed text-slate-300">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.04,
              type: 'spring',
              stiffness: 120,
              damping: 14,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </p>
      <p className="text-xs text-slate-500">Word-by-word spring float animation</p>
    </div>
  );
};

export default ScrollFloat;
