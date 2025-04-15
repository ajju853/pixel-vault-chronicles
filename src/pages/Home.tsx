
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid, Send, ChevronDown } from 'lucide-react';
import StarfieldBackground from '../components/StarfieldBackground';
import Terminal from '../components/Terminal';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate delay for animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    // Play ambient sound
    const ambientSound = new Audio('/sounds/ambient.mp3');
    ambientSound.volume = 0.2;
    ambientSound.loop = true;
    ambientSound.play().catch(error => console.error('Error playing ambient sound:', error));
    
    return () => {
      clearTimeout(timer);
      ambientSound.pause();
    };
  }, []);
  
  return (
    <>
      <StarfieldBackground />
      <NavBar />
      
      <main className="min-h-screen pt-16 crt-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="min-h-[calc(100vh-9rem)] flex flex-col items-center justify-center">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 
                className="text-4xl md:text-7xl font-pixel mb-6 text-cyber-neon-green leading-tight relative inline-block"
                data-text="PIXEL VAULT CHRONICLES"
              >
                <span className="relative z-10 glitch-text">PIXEL VAULT CHRONICLES</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 font-future max-w-2xl mx-auto">
                A time-traveling gallery of retro-futuristic pixel masterpieces, where each project is a digital artifact from an alternate timeline.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
                <Link 
                  to="/gallery" 
                  className="group flex items-center gap-2 bg-gradient-to-r from-cyber-neon-blue to-cyber-neon-purple text-cyber-black font-pixel px-6 py-3 transition-all hover:shadow-lg hover:shadow-cyber-neon-blue/30 pixel-corners"
                >
                  <Grid size={18} />
                  <span>EXPLORE GALLERY</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link 
                  to="/contact" 
                  className="group flex items-center gap-2 bg-transparent border border-cyber-neon-pink text-cyber-neon-pink font-pixel px-6 py-3 transition-all hover:bg-cyber-neon-pink hover:text-cyber-black pixel-corners"
                >
                  <Send size={18} />
                  <span>CONTACT</span>
                </Link>
              </div>
            </div>
            
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-cyber-neon-blue animate-bounce transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <ChevronDown size={24} />
            </div>
          </div>
          
          {/* Featured Section */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="md:col-span-2">
              <div className="relative overflow-hidden border-2 border-cyber-neon-blue h-full pixel-corners">
                <img 
                  src="/lovable-uploads/fc39a22f-fab0-46d1-a4c5-c28dbb6fb1db.png" 
                  alt="Featured project" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent"></div>
                
                {/* Scan lines effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyber-neon-green animate-pulse"></div>
                    <span className="font-pixel text-xs text-cyber-neon-green">FEATURED PROJECT</span>
                  </div>
                  
                  <h2 className="font-pixel text-white text-2xl mb-2">NEON DREAMS</h2>
                  
                  <p className="text-gray-300 mb-4 font-future max-w-lg">
                    A cyberpunk-inspired pixel art series depicting a dystopian future where technology and humanity merge in unexpected ways.
                  </p>
                  
                  <Link 
                    to="/project/neon-dreams" 
                    className="inline-flex items-center gap-2 bg-cyber-neon-blue/20 hover:bg-cyber-neon-blue/40 text-cyber-neon-blue border border-cyber-neon-blue font-pixel px-4 py-2 transition-colors"
                  >
                    <span>EXPLORE PROJECT</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="border border-cyber-neon-green pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                <h3 className="font-pixel text-cyber-neon-green mb-3">SYSTEM STATUS</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Projects Online</div>
                    <div className="h-2 bg-gray-800 rounded-sm">
                      <div className="h-full bg-cyber-neon-green w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Memory Usage</div>
                    <div className="h-2 bg-gray-800 rounded-sm">
                      <div className="h-full bg-cyber-neon-blue w-[65%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-1">Connection</div>
                    <div className="h-2 bg-gray-800 rounded-sm">
                      <div className="h-full bg-cyber-neon-pink w-[92%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Terminal className="flex-grow" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
