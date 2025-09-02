import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur shadow-md py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => scrollTo('top')}>
          CosmicoAI
        </h1>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <button onClick={() => scrollTo('top')} className="nav-link">Header</button>
          <button onClick={() => scrollTo('#mission')} className="nav-link">Mission</button>
          <button onClick={() => scrollTo('#get-started')} className="nav-link">Get Started</button>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden z-50">
          {menuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center space-y-10 text-2xl">
            <button onClick={() => scrollTo('top')} className="nav-link">Header</button>
            <button onClick={() => scrollTo('#mission')} className="nav-link">Mission</button>
            <button onClick={() => scrollTo('#get-started')} className="nav-link">Get Started</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
