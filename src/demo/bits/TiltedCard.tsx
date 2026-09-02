import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface TiltedCardProps {
  className?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  // Spotlight that follows the cursor across the card
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(0,242,254,0.15), transparent 60%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  }, [mx, my]);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div style={{ perspective: 800 }}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-44 w-64 cursor-pointer rounded-2xl border border-white/10 bg-surface-100 p-4"
        >
          {/* glow following cursor */}
          <motion.div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: spotlight }} />
          <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                PROJECT
              </span>
              <span className="text-[10px] text-slate-500">{hovered ? '■ tilt' : '□ flat'}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">OpenGL Mandelbrot</p>
              <p className="mt-0.5 text-xs text-slate-400">60+ FPS · GLSL · Pure C11</p>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="text-xs text-slate-500">3D perspective tilt following the cursor</p>
    </div>
  );
};

export default TiltedCard;