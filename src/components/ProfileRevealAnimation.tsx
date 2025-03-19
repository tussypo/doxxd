
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
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm animate-fade-in" />
      
      {/* Expanding circular reveal */}
      <div className="absolute h-full w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-64 w-64 rounded-full bg-black/5 animate-pulse-light" />
        </div>
      </div>
      
      {/* Text announcement */}
      <div className="relative text-center animate-reveal">
        <div className="text-xs font-medium text-black/70 mb-1">
          Congratulations!
        </div>
        <div className="text-2xl font-bold mb-2">
          Profile Revealed
        </div>
        <div className="text-sm text-black/70">
          Your identity has been revealed to the community
        </div>
      </div>
    </div>
  );
};

export default ProfileRevealAnimation;
