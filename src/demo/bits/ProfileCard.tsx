import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { cn } from '@/demo/helpers';

interface ProfileCardProps {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setGlare({ x: px * 100, y: py * 100, opacity: 1 });
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlare((g) => ({ ...g, opacity: 0 }));
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative h-64 w-60 overflow-hidden rounded-2xl border border-white/10 bg-surface-100"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glare layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.14), transparent 50%)`,
          }}
        />
        {/* Avatar */}
        <div className="flex justify-center pt-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-2xl font-black text-black">
            RM
          </div>
        </div>
        {/* Info */}
        <div className="px-5 text-center" style={{ transform: 'translateZ(24px)' }}>
          <h3 className="mt-3 text-sm font-bold text-white">Roel Moeyersoons</h3>
          <p className="text-xs text-cyan-300">Software & Systems Engineer</p>
          <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-500">
            <MapPin className="h-3 w-3" /> Ghent, Belgium
          </p>
          <div className="mt-2 flex justify-center gap-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="rounded-full bg-white/5 p-1.5 text-slate-400 transition hover:text-cyan-300">
              <Github className="h-3.5 w-3.5" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="rounded-full bg-white/5 p-1.5 text-slate-400 transition hover:text-cyan-300">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="rounded-full bg-white/5 p-1.5 text-slate-400 transition hover:text-cyan-300">
              <Mail className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
      <p className="text-xs text-slate-500">Glare + 3D tilt profile card</p>
    </div>
  );
};

export default ProfileCard;