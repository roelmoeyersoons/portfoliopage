import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface NoiseProps {
  className?: string;
  opacity?: number;
}

const Noise: React.FC<NoiseProps> = ({ className, opacity = 0.06 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 160;
    const h = 160;
    canvas.width = w;
    canvas.height = h;

    const render = () => {
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.floor(Math.random() * 255);
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    render();
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-100">
        <div className="px-10 py-8 text-center">
          <p className="text-lg font-bold text-white">Film Grain Overlay</p>
          <p className="mt-2 text-sm text-slate-400">
            A static TV-static texture on top of content adds a raw, cinematic feel.
          </p>
        </div>
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
          style={{ opacity }}
        />
      </div>
      <p className="text-xs text-slate-500">Noise overlay with blend mode — adjust opacity in code</p>
    </div>
  );
};

export default Noise;