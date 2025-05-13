
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
 * with individual digit animations for a more engaging effect.
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
  const previousDigits = useRef<string[]>([]);
  
  // Debug flag
  const [isAnimating, setIsAnimating] = useState(false);

  // Format number with commas and decimals
  const formatNumber = (value: number): string => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Convert number to array of digit characters
  const getDigitsArray = (value: number): string[] => {
    const formatted = formatNumber(value);
    return formatted.split('');
  };

  useEffect(() => {
    // Animation function using requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
        setIsAnimating(true); // Set animation flag to true when starting
      }
      
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
        setIsAnimating(false); // Animation complete
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
      setIsAnimating(false);
    };
  }, [end, duration, easingFn]);

  // Get current digits
  const digits = getDigitsArray(displayValue);
  
  // Determine which digits have changed
  const changedDigits = digits.map((digit, index) => {
    const hasChanged = !previousDigits.current[index] || previousDigits.current[index] !== digit;
    return hasChanged;
  });
  
  // Update previous digits reference
  useEffect(() => {
    previousDigits.current = digits;
  }, [digits]);
  
  return (
    <span className={`number-counter ${className} ${isAnimating ? 'is-animating' : ''}`}>
      {prefix}
      {digits.map((digit, index) => (
        <span 
          key={`${index}-${digit}`} 
          className={`digit-container ${changedDigits[index] ? 'digit-roll' : ''}`}
          style={{ 
            display: 'inline-block',
            fontWeight: '900', // Extra bold
            fontSize: '1.4em', // Larger digits
            padding: '0 2px',  // Add padding for better spacing
            position: 'relative',
            zIndex: 20 // Ensure digits are above backgrounds
          }}
        >
          {digit}
        </span>
      ))}
      {suffix}
    </span>
  );
};

export default NumberCounter;
