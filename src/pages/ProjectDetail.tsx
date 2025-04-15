
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';
import Terminal from '../components/Terminal';

// Sample project data (this would ideally come from an API or database)
const projectsData = [
  {
    id: 'neon-dreams',
    title: 'Neon Dreams',
    description: 'A cyberpunk-inspired pixel art series depicting a dystopian future where technology and humanity merge in unexpected ways.',
    longDescription: `
      Neon Dreams explores a future where the boundaries between human and machine have blurred beyond recognition. 
      Each piece in this series tells a story of individuals navigating this complex reality, their struggles and triumphs rendered in vibrant pixel art.
      
      The project began as an exploration of cyberpunk aesthetics but evolved into a deeper examination of how technology shapes our identity and relationships.
      
      The pixel medium was chosen deliberately to evoke nostalgia while discussing futuristic concepts - a visual paradox that mirrors the tension in the narrative.
    `,
    imageSrc: '/lovable-uploads/fc39a22f-fab0-46d1-a4c5-c28dbb6fb1db.png',
    year: '2085',
    category: 'Pixel Art Series',
    creator: 'Pixel Master',
    duration: '6 months',
    tools: ['Aseprite', 'Photoshop', 'ProMotion NG'],
    gallery: [
      { src: '/lovable-uploads/fc39a22f-fab0-46d1-a4c5-c28dbb6fb1db.png', caption: 'Neon City Outskirts' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'Digital Consciousness' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Augmented Reality Interface' }
    ]
  },
  {
    id: 'cyber-relic',
    title: 'Cyber Relic',
    description: 'Ancient artifacts reimagined as futuristic tech devices, blending the old and the new in pixel form.',
    longDescription: `
      Cyber Relic is a conceptual pixel art project that reimagines historical artifacts as if they were designed with future technology.
      
      What if the ancient Egyptians had access to holographic displays? What if Renaissance painters used digital canvases? These questions inspired a series of artifacts that exist between timelines.
      
      Each piece is carefully researched to maintain historical accuracy while incorporating futuristic elements that feel natural to the artifact's original purpose.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1531731457588-46d6d3437ee9',
    year: '2082',
    category: 'Concept Art',
    creator: 'Pixel Master',
    duration: '3 months',
    tools: ['Aseprite', 'Procreate Pixel', 'PixelStudio'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1531731457588-46d6d3437ee9', caption: 'Egyptian Tech Tablet' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Samurai Mech Armor' },
      { src: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce', caption: 'Renaissance Digital Canvas' }
    ]
  },
  // Additional projects would be defined here
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    // Find project by ID
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setTimeout(() => setLoaded(true), 100);
    }
    
    // Reset state when project changes
    setCurrentImageIndex(0);
    setLoaded(false);
    
    // Play ambient sound
    const ambientSound = new Audio('/sounds/project.mp3');
    ambientSound.volume = 0.2;
    ambientSound.loop = true;
    ambientSound.play().catch(error => console.error('Error playing ambient sound:', error));
    
    return () => {
      ambientSound.pause();
    };
  }, [id]);

  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.gallery.length - 1 : prevIndex - 1
    );
  };

  if (!project) {
    return (
      <>
        <StarfieldBackground />
        <NavBar />
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-pixel text-cyber-neon-pink mb-4">PROJECT NOT FOUND</h2>
            <p className="text-gray-400 mb-6">The requested project does not exist in this timeline.</p>
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 bg-cyber-neon-blue text-cyber-black font-pixel px-4 py-2"
            >
              <ArrowLeft size={16} />
              <span>RETURN TO GALLERY</span>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StarfieldBackground />
      <NavBar />
      
      <main className="min-h-screen pt-16 crt-screen">
        <div className="container mx-auto px-4 py-8">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Project Header */}
            <div className="mb-8">
              <Link 
                to="/gallery" 
                className="inline-flex items-center gap-1 text-cyber-neon-blue hover:text-cyber-neon-green mb-4 font-pixel text-sm"
              >
                <ArrowLeft size={14} />
                <span>BACK TO GALLERY</span>
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <h1 className="text-3xl md:text-4xl font-pixel text-cyber-neon-green leading-tight">
                  {project.title}
                </h1>
                
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-cyber-neon-blue" />
                    <span>{project.year}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Tag size={14} className="text-cyber-neon-pink" />
                    <span>{project.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-cyber-neon-green" />
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="relative border-2 border-cyber-neon-blue pixel-corners overflow-hidden bg-cyber-dark aspect-video">
                  {/* Main Image */}
                  <img 
                    src={project.gallery[currentImageIndex].src} 
                    alt={project.gallery[currentImageIndex].caption} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Controls */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={prevImage} 
                      className="w-10 h-10 rounded-full bg-cyber-black bg-opacity-70 flex items-center justify-center text-cyber-neon-blue hover:text-cyber-neon-green transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                      onClick={nextImage} 
                      className="w-10 h-10 rounded-full bg-cyber-black bg-opacity-70 flex items-center justify-center text-cyber-neon-blue hover:text-cyber-neon-green transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-cyber-black bg-opacity-80 text-center py-2 px-4 font-future text-cyber-neon-blue text-sm">
                    {project.gallery[currentImageIndex].caption}
                  </div>
                  
                  {/* Scan lines effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]"></div>
                    <div className="absolute inset-0 animate-scanline bg-[linear-gradient(to_bottom,transparent,rgba(0,255,255,0.1),transparent)] h-[10px]"></div>
                  </div>
                </div>
                
                {/* Thumbnail Navigation */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {project.gallery.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 w-16 h-16 overflow-hidden transition-all ${
                        currentImageIndex === index 
                          ? 'outline outline-2 outline-offset-2 outline-cyber-neon-green' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Project Details */}
              <div className="space-y-6">
                {/* Project Description */}
                <div className="border border-cyber-neon-blue pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                  <h3 className="font-pixel text-cyber-neon-blue mb-3">PROJECT DETAILS</h3>
                  
                  <p className="text-gray-300 mb-4 whitespace-pre-line">
                    {project.longDescription}
                  </p>
                  
                  <div className="pt-4 border-t border-cyber-neon-blue/30">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={14} className="text-cyber-neon-green" />
                      <span className="text-cyber-neon-green font-pixel text-sm">CREATOR</span>
                    </div>
                    <p className="text-gray-300 font-future">{project.creator}</p>
                  </div>
                </div>
                
                {/* Tools Used */}
                <div className="border border-cyber-neon-pink pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                  <h3 className="font-pixel text-cyber-neon-pink mb-3">TOOLS USED</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="bg-cyber-black border border-cyber-neon-pink/50 text-cyber-neon-pink px-2 py-1 text-xs font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Terminal Toggle */}
                <button 
                  onClick={() => setShowTerminal(!showTerminal)}
                  className={`w-full border transition-colors pixel-corners p-3 font-pixel text-sm ${
                    showTerminal 
                      ? 'bg-cyber-neon-green text-cyber-black border-cyber-neon-green' 
                      : 'border-cyber-neon-green text-cyber-neon-green hover:bg-cyber-neon-green/10'
                  }`}
                >
                  {showTerminal ? 'CLOSE TERMINAL' : 'ACCESS PROJECT TERMINAL'}
                </button>
                
                {showTerminal && (
                  <Terminal className="h-60" />
                )}
              </div>
            </div>
            
            {/* Additional Projects Navigation */}
            <div className="mt-16 border-t border-cyber-neon-blue/30 pt-8">
              <h3 className="font-pixel text-cyber-neon-blue mb-6 text-center">EXPLORE OTHER PROJECTS</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projectsData
                  .filter(p => p.id !== project.id)
                  .slice(0, 3)
                  .map((relatedProject) => (
                    <Link 
                      key={relatedProject.id}
                      to={`/project/${relatedProject.id}`}
                      className="group block border border-cyber-neon-blue/30 hover:border-cyber-neon-blue transition-colors bg-cyber-dark bg-opacity-50 hover:bg-opacity-80 pixel-corners overflow-hidden"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={relatedProject.imageSrc} 
                          alt={relatedProject.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent"></div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-pixel text-cyber-neon-green group-hover:text-cyber-neon-yellow transition-colors mb-1">
                          {relatedProject.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{relatedProject.category}</p>
                        <div className="flex items-center gap-1 text-cyber-neon-blue group-hover:text-cyber-neon-green transition-colors text-sm">
                          <span>View Project</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetail;
