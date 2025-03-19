
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { User, Home, BarChart2, PlusCircle, Menu, X } from 'lucide-react';

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
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-black">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="text-xl font-bold">A</span>
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight">Anonym</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-black text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <button 
            className="ml-4 flex items-center gap-2 bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-black/90 btn-hover"
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
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md animate-slide-down">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-black text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <button 
              className="mt-2 flex items-center justify-center gap-2 bg-black text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-black/90 btn-hover"
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
