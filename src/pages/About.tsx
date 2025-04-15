
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Cpu, Code, Zap, ChevronDown } from 'lucide-react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';
import Terminal from '../components/Terminal';

const About: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  
  useEffect(() => {
    setLoaded(true);
    
    // Play ambient sound
    const ambientSound = new Audio('/sounds/ambient.mp3');
    ambientSound.volume = 0.2;
    ambientSound.loop = true;
    ambientSound.play().catch(error => console.error('Error playing ambient sound:', error));
    
    return () => {
      ambientSound.pause();
    };
  }, []);
  
  const timelineEvents = [
    {
      year: '2075',
      title: 'First Contact with Pixel Art',
      description: 'Discovered the beauty of pixel-based creation through classic arcade games.',
      icon: <Calendar size={16} />
    },
    {
      year: '2078',
      title: 'Quantum Pixel Engine Development',
      description: 'Created a proprietary pixel rendering engine capable of dimensional shifts.',
      icon: <Code size={16} />
    },
    {
      year: '2082',
      title: 'Neo Tokyo Art Exhibition',
      description: 'First major showcase featuring interactive pixel environments.',
      icon: <Zap size={16} />
    },
    {
      year: '2085',
      title: 'Time Loop Discovery',
      description: 'Accidentally embedded code that created temporal anomalies in artwork.',
      icon: <Clock size={16} />
    },
    {
      year: 'NOW',
      title: 'Pixel Vault Chronicles',
      description: 'Curating a cross-dimensional gallery of pixel creations spanning multiple timelines.',
      icon: <Cpu size={16} />
    }
  ];
  
  const skillSets = [
    {
      category: 'PIXEL ARTISTRY',
      skills: [
        { name: 'Character Design', level: 95 },
        { name: 'Environment Art', level: 90 },
        { name: 'Animation', level: 85 },
        { name: 'Color Theory', level: 92 }
      ]
    },
    {
      category: 'TECHNICAL SKILLS',
      skills: [
        { name: 'Aseprite', level: 96 },
        { name: 'Photoshop', level: 88 },
        { name: 'JS/Canvas', level: 82 },
        { name: 'WebGL', level: 78 }
      ]
    },
    {
      category: 'CREATIVE DIRECTION',
      skills: [
        { name: 'Concept Development', level: 91 },
        { name: 'Visual Storytelling', level: 94 },
        { name: 'Art Direction', level: 89 },
        { name: 'Project Planning', level: 86 }
      ]
    }
  ];
  
  const handleSectionToggle = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
    
    // Play click sound
    const clickSound = new Audio('/sounds/select.mp3');
    clickSound.volume = 0.2;
    clickSound.play().catch(error => console.error('Error playing click sound:', error));
  };
  
  return (
    <>
      <StarfieldBackground />
      <NavBar />
      
      <main className="min-h-screen pt-16 crt-screen">
        <div className="container mx-auto px-4 py-8">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-pixel text-cyber-neon-green mb-6">SYSTEM PROFILE</h1>
              <p className="text-gray-300 font-future max-w-2xl mx-auto">
                Identity: Pixel Master, a time-traveling digital artist cataloging and creating pixel masterpieces across multiple dimensions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="border border-cyber-neon-blue pixel-corners p-6 bg-cyber-dark bg-opacity-80 h-full">
                  <h2 className="font-pixel text-cyber-neon-blue mb-6">PIXEL MASTER ORIGIN STORY</h2>
                  
                  <div className="text-gray-300 space-y-4">
                    <p>
                      I began as a simple pixel artist in the year 2075, fascinated by the limitations and creative possibilities of the medium. What started as nostalgic recreation quickly evolved into something more profound.
                    </p>
                    
                    <p>
                      While working on an experimental project, I discovered that certain pixel patterns, when arranged in specific configurations, could create visual gateways to alternate artistic timelines. This breakthrough allowed me to explore visual styles that never existed in our timeline.
                    </p>
                    
                    <p>
                      The Pixel Vault was created as a repository for these cross-dimensional artworks - a secure digital space where these reality-bending pixel creations could be stored, studied, and shared without causing temporal distortions.
                    </p>
                    
                    <p>
                      Each piece in my collection represents a journey through the quantum pixel-verse, capturing moments and aesthetics from timelines where digital art evolved along entirely different trajectories.
                    </p>
                    
                    <p>
                      My mission is to continue exploring these alternate pixel dimensions, documenting the infinite creative possibilities that exist across the multiverse of digital expression.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="border border-cyber-neon-pink pixel-corners overflow-hidden bg-cyber-dark bg-opacity-80">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/fc39a22f-fab0-46d1-a4c5-c28dbb6fb1db.png" 
                      alt="Pixel Master" 
                      className="w-full aspect-square object-cover"
                    />
                    
                    {/* Scan lines effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                    
                    {/* Pixel grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[length:8px_8px] pointer-events-none"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-pixel text-cyber-neon-pink mb-2">PIXEL MASTER</h3>
                    <p className="text-sm text-gray-400">Digital Artist & Dimensional Explorer</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>TIMELINE:</span>
                        <span className="text-cyber-neon-pink">2075-2085</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>PROJECTS:</span>
                        <span className="text-cyber-neon-pink">247</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>DIMENSIONS EXPLORED:</span>
                        <span className="text-cyber-neon-pink">16</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="mb-12">
              <h2 className="font-pixel text-cyber-neon-green text-2xl mb-6 text-center">TIMELINE FRAGMENTS</h2>
              
              <div className="relative border-l-2 border-cyber-neon-blue ml-6 md:ml-0 md:mx-auto md:max-w-2xl">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="mb-8 ml-6 md:ml-0 md:grid md:grid-cols-5 md:gap-4">
                    {/* Year */}
                    <div className={`md:col-span-1 font-pixel text-lg ${index % 2 === 0 ? 'text-cyber-neon-blue' : 'text-cyber-neon-pink'} mb-2 md:mb-0 md:text-right`}>
                      {event.year}
                    </div>
                    
                    {/* Icon */}
                    <div className="absolute -left-[13px] md:left-1/2 md:-ml-[13px] mt-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-cyber-neon-blue' : 'bg-cyber-neon-pink'}`}>
                        {event.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-4 bg-cyber-dark border border-gray-700 p-4 pixel-corners">
                      <h3 className="font-future text-white mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-12">
              <h2 className="font-pixel text-cyber-neon-green text-2xl mb-6 text-center">SKILL MATRIX</h2>
              
              <div className="space-y-4">
                {skillSets.map((skillSet, setIndex) => (
                  <div 
                    key={setIndex} 
                    className="border border-cyber-neon-blue pixel-corners overflow-hidden bg-cyber-dark bg-opacity-80"
                  >
                    <button 
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                      onClick={() => handleSectionToggle(setIndex)}
                    >
                      <h3 className="font-pixel text-cyber-neon-blue">{skillSet.category}</h3>
                      <ChevronDown size={20} className={`text-cyber-neon-blue transition-transform ${activeSection === setIndex ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`px-6 pb-6 transition-all duration-300 ${activeSection === setIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="space-y-4">
                        {skillSet.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-300">{skill.name}</span>
                              <span className="text-xs text-cyber-neon-green font-mono">{skill.level}%</span>
                            </div>
                            
                            <div className="h-2 bg-gray-800 relative">
                              <div 
                                className="h-full absolute left-0 top-0 transition-all duration-1000"
                                style={{ 
                                  width: activeSection === setIndex ? `${skill.level}%` : '0%',
                                  background: skillIndex % 2 === 0 ? 'linear-gradient(90deg, #00FFFF, #9b87f5)' : 'linear-gradient(90deg, #FF00FF, #9b87f5)',
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Terminal */}
            <div className="mt-16">
              <h2 className="font-pixel text-cyber-neon-green text-2xl mb-6 text-center">DIRECT ACCESS TERMINAL</h2>
              <Terminal className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
