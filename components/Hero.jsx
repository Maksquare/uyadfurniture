'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SceneCanvas from './3d/SceneCanvas';
import FurnitureModel from './3d/FurnitureModel';

// Expanded Premium Material Swatches
const COLOR_SWATCHES = [
  { id: 'blue', hex: '#143755', name: 'Imperial Blue Velvet', tailwindBg: '#143755' },
  { id: 'green', hex: '#2D4A3E', name: 'Deep Navy Green Velvet', tailwindBg: '#2D4A3E' },
  { id: 'terracotta', hex: '#C25A3F', name: 'Burnt Terracotta Leather', tailwindBg: '#C25A3F' },
  { id: 'gold', hex: '#f1ae2c', name: 'Signature Gold Leather', tailwindBg: '#f1ae2c' },
  { id: 'alabaster', hex: '#EAE6DF', name: 'Alabaster Bouclé', tailwindBg: '#EAE6DF' },
  { id: 'charcoal', hex: '#334155', name: 'Charcoal Bouclé', tailwindBg: '#334155' },
];

export default function Hero() {
  const [activeColor, setActiveColor] = useState(COLOR_SWATCHES[0]);

  return (
    <section id="home" className="relative z-20 flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-6 py-20 xl:rounded-bl-[200px]">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        
        {/* Left Side: Copywriting Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-accent">Bespoke Customization</span>
          <h1 className="font-serif text-4xl text-primary leading-tight md:text-6xl mb-6">
            Designed For Comfort, <span className="text-accent italic">Tailored</span> By You
          </h1>
          <p className="max-w-lg text-lg font-light leading-relaxed text-secondary mb-8">
            Select a custom fabric finish directly from our digital showroom profile to preview your piece instantly.
          </p>
          
          {/* Interactive Material Swapper Badges */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-secondary sm:pt-2">Finish:</span>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setActiveColor(swatch)}
                  title={swatch.name}
                  style={{ backgroundColor: swatch.tailwindBg }}
                  className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-300 border border-black/10 ${
                    activeColor.id === swatch.id 
                      ? 'ring-4 ring-offset-2 ring-accent scale-110' 
                      : 'hover:scale-105 opacity-90'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mb-8 text-xs font-medium uppercase tracking-widest text-accent-hover min-h-[20px]">
            {activeColor.name}
          </div>

          <a href="#collection" className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wide text-white transition-all duration-300 hover:bg-accent hover:-translate-y-0.5">
            Explore Collection
            <i className="ri-arrow-right-line text-accent transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white" />
          </a>
        </div>

        {/* Right Side: Responsive Live 3D Scene Viewport */}
        <div className="relative h-[400px] w-full rounded-3xl border border-primary/5 bg-gradient-to-br from-white to-accent-secondary shadow-xl md:h-[550px]">
          <div className="pointer-events-none absolute top-6 left-6 z-30">
            <span className="rounded-full bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-accent animate-pulse">
              Live Material Preview
            </span>
          </div>
          
          <SceneCanvas autoRotate={false}>
            <FurnitureModel 
              modelPath="/models/hero_chair.glb" 
              customColor={activeColor.hex} 
            />
          </SceneCanvas>
        </div>

      </div>
    </section>
  );
}