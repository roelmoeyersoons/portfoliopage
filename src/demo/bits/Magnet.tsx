import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/demo/helpers';

interface MagnetProps {
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    // Clamp travel distance for "magnet" feel
    setOffset({
      x: Math.max(-24, Math.min(24, dx * 0.35)),
      y: Math.max(-18, Math.min(18, dy * 0.35)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6 p-10', className)}>
      <p className="text-sm text-slate-500">Move your cursor — buttons spring toward you</p>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {/* CTA button that follows cursor */}
        <button
          className="relative rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-10 py-5 text-lg font-bold text-white shadow-[0_0_30px_rgba(0,242,254,0.25)] backdrop-blur-md transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: active ? 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Open Terminal
        </button>
      </div>
    </div>
  );
};

export default Magnet;