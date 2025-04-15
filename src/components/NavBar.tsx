
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Send, User, Terminal } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showKeyControls, setShowKeyControls] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?') {
        setShowKeyControls(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  const navItems = [
    { path: '/home', label: 'HOME', icon: <Home size={16} /> },
    { path: '/gallery', label: 'GALLERY', icon: <Grid size={16} /> },
    { path: '/projects', label: 'PROJECTS', icon: <Terminal size={16} /> },
    { path: '/contact', label: 'CONTACT', icon: <Send size={16} /> },
    { path: '/about', label: 'ABOUT', icon: <User size={16} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-neon-blue bg-cyber-black bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center gap-2 text-cyber-neon-green font-pixel text-lg tracking-wider"
          >
            <div className="relative inline-block">
              <div className="w-8 h-8 bg-cyber-neon-green animate-pulse-glow flex items-center justify-center pixel-corners">
                <div className="w-6 h-6 bg-cyber-black flex items-center justify-center">
                  <div className="w-4 h-4 bg-cyber-neon-green"></div>
                </div>
              </div>
            </div>
            <span>PIXEL_VAULT</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-pixel transition-all duration-300 hover:text-cyber-neon-green group ${
                  location.pathname === item.path
                    ? 'text-cyber-neon-green border border-cyber-neon-green pixel-corners'
                    : 'text-gray-400'
                }`}
              >
                <span className="group-hover:animate-pulse">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Status Bar */}
          <div className="flex items-center gap-4">
            <div className="text-cyber-neon-blue font-pixel text-xs">
              <span>{formattedTime}</span>
              <span className="mx-1">|</span>
              <span>{formattedDate}</span>
            </div>
            <button
              onClick={() => setShowKeyControls(prev => !prev)}
              className="text-cyber-neon-blue hover:text-cyber-neon-green transition-colors"
            >
              <span className="border border-current px-2 py-1 text-xs font-pixel">?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-cyber-neon-blue bg-cyber-black">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 text-xs ${
                location.pathname === item.path
                  ? 'text-cyber-neon-green'
                  : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="mt-1 font-pixel text-[8px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Keyboard Controls Modal */}
      {showKeyControls && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowKeyControls(false)}>
          <div className="bg-cyber-dark border border-cyber-neon-blue p-6 max-w-md w-full pixel-corners" onClick={e => e.stopPropagation()}>
            <h3 className="text-cyber-neon-blue font-pixel text-lg mb-4">KEYBOARD CONTROLS</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Navigation</span>
                <span className="text-cyber-neon-green">W A S D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Select Project</span>
                <span className="text-cyber-neon-green">ENTER</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Back</span>
                <span className="text-cyber-neon-green">ESC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Help</span>
                <span className="text-cyber-neon-green">?</span>
              </div>
            </div>
            <button 
              className="mt-6 w-full border border-cyber-neon-pink text-cyber-neon-pink hover:bg-cyber-neon-pink hover:text-cyber-black transition-colors py-2 px-4 font-pixel text-sm"
              onClick={() => setShowKeyControls(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
