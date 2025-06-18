import { useState, useEffect, useRef } from "react";

interface NumberCounterProps {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easingFn?: (t: number) => number;
  loop?: boolean;
  loopCount?: number;
}

/**
 * A component that animates counting from a start value to a target number
 * with individual digit animations for a more engaging slot-machine effect.
 */
const NumberCounter = ({
  start = 0,
  end,
  duration = 2000,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  easingFn = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // Custom easing for better deceleration
  loop = false,
  loopCount = 1,
}: NumberCounterProps) => {
  const [displayValue, setDisplayValue] = useState(start);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isMounted = useRef(true);
  const previousDigits = useRef<string[]>([]);
  const loopCounter = useRef(0);

  // Animation state flag
  const [isAnimating, setIsAnimating] = useState(true);

  // Calculate the number of digits in the end value (excluding commas and decimal point)
  const numDigits = Math.max(1, Math.floor(Math.log10(Math.abs(end))) + 1);

  // Format number with commas and decimals
  const formatNumber = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Convert number to array of digit characters
  const getDigitsArray = (value: number): string[] => {
    const formatted = formatNumber(value);
    return formatted.split("");
  };

  useEffect(() => {
    // Reset to start value whenever props change
    setDisplayValue(start);
    startTime.current = null;
    setIsAnimating(true); // Ensure animation state is active when starting

    // Animation function using requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);

      // Calculate the current value based on progress
      const range = end - start;
      const currentValue = Math.floor(start + easedProgress * range);

      setDisplayValue(currentValue);

      // Continue animation until we reach the end
      if (progress < 1 && isMounted.current) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else if (loop && loopCounter.current < loopCount && isMounted.current) {
        // Reset for another loop
        startTime.current = null;
        loopCounter.current += 1;
        setDisplayValue(start); // Reset to start for the next loop
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
    };
  }, [start, end, duration, easingFn, loop, loopCount]);

  // Get current digits
  const digits = getDigitsArray(displayValue);

  // Always treat all digits as changed during animation
  // This ensures we get the slot machine effect for all digits
  const changedDigits = digits.map(() => isAnimating);

  // Update previous digits reference
  useEffect(() => {
    previousDigits.current = digits;
  }, [digits]);

  return (
    <div
      className={`number-counter ${className} ${
        isAnimating ? "is-animating" : ""
      }`}
      data-animating={isAnimating ? "true" : "false"}
      data-digits={numDigits}
    >
      {prefix}
      {digits.map((digit, index) => (
        <span
          key={`${index}-${digit}`}
          className={`digit-container ${
            changedDigits[index] ? "digit-changing" : ""
          }`}
          data-digit={digit}
        >
          <div className="digit-slot">
            {changedDigits[index] ? (
              <div className="digit-reel">
                {/* Generate numbers 0-9 for the slot reel effect */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="digit-value">
                    {i}
                  </div>
                ))}
                <div className="digit-value final">{digit}</div>
              </div>
            ) : (
              <div className="digit-static">{digit}</div>
            )}
          </div>
        </span>
      ))}
      {suffix}
    </div>
  );
};

export default NumberCounter;
