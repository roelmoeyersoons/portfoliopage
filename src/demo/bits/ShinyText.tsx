import React from 'react';
import { cn } from '@/demo/helpers';

interface ShinyTextProps {
  className?: string;
}

const skills = ['TypeScript', 'React', 'C/C++', 'Distributed Systems', 'OpenGL', 'Docker'];

const ShinyText: React.FC<ShinyTextProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="relative overflow-hidden rounded-full border border-white/10 bg-surface-100 px-4 py-2 text-sm font-medium text-slate-300"
          >
            <span
              className="relative z-10"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(0,242,254,0.8) 50%, rgba(255,255,255,0) 70%)',
                backgroundSize: '200% 100%',
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shiny-sweep 2.5s linear infinite',
              }}
            >
              {skill}
            </span>
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-500">Metallic sheen sweeping across skill tags</p>
    </div>
  );
};

export default ShinyText;
