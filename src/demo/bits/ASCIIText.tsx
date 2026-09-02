import React, { useEffect, useRef } from 'react';
import { cn } from '@/demo/helpers';

interface ASCIITextProps {
  className?: string;
}

const chars = '@%#*+=-:.░▒▓█';

const ASCIIText: React.FC<ASCIITextProps> = ({ className }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const cols = 50;
    const rows = 12;
    let frame = 0;

    const render = () => {
      frame++;
      let output = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const noise = Math.sin(r * 12.9898 + c * 78.233 + frame * 0.05) * 43758.5453;
          const idx = Math.floor(Math.abs(noise % 1) * chars.length);
          output += chars[idx];
        }
        output += '\n';
      }
      pre.textContent = output;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <p className="text-xs text-slate-500">Retro ASCII noise background</p>
      <pre
        ref={preRef}
        className="select-none rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-[8px] leading-[10px] text-cyan-500/60"
        style={{ width: 400, height: 140 }}
      />
    </div>
  );
};

export default ASCIIText;
