import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface DotGridProps {
  className?: string;
}

/** Canvas 2D dot grid — dots brighten near the cursor */
const DotGrid: React.FC<DotGridProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const SPACING = 26;
    let cols = 0;
    let rows = 0;
    let dots: number[][] = [];
    let mouseX = -999;
    let mouseY = -999;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.floor(rect.width / SPACING) + 1;
      rows = Math.floor(rect.height / SPACING) + 1;
      dots = Array.from({ length: cols }, () => Array(rows).fill(0));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -999;
      mouseY = -999;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * SPACING + SPACING / 2;
          const py = y * SPACING + SPACING / 2;
          const dist = Math.hypot(px - mouseX, py - mouseY);
          // Ease intensity toward target
          const target = dist < 120 ? Math.max(0, 1 - dist / 120) : 0;
          dots[x][y] += (target - dots[x][y]) * 0.1;

          const r = 1.6 + dots[x][y] * 2.4;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 242, 254, ${0.25 + dots[x][y] * 0.75})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative h-52 w-full max-w-xl cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-surface-200/60">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      <p className="text-xs text-slate-500">Interactive dot grid — move your cursor (canvas 2D)</p>
    </div>
  );
};

export default DotGrid;