import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface GridMotionProps {
  className?: string;
}

/** Canvas 2D wall of squares — cells shift away from the cursor */
const GridMotion: React.FC<GridMotionProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const CELL = 40;
    let cols = 0;
    let rows = 0;
    let mouseX = -999;
    let mouseY = -999;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.floor(rect.width / CELL);
      rows = Math.floor(rect.height / CELL);
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
      const radius = 150;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const cx = x * CELL + CELL / 2;
          const cy = y * CELL + CELL / 2;
          const dist = Math.hypot(cx - mouseX, cy - mouseY);

          let dx = 0;
          let dy = 0;
          if (dist < radius) {
            const strength = (1 - dist / radius) * 14;
            dx = ((cx - mouseX) / (dist || 1)) * strength;
            dy = ((cy - mouseY) / (dist || 1)) * strength;
          }

          // subtle hue shift with distance
          const hue = (cx / canvas.width) * 40 + 170;
          ctx.fillStyle = `hsla(${hue}, 95%, 60%, 0.5)`;
          ctx.fillRect(cx - CELL / 2 + 2 + dx, cy - CELL / 2 + 2 + dy, CELL - 4, CELL - 4);
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
      <p className="text-xs text-slate-500">Mouse-displaced wall of squares (canvas 2D)</p>
    </div>
  );
};

export default GridMotion;