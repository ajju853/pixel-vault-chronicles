
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';
import ProjectCard from '../components/ProjectCard';
import Terminal from '../components/Terminal';
import { Grid, List, Calendar, Gamepad2, Search, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample project data
const projectsData = [
  {
    id: 'neon-dreams',
    title: 'Neon Dreams',
    description: 'A cyberpunk-inspired pixel art series depicting a dystopian future where technology and humanity merge.',
    imageSrc: '/lovable-uploads/fc39a22f-fab0-46d1-a4c5-c28dbb6fb1db.png',
    year: '2085',
    category: 'Pixel Art Series'
  },
  {
    id: 'cyber-relic',
    title: 'Cyber Relic',
    description: 'Ancient artifacts reimagined as futuristic tech devices, blending the old and the new in pixel form.',
    imageSrc: 'https://images.unsplash.com/photo-1531731457588-46d6d3437ee9',
    year: '2082',
    category: 'Concept Art'
  },
  {
    id: 'quantum-pixel',
    title: 'Quantum Pixel',
    description: 'Microscopic quantum phenomena visualized through the lens of pixel art, making the invisible visible.',
    imageSrc: 'https://images.unsplash.com/photo-1501769752-a59efa2298ce',
    year: '2079',
    category: 'Scientific Art'
  },
  {
    id: 'retro-revival',
    title: 'Retro Revival',
    description: 'Classic gaming consoles and arcade machines brought back to life with a futuristic twist.',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    year: '2077',
    category: 'Gaming Tribute'
  },
  {
    id: 'digital-nostalgia',
    title: 'Digital Nostalgia',
    description: 'Childhood memories transformed into pixel art that bridges the gap between past and future.',
    imageSrc: 'https://images.unsplash.com/photo-1625805866149-3816174a3cc5',
    year: '2075',
    category: 'Memory Series'
  },
  {
    id: 'matrix-meltdown',
    title: 'Matrix Meltdown',
    description: 'What happens when the digital world begins to fracture and reality bleeds through the cracks.',
    imageSrc: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    year: '2074',
    category: 'Glitch Art'
  },
  // 5 new projects
  {
    id: 'binary-beings',
    title: 'Binary Beings',
    description: 'Sentient pixel lifeforms evolving in a digital ecosystem. Each creature has its own behavior patterns and lifecycle.',
    imageSrc: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86',
    year: '2073',
    category: 'Artificial Life'
  },
  {
    id: 'fractal-frontiers',
    title: 'Fractal Frontiers',
    description: 'Explorations of infinite mathematical landscapes rendered in precise pixel patterns that reveal new details at every scale.',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    year: '2070',
    category: 'Mathematical Art'
  },
  {
    id: 'vapor-visions',
    title: 'Vapor Visions',
    description: 'Nostalgic reimagining of 90s digital aesthetics with glitched sunsets, marble statues, and retro computer interfaces.',
    imageSrc: 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce',
    year: '2069',
    category: 'Vaporwave'
  },
  {
    id: 'mecha-memories',
    title: 'Mecha Memories',
    description: 'Detailed pixel renderings of biomechanical entities inspired by anime classics and modern robotics research.',
    imageSrc: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    year: '2067',
    category: 'Mecha Design'
  },
  {
    id: 'pixel-poetry',
    title: 'Pixel Poetry',
    description: 'Visual haikus rendered in pixels, where each composition tells an emotional story with minimal elements.',
    imageSrc: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55',
    year: '2065',
    category: 'Minimalist Art'
  }
];

enum ViewMode {
  GRID = 'grid',
  LIST = 'list',
}

enum FilterType {
  ALL = 'all',
  YEAR = 'year',
  CATEGORY = 'category',
}

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [projects, setProjects] = useState(projectsData);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command menu with Ctrl+K or Command+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(true);
        return;
      }
      
      switch (e.key) {
        case 'g':
          setViewMode(ViewMode.GRID);
          break;
        case 'l':
          setViewMode(ViewMode.LIST);
          break;
        case 'a':
          setFilterType(FilterType.ALL);
          setActiveFilter('');
          break;
        case 'y':
          setFilterType(FilterType.YEAR);
          break;
        case 'c':
          setFilterType(FilterType.CATEGORY);
          break;
        case 'f':
          // Focus search input when 'f' is pressed
          const searchInput = document.getElementById('project-search');
          if (searchInput) searchInput.focus();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Filter projects based on active filter and search term
    let filteredProjects = projectsData;
    
    if (filterType !== FilterType.ALL && activeFilter) {
      filteredProjects = filteredProjects.filter(project => {
        if (filterType === FilterType.YEAR) {
          return project.year === activeFilter;
        } else if (filterType === FilterType.CATEGORY) {
          return project.category === activeFilter;
        }
        return true;
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        project.category.toLowerCase().includes(term)
      );
    }
    
    setProjects(filteredProjects);
  }, [filterType, activeFilter, searchTerm]);

  const getUniqueFilterValues = (key: 'year' | 'category') => {
    return [...new Set(projectsData.map(project => project[key]))];
  };

  return (
    <>
      <StarfieldBackground />
      <NavBar />
      
      <main className="min-h-screen pt-16 crt-screen">
        <div className="container mx-auto px-4 py-8">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-pixel text-cyber-neon-green mb-2">PROJECT GALLERY</h1>
                <p className="text-gray-400 max-w-2xl font-future">Explore the digital archives of pixel creations from across timelines and dimensions.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-cyber-dark border border-cyber-neon-blue p-1 flex rounded-sm">
                  <button
                    onClick={() => setViewMode(ViewMode.GRID)}
                    className={`p-2 transition-colors ${viewMode === ViewMode.GRID ? 'bg-cyber-neon-blue text-cyber-black' : 'text-cyber-neon-blue'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode(ViewMode.LIST)}
                    className={`p-2 transition-colors ${viewMode === ViewMode.LIST ? 'bg-cyber-neon-blue text-cyber-black' : 'text-cyber-neon-blue'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <div className="bg-cyber-dark border border-cyber-neon-green p-1 flex rounded-sm">
                  <button
                    onClick={() => {
                      setFilterType(FilterType.ALL);
                      setActiveFilter('');
                    }}
                    className={`p-2 text-xs font-pixel transition-colors ${filterType === FilterType.ALL ? 'bg-cyber-neon-green text-cyber-black' : 'text-cyber-neon-green'}`}
                  >
                    ALL
                  </button>
                  <button
                    onClick={() => setFilterType(FilterType.YEAR)}
                    className={`p-2 transition-colors ${filterType === FilterType.YEAR ? 'bg-cyber-neon-green text-cyber-black' : 'text-cyber-neon-green'}`}
                  >
                    <Calendar size={18} />
                  </button>
                  <button
                    onClick={() => setFilterType(FilterType.CATEGORY)}
                    className={`p-2 transition-colors ${filterType === FilterType.CATEGORY ? 'bg-cyber-neon-green text-cyber-black' : 'text-cyber-neon-green'}`}
                  >
                    <Gamepad2 size={18} />
                  </button>
                </div>
                
                {/* Command Menu Button */}
                <button 
                  onClick={() => setIsCommandMenuOpen(true)}
                  className="bg-cyber-dark border border-cyber-neon-pink p-2 text-cyber-neon-pink hover:bg-cyber-neon-pink hover:text-cyber-black transition-colors"
                >
                  <Command size={18} />
                </button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-cyber-neon-green" />
                </div>
                <input
                  id="project-search"
                  type="text"
                  className="block w-full p-2 pl-10 bg-cyber-dark border border-cyber-neon-green text-white font-mono placeholder-gray-500 focus:ring-cyber-neon-green focus:border-cyber-neon-green"
                  placeholder="Search projects... (Press 'f' to focus)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-cyber-neon-pink"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            {/* Filter options */}
            {filterType !== FilterType.ALL && (
              <div className="mb-6 flex gap-2 flex-wrap">
                {filterType === FilterType.YEAR && getUniqueFilterValues('year').map(year => (
                  <button
                    key={year}
                    onClick={() => setActiveFilter(year)}
                    className={`px-3 py-1 text-xs font-pixel transition-colors border ${
                      activeFilter === year 
                        ? 'bg-cyber-neon-blue text-cyber-black border-cyber-neon-blue' 
                        : 'text-cyber-neon-blue border-cyber-neon-blue/30 hover:border-cyber-neon-blue'
                    }`}
                  >
                    {year}
                  </button>
                ))}
                
                {filterType === FilterType.CATEGORY && getUniqueFilterValues('category').map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1 text-xs font-pixel transition-colors border ${
                      activeFilter === category 
                        ? 'bg-cyber-neon-blue text-cyber-black border-cyber-neon-blue' 
                        : 'text-cyber-neon-blue border-cyber-neon-blue/30 hover:border-cyber-neon-blue'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            
            {/* Project Counter */}
            <div className="text-center mb-4 font-mono text-sm text-cyber-neon-blue">
              <span className="bg-cyber-dark px-2 py-1 rounded-sm border border-cyber-neon-blue/30">
                {projects.length} PROJECT{projects.length !== 1 ? 'S' : ''} FOUND
              </span>
            </div>
            
            {/* Grid View */}
            {viewMode === ViewMode.GRID && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      imageSrc={project.imageSrc}
                      year={project.year}
                      category={project.category}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-cyber-neon-pink text-2xl font-pixel mb-4">NO PROJECTS FOUND</div>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                    <button 
                      onClick={() => { 
                        setFilterType(FilterType.ALL);
                        setActiveFilter('');
                        setSearchTerm('');
                      }}
                      className="px-4 py-2 bg-cyber-neon-blue text-cyber-black font-pixel"
                    >
                      RESET FILTERS
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* List View */}
            {viewMode === ViewMode.LIST && (
              <div className={`space-y-4 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div 
                      key={project.id}
                      className="border border-cyber-neon-blue bg-cyber-dark bg-opacity-80 hover:bg-opacity-100 transition-all hover:border-cyber-neon-green p-4 pixel-corners"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-24 h-24 relative overflow-hidden pixel-corners">
                          <img src={project.imageSrc} alt={project.title} className="object-cover w-full h-full" />
                          {/* Scan lines effect */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-pixel text-cyber-neon-green">{project.title}</h3>
                            <span className="text-xs font-mono text-cyber-neon-blue">{project.year}</span>
                          </div>
                          
                          <p className="text-gray-300 text-sm my-2">{project.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-mono">{project.category}</span>
                            <a 
                              href={`/project/${project.id}`} 
                              className="text-cyber-neon-green hover:text-cyber-neon-yellow text-sm font-pixel transition-colors"
                            >
                              VIEW PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border border-cyber-neon-pink bg-cyber-dark bg-opacity-80 pixel-corners">
                    <div className="text-cyber-neon-pink text-2xl font-pixel mb-4">NO PROJECTS FOUND</div>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                    <button 
                      onClick={() => { 
                        setFilterType(FilterType.ALL);
                        setActiveFilter('');
                        setSearchTerm('');
                      }}
                      className="px-4 py-2 bg-cyber-neon-blue text-cyber-black font-pixel"
                    >
                      RESET FILTERS
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Terminal Section */}
            <div className="mt-12">
              <Terminal className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </main>
      
      {/* Command Menu Modal */}
      {isCommandMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-cyber-dark border-2 border-cyber-neon-blue w-full max-w-md pixel-corners overflow-hidden"
            style={{ maxHeight: '80vh' }}
          >
            <div className="p-3 border-b border-cyber-neon-blue flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Command size={16} className="text-cyber-neon-blue" />
                <span className="text-cyber-neon-blue font-pixel">COMMAND CENTER</span>
              </div>
              <button 
                onClick={() => setIsCommandMenuOpen(false)}
                className="text-gray-400 hover:text-cyber-neon-pink"
              >
                ×
              </button>
            </div>
            
            <div className="p-2 border-b border-cyber-neon-blue/50">
              <input 
                type="text"
                placeholder="Type a command..."
                className="w-full bg-cyber-black p-2 text-white font-mono focus:outline-none"
                autoFocus
              />
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 100px)' }}>
              <div className="p-2 text-xs text-gray-400">NAVIGATION</div>
              
              <div className="command-items">
                {['Home', 'Gallery', 'About', 'Contact'].map(item => (
                  <button 
                    key={item}
                    className="w-full text-left p-2 hover:bg-cyber-neon-blue/20 flex justify-between"
                    onClick={() => {
                      setIsCommandMenuOpen(false);
                      navigate(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`);
                    }}
                  >
                    <span className="text-white">{item}</span>
                    <span className="text-gray-500">Go to {item}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-2 text-xs text-gray-400 mt-2">VIEW OPTIONS</div>
              
              <div className="command-items">
                {[
                  { name: 'Grid View', action: () => setViewMode(ViewMode.GRID) },
                  { name: 'List View', action: () => setViewMode(ViewMode.LIST) },
                  { name: 'All Projects', action: () => { 
                    setFilterType(FilterType.ALL); 
                    setActiveFilter(''); 
                  }},
                  { name: 'Filter by Year', action: () => setFilterType(FilterType.YEAR) },
                  { name: 'Filter by Category', action: () => setFilterType(FilterType.CATEGORY) }
                ].map(item => (
                  <button 
                    key={item.name}
                    className="w-full text-left p-2 hover:bg-cyber-neon-blue/20 flex justify-between"
                    onClick={() => {
                      item.action();
                      setIsCommandMenuOpen(false);
                    }}
                  >
                    <span className="text-white">{item.name}</span>
                    <span className="text-gray-500">Switch view</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
