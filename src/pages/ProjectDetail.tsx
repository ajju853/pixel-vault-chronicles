
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Calendar, User, ChevronRight, ChevronLeft, Download, Share2, Eye } from 'lucide-react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';
import Terminal from '../components/Terminal';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

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
    ],
    colors: ['#00FFFF', '#FF00FF', '#121212', '#00FF41'],
    achievements: ['Best in Show 2085', 'Digital Art Pioneer Award', 'Pixel Perfect Recognition']
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
    ],
    colors: ['#FFA500', '#4B0082', '#FFFFFF', '#00CED1'],
    achievements: ['Historical Reimagination Prize', 'Digital Archaeology Award']
  },
  {
    id: 'quantum-pixel',
    title: 'Quantum Pixel',
    description: 'Microscopic quantum phenomena visualized through the lens of pixel art, making the invisible visible.',
    longDescription: `
      Quantum Pixel is a scientific visualization project that brings the abstract world of quantum mechanics into the realm of visual art through pixel aesthetics.
      
      Working with theoretical physicists, each piece accurately represents quantum phenomena like entanglement, superposition, and wave-particle duality.
      
      The pixel art format was chosen for its ability to represent discrete units, mirroring the quantized nature of the atomic and subatomic world.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce',
    year: '2079',
    category: 'Scientific Art',
    creator: 'Pixel Master',
    duration: '9 months',
    tools: ['Aseprite', 'Python Visualization', 'Quantum Simulation API'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce', caption: 'Quantum Entanglement' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Wave-Particle Duality' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'Heisenberg Uncertainty' }
    ],
    colors: ['#9370DB', '#48D1CC', '#FFFFFF', '#20B2AA'],
    achievements: ['Science Visualization Award', 'Quantum Art Pioneer']
  },
  {
    id: 'retro-revival',
    title: 'Retro Revival',
    description: 'Classic gaming consoles and arcade machines brought back to life with a futuristic twist.',
    longDescription: `
      Retro Revival is a nostalgic journey through gaming history, reimagining classic consoles and arcade cabinets with futuristic upgrades and alternative timelines.
      
      What if the Nintendo Entertainment System had evolved into a biotechnological gaming organism? What if arcade machines had become sentient? These questions drive the creative exploration.
      
      Each piece pays homage to the original designs while pushing them into speculative futures, creating a bridge between gaming nostalgia and sci-fi imagination.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    year: '2077',
    category: 'Gaming Tribute',
    creator: 'Pixel Master',
    duration: '4 months',
    tools: ['Aseprite', 'Blender Pixel', 'RetroEngine'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Neo-Arcade 3000' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'BioNintendo' },
      { src: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce', caption: 'Quantum SEGA' }
    ],
    colors: ['#FF4500', '#FFD700', '#4169E1', '#2E8B57'],
    achievements: ['Gaming Heritage Award', 'Retro Futurism Medal']
  },
  {
    id: 'digital-nostalgia',
    title: 'Digital Nostalgia',
    description: 'Childhood memories transformed into pixel art that bridges the gap between past and future.',
    longDescription: `
      Digital Nostalgia explores personal memories through the lens of pixel art, creating dreamlike scenes that blend real childhood experiences with futuristic elements.
      
      The series examines how our memories become digitized and transformed in the information age, taking on new meanings and aesthetics as they're shared and reinterpreted.
      
      Each piece begins with a genuine childhood photograph or memory, which is then reimagined in pixel form with technological elements that weren't present in the original moment.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1625805866149-3816174a3cc5',
    year: '2075',
    category: 'Memory Series',
    creator: 'Pixel Master',
    duration: '12 months',
    tools: ['Aseprite', 'Memory Scanner', 'PixelDream'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1625805866149-3816174a3cc5', caption: 'Summer of 2056' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'First Neural Interface' },
      { src: 'https://images.unsplash.com/photo-1531731457588-46d6d3437ee9', caption: 'Playground Mainframe' }
    ],
    colors: ['#FFB6C1', '#87CEEB', '#FAFAD2', '#98FB98'],
    achievements: ['Emotional Digital Art Prize', 'Memory Preservation Award']
  },
  {
    id: 'matrix-meltdown',
    title: 'Matrix Meltdown',
    description: 'What happens when the digital world begins to fracture and reality bleeds through the cracks.',
    longDescription: `
      Matrix Meltdown visualizes a digital apocalypse - the moment when virtual reality systems begin to break down, allowing glimpses of the true world to seep through.
      
      Inspired by simulation theory and digital existentialism, each piece depicts a different stage of digital collapse, from subtle glitches to complete system failure.
      
      The pixel aesthetic perfectly captures this concept, as each pixel can be seen as a unit of digital reality that becomes corrupted or revealed as something else.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    year: '2074',
    category: 'Glitch Art',
    creator: 'Pixel Master',
    duration: '6 months',
    tools: ['Aseprite', 'GlitchForge', 'SystemErrorSimulator'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'First System Error' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Reality Intrusion' },
      { src: 'https://images.unsplash.com/photo-1625805866149-3816174a3cc5', caption: 'Total System Failure' }
    ],
    colors: ['#32CD32', '#FF6347', '#000000', '#FFFFFF'],
    achievements: ['Digital Dystopia Award', 'Best Glitch Aesthetic']
  },
  // 5 new projects with detailed info
  {
    id: 'binary-beings',
    title: 'Binary Beings',
    description: 'Sentient pixel lifeforms evolving in a digital ecosystem. Each creature has its own behavior patterns and lifecycle.',
    longDescription: `
      Binary Beings is an exploration of artificial life through pixel art, creating a simulated ecosystem where digital creatures evolve, interact, and adapt.
      
      Each entity in this series was designed with a unique behavioral algorithm that determines how it moves, feeds, reproduces, and responds to its environment. Some are predators, others are symbiotic, and some exist as environmental elements.
      
      The project includes a timeline of evolution, showing how these digital lifeforms changed over simulated generations, adapting to challenges introduced into their pixel ecosystem.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86',
    year: '2073',
    category: 'Artificial Life',
    creator: 'Pixel Master',
    duration: '14 months',
    tools: ['Aseprite', 'LifeSimEngine', 'PixelGenetics'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86', caption: 'First Generation' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'Emergent Behaviors' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Ecosystem Balance' }
    ],
    colors: ['#4682B4', '#7CFC00', '#FFD700', '#DB7093'],
    achievements: ['Artificial Life Visualization Award', 'Digital Evolution Prize']
  },
  {
    id: 'fractal-frontiers',
    title: 'Fractal Frontiers',
    description: 'Explorations of infinite mathematical landscapes rendered in precise pixel patterns that reveal new details at every scale.',
    longDescription: `
      Fractal Frontiers takes the infinite complexity of mathematical fractals and translates them into pixel art explorations that maintain their recursive nature.
      
      Each piece begins with a classical fractal pattern—Mandelbrot set, Julia sets, Sierpinski triangles—and reimagines them as alien landscapes, cosmic phenomena, or biological systems.
      
      Special techniques were developed to preserve the self-similar qualities of fractals even within the constraints of pixel art, creating images that reward closer inspection with ever more detail.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    year: '2070',
    category: 'Mathematical Art',
    creator: 'Pixel Master',
    duration: '8 months',
    tools: ['Aseprite', 'FractalForge', 'PixelMathLab'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Mandelbrot Jungle' },
      { src: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86', caption: 'Julia Constellation' },
      { src: 'https://images.unsplash.com/photo-1531731457588-46d6d3437ee9', caption: 'Sierpinski Civilizations' }
    ],
    colors: ['#4B0082', '#00FFFF', '#FFFF00', '#FF1493'],
    achievements: ['Mathematical Visualization Prize', 'Fractal Art Innovation Award']
  },
  {
    id: 'vapor-visions',
    title: 'Vapor Visions',
    description: 'Nostalgic reimagining of 90s digital aesthetics with glitched sunsets, marble statues, and retro computer interfaces.',
    longDescription: `
      Vapor Visions revives and reinterprets the vaporwave aesthetic through the lens of pixel art, creating a nostalgic journey through digital culture of the late 20th century.
      
      The series explores themes of consumer capitalism, technological optimism, and digital melancholy through imagery that combines classical art, early computer interfaces, and corporate design elements from the 80s and 90s.
      
      Each piece incorporates glitch effects, color distortion, and anachronistic elements to create dreamlike scenes that feel like memories of a digital past that never quite existed.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce',
    year: '2069',
    category: 'Vaporwave',
    creator: 'Pixel Master',
    duration: '5 months',
    tools: ['Aseprite', 'RetroGlitch', 'VaporSynth'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce', caption: 'Mall of Eternity' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'Windows 95 Afterlife' },
      { src: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce', caption: 'Corporate Sunset' }
    ],
    colors: ['#FF00FF', '#00FFFF', '#FF6EC7', '#8A2BE2'],
    achievements: ['Digital Nostalgia Award', 'Retrowave Excellence']
  },
  {
    id: 'mecha-memories',
    title: 'Mecha Memories',
    description: 'Detailed pixel renderings of biomechanical entities inspired by anime classics and modern robotics research.',
    longDescription: `
      Mecha Memories celebrates the fusion of human and machine through a series of detailed pixel art compositions depicting biomechanical entities.
      
      Drawing inspiration from classic anime, modern robotics, and speculative technology, each piece explores a different aspect of the human-machine relationship—from military applications to medical augmentation.
      
      Special attention was paid to the intricate mechanical details of each mecha design, with functional systems and realistic hydraulics rendered in pixel form at various scales.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    year: '2067',
    category: 'Mecha Design',
    creator: 'Pixel Master',
    duration: '10 months',
    tools: ['Aseprite', 'MechForge', 'PixelCAD'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', caption: 'Medical Exoskeleton' },
      { src: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86', caption: 'Urban Defense Unit' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', caption: 'Deep Sea Exploration Mech' }
    ],
    colors: ['#B22222', '#4682B4', '#708090', '#FFD700'],
    achievements: ['Mecha Design Excellence', 'Technical Illustration Award']
  },
  {
    id: 'pixel-poetry',
    title: 'Pixel Poetry',
    description: 'Visual haikus rendered in pixels, where each composition tells an emotional story with minimal elements.',
    longDescription: `
      Pixel Poetry applies the principles of haiku poetry to pixel art: expressing complex emotions through minimal elements, with each piece telling a complete story in a highly constrained format.
      
      Each "visual haiku" in this series uses no more than 17 distinct colors (mirroring the 17 syllables of traditional haiku) and creates compositions that balance simplicity with emotional depth.
      
      The works often pair with actual haiku text, creating a multimedia experience that explores how visual and verbal expression can complement and enhance each other.
    `,
    imageSrc: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55',
    year: '2065',
    category: 'Minimalist Art',
    creator: 'Pixel Master',
    duration: '7 months',
    tools: ['Aseprite', 'HaikuPixel', 'ColorHarmony'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55', caption: 'Autumn Leaves' },
      { src: 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce', caption: 'First Snow' },
      { src: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86', caption: 'Distant Thunder' }
    ],
    colors: ['#F0E68C', '#708090', '#CD5C5C', '#2E8B57'],
    achievements: ['Minimalist Pixel Art Award', 'Digital Poetry Prize']
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [visibilityMode, setVisibilityMode] = useState<'public' | 'private'>('public');
  const [downloadFormat, setDownloadFormat] = useState<string[]>([]);
  const [isColorPalette, setIsColorPalette] = useState(false);

  useEffect(() => {
    // Find project by ID
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setTimeout(() => setLoaded(true), 100);
    } else {
      // If project not found, redirect to a fallback project instead of showing 404
      const fallbackProject = projectsData[0];
      setProject(fallbackProject);
      setTimeout(() => setLoaded(true), 100);
      
      // Show toast notification
      toast({
        title: "Project Not Found",
        description: `The requested project doesn't exist. Showing ${fallbackProject.title} instead.`,
        variant: "destructive"
      });
    }
    
    // Reset state when project changes
    setCurrentImageIndex(0);
    setLoaded(false);
    setDownloadFormat([]);
    
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
  
  const handleDownloadFormatChange = (format: string) => {
    setDownloadFormat(prev => {
      if (prev.includes(format)) {
        return prev.filter(f => f !== format);
      } else {
        return [...prev, format];
      }
    });
  };
  
  const handleDownload = () => {
    if (downloadFormat.length === 0) {
      toast({
        title: "No Format Selected",
        description: "Please select at least one format to download.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Download Started",
      description: `Downloading ${project?.title} in ${downloadFormat.join(', ')} format${downloadFormat.length > 1 ? 's' : ''}.`,
      variant: "default"
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Project Shared",
      description: "A link to this project has been copied to your clipboard.",
      variant: "default"
    });
  };

  if (!project) {
    return (
      <>
        <StarfieldBackground />
        <NavBar />
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-pixel text-cyber-neon-pink mb-4">LOADING PROJECT DATA</h2>
            <p className="text-gray-400 mb-6">Please wait while we retrieve the project information...</p>
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
                  
                  {/* Color Palette Overlay (toggleable) */}
                  {isColorPalette && (
                    <div className="absolute top-0 left-0 right-0 bg-cyber-black bg-opacity-80 p-2 flex justify-center gap-2">
                      {project.colors?.map((color, index) => (
                        <div 
                          key={index} 
                          className="w-6 h-6 border border-white" 
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  )}
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
                
                {/* Action Buttons */}
                <div className="mt-4 flex justify-center gap-4">
                  <button 
                    onClick={() => setIsColorPalette(!isColorPalette)}
                    className={`px-4 py-2 font-pixel text-sm border ${
                      isColorPalette 
                        ? 'bg-cyber-neon-yellow text-cyber-black border-cyber-neon-yellow' 
                        : 'text-cyber-neon-yellow border-cyber-neon-yellow/50 hover:border-cyber-neon-yellow'
                    }`}
                  >
                    {isColorPalette ? 'HIDE PALETTE' : 'SHOW PALETTE'}
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="px-4 py-2 font-pixel text-sm border text-cyber-neon-pink border-cyber-neon-pink/50 hover:border-cyber-neon-pink flex items-center gap-2"
                  >
                    <Share2 size={14} />
                    <span>SHARE</span>
                  </button>
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
                
                {/* Achievement Badges */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="border border-cyber-neon-yellow pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                    <h3 className="font-pixel text-cyber-neon-yellow mb-3">ACHIEVEMENTS</h3>
                    
                    <div className="space-y-2">
                      {project.achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 bg-cyber-black p-2 border-l-4 border-cyber-neon-yellow"
                        >
                          <div className="w-6 h-6 bg-cyber-neon-yellow/20 rounded-full flex items-center justify-center">
                            <span className="text-cyber-neon-yellow text-xs">★</span>
                          </div>
                          <span className="text-white text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
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
                
                {/* Download Options (Collapsible) */}
                <Collapsible className="border border-cyber-neon-green pixel-corners bg-cyber-dark bg-opacity-80 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-4 text-left flex justify-between items-center">
                    <h3 className="font-pixel text-cyber-neon-green">DOWNLOAD OPTIONS</h3>
                    <div className="text-cyber-neon-green">⌄</div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="p-4 pt-0 border-t border-cyber-neon-green/30 mt-2">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="png" 
                          checked={downloadFormat.includes('PNG')}
                          onCheckedChange={() => handleDownloadFormatChange('PNG')}
                          className="data-[state=checked]:bg-cyber-neon-green data-[state=checked]:text-cyber-black border-cyber-neon-green"
                        />
                        <label htmlFor="png" className="text-sm text-gray-300 cursor-pointer">PNG Format</label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="gif" 
                          checked={downloadFormat.includes('GIF')}
                          onCheckedChange={() => handleDownloadFormatChange('GIF')}
                          className="data-[state=checked]:bg-cyber-neon-green data-[state=checked]:text-cyber-black border-cyber-neon-green"
                        />
                        <label htmlFor="gif" className="text-sm text-gray-300 cursor-pointer">Animated GIF</label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="source" 
                          checked={downloadFormat.includes('Source')}
                          onCheckedChange={() => handleDownloadFormatChange('Source')}
                          className="data-[state=checked]:bg-cyber-neon-green data-[state=checked]:text-cyber-black border-cyber-neon-green"
                        />
                        <label htmlFor="source" className="text-sm text-gray-300 cursor-pointer">Source Files</label>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="text-xs text-gray-400 mb-2">VISIBILITY</h4>
                        <div className="flex border border-cyber-neon-blue/30">
                          <button
                            onClick={() => setVisibilityMode('public')}
                            className={`flex-1 py-1 text-xs ${
                              visibilityMode === 'public' 
                                ? 'bg-cyber-neon-blue text-cyber-black' 
                                : 'text-cyber-neon-blue'
                            }`}
                          >
                            PUBLIC
                          </button>
                          <button
                            onClick={() => setVisibilityMode('private')}
                            className={`flex-1 py-1 text-xs ${
                              visibilityMode === 'private' 
                                ? 'bg-cyber-neon-blue text-cyber-black' 
                                : 'text-cyber-neon-blue'
                            }`}
                          >
                            PRIVATE
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleDownload}
                        className="w-full mt-4 py-2 bg-cyber-neon-green text-cyber-black font-pixel flex items-center justify-center gap-2"
                      >
                        <Download size={14} />
                        <span>DOWNLOAD</span>
                      </button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
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
            
            {/* Related Projects Header */}
            <div className="mt-16 border-t border-cyber-neon-blue/30 pt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-pixel text-cyber-neon-blue">EXPLORE RELATED PROJECTS</h3>
                <Link 
                  to="/gallery" 
                  className="text-cyber-neon-green hover:text-cyber-neon-yellow text-sm font-pixel transition-colors flex items-center gap-1"
                >
                  <span>VIEW ALL</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
              
              {/* Project Stats Card */}
              <div className="mb-8 border border-cyber-neon-green p-4 bg-cyber-dark bg-opacity-80 pixel-corners">
                <div className="text-center mb-3">
                  <h4 className="font-pixel text-cyber-neon-green">PROJECT STATS</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-2 border border-cyber-neon-green/30">
                    <div className="text-xs text-gray-400 mb-1">RESOLUTION</div>
                    <div className="text-cyber-neon-green font-pixel">64 × 64</div>
                  </div>
                  
                  <div className="text-center p-2 border border-cyber-neon-green/30">
                    <div className="text-xs text-gray-400 mb-1">COLORS</div>
                    <div className="text-cyber-neon-green font-pixel">{project.colors?.length || 16}</div>
                  </div>
                  
                  <div className="text-center p-2 border border-cyber-neon-green/30">
                    <div className="text-xs text-gray-400 mb-1">VIEWS</div>
                    <div className="text-cyber-neon-green font-pixel">
                      <Eye size={14} className="inline mr-1" />
                      {Math.floor(Math.random() * 10000)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Related Projects */}
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
