import React, { useEffect, useState } from 'react';
import { cn } from '@/demo/helpers';

interface TextLoopProps {
  className?: string;
}

const items = [
  'Distributed Systems',
  'React Architecture',
  'Embedded Protocols',
  'GPU Computing',
  'Systems Engineering',
];

const ROW_HEIGHT = 40;

const TextLoop: React.FC<TextLoopProps> = ({ className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <p className="text-sm text-slate-500">Marquee alternative — text loop</p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-100 px-6 py-3">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${index * ROW_HEIGHT}px)` }}
        >
          {items.map((item, i) => (
            <p key={i} className="flex h-10 items-center text-lg font-medium text-cyan-300">
              {item}
            </p>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">Compare vs. the InfiniteScrollMarquee on the live page</p>
    </div>
  );
};

export default TextLoop;