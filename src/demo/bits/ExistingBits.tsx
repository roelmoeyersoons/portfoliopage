import React, { useEffect, useRef } from 'react';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { TrueFocus } from '@/components/reactbits/TrueFocus';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { SplitText } from '@/components/reactbits/SplitText';
import { InfiniteScrollMarquee } from '@/components/reactbits/InfiniteScrollMarquee';
import { AnimatedCounter } from '@/components/reactbits/AnimatedCounter';
import { marqueeTechList } from '@/data/portfolioData';
import { cn } from '@/demo/helpers';

interface LivePreviewProps {
  children: React.ReactNode;
  className?: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ children, className }) => (
  <div className={cn('relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface-200/50 p-8', className)}>
    {/* screen dimmer so the fixed ParticlesBackground doesn't overpower */}
    <div className="pointer-events-none absolute inset-0 z-20 bg-background/60" />
    <div className="relative z-30 w-full">{children}</div>
  </div>
);

// ── Wrappers for the components already powering the live page ───

/**
 * Faithful mini-replica of the live full-screen ParticlesBackground
 * (the live component is `position: fixed` on the window, so it would
 * be hidden behind the lab's opaque surface — this demos the same effect
 * inside the preview container).
 */
export const ExistingParticles: React.FC = () => {
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
    const mouse = { x: -1000, y: -1000, radius: 90 };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 2 + 1,
    }));
    const maxDist = 110;

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < mouse.radius) {
          const force = (1 - dm / mouse.radius) * 1.5;
          p.x -= (dxm / (dm || 1)) * force;
          p.y -= (dym / (dm || 1)) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
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
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-200/60">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/50 px-2 py-1 text-[10px] text-slate-400 backdrop-blur-sm">
        Mini replica — the live page uses a full-screen fixed canvas
      </p>
    </div>
  );
};

export const ExistingDecryptedText: React.FC = () => (
  <LivePreview>
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg font-semibold text-white">
        Hover to decrypt:
      </p>
      <DecryptedText
        text="SYSTEM ACCESS GRANTED"
        className="text-xl font-bold text-white"
        speed={30}
        animateOn="hover"
        revealDirection="center"
      />
      <p className="text-xs text-slate-500">
        Scrambling characters resolve into the real text on hover.
      </p>
    </div>
  </LivePreview>
);

export const ExistingTrueFocus: React.FC = () => (
  <LivePreview>
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg font-semibold text-slate-300">Focus ring walks between words:</p>
      <TrueFocus sentence="Designing distributed low-level systems" />
      <p className="mt-2 text-xs text-slate-500">
        A glowing border box glides word-to-word — hover words to jump it manually.
      </p>
    </div>
  </LivePreview>
);

export const ExistingSpotlightCard: React.FC = () => (
  <LivePreview>
    <SpotlightCard className="w-full max-w-sm p-6 text-center">
      <h3 className="text-lg font-bold text-white">Spotlight Card</h3>
      <p className="mt-2 text-sm text-slate-400">
        Cursor spotlight + border highlight — used on the live projects grid.
      </p>
    </SpotlightCard>
  </LivePreview>
);

export const ExistingSplitText: React.FC = () => (
  <LivePreview>
    <div className="flex flex-col items-center gap-4 text-center">
      <SplitText
        text="High-performance engineering, rendered shiny"
        className="max-w-md text-2xl font-bold leading-snug text-white"
        mode="words"
      />
      <p className="text-xs text-slate-500">Blur-spring stagger reveal on view.</p>
    </div>
  </LivePreview>
);

export const ExistingMarquee: React.FC = () => (
  <LivePreview>
    <InfiniteScrollMarquee items={marqueeTechList} speed="medium" />
  </LivePreview>
);

export const ExistingCounter: React.FC = () => (
  <LivePreview>
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex gap-8">
        <div>
          <AnimatedCounter from={0} to={99.9} duration={1.8} formatter={(v) => `${v}%`} className="text-3xl font-black text-cyan-400" />
          <p className="text-xs text-slate-500">Uptime</p>
        </div>
        <div>
          <AnimatedCounter from={0} to={65} duration={1.8} formatter={(v) => `-${v}%`} className="text-3xl font-black text-emerald-400" />
          <p className="text-xs text-slate-500">Collisions</p>
        </div>
        <div>
          <AnimatedCounter from={0} to={60} duration={1.8} formatter={(v) => `${v}+`} className="text-3xl font-black text-purple-400" />
          <p className="text-xs text-slate-500">FPS</p>
        </div>
      </div>
      <p className="text-xs text-slate-600">Ease-out counted numbers on view.</p>
    </div>
  </LivePreview>
);