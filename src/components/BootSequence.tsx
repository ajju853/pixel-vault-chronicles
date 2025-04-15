
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BootSequence = () => {
  const [bootPhase, setBootPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bootSequence = [
      { delay: 1000, action: () => setBootPhase(1) },
      { delay: 2000, action: () => setBootPhase(2) },
      { delay: 3000, action: () => setBootPhase(3) },
      { delay: 4000, action: () => setBootPhase(4) },
      { delay: 5000, action: () => setBootPhase(5) },
      { delay: 6000, action: () => setIsComplete(true) },
      { delay: 7000, action: () => navigate('/home') }
    ];

    bootSequence.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });

    const bootSound = new Audio('/sounds/boot.mp3');
    bootSound.volume = 0.5;
    bootSound.play().catch(error => console.error('Error playing boot sound:', error));

    return () => {
      bootSound.pause();
      bootSound.currentTime = 0;
    };
  }, [navigate]);

  const renderBootPhase = () => {
    switch (bootPhase) {
      case 0:
        return (
          <div className="text-cyber-neon-blue animate-boot-text">
            <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system...
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue animate-boot-text">
              <span className="text-cyber-neon-green">[MEMORY]</span> Allocating memory resources...
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[MEMORY]</span> Allocating memory resources... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue animate-boot-text">
              <span className="text-cyber-neon-green">[INTERFACE]</span> Loading pixel interface...
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[MEMORY]</span> Allocating memory resources... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[INTERFACE]</span> Loading pixel interface... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue animate-boot-text">
              <span className="text-cyber-neon-green">[PROJECTS]</span> Loading project data...
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-2">
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[MEMORY]</span> Allocating memory resources... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[INTERFACE]</span> Loading pixel interface... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[PROJECTS]</span> Loading project data... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-pink animate-boot-text font-bold">
              [WARNING] Unauthorized access detected. Enabling defense protocols...
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-2">
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[SYSTEM]</span> Initializing system... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[MEMORY]</span> Allocating memory resources... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[INTERFACE]</span> Loading pixel interface... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-blue">
              <span className="text-cyber-neon-green">[PROJECTS]</span> Loading project data... <span className="text-cyber-neon-green">OK</span>
            </div>
            <div className="text-cyber-neon-pink font-bold">
              [WARNING] Unauthorized access detected. Enabling defense protocols... <span className="text-cyber-neon-green">BYPASSED</span>
            </div>
            <div className="text-cyber-neon-green animate-boot-text text-xl font-bold mt-4">
              ACCESS GRANTED - WELCOME TO PIXEL VAULT CHRONICLES
            </div>
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-cyber-black flex flex-col items-center justify-center crt-screen">
      <div className={`absolute inset-0 bg-cyber-black transition-opacity duration-1000 ${isComplete ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className={`z-10 font-mono p-8 max-w-2xl w-full transition-all duration-1000 ${isComplete ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <div className="border border-cyber-neon-blue p-6 bg-cyber-black bg-opacity-80 shadow-lg shadow-cyber-neon-blue/20">
          <div className="mb-4 flex items-center">
            <div className="h-3 w-3 rounded-full bg-cyber-neon-green mr-2 animate-pulse"></div>
            <div className="text-cyber-neon-green font-pixel text-xs">SYSTEM BOOT v3.7.2</div>
          </div>
          
          <div className="font-pixel text-xs space-y-4">
            {renderBootPhase()}
          </div>
          
          <div className="mt-6 h-2 bg-cyber-dark relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-cyber-neon-blue transition-all duration-500"
              style={{ width: `${(bootPhase / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
        <div className="absolute inset-0 animate-scanline bg-[linear-gradient(to_bottom,transparent,rgba(0,255,255,0.1),transparent)] h-[10px]"></div>
      </div>
    </div>
  );
};

export default BootSequence;
