'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAtmosphere } from '@/context/AtmosphereContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── Constants ───────────────────────────────────────────────────────────────
const navLinks = [
  { name: 'Home',               id: '#',          idAttr: undefined,    label: '01 // Main Foyer' },
  { name: 'Gallery Collection', id: '#collection', idAttr: 'collection', label: '02 // Gallery'    },
  { name: 'Contact',            id: '#contact',    idAttr: 'contact',    label: '03 // Atelier'    },
];

// ─── Scroll progress hook ─────────────────────────────────────────────────────
function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return width;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const { setIsCartOpen, totalItems } = useCart();
  const { lightingMode, setLightingMode } = useAtmosphere();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]       = useState('home');
  const [isScrolled, setIsScrolled]             = useState(false);
  const scrollBarWidth = useScrollProgress();

  // ── Intersection + scroll detection ──────────────────────────────────────
  useEffect(() => {
    const targets = ['collection', 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      if (window.scrollY < 150) setActiveSection('home');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
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

  // ── Smooth scroll ─────────────────────────────────────────────────────────
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
      const offsetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(idAttr);
    }
  };

  const activeLink = navLinks.find(
    (l) => (l.idAttr ?? 'home') === activeSection,
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const navBg = isScrolled
    ? 'bg-white/[0.97] dark:bg-[#0b1b2b]/[0.97]'
    : 'bg-white/90 dark:bg-[#0b1b2b]/90';

  return (
    <nav
      className={`
        w-full sticky top-0 z-[9999]
        font-[family:var(--font-jost)] select-none
        transition-[background,border-color,box-shadow] duration-500
        ${navBg}
        border-b border-[#0f2236]/[0.07] dark:border-white/[0.06]
        backdrop-blur-[18px] saturate-150
        ${isScrolled ? 'shadow-[0_1px_24px_rgba(15,34,54,0.06)]' : ''}
      `}
    >
      {/* ── Scroll Progress Line ─────────────────────────────────────────── */}
      <motion.div
        style={{ width: scrollBarWidth }}
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#f1ae2c] via-[#f1ae2c]/70 to-transparent pointer-events-none z-10"
      />

      {/* ── Main Row ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] h-[68px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">

        {/* Brand */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, undefined)}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <span className="font-[family:var(--font-cormorant)] text-[26px] font-semibold tracking-[0.12em] text-[#0f2236] dark:text-slate-100 group-hover:text-[#f1ae2c] transition-colors duration-300">
            UYAD
          </span>
          <span className="hidden sm:inline-flex items-center text-[7.5px] font-bold uppercase tracking-[0.28em] text-[#f1ae2c] border border-[#f1ae2c]/35 rounded-[2px] px-1.5 py-[3px]">
            Premium
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center h-full gap-0.5">
          {navLinks.map((link) => {
            const linkId  = link.idAttr ?? 'home';
            const isActive = activeSection === linkId;

            return (
              <a
                key={link.name}
                href={link.id}
                onClick={(e) => handleScrollTo(e, link.idAttr)}
                className={`
                  relative flex items-center h-11 px-4
                  text-[9.5px] font-bold uppercase tracking-[0.22em]
                  rounded-[3px] transition-colors duration-250
                  ${isActive
                    ? 'text-[#0f2236] dark:text-white'
                    : 'text-[#0f2236]/38 dark:text-slate-400/50 hover:text-[#0f2236] dark:hover:text-white'}
                `}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Active frame with animated corners */}
                {isActive && (
                  <motion.div
                    layoutId="navActiveFrame"
                    className="absolute inset-0 rounded-[3px] border border-[#0f2236]/[0.09] bg-[#0f2236]/[0.015] dark:border-white/[0.08] dark:bg-white/[0.01] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  >
                    <span className="absolute top-0 left-0 w-[6px] h-[6px] border-t-[1.5px] border-l-[1.5px] border-[#f1ae2c]" />
                    <span className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b-[1.5px] border-r-[1.5px] border-[#f1ae2c]" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3.5 shrink-0">

          {/* Atmosphere toggle */}
          <div className="flex items-center gap-[2px] bg-[#0f2236]/[0.03] dark:bg-white/[0.03] border border-[#0f2236]/[0.07] dark:border-white/[0.06] rounded-full p-[3px] transition-colors duration-500">
            <button
              onClick={() => setLightingMode('day')}
              className={`
                h-7 px-3 rounded-full text-[8.5px] font-bold uppercase tracking-[0.18em]
                flex items-center gap-[5px] transition-all duration-250 cursor-pointer
                ${lightingMode === 'day'
                  ? 'bg-white dark:bg-white/10 text-[#0f2236] dark:text-white shadow-[0_1px_4px_rgba(15,34,54,0.08)]'
                  : 'text-[#0f2236]/40 dark:text-slate-400 hover:text-[#0f2236] dark:hover:text-white'}
              `}
            >
              <i className="ri-sun-line text-[11px] text-[#f1ae2c]" />
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`
                h-7 px-3 rounded-full text-[8.5px] font-bold uppercase tracking-[0.18em]
                flex items-center gap-[5px] transition-all duration-250 cursor-pointer
                ${lightingMode === 'night'
                  ? 'bg-[#0f2236] text-white shadow-[0_1px_4px_rgba(15,34,54,0.15)]'
                  : 'text-[#0f2236]/40 dark:text-slate-400 hover:text-[#0f2236] dark:hover:text-white'}
              `}
            >
              <i className="ri-moon-clear-line text-[11px] text-[#f1ae2c]" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Room metadata */}
          <div className="hidden lg:block text-right border-r border-[#0f2236]/[0.08] dark:border-white/[0.08] pr-4 transition-colors duration-500">
            <span className="block text-[7px] font-bold uppercase tracking-[0.3em] text-[#0f2236]/30 dark:text-slate-400/40 mb-[3px]">
              Atmosphere
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSection}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="block text-[8px] font-bold uppercase tracking-[0.18em] text-[#f1ae2c]"
              >
                {activeLink?.label ?? '01 // Main Foyer'}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Cart button */}
          <motion.button
            onClick={() => setIsCartOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="
              flex items-center gap-2 h-9 px-[18px] rounded-full cursor-pointer
              text-[9px] font-bold uppercase tracking-[0.2em]
              border border-[#0f2236]/[0.1] bg-[#0f2236]/[0.03]
              text-[#0f2236] dark:text-white dark:border-white/[0.08] dark:bg-white/[0.04]
              hover:bg-[#0f2236] hover:text-white hover:border-[#0f2236]
              dark:hover:bg-white dark:hover:text-[#0f2236]
              transition-colors duration-250
            "
          >
            <div className="relative">
              <i className="ri-shopping-bag-3-line text-[14px] block" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#f1ae2c] rounded-full"
                />
              )}
            </div>
            <span>Bag ({totalItems})</span>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            className="p-2 text-[#0f2236] dark:text-white md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.i
              key={isMobileMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -15, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.18 }}
              className={`text-[20px] block ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'}`}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="
              overflow-hidden md:hidden
              border-b border-[#0f2236]/[0.08] dark:border-white/[0.07]
              bg-white/[0.98] dark:bg-[#0b1b2b]/[0.98]
              backdrop-blur-[18px]
            "
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const linkId   = link.idAttr ?? 'home';
                const isActive = activeSection === linkId;

                return (
                  <motion.a
                    key={link.name}
                    href={link.id}
                    onClick={(e) => handleScrollTo(e, link.idAttr)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.22 }}
                    className={`
                      flex items-center justify-between
                      px-4 py-3 rounded-md
                      text-[10px] font-bold uppercase tracking-[0.18em]
                      transition-all duration-200
                      ${isActive
                        ? 'bg-[#0f2236]/[0.04] dark:bg-white/[0.05] text-[#0f2236] dark:text-white border-l-2 border-[#f1ae2c] pl-[14px]'
                        : 'text-[#0f2236]/55 dark:text-slate-300 hover:bg-[#0f2236]/[0.03] dark:hover:bg-white/[0.04]'}
                    `}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="text-[7.5px] font-bold uppercase tracking-[0.2em] text-[#f1ae2c]">
                        Active
                      </span>
                    )}
                  </motion.a>
                );
              })}

              {/* Mobile atmosphere toggle */}
              <div className="mt-3 pt-3 border-t border-[#0f2236]/[0.06] dark:border-white/[0.06] flex items-center gap-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#0f2236]/35 dark:text-slate-400/40">
                  Mode
                </span>
                <div className="flex items-center gap-[2px] bg-[#0f2236]/[0.03] border border-[#0f2236]/[0.07] dark:border-white/[0.06] rounded-full p-[2px]">
                  <button
                    onClick={() => setLightingMode('day')}
                    className={`h-6 px-3 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 cursor-pointer
                      ${lightingMode === 'day' ? 'bg-white text-[#0f2236] shadow-sm' : 'text-[#0f2236]/40 dark:text-slate-400'}`}
                  >
                    <i className="ri-sun-line text-[10px] text-[#f1ae2c]" /> Light
                  </button>
                  <button
                    onClick={() => setLightingMode('night')}
                    className={`h-6 px-3 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 cursor-pointer
                      ${lightingMode === 'night' ? 'bg-[#0f2236] text-white' : 'text-[#0f2236]/40 dark:text-slate-400'}`}
                  >
                    <i className="ri-moon-clear-line text-[10px] text-[#f1ae2c]" /> Dark
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}