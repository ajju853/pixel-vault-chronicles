
import React, { useEffect, useState, useRef } from 'react';

const PixelCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number, y: number, size: number, life: number, color: string, velocity: { x: number, y: number } }>>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'beam' | 'target' | 'glitch'>('default');
  const [cursorSize, setCursorSize] = useState(4);
  const [trailEnabled, setTrailEnabled] = useState(true);
  const cursorColors = useRef(['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00', '#00FF41']);
  const currentColorIndex = useRef(0);
  const glitchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail particles if enabled
      if (trailEnabled && Math.random() > 0.7) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          life: 1,
          color: cursorColors.current[Math.floor(Math.random() * cursorColors.current.length)],
          velocity: { 
            x: (Math.random() - 0.5) * 2, 
            y: (Math.random() - 0.5) * 2 
          }
        };
        
        setParticles(prev => [...prev, newParticle]);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Generate click particles
      const newParticles = Array(15).fill(null).map(() => ({
        x: position.x + (Math.random() * 10 - 5),
        y: position.y + (Math.random() * 10 - 5),
        size: Math.random() * 4 + 2,
        life: 1,
        color: getRandomColor(),
        velocity: { 
          x: (Math.random() - 0.5) * 8, 
          y: (Math.random() - 0.5) * 8 
        }
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Switch cursor modes with number keys
      switch (e.key) {
        case '1':
          setCursorMode('default');
          break;
        case '2':
          setCursorMode('beam');
          break;
        case '3':
          setCursorMode('target');
          break;
        case '4':
          setCursorMode('glitch');
          triggerGlitchMode();
          break;
        case 't':
          setTrailEnabled(prev => !prev);
          break;
        case '+':
          setCursorSize(prev => Math.min(prev + 1, 8));
          break;
        case '-':
          setCursorSize(prev => Math.max(prev - 1, 2));
          break;
        case 'c':
          // Cycle through cursor colors
          currentColorIndex.current = (currentColorIndex.current + 1) % cursorColors.current.length;
          break;
        default:
          break;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyPress);

    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            life: particle.life - 0.03,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            velocity: {
              x: particle.velocity.x * 0.96,
              y: particle.velocity.y * 0.96
            }
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(particleInterval);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, [position, trailEnabled]);

  const triggerGlitchMode = () => {
    // Random glitch effect that automatically reverts after a few seconds
    if (glitchTimerRef.current) {
      clearTimeout(glitchTimerRef.current);
    }
    
    glitchTimerRef.current = window.setTimeout(() => {
      setCursorMode('default');
      glitchTimerRef.current = null;
    }, 5000);
  };

  const getRandomColor = () => {
    return cursorColors.current[Math.floor(Math.random() * cursorColors.current.length)];
  };

  const renderCursor = () => {
    switch (cursorMode) {
      case 'beam':
        return (
          <div className="relative">
            {/* Horizontal Beam */}
            <div className="absolute h-0.5 bg-cyber-neon-blue left-0 right-0 top-1/2 transform -translate-y-1/2" style={{ width: '80vw', left: '-40vw' }}></div>
            
            {/* Vertical Beam */}
            <div className="absolute w-0.5 bg-cyber-neon-blue top-0 bottom-0 left-1/2 transform -translate-x-1/2" style={{ height: '80vh', top: '-40vh' }}></div>
            
            {/* Center dot */}
            <div className={`absolute w-${cursorSize} h-${cursorSize} bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
          </div>
        );
        
      case 'target':
        return (
          <div className="relative">
            {/* Outer circle */}
            <div className="absolute w-12 h-12 rounded-full border-2 border-cyber-neon-green top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Inner circle */}
            <div className="absolute w-6 h-6 rounded-full border border-cyber-neon-green top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Center dot */}
            <div className={`absolute w-${cursorSize/2} h-${cursorSize/2} bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
            
            {/* Crosshair lines */}
            <div className="absolute h-0.5 w-4 bg-cyber-neon-green left-1/2 transform -translate-x-1/2" style={{ top: '-8px' }}></div>
            <div className="absolute h-0.5 w-4 bg-cyber-neon-green left-1/2 transform -translate-x-1/2" style={{ bottom: '-8px' }}></div>
            <div className="absolute w-0.5 h-4 bg-cyber-neon-green top-1/2 transform -translate-y-1/2" style={{ left: '-8px' }}></div>
            <div className="absolute w-0.5 h-4 bg-cyber-neon-green top-1/2 transform -translate-y-1/2" style={{ right: '-8px' }}></div>
          </div>
        );
        
      case 'glitch':
        return (
          <div className="relative">
            {/* Glitched cursor with multiple offset layers */}
            <div className="absolute w-4 h-4 bg-cyber-neon-pink opacity-80" style={{ left: '-1px', top: '1px' }}></div>
            <div className="absolute w-4 h-4 bg-cyber-neon-blue opacity-80" style={{ left: '1px', top: '-1px' }}></div>
            <div className="absolute w-4 h-4 bg-white"></div>
            
            {/* Random glitch elements that change position */}
            {Array(5).fill(null).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-cyber-neon-green" 
                style={{ 
                  width: `${Math.random() * 8 + 1}px`, 
                  height: `${Math.random() * 8 + 1}px`,
                  left: `${(Math.random() - 0.5) * 20}px`,
                  top: `${(Math.random() - 0.5) * 20}px`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              ></div>
            ))}
          </div>
        );
        
      default: // 'default'
        return (
          <div className={`relative transition-all duration-100 ${isClicking ? 'scale-75' : 'scale-100'}`}>
            {/* Outer glow */}
            <div className="absolute -inset-1 opacity-50 rounded-full bg-cyber-neon-blue blur-sm"></div>
            
            {/* Core cursor */}
            <div className={`relative w-${cursorSize} h-${cursorSize}`}>
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
        );
    }
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
        {renderCursor()}
      </div>

      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="pointer-events-none fixed z-[998] rounded-full"
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
      
      {/* Cursor Help Overlay - Only shown when pressing H key */}
      {cursorMode === 'glitch' && (
        <div className="fixed bottom-4 left-4 z-[997] bg-cyber-black border border-cyber-neon-blue p-2 text-xs font-mono text-cyber-neon-blue">
          <div className="mb-1 text-cyber-neon-green">CURSOR GLITCH MODE ACTIVE</div>
          <div>Press 1-4: Change cursor mode</div>
          <div>Press T: Toggle trail</div>
          <div>Press +/-: Resize cursor</div>
        </div>
      )}
    </>
  );
};

export default PixelCursor;
