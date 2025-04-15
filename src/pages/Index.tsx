
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarfieldBackground from '../components/StarfieldBackground';
import BootSequence from '../components/BootSequence';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a boot sequence
    const timer = setTimeout(() => {
      setLoading(false);
      // Navigate to home page after boot sequence completes
      navigate('/home');
    }, 5000); // 5 seconds for boot sequence

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-cyber-black overflow-hidden">
      <StarfieldBackground />
      
      {loading ? (
        <BootSequence />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-cyber-neon-green font-pixel text-xl animate-pulse">
            Redirecting to home...
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
