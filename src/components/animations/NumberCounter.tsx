
import { useState, useEffect, useRef } from 'react';

interface NumberCounterProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easingFn?: (t: number) => number;
}

/**
 * A component that animates counting from 0 to a target number
 * with a smooth easing effect that starts fast and slows down.
 */
const NumberCounter = ({
  end,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  easingFn = (t) => 1 - Math.pow(1 - t, 3) // Default cubic ease-out
}: NumberCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isMounted = useRef(true);

  // Format number with commas and decimals
  const formatNumber = (value: number): string => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  useEffect(() => {
    // Animation function using requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      
      // Calculate the current value based on progress
      const currentValue = Math.floor(easedProgress * end);
      
      setDisplayValue(currentValue);
      
      // Continue animation until we reach the end
      if (progress < 1 && isMounted.current) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        // Ensure we land exactly on the target number
        setDisplayValue(end);
      }
    };
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      isMounted.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [end, duration, easingFn]);
  
  // Adding specific class for number animation
  return (
    <span className={`number-counter ${className}`}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};

export default NumberCounter;
