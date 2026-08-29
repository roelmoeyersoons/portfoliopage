import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence: string;
  className?: string;
  focusColor?: string;
  borderColor?: string;
  glowColor?: string;
  manualIndex?: number;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  className = '',
  focusColor = '#00f2fe',
  borderColor = 'rgba(0, 242, 254, 0.6)',
  glowColor = 'rgba(0, 242, 254, 0.25)',
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rect, setRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length, isHovered]);

  useEffect(() => {
    const targetElement = wordRefs.current[currentIndex];
    if (targetElement) {
      setRect({
        left: targetElement.offsetLeft,
        top: targetElement.offsetTop,
        width: targetElement.offsetWidth,
        height: targetElement.offsetHeight,
      });
    }
  }, [currentIndex, sentence]);

  return (
    <div className={`relative inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, idx) => {
        const isFocused = currentIndex === idx;
        return (
          <span
            key={idx}
            ref={(el) => (wordRefs.current[idx] = el)}
            onMouseEnter={() => {
              setIsHovered(true);
              setCurrentIndex(idx);
            }}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative z-10 cursor-pointer px-1 py-0.5 text-inherit transition-all duration-300 ${
              isFocused ? 'font-bold text-white' : 'opacity-70 hover:opacity-100'
            }`}
          >
            {word}
          </span>
        );
      })}

      {rect && (
        <motion.div
          className="pointer-events-none absolute z-0 rounded-lg"
          initial={false}
          animate={{
            x: rect.left - 4,
            y: rect.top - 2,
            width: rect.width + 8,
            height: rect.height + 4,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          style={{
            border: `1.5px solid ${borderColor}`,
            boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px ${glowColor}`,
            background: 'rgba(0, 242, 254, 0.05)',
          }}
        >
          {/* Corner accents */}
          <span
            className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2"
            style={{ borderColor: focusColor }}
          />
          <span
            className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2"
            style={{ borderColor: focusColor }}
          />
          <span
            className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2"
            style={{ borderColor: focusColor }}
          />
          <span
            className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2"
            style={{ borderColor: focusColor }}
          />
        </motion.div>
      )}
    </div>
  );
};
