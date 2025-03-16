
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
}

interface CelebrationConfettiProps {
  className?: string;
}

const CelebrationConfetti: React.FC<CelebrationConfettiProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);

  // Colors for confetti particles
  const colors = ['#9B87F5', '#8B5CF6', '#00C2FF', '#4AE3B5', '#F97316'];

  const createParticles = (count: number): Particle[] => {
    const particles: Particle[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return particles;
    
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 40,
        y: height * 0.5 + (Math.random() - 0.5) * 10,
        size: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    return particles;
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    let particles = particlesRef.current;
    const gravity = 0.15;
    const drag = 0.98;
    
    // Update and draw particles
    particles.forEach((p, i) => {
      // Apply gravity
      p.speed *= drag;
      p.y += Math.sin(p.angle) * p.speed + gravity;
      p.x += Math.cos(p.angle) * p.speed;
      p.rotation += p.rotationSpeed;
      
      // Remove particles that are out of bounds
      if (p.y > height + 20) {
        particles[i] = {
          ...p,
          y: Math.random() * -20,
          x: width * 0.5 + (Math.random() - 0.5) * 80,
          speed: 0.5 + Math.random() * 2,
          angle: Math.random() * Math.PI * 2
        };
      }
      
      // Draw particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.fill();
      ctx.restore();
    });
    
    // Schedule next update
    frameRef.current = requestAnimationFrame(updateParticles);
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
      particlesRef.current = createParticles(40);
      frameRef.current = requestAnimationFrame(updateParticles);
      
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

export default CelebrationConfetti;
