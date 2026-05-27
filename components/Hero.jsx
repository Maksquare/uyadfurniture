"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SceneCanvas from "./3d/SceneCanvas";
import FurnitureModel from "./3d/FurnitureModel";

const COLOR_SWATCHES = [
  {
    id: "blue",
    hex: "#143755",
    name: "Imperial Blue Velvet",
    tailwindBg: "#143755",
  },
  {
    id: "green",
    hex: "#2D4A3E",
    name: "Deep Navy Green Velvet",
    tailwindBg: "#2D4A3E",
  },
  {
    id: "terracotta",
    hex: "#C25A3F",
    name: "Burnt Terracotta Leather",
    tailwindBg: "#C25A3F",
  },
  {
    id: "gold",
    hex: "#f1ae2c",
    name: "Signature Gold Leather",
    tailwindBg: "#f1ae2c",
  },
  {
    id: "alabaster",
    hex: "#EAE6DF",
    name: "Alabaster Bouclé",
    tailwindBg: "#EAE6DF",
  },
  {
    id: "charcoal",
    hex: "#334155",
    name: "Charcoal Bouclé",
    tailwindBg: "#334155",
  },
];

// Stagger container — children cascade in
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// Viewport container for the 3D panel
const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

export default function Hero() {
  const [activeColor, setActiveColor] = useState(COLOR_SWATCHES[0]);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative z-20 flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-6 py-20 xl:rounded-bl-[200px]"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ── Left: Copy ── */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.span
            variants={itemVariants}
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            Bespoke Customization
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl text-primary leading-tight md:text-6xl mb-6"
          >
            Designed For Comfort,{" "}
            <span className="text-accent italic">Tailored</span> By You
          </motion.h1>

          {/* Body copy */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg font-light leading-relaxed text-secondary mb-8"
          >
            Select a custom fabric finish directly from our digital showroom
            profile to preview your piece instantly.
          </motion.p>

          {/* Swatch row */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-secondary sm:pt-2">
              Finish:
            </span>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setActiveColor(swatch)}
                  title={swatch.name}
                  className="relative h-8 w-8 rounded-full cursor-pointer focus:outline-none"
                >
                  {/* Swatch fill */}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-black/10"
                    style={{ backgroundColor: swatch.tailwindBg }}
                    whileHover={reduceMotion ? {} : { scale: 1.12 }}
                    whileTap={reduceMotion ? {} : { scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />
                  {/* layoutId ring glides between active swatches */}
                  {activeColor.id === swatch.id && (
                    <motion.span
                      layoutId="swatch-ring"
                      className="absolute -inset-1 rounded-full ring-2 ring-accent ring-offset-2"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active swatch label — AnimatePresence swap */}
          <motion.div
            variants={itemVariants}
            className="mb-8 min-h-[20px] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeColor.id}
                className="block text-xs font-medium uppercase tracking-widest text-accent-hover"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {activeColor.name}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.a
            variants={itemVariants}
            href="#collection"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wide text-white"
            whileHover={
              reduceMotion
                ? {}
                : { y: -3, backgroundColor: "var(--color-accent)" }
            }
            whileTap={reduceMotion ? {} : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            Explore Collection
            <motion.i
              className="ri-arrow-right-line text-accent group-hover:text-white"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            />
          </motion.a>
        </motion.div>

        {/* ── Right: 3D Viewport ── */}
        <motion.div
          className="relative h-[400px] w-full rounded-3xl border border-primary/5 bg-gradient-to-br from-white to-accent-secondary shadow-xl md:h-[550px]"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breathe animation on the panel itself */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 20px 60px rgba(0,0,0,0.07)",
                      "0 28px 80px rgba(0,0,0,0.12)",
                      "0 20px 60px rgba(0,0,0,0.07)",
                    ],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Live preview badge — Framer loop instead of animate-pulse */}
          <div className="pointer-events-none absolute top-6 left-6 z-30">
            <motion.span
              className="rounded-full bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-accent"
              animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Live Material Preview
            </motion.span>
          </div>

          <SceneCanvas autoRotate={false}>
            <FurnitureModel
              modelPath="/models/hero_chair.glb"
              customColor={activeColor.hex}
            />
          </SceneCanvas>
        </motion.div>
      </div>
    </section>
  );
}
