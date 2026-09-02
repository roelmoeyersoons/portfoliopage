import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface ScrollStackProps {
  className?: string;
}

const cards = [
  { title: 'Gneiss Systems', period: '2023 — Now', desc: 'Consulting & architecture', color: 'from-cyan-500/15 to-blue-500/15' },
  { title: 'UGent IDLab', period: '2019 — 2020', desc: 'Multi-radio MAC thesis', color: 'from-purple-500/15 to-pink-500/15' },
  { title: 'Full-Stack Dev', period: '2020 — 2023', desc: 'React microservices', color: 'from-emerald-500/15 to-cyan-500/15' },
  { title: 'Graphics Hacker', period: '2021 — 2023', desc: 'OpenGL & GLSL', color: 'from-amber-500/15 to-red-500/15' },
];

/** Framer-powered ScrollStack — cards overlay as you scroll the demo strip */
const ScrollStack: React.FC<ScrollStackProps> = ({ className }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.5'],
  });

  // Precompute per-card transforms (stable array → safe outside .map)
  const layers = cards.map((card, i) => ({
    card,
    y: useTransform(scrollYProgress, [0, 1], [i * 28, i * 12]),
    scale: useTransform(scrollYProgress, [0, 1], [1 - i * 0.04, 1 - i * 0.02]),
  }));

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <p className="text-sm text-slate-500">Scroll down — cards stack with parallax layering</p>
      <div
        ref={containerRef}
        className="relative h-[420px] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-surface-200/60 scroll-smooth"
      >
        <div className="relative h-[680px] p-4">
          {layers.map(({ card, y, scale }) => (
            <motion.div
              key={card.title}
              style={{ y, scale }}
              className={`absolute left-1/2 top-0 w-[85%] -translate-x-1/2 rounded-xl border border-white/10 bg-gradient-to-br ${card.color} bg-surface-100 p-4 backdrop-blur-sm`}
            >
              <p className="text-[10px] font-semibold text-slate-500">{card.period}</p>
              <h4 className="mt-1 text-sm font-bold text-white">{card.title}</h4>
              <p className="mt-0.5 text-xs text-slate-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">Framer re-implementation (no gsap)</p>
    </div>
  );
};

export default ScrollStack;