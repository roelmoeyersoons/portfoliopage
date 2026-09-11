/**
 * Bento Galaxy — BentoGrid / BentoCard.
 *
 * The bento structure's signature card behaviours, unchanged from the
 * Plasma Bento fork of the ReactBits MagicBento pattern:
 *
 *  1. a page-level cursor spotlight (fixed radial glow following the mouse,
 *     waking each card's border/face glow as it approaches),
 *  2. a subtle gsap tilt on hover (perspective rotate toward the cursor),
 *  3. a click particle burst (radial ripple + drifting spark dots).
 *
 * Every card carries its own --glow-color ("R, G, B") so indigo, violet and
 * cyan cards can coexist inside one grid. Re-skinned to the deep-space
 * palette in bento.css.
 */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/sites/shared/cn';
import './bento.css';

const SPOTLIGHT_RADIUS = 320;
const TILT_MAX = 6; // degrees — "slight" tilt

/** Full effect only for fine pointers, wide viewports, and no reduced-motion. */
function useFxEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced && window.innerWidth > 768);
  }, []);
  return enabled;
}

const makeSpark = (x: number, y: number, glow: string) => {
  const el = document.createElement('div');
  el.className = 'gx-spark';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty('--glow-color', glow);
  return el;
};

// ── Cursor spotlight over the whole grid ─────────────────────────
const Spotlight: React.FC<{
  sectionRef: React.RefObject<HTMLDivElement | null>;
  glowColor: string;
  radius: number;
  disabled: boolean;
}> = ({ sectionRef, glowColor, radius, disabled }) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (disabled || !section) return;

    const el = document.createElement('div');
    el.className = 'gx-spotlight';
    el.style.background = `radial-gradient(circle,
      rgba(${glowColor}, 0.15) 0%,
      rgba(${glowColor}, 0.08) 18%,
      rgba(${glowColor}, 0.04) 32%,
      rgba(${glowColor}, 0.015) 55%,
      transparent 72%)`;
    document.body.appendChild(el);

    const proximity = radius * 0.5;
    const fade = radius * 0.75;

    const zeroCards = () => {
      section.querySelectorAll<HTMLElement>('.gx-bento-card').forEach((card) => {
        card.style.setProperty('--glow-intensity', '0');
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!inside) {
        zeroCards();
        gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        return;
      }

      let minDistance = Infinity;
      section.querySelectorAll<HTMLElement>('.gx-bento-card').forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const distance = Math.max(
          0,
          Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2
        );
        minDistance = Math.min(minDistance, distance);

        const intensity = distance <= proximity ? 1 : distance <= fade ? (fade - distance) / (fade - proximity) : 0;
        card.style.setProperty('--glow-x', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--glow-y', `${((e.clientY - r.top) / r.height) * 100}%`);
        card.style.setProperty('--glow-intensity', intensity.toFixed(3));
      });

      gsap.to(el, { left: e.clientX, top: e.clientY, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });
      const target =
        minDistance <= proximity ? 0.8 : minDistance <= fade ? ((fade - minDistance) / (fade - proximity)) * 0.8 : 0;
      gsap.to(el, { opacity: target, duration: target > 0 ? 0.2 : 0.5, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      zeroCards();
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      el.parentNode?.removeChild(el);
    };
  }, [sectionRef, glowColor, radius, disabled]);

  return null;
};

// ── Grid wrapper ─────────────────────────────────────────────────
export const BentoGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** "R, G, B" — colour of the roaming spotlight */
  glowColor?: string;
  spotlightRadius?: number;
}> = ({ children, className, glowColor = '129, 140, 248', spotlightRadius = SPOTLIGHT_RADIUS }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fxEnabled = useFxEnabled();

  return (
    <div ref={sectionRef} className={cn('gx-bento-section', className)}>
      <Spotlight sectionRef={sectionRef} glowColor={glowColor} radius={spotlightRadius} disabled={!fxEnabled} />
      {children}
    </div>
  );
};

// ── Card ─────────────────────────────────────────────────────────
export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  /** "R, G, B" triplet driving every glow on this card */
  glowColor?: string;
  /** gsap perspective tilt following the cursor (default true) */
  tilt?: boolean;
  /** radial ripple burst on click (default true) */
  clickBurst?: boolean;
  /** drifting spark dots while hovered (default true) */
  sparks?: boolean;
  sparkCount?: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  glowColor = '129, 140, 248',
  tilt = true,
  clickBurst = true,
  sparks = true,
  sparkCount = 10,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const fxEnabled = useFxEnabled();
  const hoveredRef = useRef(false);
  const liveSparksRef = useRef<HTMLDivElement[]>([]);
  const sparkTimersRef = useRef<number[]>([]);
  const seededSparksRef = useRef<HTMLDivElement[] | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fxEnabled) return;

    const seedSparks = () => {
      if (seededSparksRef.current) return;
      const { width, height } = el.getBoundingClientRect();
      seededSparksRef.current = Array.from({ length: sparkCount }, () =>
        makeSpark(Math.random() * width, Math.random() * height, glowColor)
      );
    };

    const spawnSparks = () => {
      if (!hoveredRef.current) return;
      seedSparks();
      seededSparksRef.current?.forEach((spark, i) => {
        const timer = window.setTimeout(() => {
          if (!hoveredRef.current || !ref.current) return;
          const clone = spark.cloneNode(true) as HTMLDivElement;
          ref.current.appendChild(clone);
          liveSparksRef.current.push(clone);

          gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
          gsap.to(clone, {
            x: (Math.random() - 0.5) * 110,
            y: (Math.random() - 0.5) * 110,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          });
          gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
        }, i * 110);
        sparkTimersRef.current.push(timer);
      });
    };

    const handleEnter = () => {
      hoveredRef.current = true;
      if (sparks) spawnSparks();
      if (tilt) {
        gsap.to(el, { y: -3, duration: 0.3, ease: 'power2.out', transformPerspective: 1000, overwrite: 'auto' });
      }
    };

    const handleLeave = () => {
      hoveredRef.current = false;
      sparkTimersRef.current.forEach((t) => window.clearTimeout(t));
      sparkTimersRef.current = [];
      liveSparksRef.current.forEach((spark) => {
        gsap.to(spark, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'back.in(1.7)',
          overwrite: 'auto',
          onComplete: () => spark.parentNode?.removeChild(spark),
        });
      });
      liveSparksRef.current = [];

      if (tilt) {
        gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      }
    };

    const handleMove = (e: MouseEvent) => {
      if (!tilt) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -TILT_MAX;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * TILT_MAX;
      gsap.to(el, { rotateX, rotateY, duration: 0.35, ease: 'power2.out', transformPerspective: 1000, overwrite: 'auto' });
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickBurst) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.className = 'gx-ripple';
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      ripple.style.setProperty('--glow-color', glowColor);
      el.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('click', handleClick);
    return () => {
      hoveredRef.current = false;
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('click', handleClick);
      sparkTimersRef.current.forEach((t) => window.clearTimeout(t));
      sparkTimersRef.current = [];
      liveSparksRef.current.forEach((spark) => spark.remove());
      liveSparksRef.current = [];
      seededSparksRef.current = null;
    };
  }, [clickBurst, glowColor, sparkCount, sparks, tilt]);

  return (
    <div
      ref={ref}
      className={cn('gx-bento-card', className)}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
