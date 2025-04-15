
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  year: string;
  category: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageSrc,
  year,
  category,
  index,
}) => {
  const [hover, setHover] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const projectRef = useRef<HTMLDivElement>(null);
  
  // Add a small random delay to stagger the animation
  const animationDelay = useRef(index * 0.1);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!projectRef.current) return;
      
      // Get all project cards
      const cards = document.querySelectorAll('[data-project-card]');
      const cardArray = Array.from(cards);
      const currentIndex = cardArray.indexOf(projectRef.current);
      
      if (currentIndex === -1) return;
      
      switch (e.key) {
        case 'w':
          if (cardArray[currentIndex - 3]) (cardArray[currentIndex - 3] as HTMLElement).focus();
          break;
        case 's':
          if (cardArray[currentIndex + 3]) (cardArray[currentIndex + 3] as HTMLElement).focus();
          break;
        case 'a':
          if (cardArray[currentIndex - 1]) (cardArray[currentIndex - 1] as HTMLElement).focus();
          break;
        case 'd':
          if (cardArray[currentIndex + 1]) (cardArray[currentIndex + 1] as HTMLElement).focus();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!projectRef.current) return;
    
    const rect = projectRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    
    setRotation({ x: -y, y: x });
    setPosition({ x: x / 2, y: y / 2 });
  };
  
  const handleMouseEnter = () => {
    setHover(true);
    
    // Play hover sound
    const hoverSound = new Audio('/sounds/hover.mp3');
    hoverSound.volume = 0.2;
    hoverSound.play().catch(error => console.error('Error playing hover sound:', error));
  };
  
  const handleMouseLeave = () => {
    setHover(false);
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
  };
  
  const handleClick = () => {
    // Play click sound
    const clickSound = new Audio('/sounds/select.mp3');
    clickSound.volume = 0.3;
    clickSound.play().catch(error => console.error('Error playing click sound:', error));
  };
  
  return (
    <div 
      ref={projectRef}
      data-project-card
      tabIndex={0}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        animationDelay: `${animationDelay.current}s`
      }}
    >
      <Link 
        to={`/project/${id}`}
        onClick={handleClick}
        className="block"
      >
        <div 
          className={`relative overflow-hidden border-2 transition-all duration-300 pixel-corners bg-cyber-dark 
            ${hover ? 'border-cyber-neon-green shadow-lg shadow-cyber-neon-green/20' : 'border-cyber-neon-blue/30'}`}
          style={{
            transform: hover ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px) translateX(${position.x}px) translateY(${position.y}px)` : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Holographic Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-cyber-neon-blue/20 to-cyber-neon-pink/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
          
          {/* Image */}
          <div className="relative w-full pt-[100%] overflow-hidden">
            <img 
              src={imageSrc} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: hover ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.8) contrast(0.9)',
                transition: 'filter 0.3s ease'
              }}
            />
            
            {/* Scan lines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            
            {/* Pixel grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:8px_8px] pointer-events-none"></div>
          </div>
          
          {/* Info Box */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-pixel text-cyber-neon-green text-sm truncate group-hover:text-cyber-neon-yellow transition-colors">{title}</h3>
              <ArrowUpRight size={16} className="text-cyber-neon-blue group-hover:text-cyber-neon-green transition-colors" />
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="font-mono">YEAR: {year}</span>
              <span className="font-mono text-cyber-neon-blue">{category}</span>
            </div>
            
            <p className="text-xs text-gray-300 font-mono line-clamp-2">{description}</p>
          </div>
          
          {/* Hover Details */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
          >
            <div className="border border-cyber-neon-green bg-cyber-black bg-opacity-70 p-3 pixel-corners">
              <div className="text-cyber-neon-green font-pixel text-xs mb-1">&gt; ACCESS PROJECT_DATA</div>
              <div className="h-1 w-full bg-cyber-dark mb-2">
                <div className="h-full bg-cyber-neon-green animate-pulse w-full"></div>
              </div>
              <div className="font-mono text-[10px] text-gray-300">
                <div>TYPE: {category}</div>
                <div>YEAR: {year}</div>
                <div>STATUS: COMPLETE</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
