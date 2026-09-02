import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/demo/helpers';

interface BlobCursorProps {
  className?: string;
}

const BlobCursor: React.FC<BlobCursorProps> = ({ className }) => {
  const blobRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const blob = blobRef.current;
    if (!blob) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      // Ease toward target
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      blob.style.transform = `translate(${currentX - 100}px, ${currentY - 100}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <div className={cn('relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden', className)}>
      {/* Blob layer */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-0 top-0 z-0 h-52 w-52 rounded-full opacity-60 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(0,242,254,0.9), rgba(79,172,254,0.5) 40%, rgba(121,40,202,0.4) 70%, transparent 75%)',
          filter: 'blur(24px)',
          transition: 'opacity 0.3s',
        }}
      />
      <div className="relative z-10 text-center">
        <p className="text-xl font-bold text-white">Blob Cursor</p>
        <p className="mt-1 text-sm text-slate-400">Move your mouse across this preview</p>
        <button
          onClick={() => setEnabled((e) => !e)}
          className="mt-4 rounded-lg border border-white/10 bg-surface-100 px-3 py-1.5 text-xs text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
        >
          {enabled ? 'Disable blob' : 'Enable blob'}
        </button>
      </div>
    </div>
  );
};

export default BlobCursor;