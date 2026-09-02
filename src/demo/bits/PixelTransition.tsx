import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/demo/helpers';

interface PixelTransitionProps {
  className?: string;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  const draw = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw source gradient (represents the "project thumbnail")
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#00f2fe');
    grad.addColorStop(0.5, '#4facfe');
    grad.addColorStop(1, '#7928ca');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(9,10,15,0.7)';
    ctx.font = 'bold 22px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OpenGL', w / 2, h / 2 - 4);
    ctx.fillText('Mandelbrot', w / 2, h / 2 + 24);

    // Pixel-dissolve: reveal by drawing random pixels of target (dark + text) as progress grows
    const cell = 6;
    for (let y = 0; y < h; y += cell) {
      for (let x = 0; x < w; x += cell) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + (progress * 300)) * 43758.5453;
        const rnd = Math.abs(n % 1);
        if (rnd < progress) {
          ctx.fillStyle = 'rgba(9,10,15,1)';
          ctx.fillRect(x, y, cell, cell);
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.08)';
          ctx.fillRect(x, y, cell, cell);
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 360;
    canvas.height = 200;

    let anim: number;
    let start = performance.now();
    const duration = 500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = hovered ? 1 - (1 - t) * (1 - t) : t * t;
      draw(eased);
      if (t < 1) {
        anim = requestAnimationFrame(tick);
      }
    };
    // Reset when hover state flips
    start = performance.now();
    anim = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim);
  }, [hovered, draw]);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-lg"
      >
        <canvas
          ref={canvasRef}
          style={{ width: 360, height: 200, imageRendering: 'pixelated' }}
        />
      </div>
      <p className="text-xs text-slate-500">Hover to pixel-dissolve between states</p>
    </div>
  );
};

export default PixelTransition;