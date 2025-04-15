
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className = '' }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initial terminal messages
  const initialMessages = [
    "> SYSTEM INITIALIZED",
    "> CONNECTING TO PIXEL VAULT DATABASE...",
    "> CONNECTION ESTABLISHED",
    "> PIXEL_VAULT OS v3.7.2 READY",
    "> TYPE 'HELP' FOR AVAILABLE COMMANDS"
  ];

  useEffect(() => {
    // Display initial boot messages with typing effect
    let currentLines: string[] = [];
    
    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        currentLines = [...currentLines, msg];
        setLines([...currentLines]);
      }, index * 700);
    });

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever lines change
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    
    if (lowerCmd === 'help') {
      return [
        "AVAILABLE COMMANDS:",
        "- HELP: Show this help message",
        "- ABOUT: Display information about the creator",
        "- PROJECTS: List available projects",
        "- CLEAR: Clear the terminal",
        "- STATUS: Show system status"
      ];
    } else if (lowerCmd === 'about') {
      return [
        "PIXEL VAULT CHRONICLES",
        "A retro-futuristic portfolio experience",
        "Created by a time-traveling digital artist",
        "Version 3.7.2 (c) 2085"
      ];
    } else if (lowerCmd === 'projects') {
      return [
        "PROJECT DATABASE ACCESS GRANTED",
        "- Neon Dreams (2085)",
        "- Cyber Relic (2082)",
        "- Quantum Pixel (2079)",
        "- Retro Revival (2077)",
        "- Digital Nostalgia (2075)",
        "TYPE 'OPEN [PROJECT NAME]' TO ACCESS"
      ];
    } else if (lowerCmd === 'clear') {
      setLines([]);
      return [];
    } else if (lowerCmd === 'status') {
      return [
        "SYSTEM STATUS:",
        "- Memory: 87% available",
        "- Projects: 5 indexed",
        "- Connection: Stable",
        "- Security: Active (no threats detected)"
      ];
    } else if (lowerCmd.startsWith('open ')) {
      const projectName = lowerCmd.slice(5);
      return [
        `ATTEMPTING TO ACCESS PROJECT: ${projectName.toUpperCase()}`,
        "...",
        "ACCESS GRANTED. LOADING PROJECT DATA..."
      ];
    } else if (lowerCmd === '') {
      return [];
    } else {
      return [`COMMAND NOT RECOGNIZED: ${cmd}`];
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newLines = [
        ...lines,
        `> ${currentInput}`
      ];
      
      const response = handleCommand(currentInput);
      
      setLines([...newLines, ...response]);
      setCurrentInput('');
    }
  };

  return (
    <div className={`border border-cyber-neon-blue bg-cyber-black bg-opacity-90 pixel-corners overflow-hidden ${className}`}>
      <div className="bg-cyber-dark px-3 py-1 flex items-center justify-between border-b border-cyber-neon-blue">
        <div className="text-cyber-neon-blue font-pixel text-xs">TERMINAL v3.7.2</div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-3 h-full max-h-60 overflow-y-auto font-mono text-xs text-gray-300 scrollbar-thin scrollbar-thumb-cyber-neon-blue scrollbar-track-transparent"
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1">{line}</div>
        ))}
        <div className="flex">
          <span className="text-cyber-neon-green">{'>'}</span>
          <span className="ml-1">{currentInput}</span>
          {cursorVisible && <span className="ml-px inline-block w-2 h-4 bg-cyber-neon-green animate-pulse"></span>}
        </div>
      </div>
      
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute -z-10"
        autoFocus
      />
    </div>
  );
};

export default Terminal;
