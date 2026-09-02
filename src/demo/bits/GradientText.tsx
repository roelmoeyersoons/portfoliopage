import React from 'react';
import { cn } from '@/demo/helpers';

interface GradientTextProps {
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-5xl font-black text-transparent animate-gradient-x">
        Roel Moeyersoons
      </h1>
      <p className="text-sm text-slate-500">Animated gradient flowing across the headline</p>
    </div>
  );
};

export default GradientText;
