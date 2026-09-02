import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

const words = ['Software Engineer', 'Systems Architect', 'Protocol Designer', 'OpenGL Hacker'];

interface RotatingTextProps {
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <h2 className="text-2xl font-bold text-slate-400">Roel Moeyersoons</h2>
      <div className="relative h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[index]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent"
          >
            {words[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RotatingText;
