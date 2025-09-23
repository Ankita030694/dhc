'use client';

import { useEffect, useRef, useState } from 'react';

interface VanishingTextProps {
  children: string;
  className?: string;
  threshold?: number; // Percentage of element visible when animation starts
  staggerDelay?: number; // Delay between each letter animation in ms
}

export default function VanishingText({ 
  children, 
  className = '', 
  threshold = 0.3, // Animation starts when 30% of text is visible
  staggerDelay = 50 
}: VanishingTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [visibilityRatio, setVisibilityRatio] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const elementHeight = rect.height;
      
      // Calculate visibility ratio (0 = not visible, 1 = fully visible)
      const ratio = elementHeight > 0 ? visibleHeight / elementHeight : 0;
      
      setVisibilityRatio(ratio);
      
      // Start animation when visibility drops below threshold
      if (ratio < threshold && ratio > 0) {
        setIsAnimating(true);
      } else if (ratio >= threshold) {
        setIsAnimating(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [threshold]);

  // Split text into letters while preserving spaces
  const letters = children.split('').map((char, index) => {
    const isSpace = char === ' ';
    
    // Calculate animation delay based on visibility ratio
    // Letters disappear from right to left as element goes out of view
    const totalLetters = children.length;
    const letterProgress = index / totalLetters;
    const animationProgress = Math.max(0, 1 - (visibilityRatio / threshold));
    
    // Determine if this letter should be animated out
    const shouldAnimate = isAnimating && letterProgress >= (1 - animationProgress);
    
    return (
      <span
        key={index}
        className={`letter ${shouldAnimate ? 'vanishing' : ''}`}
        style={{
          '--animation-delay': `${index * staggerDelay}ms`,
          '--vanish-progress': animationProgress,
        } as React.CSSProperties & { 
          '--animation-delay': string;
          '--vanish-progress': number;
        }}
      >
        {isSpace ? '\u00A0' : char}
      </span>
    );
  });

  return (
    <span ref={textRef} className={`vanishing-text ${className}`}>
      {letters}
    </span>
  );
}
