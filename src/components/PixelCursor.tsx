
import React, { useEffect, useState } from 'react';

const PixelCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number, y: number, size: number, life: number, color: string }>>([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Generate click particles
      const newParticles = Array(10).fill(null).map(() => ({
        x: position.x,
        y: position.y,
        size: Math.random() * 4 + 2,
        life: 1,
        color: getRandomColor()
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            life: particle.life - 0.05,
            x: particle.x + (Math.random() * 6 - 3),
            y: particle.y + (Math.random() * 6 - 3)
          }))
          .filter(particle => particle.life > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(particleInterval);
    };
  }, [position]);

  const getRandomColor = () => {
    const colors = [
      '#00FFFF', // cyan
      '#FF00FF', // magenta
      '#00FF00', // green
      '#FFFF00', // yellow
      '#00FF41', // matrix green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      {/* Using style tag as a string instead of with JSX attributes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none;
          }
          a, button, [role="button"], input, label, select, textarea {
            cursor: none;
          }
        `
      }} />
      
      <div 
        className="pointer-events-none fixed z-[999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      >
        {/* Main cursor */}
        <div 
          className={`relative transition-all duration-100 ${isClicking ? 'scale-75' : 'scale-100'}`}
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 opacity-50 rounded-full bg-cyber-neon-blue blur-sm"></div>
          
          {/* Core cursor */}
          <div className="relative w-4 h-4">
            {/* Top-left corner */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-cyber-neon-blue"></div>
            {/* Top-right corner */}
            <div className="absolute top-0 right-0 w-1 h-1 bg-cyber-neon-blue"></div>
            {/* Bottom-left corner */}
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-cyber-neon-blue"></div>
            {/* Bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-neon-blue"></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-white"></div>
          </div>
        </div>
      </div>

      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="pointer-events-none fixed z-[998] w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}
    </>
  );
};

export default PixelCursor;
