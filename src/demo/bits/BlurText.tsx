import React, { useState, useEffect } from 'react';
import { cn } from '@/demo/helpers';

interface BlurTextProps {
  className?: string;
}

const bioText = `I am an engineer with a strong foundation in distributed protocols, high-concurrency architectures, and hardware-dependent software engineering.`;

const BlurText: React.FC<BlurTextProps> = ({ className }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Auto-reveal on mount
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => setRevealed((r) => !r);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <p
        onClick={handleToggle}
        className={`max-w-lg cursor-pointer text-center text-lg leading-relaxed transition-all duration-1000 ${
          revealed
            ? 'blur-none opacity-100'
            : 'blur-[6px] opacity-30'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {bioText}
      </p>
      <button
        onClick={handleToggle}
        className="rounded-lg border border-white/10 bg-surface-100 px-3 py-1.5 text-xs text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
      >
        {revealed ? '🔒 Blur' : '👁️ Reveal'}
      </button>
    </div>
  );
};

export default BlurText;
