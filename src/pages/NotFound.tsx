
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StarfieldBackground from '../components/StarfieldBackground';
import { Home, RotateCcw } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [glitchLevel, setGlitchLevel] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 5 });
  const [collectibles, setCollectibles] = useState<Array<{ x: number, y: number, collected: boolean }>>(
    Array(5).fill(null).map(() => ({
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      collected: false
    }))
  );
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Increase glitch effect over time
    const glitchInterval = setInterval(() => {
      setGlitchLevel(prev => Math.min(prev + 0.2, 5));
    }, 2000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Error sound
    const errorSound = new Audio('/sounds/error.mp3');
    errorSound.volume = 0.3;
    errorSound.play().catch(error => console.error('Error playing error sound:', error));

    return () => {
      clearInterval(glitchInterval);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  // Handle keyboard controls for mini-game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showInstructions) {
        setShowInstructions(false);
        return;
      }

      let newX = playerPosition.x;
      let newY = playerPosition.y;

      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          newY = Math.max(0, playerPosition.y - 1);
          break;
        case 's':
        case 'ArrowDown':
          newY = Math.min(9, playerPosition.y + 1);
          break;
        case 'a':
        case 'ArrowLeft':
          newX = Math.max(0, playerPosition.x - 1);
          break;
        case 'd':
        case 'ArrowRight':
          newX = Math.min(9, playerPosition.x + 1);
          break;
        default:
          return;
      }

      // Play move sound
      const moveSound = new Audio('/sounds/move.mp3');
      moveSound.volume = 0.1;
      moveSound.play().catch(error => console.error('Error playing move sound:', error));

      setPlayerPosition({ x: newX, y: newY });

      // Check for collectibles
      const newCollectibles = [...collectibles];
      const collectibleIndex = newCollectibles.findIndex(
        c => c.x === newX && c.y === newY && !c.collected
      );

      if (collectibleIndex !== -1) {
        // Play collect sound
        const collectSound = new Audio('/sounds/collect.mp3');
        collectSound.volume = 0.2;
        collectSound.play().catch(error => console.error('Error playing collect sound:', error));

        newCollectibles[collectibleIndex].collected = true;
        setCollectibles(newCollectibles);

        // Add some time to the countdown
        setCountdown(prev => prev + 2);
      }

      // Check if all collectibles are collected
      if (newCollectibles.every(c => c.collected)) {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, collectibles, navigate, showInstructions]);

  // Render grid cell
  const renderCell = (x: number, y: number) => {
    // Player
    if (playerPosition.x === x && playerPosition.y === y) {
      return (
        <div className="w-full h-full bg-cyber-neon-green flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-cyber-black"></div>
        </div>
      );
    }

    // Collectible
    const collectible = collectibles.find(c => c.x === x && c.y === y);
    if (collectible && !collectible.collected) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 bg-cyber-neon-pink animate-pulse-glow"></div>
        </div>
      );
    }

    // Empty cell
    return null;
  };

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center crt-screen p-4">
      <StarfieldBackground />

      <div className={`text-center mb-6 transition-all ${glitchLevel > 2 ? 'animate-glitch' : ''}`}>
        <h1
          className="text-6xl md:text-8xl font-pixel text-cyber-neon-pink mb-2"
          style={{
            textShadow: `0 0 ${glitchLevel * 2}px rgba(255, 0, 255, 0.8), 
                       ${glitchLevel}px ${glitchLevel}px 0 rgba(0, 255, 255, 0.5),
                       -${glitchLevel}px -${glitchLevel}px 0 rgba(0, 255, 0, 0.5)`
          }}
        >
          404
        </h1>
        <p className="text-xl text-cyber-neon-blue font-future mb-4">TIMELINE FRACTURE DETECTED</p>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          The requested digital artifact does not exist in this dimension. System will auto-redirect in {countdown} seconds.
        </p>
      </div>

      {showInstructions ? (
        <div className="border-2 border-cyber-neon-green pixel-corners p-6 bg-cyber-dark bg-opacity-80 max-w-md mb-8">
          <h2 className="font-pixel text-cyber-neon-green mb-4 text-center">RECOVERY MINI-GAME</h2>
          <p className="text-gray-300 mb-4">
            Collect the lost pixel fragments to repair the timeline and find your way back to the main system.
          </p>
          <div className="text-cyber-neon-blue mb-4">
            <p className="text-sm font-pixel mb-2">CONTROLS:</p>
            <ul className="text-sm space-y-1">
              <li>W / ↑ : Move Up</li>
              <li>S / ↓ : Move Down</li>
              <li>A / ← : Move Left</li>
              <li>D / → : Move Right</li>
            </ul>
          </div>
          <p className="text-center text-cyber-neon-pink text-sm mt-4">
            Press any key to start the recovery process
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <div className="border-2 border-cyber-neon-blue pixel-corners p-2 bg-cyber-dark bg-opacity-80">
            <div className="grid grid-cols-10 gap-1" style={{ width: '300px', height: '300px' }}>
              {Array(10).fill(null).map((_, y) =>
                Array(10).fill(null).map((_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="border border-cyber-neon-blue/30 flex items-center justify-center"
                  >
                    {renderCell(x, y)}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="text-center mt-2 text-cyber-neon-green text-sm">
            Fragments Recovered: {collectibles.filter(c => c.collected).length}/{collectibles.length}
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-cyber-neon-blue text-cyber-black font-pixel px-4 py-2 hover:bg-cyber-neon-blue/80 transition-colors"
        >
          <Home size={16} />
          <span>RETURN HOME</span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-transparent border border-cyber-neon-pink text-cyber-neon-pink font-pixel px-4 py-2 hover:bg-cyber-neon-pink/10 transition-colors"
        >
          <RotateCcw size={16} />
          <span>GO BACK</span>
        </button>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)]"
          style={{ backgroundSize: `100% ${4 + glitchLevel}px` }}
        ></div>
        <div
          className="absolute inset-0 animate-scanline bg-[linear-gradient(to_bottom,transparent,rgba(255,0,255,0.1),transparent)]"
          style={{ height: `${10 + glitchLevel * 5}px` }}
        ></div>
      </div>
    </div>
  );
};

export default NotFound;
