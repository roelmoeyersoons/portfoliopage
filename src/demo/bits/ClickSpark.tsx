import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface ClickSparkProps {
  className?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({ className }) => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = idRef.current++;

    // Spawn 8 sparks at random angles
    const newSparks: Spark[] = Array.from({ length: 8 }, (_, i) => ({
      id,
      x,
      y,
      angle: (i / 8) * Math.PI * 2 + Math.random() * 0.5,
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        onClick={handleClick}
        className="relative flex h-64 w-96 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface-100"
      >
        <p className="pointer-events-none text-center text-lg text-slate-400">
          Click anywhere on this panel
        </p>
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.span
              key={`${spark.id}-${spark.x}-${spark.y}-${spark.angle}`}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-400"
              initial={{ x: spark.x, y: spark.y, opacity: 1, scale: 1 }}
              animate={{
                x: spark.x + Math.cos(spark.angle) * 70,
                y: spark.y + Math.sin(spark.angle) * 70,
                opacity: 0,
                scale: 0.3,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ boxShadow: '0 0 8px rgba(0,242,254,0.8)' }}
            />
          ))}
        </AnimatePresence>
      </div>
      <p className="text-xs text-slate-500">Spark burst on each click</p>
    </div>
  );
};

export default ClickSpark;