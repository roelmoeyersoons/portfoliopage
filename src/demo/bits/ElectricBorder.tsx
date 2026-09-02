import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/demo/helpers';

interface ElectricBorderProps {
  className?: string;
}

interface Bolt {
  y: number;
  x: number;
  length: number;
  width: number;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 320;
    const h = 180;
    canvas.width = w;
    canvas.height = h;

    let raf = 0;
    let bolts: Bolt[] = [];
    let frame = 0;

    // Random walk generator for one jittery bolt segment
    const generateBolt = (edge: number): Bolt => {
      // edge: 0 top, 1 right, 2 bottom, 3 left
      const maxLen = edge % 2 === 0 ? w : h;
      return {
        y: edge === 2 ? h - 1 : 0,
        x: Math.random() * w,
        length: Math.random() * 80 + 60,
        width: Math.random() * 2 + 1,
      };
    };

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Only draw when hovering
      if (active) {
        if (frame % 6 === 0) {
          // spawn new bolts on hover edges
          bolts = [
            generateBolt(0),
            generateBolt(0),
            generateBolt(0),
            generateBolt(2),
            generateBolt(2),
            generateBolt(2),
          ];
        }

        ctx.save();
        bolts.forEach((bolt) => {
          ctx.strokeStyle = 'rgba(0,242,254,0.9)';
          ctx.lineWidth = bolt.width;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(bolt.x, bolt.y);
          // Random walk down the bolt length with jitter
          let px = bolt.x;
          let py = bolt.y;
          const segments = 14;
          for (let s = 0; s < segments; s++) {
            px += (Math.random() - 0.5) * 18;
            py += (bolt.y === 0 ? 1 : -1) * (bolt.length / segments) + (Math.random() - 0.5) * 8;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
        });
        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-100"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          style={{ width: 320, height: 180, opacity: 0.9 }}
        />
        <div className="pointer-events-none flex h-44 w-80 items-center justify-center">
          <span className="text-sm text-slate-300">Hover for electric energy</span>
        </div>
      </div>
      <p className="text-xs text-slate-500">Jittery electric bolts on the border when hovered</p>
    </div>
  );
};

export default ElectricBorder;