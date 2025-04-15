
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starColors = [
        'rgba(255, 255, 255, {opacity})',
        'rgba(0, 255, 255, {opacity})',
        'rgba(255, 0, 255, {opacity})',
        'rgba(0, 255, 0, {opacity})',
      ];

      starsRef.current = Array(150).fill(null).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinkleOffset: Math.random() * 2 * Math.PI,
      }));
    };

    const updateStarfield = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const offsetX = (mouseX - centerX) * 0.01;
      const offsetY = (mouseY - centerY) * 0.01;

      starsRef.current.forEach((star) => {
        // Update position based on speed and parallax effect
        star.x += star.speed + offsetX * star.speed * 10;
        star.y += star.speed + offsetY * star.speed * 10;

        // Wrap around canvas
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;

        // Calculate twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.2 + 0.8;
        const currentOpacity = star.opacity * twinkle;
        
        const colorStr = star.color.replace('{opacity}', currentOpacity.toString());
        
        // Draw star
        ctx.fillStyle = colorStr;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let animationId: number;
    const animate = (time: number) => {
      updateStarfield(time);
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-cyber-black"
    />
  );
};

export default StarfieldBackground;
