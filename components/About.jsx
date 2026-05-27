'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: 'easeOut' } }
};

// Individual word reveal for the headline
function SplitHeadline({ text, className }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 } }
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  // Parallax on the decorative line
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const accentY = useTransform(scrollYProgress, [0, 1], ['-12px', '12px']);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#f8fafc] dark:bg-[#071320] px-6 py-28 md:py-40 transition-colors duration-500 font-[family:var(--font-jost)]"
    >
      {/* ── Ambient background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Warm gold wash, top-right */}
        <div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-[0.06] dark:opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #f1ae2c 0%, transparent 70%)' }}
        />
        {/* Deep navy wash, bottom-left */}
        <div
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.07] dark:opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #143755 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Decorative vertical rule — left edge ── */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 select-none">
        <motion.div
          style={{ y: accentY }}
          className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#143755]/20 dark:via-white/10 to-transparent"
        />
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#143755]/25 dark:text-white/20 [writing-mode:vertical-lr]">
          Our Philosophy
        </span>
        <motion.div
          style={{ y: accentY }}
          className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#f1ae2c]/30 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-5xl">

        {/* ── Upper eyebrow + headline ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          {/* Eyebrow label */}
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-4">
            <motion.span
              style={{ scaleX: lineScaleX, originX: 0 }}
              className="block h-[1px] w-12 bg-[#f1ae2c]"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f1ae2c]">
              Crafting Legacy
            </span>
            <motion.span
              style={{ scaleX: lineScaleX, originX: 1 }}
              className="block h-[1px] w-12 bg-[#f1ae2c]"
            />
          </motion.div>

          {/* Main headline — word-by-word reveal */}
          <motion.h2
            variants={containerVariants}
            className="font-[family:var(--font-dm-serif)] text-3xl leading-[1.15] text-[#143755] dark:text-slate-100 md:text-[3.25rem] mb-3 transition-colors duration-500"
          >
            <SplitHeadline text="Where Precision Engineering" />
            <br className="hidden sm:block" />
            <span className="inline-block mt-1">
              <span className="font-[family:var(--font-dm-serif)] font-normal">Meets{' '}</span>
              <motion.em
                variants={fadeIn}
                className="not-italic font-[family:var(--font-dm-serif)] text-[#f1ae2c] relative"
              >
                Timeless Design
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#f1ae2c]/40 block"
                />
              </motion.em>
            </span>
          </motion.h2>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
          className="mx-auto mt-10 mb-10 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#143755]/20 dark:via-white/15 to-transparent"
        />

        {/* ── Body copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-base font-light leading-[1.9] tracking-wide text-[#475569] dark:text-slate-400 md:text-lg transition-colors duration-500">
            At UYAD, we do not simply build furniture — we{' '}
            <span className="text-[#143755] dark:text-slate-200 font-normal">curate environments.</span>{' '}
            Every curve, joinery layer, and fabric tone is thoughtfully engineered to foster comfort while establishing a heavy statement of contemporary high-end luxury.
          </p>
        </motion.div>

        {/* ── Three pillars row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#143755]/5 dark:bg-white/5 rounded-xl overflow-hidden"
        >
          {[
            { num: '15+', label: 'Years of Craft', sub: 'Mastering every joinery since 2009' },
            { num: '340+', label: 'Bespoke Pieces', sub: 'Each built to client specification' },
            { num: '100%', label: 'Local Artisans', sub: 'Proudly made in Addis Ababa' },
          ].map(({ num, label, sub }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center text-center px-8 py-10 bg-white dark:bg-[#0b1b2b] group hover:bg-[#f8fafc] dark:hover:bg-[#0f2236] transition-colors duration-300"
            >
              <span className="font-[family:var(--font-dm-serif)] text-4xl font-normal text-[#f1ae2c] mb-1 group-hover:scale-105 transition-transform duration-300 inline-block">
                {num}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#143755] dark:text-slate-200 mb-1.5">
                {label}
              </span>
              <span className="text-[11px] font-light text-[#475569] dark:text-slate-500 leading-snug">
                {sub}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}