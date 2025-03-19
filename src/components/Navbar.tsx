
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { User, Home, BarChart2, PlusCircle, Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Trending', path: '/trending', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "bg-cyberdark/80 backdrop-blur-md shadow-[0_4px_15px_-2px_rgba(0,0,0,0.3)]" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-cyberpink to-cyberpurple animate-cyber-glow">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="text-xl font-bold"><Zap className="h-5 w-5" /></span>
            </div>
          </div>
          <span className="cyber-gradient-text text-lg tracking-wider">doXXd</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyberpink to-cyberpurple text-white shadow-[0_0_8px_rgba(215,70,239,0.5)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <button 
            className="ml-4 flex items-center gap-2 bg-gradient-to-r from-cyberpink to-cyberpurple text-white rounded-md px-4 py-2 text-sm font-medium hover:opacity-90 btn-hover shadow-[0_0_10px_rgba(215,70,239,0.5)]"
          >
            <PlusCircle className="h-4 w-4" />
            Create Post
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className="h-6 w-6 text-cyberpink" /> : 
            <Menu className="h-6 w-6 text-cyberpink" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyberdark/90 backdrop-blur-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] animate-slide-down border-t border-white/5">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-gradient-to-r from-cyberpink to-cyberpurple text-white shadow-[0_0_8px_rgba(215,70,239,0.5)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <button 
              className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyberpink to-cyberpurple text-white rounded-md px-4 py-3 text-sm font-medium hover:opacity-90 btn-hover shadow-[0_0_10px_rgba(215,70,239,0.5)]"
            >
              <PlusCircle className="h-4 w-4" />
              Create Post
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
