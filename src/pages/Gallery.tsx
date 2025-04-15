
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';
import ProjectCard from '../components/ProjectCard';
import Terminal from '../components/Terminal';
import { Grid, List, Calendar, Gamepad2 } from 'lucide-react';

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

  useEffect(() => {
    setLoaded(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
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
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Filter projects based on active filter
    if (filterType === FilterType.ALL || !activeFilter) {
      setProjects(projectsData);
    } else {
      setProjects(projectsData.filter(project => {
        if (filterType === FilterType.YEAR) {
          return project.year === activeFilter;
        } else if (filterType === FilterType.CATEGORY) {
          return project.category === activeFilter;
        }
        return true;
      }));
    }
  }, [filterType, activeFilter]);

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
            
            {/* Grid View */}
            {viewMode === ViewMode.GRID && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {projects.map((project, index) => (
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
                ))}
              </div>
            )}
            
            {/* List View */}
            {viewMode === ViewMode.LIST && (
              <div className={`space-y-4 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {projects.map((project, index) => (
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
                ))}
              </div>
            )}
            
            {/* Terminal Section */}
            <div className="mt-12">
              <Terminal className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Gallery;
