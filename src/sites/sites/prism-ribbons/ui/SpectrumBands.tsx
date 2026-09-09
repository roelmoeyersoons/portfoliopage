/**
 * Prism Ribbons — SpectrumBands ("Spectrum Bands" project deck).
 *
 * Local fork of the shared FlowingMenu bit: keeps the signature hover
 * image-marquee reveal, but every band is a real button with selection state
 * (onSelect), a mono index, the category pinned right, and a prism-gradient
 * treatment on the active band. Used by tabs/Projects.tsx.
 */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '@/sites/shared/bits/FlowingMenu.css';
import { PRISM, artDataUri } from '../ui';
import type { ProjectEntry } from '@/sites/shared/content';

interface SpectrumBandsProps {
  projects: ProjectEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const ANIMATION_DEFAULTS = { duration: 0.6, ease: 'expo' as const };
const ROW_HEIGHT = 'clamp(72px, 11vh, 104px)';

function findClosestEdge(mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' {
  const topDist = distMetric(mouseX, mouseY, width / 2, 0);
  const bottomDist = distMetric(mouseX, mouseY, width / 2, height);
  return topDist < bottomDist ? 'top' : 'bottom';
}

function distMetric(x: number, y: number, x2: number, y2: number): number {
  const dx = x - x2;
  const dy = y - y2;
  return dx * dx + dy * dy;
}

const Band: React.FC<{
  project: ProjectEntry;
  index: number;
  active: boolean;
  onSelect: (id: string) => void;
}> = ({ project, index, active, onSelect }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeInnerRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const image = artDataUri(project.art, project.id, 900, 600);

  // Keep enough marquee copies on screen for a seamless loop (as FlowingMenu).
  useEffect(() => {
    const calculateRepetitions = () => {
      const inner = marqueeInnerRef.current;
      if (!inner) return;
      const part = inner.querySelector('.marquee__part') as HTMLElement | null;
      if (!part || part.offsetWidth === 0) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const inner = marqueeInnerRef.current;
      if (!inner) return;
      const part = inner.querySelector('.marquee__part') as HTMLElement | null;
      if (!part || part.offsetWidth === 0) return;
      tweenRef.current?.kill();
      tweenRef.current = gsap.to(inner, {
        x: -part.offsetWidth,
        duration: 14,
        ease: 'none',
        repeat: -1,
      });
    }, 60);
    return () => {
      clearTimeout(timer);
      tweenRef.current?.kill();
    };
  }, [repetitions]);

  const handleEnter = (ev: React.MouseEvent) => {
    const item = itemRef.current;
    const marquee = marqueeRef.current;
    const inner = marqueeInnerRef.current;
    if (!item || !marquee || !inner) return;
    const rect = item.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: ANIMATION_DEFAULTS })
      .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marquee, inner], { y: '0%' }, 0);
  };

  const handleLeave = (ev: React.MouseEvent) => {
    const item = itemRef.current;
    const marquee = marqueeRef.current;
    const inner = marqueeInnerRef.current;
    if (!item || !marquee || !inner) return;
    const rect = item.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: ANIMATION_DEFAULTS })
      .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div
      ref={itemRef}
      className="menu__item"
      style={{ borderColor: 'rgba(148,163,184,0.16)', height: ROW_HEIGHT }}
    >
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-pressed={active}
        className="menu__item-link w-full !justify-start gap-4 px-5 text-left sm:gap-5 sm:px-8"
        style={{ textTransform: 'none', color: '#e2e8f0', fontSize: 'clamp(1.15rem, 3vh, 1.85rem)' }}
      >
        {active && (
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{ backgroundImage: PRISM }}
          />
        )}
        <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="min-w-0 truncate font-serif font-medium tracking-tight"
          style={
            active
              ? { backgroundImage: PRISM, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }
              : undefined
          }
        >
          {project.title}
        </span>
        <span className="ml-auto hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:block">
          {project.category}
        </span>
      </button>

      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: '#f8fafc' }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: '#0b0e17' }}>
                <span style={{ textTransform: 'none', fontSize: 'clamp(1rem, 2.4vh, 1.5rem)' }}>
                  {project.title}
                </span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
                <span
                  className="font-mono"
                  style={{ textTransform: 'none', fontSize: 'clamp(0.8rem, 2vh, 1.1rem)' }}
                >
                  {project.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SpectrumBands: React.FC<SpectrumBandsProps> = ({ projects, selectedId, onSelect }) => (
  <div className="menu-wrap w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
    <nav className="menu" aria-label="Project spectrum bands">
      {projects.map((p, i) => (
        <Band
          key={p.id}
          project={p}
          index={i}
          active={p.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </nav>
  </div>
);

export default SpectrumBands;
