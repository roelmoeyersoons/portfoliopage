import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/demo/helpers';

interface BorderGlowProps {
  className?: string;
}

const BorderGlow: React.FC<BorderGlowProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-md rounded-2xl p-[1.5px] transition-colors duration-300"
        style={{
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(0,242,254,0.9), rgba(79,172,254,0.5) 40%, transparent 70%)`,
        }}
      >
        <div className="rounded-2xl bg-surface-100 px-8 py-10 text-center">
          <h3 className="text-lg font-bold text-white">Mesh-Gradient Border</h3>
          <p className="mt-2 text-sm text-slate-400">
            The border light follows your cursor — a clean alternative to hard-edged borders.
          </p>
        </div>
      </div>
      <p className="text-xs text-slate-500">Cursor-following mesh gradient border</p>
    </div>
  );
};

export default BorderGlow;