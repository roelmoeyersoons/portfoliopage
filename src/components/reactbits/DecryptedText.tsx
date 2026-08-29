import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'both';
  revealDirection?: 'start' | 'end' | 'center';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-cyan-400 opacity-70 font-mono',
  animateOn = 'both',
  revealDirection = 'start',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const iterationRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    iterationRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        const textLen = text.length;
        const progress = iterationRef.current / maxIterations;

        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            let shouldReveal = false;
            if (revealDirection === 'start') {
              shouldReveal = index / textLen < progress;
            } else if (revealDirection === 'end') {
              shouldReveal = (textLen - index) / textLen < progress;
            } else {
              const center = textLen / 2;
              const distFromCenter = Math.abs(index - center);
              shouldReveal = (center - distFromCenter) / center < progress;
            }

            if (shouldReveal || iterationRef.current >= maxIterations) {
              return char;
            }

            const randIndex = Math.floor(Math.random() * characters.length);
            return characters[randIndex];
          })
          .join('');
      });

      iterationRef.current += 1;

      if (iterationRef.current > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'both') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startScramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [text, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-pointer transition-colors ${parentClassName}`}
    >
      <span className={isScrambling || isHovering ? `${className} ${encryptedClassName}` : className}>
        {displayText}
      </span>
    </span>
  );
};
