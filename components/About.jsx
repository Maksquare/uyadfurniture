'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Crafting Legacy
          </span>
          <h2 className="font-serif text-3xl leading-tight text-primary md:text-5xl mb-8">
            Where Precision Engineering Meets <br />
            <span className="italic text-accent">Timeless Design Aesthetics</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mx-auto max-w-3xl border-t border-primary/10 pt-8"
        >
          <p className="font-jost text-lg font-light leading-relaxed text-secondary md:text-xl">
            At UYAD, we do not simply build furniture; we curate environments. Every curve, joinery layer, and fabric tone is thoughtfully engineered to foster comfort while establishing a heavy statement of contemporary high-end luxury.
          </p>
        </motion.div>
      </div>
    </section>
  );
}