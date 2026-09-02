import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface SplashCursorProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
}

/**
 * Canvas 2D liquid-splash effect: particles are emitted at the cursor
 * and dampen out over time, forming a watery trail.
 */
const SplashCursor: React.FC<SplashCursorProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    let lastEmit = 0;
    let raf = 0;
    let mouseX = -100;
    let mouseY = -100;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    const emit = () => {
      const now = performance.now();
      if (now - lastEmit < 30) return;
      lastEmit = now;
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.4 + 1;
        const size = Math.random() * 3 + 2;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 2,
          y: mouseY + (Math.random() - 0.5) * 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          age: 0,
          maxAge: 55 + Math.random() * 40,
          size,
        });
      }
      if (particles.length > 400) particles.splice(0, particles.length - 400);
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      emit();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy = p.vy * 0.97 + 0.03; // slight gravity

        if (p.age > p.maxAge) {
          particles.splice(i, 1);
          continue;
        }
        const life = 1 - p.age / p.maxAge;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * life * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${life * 0.25})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * life * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${life * 0.5})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <p className="text-sm text-slate-500">Move your cursor over the liquid surface</p>
      <canvas
        ref={canvasRef}
        className="h-56 w-full max-w-xl cursor-crosshair rounded-2xl border border-white/10 bg-surface-200/60"
      />
    </div>
  );
};

export default SplashCursor;