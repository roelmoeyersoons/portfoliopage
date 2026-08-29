import React from 'react';

interface InfiniteScrollMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  itemClassName?: string;
  iconRenderer?: (item: string) => React.ReactNode;
}

export const InfiniteScrollMarquee: React.FC<InfiniteScrollMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 'medium',
  className = '',
  itemClassName = '',
  iconRenderer,
}) => {
  const speedClass =
    speed === 'slow'
      ? direction === 'left' ? 'animate-[marquee_45s_linear_infinite]' : 'animate-[marquee-reverse_45s_linear_infinite]'
      : speed === 'fast'
      ? direction === 'left' ? 'animate-[marquee_18s_linear_infinite]' : 'animate-[marquee-reverse_18s_linear_infinite]'
      : direction === 'left' ? 'animate-[marquee_28s_linear_infinite]' : 'animate-[marquee-reverse_28s_linear_infinite]';

  // Duplicate items 4 times to ensure seamless infinite looping on ultra-wide screens
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] ${className}`}>
      <div className={`flex shrink-0 items-center gap-4 py-3 ${speedClass} hover:[animation-play-state:paused]`}>
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 rounded-full border border-white/10 bg-surface-100/80 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-surface-50 hover:text-white ${itemClassName}`}
          >
            {iconRenderer && iconRenderer(item)}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
