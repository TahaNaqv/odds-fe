
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  angle: number;
}

interface StarsBurstProps {
  className?: string;
}

const StarsBurst: React.FC<StarsBurstProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(0);

  // Colors for stars
  const colors = ['#FFD700', '#FFFFFF', '#FFA500', '#9B87F5', '#4AE3B5'];

  const createStars = (count: number): Star[] => {
    const stars: Star[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return stars;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 5 + Math.random() * 30;
      stars.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 1 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.1 + Math.random() * 0.9,
        speed: 0.5 + Math.random() * 2,
        angle: angle
      });
    }

    return stars;
  };

  const updateStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    let stars = starsRef.current;
    
    // Update and draw stars
    stars.forEach((star, i) => {
      // Move star outward
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      
      // Reduce opacity as the star moves outward
      star.opacity -= 0.01;
      
      // Reset star if it's faded out
      if (star.opacity <= 0) {
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const newAngle = Math.random() * Math.PI * 2;
        
        stars[i] = {
          x: centerX,
          y: centerY,
          size: 1 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.8 + Math.random() * 0.2,
          speed: 0.5 + Math.random() * 2,
          angle: newAngle
        };
      }
      
      // Draw star as a circle with glow
      ctx.save();
      ctx.globalAlpha = star.opacity;
      
      // Draw glow
      const glow = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 2
      );
      glow.addColorStop(0, star.color);
      glow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw star
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
    
    // Schedule next update
    frameRef.current = requestAnimationFrame(updateStars);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  };

  useEffect(() => {
    if (canvasRef.current) {
      resizeCanvas();
      starsRef.current = createStars(30);
      frameRef.current = requestAnimationFrame(updateStars);
      
      window.addEventListener('resize', resizeCanvas);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className || ''}`}
    />
  );
};

export default StarsBurst;
