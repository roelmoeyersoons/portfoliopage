import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface BeamsProps {
  className?: string;
}

interface Beam {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  speed: number;
  delay: number;
  color: string;
  width: number;
}

const Beams: React.FC<BeamsProps> = ({ className }) => {
  const beams = useMemo<Beam[]>(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        angle: Math.random() * 360,
        length: 120 + Math.random() * 200,
        speed: 8 + Math.random() * 10,
        delay: Math.random() * 4,
        color: ['#00f2fe', '#4facfe', '#7928ca', '#ff0080', '#10b981'][i % 5],
        width: 40 + Math.random() * 60,
      })),
    []
  );

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative h-52 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-surface-200/60">
        {/* Animated light ribbons crossing the area */}
        {beams.map((beam) => (
          <motion.div
            key={beam.id}
            className="absolute top-0 left-0 h-1.5 rounded-full blur-md"
            style={{
              left: `${beam.x}%`,
              top: `${beam.y}%`,
              width: beam.length,
              background: `linear-gradient(90deg, transparent, ${beam.color}, transparent)`,
              opacity: 0.45,
              transform: `rotate(${beam.angle}deg)`,
            }}
            animate={{
              x: [0, 300, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: beam.speed,
              delay: beam.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            Crossing light ribbons
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500">Animated beams — CSS / framer only, no canvas</p>
    </div>
  );
};

export default Beams;