/**
 * Bento Galaxy — GooeyTabs.
 *
 * The bento structure's controlled fork of the ReactBits GooeyNav:
 *   - controlled: activeId comes from the parent, onSelect(id) reports
 *     clicks so it can drive the 6 top tabs,
 *   - real <button> elements (keyboard + focus rings for free),
 *   - re-positioning on font-load and container resize,
 *   - re-coloured to the indigo/violet/cyan observatory palette.
 *
 * The gooey mechanics are unchanged: a blurred + contrast-boosted "filter"
 * layer merges an expanding white pill with orbiting colour blobs, while a
 * duplicate text layer flips to the active colour in sync.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/sites/shared/cn';
import './gooey.css';

export interface GooeyTabItem {
  id: string;
  label: string;
}

interface GooeyTabsProps {
  items: GooeyTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  /** indices into the --color-1..4 palette vars */
  colors?: number[];
}

const GooeyTabs: React.FC<GooeyTabsProps> = ({
  items,
  activeId,
  onSelect,
  className,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 4, 2, 3, 1, 4],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.id === activeId)
  );

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty('--time', `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const rotate0 = noise(r / 10);
        const start = getXY(d[0], particleCount - i, particleCount);
        const end = getXY(d[1] + noise(7), particleCount - i, particleCount);
        const scale = 1 + noise(0.2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotate = rotate0 > 0 ? (rotate0 + r / 20) * 10 : (rotate0 - r / 20) * 10;

        element.classList.remove('active');

        window.setTimeout(() => {
          const particle = document.createElement('span');
          const point = document.createElement('span');
          particle.className = 'particle';
          particle.style.setProperty('--start-x', `${start[0]}px`);
          particle.style.setProperty('--start-y', `${start[1]}px`);
          particle.style.setProperty('--end-x', `${end[0]}px`);
          particle.style.setProperty('--end-y', `${end[1]}px`);
          particle.style.setProperty('--time', `${t}ms`);
          particle.style.setProperty('--scale', `${scale}`);
          particle.style.setProperty('--color', `var(--color-${color}, white)`);
          particle.style.setProperty('--rotate', `${rotate}deg`);

          point.className = 'point';
          particle.appendChild(point);
          element.appendChild(particle);
          requestAnimationFrame(() => {
            element.classList.add('active');
          });
          window.setTimeout(() => {
            try {
              element.removeChild(particle);
            } catch {
              /* already gone */
            }
          }, t);
        }, 30);
      }
    },
    [animationTime, colors, particleCount, particleDistances, particleR, timeVariance]
  );

  /** Fire the gooey burst + pill flip for a switch to index. */
  const runTransition = useCallback(
    (liEl: HTMLElement) => {
      updateEffectPosition(liEl);

      if (filterRef.current) {
        filterRef.current.querySelectorAll('.particle').forEach((p) => filterRef.current?.removeChild(p));
        makeParticles(filterRef.current);
      }

      if (textRef.current) {
        textRef.current.classList.remove('active');
        void textRef.current.offsetWidth; // restart the colour flip
        textRef.current.classList.add('active');
      }
    },
    [makeParticles, updateEffectPosition]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const liEl = e.currentTarget.closest('li');
    if (!liEl || index === activeIndex) return;
    onSelect(items[index].id);
    runTransition(liEl);
  };

  // Keep the gooey layers glued to the active tab: on mount, on external
  // activeId changes, after webfont load, and while the container resizes.
  useEffect(() => {
    const nav = navRef.current;
    const container = containerRef.current;
    if (!nav || !container) return;

    const li = nav.querySelectorAll('li')[activeIndex];
    if (li) {
      updateEffectPosition(li as HTMLElement);
      textRef.current?.classList.add('active');
    }

    const ro = new ResizeObserver(() => {
      const current = navRef.current?.querySelectorAll('li')[activeIndex];
      if (current) updateEffectPosition(current as HTMLElement);
    });
    ro.observe(container);

    document.fonts?.ready.then(() => {
      const current = navRef.current?.querySelectorAll('li')[activeIndex];
      if (current) updateEffectPosition(current as HTMLElement);
    });

    return () => ro.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <div className="gx-gooey-surface">
      <div className="gx-gooey-scroll">
        <div className={cn('gx-gooey', className)} ref={containerRef}>
          <nav>
            <ul ref={navRef} role="tablist" aria-label="Site sections">
              {items.map((item, index) => (
                <li key={item.id} className={activeIndex === index ? 'active' : ''}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    onClick={(e) => handleClick(e, index)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <span className="effect filter" ref={filterRef} aria-hidden="true" />
          <span className="effect text" ref={textRef} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default GooeyTabs;
