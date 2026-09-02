import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface LetterGlitchProps {
  className?: string;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソ';

/** Canvas 2D matrix rain (letter glitch) */
const LetterGlitch: React.FC<LetterGlitchProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      columns = Math.floor(rect.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -30);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    const render = () => {
      ctx.fillStyle = 'rgba(9, 10, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00f2fe';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative h-52 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg border border-cyan-500/20 bg-black/60 px-4 py-2 font-mono text-xs text-cyan-300 backdrop-blur-sm">
            &gt; matrix.init() — systems online
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Matrix-style letters behind terminal content (canvas 2D)</p>
    </div>
  );
};

export default LetterGlitch;