import React, { useMemo } from 'react';
import { cn } from '@/demo/helpers';

interface StarBorderProps {
  className?: string;
}

const StarBorder: React.FC<StarBorderProps> = ({ className }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return {
          top: 50 + Math.sin(angle) * 46,
          left: 50 + Math.cos(angle) * 46,
          delay: i * 0.35,
          color: ['#00f2fe', '#ff0080', '#f59e0b', '#10b981'][i % 4],
        };
      }),
    []
  );

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative h-44 w-64">
        {/* Sparkle orbit */}
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              backgroundColor: star.color,
              boxShadow: `0 0 6px ${star.color}`,
              animation: `pulse-glow 2s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
        {/* Card with orbiting border */}
        <div className="absolute inset-6 flex items-center justify-center rounded-2xl border border-white/10 bg-surface-100">
          <span className="text-sm font-medium text-slate-300">Orbiting sparkles</span>
        </div>
      </div>
      <p className="text-xs text-slate-500">Sparkle border orbiting a card</p>
    </div>
  );
};

export default StarBorder;