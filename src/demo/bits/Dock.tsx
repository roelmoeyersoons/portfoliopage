import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderGit2, Code2, Cpu, GraduationCap, Terminal, Mail, Github, Linkedin } from 'lucide-react';
import { cn } from '@/demo/helpers';

interface DockProps {
  className?: string;
}

const icons = [
  { Icon: Home, label: 'Home' },
  { Icon: User, label: 'About' },
  { Icon: Briefcase, label: 'Experience' },
  { Icon: FolderGit2, label: 'Projects' },
  { Icon: Code2, label: 'Skills' },
  { Icon: Cpu, label: 'Systems' },
  { Icon: GraduationCap, label: 'Education' },
  { Icon: Terminal, label: 'Terminal' },
  { Icon: Mail, label: 'Contact' },
  { Icon: Github, label: 'GitHub' },
  { Icon: Linkedin, label: 'LinkedIn' },
];

const Dock: React.FC<DockProps> = ({ className }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <p className="text-sm text-slate-500">Hover icons to magnify — macOS style</p>
      <div className="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-surface-100/90 px-3 py-2.5 backdrop-blur-xl">
        {icons.map(({ Icon, label }, i) => {
          // Magnification based on proximity to hovered index
          const distance = hovered === null ? 0 : Math.abs(i - hovered);
          const scale = hovered === null ? 1 : distance === 0 ? 1.55 : distance === 1 ? 1.25 : distance === 2 ? 1.1 : 1;
          return (
            <motion.button
              key={label}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{ scale, y: hovered === null ? 0 : distance === 0 ? -6 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={cn(
                'relative flex h-11 w-11 items-center justify-center rounded-xl border transition-colors',
                active === i
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                  : 'border-white/5 bg-white/5 text-slate-400 hover:text-white'
              )}
              title={label}
            >
              <Icon className="h-5 w-5" />
              {hovered === i && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 whitespace-nowrap rounded-md border border-white/10 bg-surface-50 px-2 py-1 text-[10px] font-medium text-white"
                >
                  {label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">Section icons dock with label tooltips</p>
    </div>
  );
};

export default Dock;