'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAtmosphere } from '@/context/AtmosphereContext'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { setIsCartOpen, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Connect cleanly to your new global atmosphere engine
  const { lightingMode, setLightingMode } = useAtmosphere();

  const navLinks = [
    { name: 'Home', id: 'home', label: '01 // MAIN FOYER' },
    { name: 'Gallery Collection', id: '#collection', idAttr: 'collection', label: '02 // GALLERY' },
    { name: 'Contact', id: '#contact', idAttr: 'contact', label: '03 // ATELIER' },
  ];

  // Auto-detect which area the user is currently walking through
  useEffect(() => {
    const targets = ['collection', 'contact'];
    const handleScroll = () => {
      if (window.scrollY < 150) setActiveSection('home');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      targets.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (e, idAttr) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (!idAttr) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(idAttr);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(idAttr);
    }
  };

  const currentActiveObject = navLinks.find(link => (link.idAttr || 'home') === activeSection);

  return (
    <nav className="w-full h-20 border-b transition-colors duration-500 sticky top-0 z-[9999] backdrop-blur-md font-[family:var(--font-jost)] select-none bg-white/95 border-[#143755]/5 dark:bg-[#0b1b2b]/95 dark:border-white/5">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Title */}
        <a href="#" onClick={(e) => handleScrollTo(e, null)} className="flex items-center gap-2 group cursor-pointer">
          <span className="font-[family:var(--font-dm-serif)] text-2xl font-semibold tracking-wider transition-colors duration-500 text-[#143755] dark:text-slate-100 group-hover:text-[#f1ae2c]">
            UYAD
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#f1ae2c] border border-[#f1ae2c]/30 rounded-xs px-1.5 py-0.5 hidden sm:inline-block">
            Premium
          </span>
        </a>

        {/* ── CENTRAL NAVIGATION LINKS ── */}
        <div className="hidden md:flex items-center gap-2 relative h-full">
          {navLinks.map((link) => {
            const linkIdAttr = link.idAttr || 'home';
            const isCurrentRoom = activeSection === linkIdAttr;

            return (
              <a
                key={link.name}
                href={link.id}
                onClick={(e) => handleScrollTo(e, link.idAttr)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5 rounded-sm transition-colors duration-500 relative group flex items-center h-fit ${
                  isCurrentRoom 
                    ? 'text-[#143755] dark:text-white' 
                    : 'text-[#475569]/60 dark:text-slate-400/50 hover:text-[#143755] dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Spatial Accent Framework Indicators */}
                {isCurrentRoom && (
                  <motion.div 
                    layoutId="navFurnitureFrame"
                    className="absolute inset-0 border pointer-events-none rounded-sm border-[#143755]/10 bg-[#143755]/[0.02] dark:border-white/10 dark:bg-white/[0.01]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#f1ae2c]" />
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#f1ae2c]" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        {/* ── AMBIENT CONTROLS & UTILITIES ── */}
        <div className="flex items-center gap-5">
          
          {/* Creative Studio Light Dial (Linked to global state Context) */}
          <div className="flex items-center gap-2 bg-[#f8fafc] dark:bg-[#12253a] border border-[#143755]/5 dark:border-white/5 rounded-full p-1 transition-colors duration-500">
            <button
              onClick={() => setLightingMode('day')}
              className={`h-7 px-3 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                lightingMode === 'day'
                  ? 'bg-white text-[#143755] shadow-xs'
                  : 'text-[#475569]/50 dark:text-slate-400 hover:text-[#143755] dark:hover:text-white'
              }`}
            >
              <i className="ri-sun-line text-xs text-[#f1ae2c]" /> <span className="hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`h-7 px-3 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                lightingMode === 'night'
                  ? 'bg-[#143755] text-white shadow-xs'
                  : 'text-[#475569]/50 dark:text-slate-400 hover:text-[#143755] dark:hover:text-white'
              }`}
            >
              <i className="ri-moon-clear-line text-xs text-[#f1ae2c]" /> <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Current Room Metadata */}
          <div className="hidden lg:block border-r border-[#143755]/10 dark:border-white/10 pr-4 text-right transition-colors duration-500">
            <span className="block text-[8px] font-bold text-[#475569]/40 dark:text-slate-400/40 tracking-widest uppercase">Atmosphere</span>
            <span className="text-[9px] font-bold text-[#f1ae2c] uppercase tracking-[0.15em]">
              {currentActiveObject?.label || '01 // MAIN FOYER'}
            </span>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 cursor-pointer text-[10px] uppercase tracking-[0.18em] font-bold transition-all duration-500 text-[#143755] bg-[#f8fafc] border border-[#143755]/5 hover:bg-[#143755] hover:text-white dark:bg-[#12253a] dark:text-white dark:border-white/5 dark:hover:bg-white dark:hover:text-[#143755] px-4.5 py-2.5 rounded-full"
          >
            <div className="relative">
              <i className="ri-shopping-bag-3-line text-sm block" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#f1ae2c] rounded-full" />}
            </div>
            <span>Bag ({totalItems})</span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#143755] dark:text-white md:hidden cursor-pointer">
            <i className={`text-xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full shadow-xl flex flex-col p-6 gap-3 md:hidden z-[9998] transition-colors duration-500 bg-white border-b border-[#143755]/10 dark:bg-[#0b1b2b] dark:border-white/10"
          >
            {navLinks.map((link) => {
              const linkIdAttr = link.idAttr || 'home';
              const isCurrentRoom = activeSection === linkIdAttr;

              return (
                <a
                  key={link.name}
                  href={link.id}
                  onClick={(e) => handleScrollTo(e, link.idAttr)}
                  className={`text-[11px] uppercase tracking-[0.15em] font-bold py-3 px-4 transition-all duration-200 rounded-lg flex items-center justify-between ${
                    isCurrentRoom 
                      ? 'bg-[#143755]/5 dark:bg-white/5 text-[#143755] dark:text-white border-l-2 border-[#f1ae2c]' 
                      : 'text-[#475569] dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isCurrentRoom && <span className="text-[8px] font-mono text-[#f1ae2c] tracking-widest">ACTIVE</span>}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}