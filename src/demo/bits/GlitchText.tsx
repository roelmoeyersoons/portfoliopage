import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface GlitchTextProps {
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ className }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    // Auto-glitch periodically when not hovered
    const auto = setInterval(() => {
      if (!isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 4000);
    return () => clearInterval(auto);
  }, [isGlitching]);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className="relative cursor-pointer select-none"
        onMouseEnter={() => setIsGlitching(true)}
        onMouseLeave={() => setIsGlitching(false)}
      >
        {/* Main text */}
        <h2
          className={`relative text-4xl font-bold text-white transition-all duration-75 ${
            isGlitching ? 'opacity-90' : ''
          }`}
        >
          Distributed Systems
        </h2>

        {/* Glitch layers */}
        {isGlitching && (
          <>
            <span
              className="absolute inset-0 text-4xl font-bold text-cyan-400"
              style={{
                clipPath: 'inset(20% 0 40% 0)',
                transform: 'translateX(-3px)',
                animation: 'glitch-shift 0.08s infinite',
              }}
            >
              Distributed Systems
            </span>
            <span
              className="absolute inset-0 text-4xl font-bold text-pink-500"
              style={{
                clipPath: 'inset(55% 0 10% 0)',
                transform: 'translateX(3px)',
                animation: 'glitch-shift 0.06s infinite reverse',
              }}
            >
              Distributed Systems
            </span>
            <span
              className="absolute inset-0 text-4xl font-bold text-purple-500"
              style={{
                clipPath: 'inset(10% 0 70% 0)',
                transform: 'translateX(1px)',
                animation: 'glitch-shift 0.1s infinite',
              }}
            >
              Distributed Systems
            </span>
          </>
        )}
      </div>
      <p className="text-xs text-slate-500">Hover me or wait for auto-glitch</p>
    </div>
  );
};

export default GlitchText;
