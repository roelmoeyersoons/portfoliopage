import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/demo/helpers';

interface FaultyTerminalProps {
  className?: string;
}

interface Glitch {
  x: number;
  y: number;
  w: number;
  h: number;
  shift: number;
}

/** CRT + random horizontal slice-glitch backdrop, with a terminal card on top */
const FaultyTerminal: React.FC<FaultyTerminalProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let frame = 0;
    let glitches: Glitch[] = [];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background scanlines
      ctx.fillStyle = '#0b0c12';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }

      // Random glitch slices
      if (glitch && frame % 30 === 0) {
        glitches = Array.from({ length: 5 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          w: Math.random() * 120 + 40,
          h: Math.random() * 6 + 2,
          shift: (Math.random() - 0.5) * 30,
        }));
      }
      glitches.forEach((g) => {
        ctx.fillStyle = 'rgba(0,242,254,0.15)';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.fillStyle = 'rgba(255,0,128,0.12)';
        ctx.fillRect(g.x + g.shift, g.y + 6, g.w, g.h);
      });

      frame++;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [glitch]);

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative h-52 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-surface-200">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* Terminal card on top */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-72 rounded-lg border border-white/15 bg-black/75 p-3 font-mono text-[10px] text-cyan-300 shadow-2xl backdrop-blur-sm">
            <div className="mb-1 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            </div>
            <p>$ scan_crt --faults</p>
            <p className="text-slate-500">3 glitch sectors detected</p>
            <p className="text-cyan-400">$ regenerate --all ✓</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs text-slate-500">CRT scanlines + glitch slices</p>
        <button
          onClick={() => setGlitch((g) => !g)}
          className="rounded-md border border-white/10 bg-surface-100 px-2 py-0.5 text-[10px] text-slate-400 transition hover:text-cyan-300"
        >
          {glitch ? 'Glitch: ON' : 'Glitch: OFF'}
        </button>
      </div>
    </div>
  );
};

export default FaultyTerminal;