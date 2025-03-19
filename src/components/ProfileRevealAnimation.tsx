
import React, { useEffect, useState } from 'react';

const ProfileRevealAnimation: React.FC = () => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
      {/* Background blur/glow effect */}
      <div className="absolute inset-0 bg-cyberdark/80 backdrop-blur-md animate-fade-in" />
      
      {/* Expanding circular reveal */}
      <div className="absolute h-full w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-64 w-64 rounded-full bg-cyberpink/20 animate-pulse-light shadow-[0_0_40px_20px_rgba(215,70,239,0.3)]" />
        </div>
      </div>
      
      {/* Text announcement */}
      <div className="relative text-center animate-reveal">
        <div className="text-xs font-medium text-cyberpink mb-1 animate-cyber-glow">
          IDENTITY UNLOCKED
        </div>
        <div className="text-2xl font-bold mb-2 cyber-gradient-text">
          Profile Revealed
        </div>
        <div className="text-sm text-white/70">
          Your digital identity has been revealed to the network
        </div>
      </div>
    </div>
  );
};

export default ProfileRevealAnimation;
