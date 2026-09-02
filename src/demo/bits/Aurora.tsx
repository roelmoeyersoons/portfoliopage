import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface AuroraProps {
  className?: string;
}

/** Canvas 2D flowing aurora — layered drifting sine gradients */
const Aurora: React.FC<AuroraProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let w = 0;
    let h = 0;
    let t = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    const render = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      const bands = [
        { hue: 190, amp: 26, freq: 0.011, base: 0.35, alpha: 0.5 },
        { hue: 260, amp: 30, freq: 0.008, base: 0.55, alpha: 0.4 },
        { hue: 320, amp: 22, freq: 0.014, base: 0.75, alpha: 0.35 },
      ];

      bands.forEach((band) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const y = h * band.base + Math.sin(x * band.freq + t * 1.6) * band.amp + Math.sin(x * band.freq * 2.3 - t) * band.amp * 0.4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = `hsla(${band.hue}, 90%, 55%, ${band.alpha})`;
        ctx.fill();
      });

      // Soften with vertical fade
      const fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, 'rgba(9,10,15,0)');
      fade.addColorStop(1, 'rgba(9,10,15,0.9)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);

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
      <div className="relative h-52 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-surface-200/60">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            Flowing aurora backdrop
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500">Drifting aurora gradient bands (canvas 2D)</p>
    </div>
  );
};

export default Aurora;