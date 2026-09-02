import React, { useRef, useEffect } from 'react';
import { cn } from '@/demo/helpers';

interface GlareHoverProps {
  className?: string;
}

const GlareHover: React.FC<GlareHoverProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const glare = glareRef.current;
    if (!container || !glare) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glare.style.transform = `translate(${x - 100}px, ${y - 100}px)`;
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-surface-100 p-8"
      >
        {/* Glare layer */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute left-0 top-0 h-52 w-52 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(0,242,254,0.25) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-white">Skills Card</h3>
          <p className="mt-1 text-sm text-slate-400">Move your cursor over this card to see the glare follow it.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['TypeScript', 'React', 'OpenGL'].map((tag) => (
              <span key={tag} className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlareHover;