import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/demo/helpers';

interface TextTypeProps {
  className?: string;
}

const bootLines = [
  '[BOOT] Initializing kernel scheduler... OK',
  '[BOOT] Mounting protocol stacks... OK',
  '[BOOT] Establishing secure channel... OK',
  '[SYSTEM] Ready. Welcome, Roel.',
];

const TextType: React.FC<TextTypeProps> = ({ className }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= bootLines.length) return;
    const line = bootLines[currentLine];
    if (charIndex < line.length) {
      const timer = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timer);
    } else {
      setVisibleLines((prev) => [...prev, line]);
      setCurrentLine((c) => c + 1);
      setCharIndex(0);
    }
  }, [currentLine, charIndex]);

  const handleReset = useCallback(() => {
    setVisibleLines([]);
    setCurrentLine(0);
    setCharIndex(0);
  }, []);

  const partiallyTyped =
    currentLine < bootLines.length
      ? bootLines[currentLine].slice(0, charIndex) + '█'
      : '';

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="w-full max-w-md rounded-xl border border-cyan-500/20 bg-black/60 p-4 font-mono text-xs">
        {visibleLines.map((line, i) => (
          <p key={i} className="text-cyan-300">
            {line}
          </p>
        ))}
        {partiallyTyped && (
          <p className="text-cyan-300">
            {partiallyTyped}
          </p>
        )}
        {currentLine >= bootLines.length && (
          <p className="mt-2 text-emerald-400">System ready. Type a command or click to restart.</p>
        )}
      </div>
      <button
        onClick={handleReset}
        className="rounded-lg border border-white/10 bg-surface-100 px-3 py-1.5 text-xs text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
      >
        ↻ Reboot
      </button>
    </div>
  );
};

export default TextType;
