'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const CATEGORIES_DATA = {
  living: [
    { id: 'L05', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr05.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L06', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr06.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L07', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr07.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L08', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr08.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L09', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr09.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L10', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr010.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L11', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr011.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L12', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr012.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L13', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr013.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
    { id: 'L14', name: 'Strata Shelving Unit', price: 'Birr 3,900', tag: 'Handmade Core', image: 'assets/work/lr/lr014.jpg', specs: { dimensions: '160cm x 40cm x 180cm', material: 'Modular solid oak shelving with offset geometry', frame: 'Heavy-gauge internal structural steel', warranty: '3 Years Structural', leadTime: '12–15 Days' } },
  ],
  bedroom: [
    { id: 'B01', name: 'Opus King Bed Frame', price: 'Birr 6,200', tag: 'Bestseller', image: 'assets/work/bs/bs01.jpg', specs: { dimensions: '210cm x 190cm x 120cm', material: 'Upholstered statement headboard in bouclé fabric', frame: 'Solid brass-capped structural legs', warranty: '7 Years Structural', leadTime: '14–18 Days' } },
    { id: 'B02', name: 'Sable Wardrobe System', price: 'Birr 9,800', tag: 'Premium Fitted', image: 'assets/work/bs/bs02.jpg', specs: { dimensions: '240cm x 60cm x 220cm', material: 'Matte ebony finish, soft-close brass handles, integrated LEDs', frame: 'Heavy structural backing grids', warranty: '5 Years Structural', leadTime: '22–30 Days' } },
    { id: 'B02', name: 'Sable Wardrobe System', price: 'Birr 9,800', tag: 'Premium Fitted', image: 'assets/work/bs/bs03.jpg', specs: { dimensions: '240cm x 60cm x 220cm', material: 'Matte ebony finish, soft-close brass handles, integrated LEDs', frame: 'Heavy structural backing grids', warranty: '5 Years Structural', leadTime: '22–30 Days' } },
    { id: 'B02', name: 'Sable Wardrobe System', price: 'Birr 9,800', tag: 'Premium Fitted', image: 'assets/work/bs/bs04.jpg', specs: { dimensions: '240cm x 60cm x 220cm', material: 'Matte ebony finish, soft-close brass handles, integrated LEDs', frame: 'Heavy structural backing grids', warranty: '5 Years Structural', leadTime: '22–30 Days' } }

  ],
  dining: [
    { id: 'D01', name: 'Atlas Dining Table', price: 'Birr 8,400', tag: 'Signature Piece', image: 'assets/work/d/d01.jpg', specs: { dimensions: '200cm x 100cm x 75cm', material: 'Live-edge oak slab top on a brushed steel trestle base', frame: 'Interlocking geometric metal sub-frame', warranty: '3 Years Structural', leadTime: '14–18 Days' } }
  ]
};

// Stagger container variants
const trackVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export default function Collection() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('living');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [addedId, setAddedId] = useState(null); // for add-to-bag pulse feedback

  const scrollContainerRef = useRef(null);
  const isButtonScrolling = useRef(false);

  const activeItems = CATEGORIES_DATA[activeCategory] || [];
  const totalSlides = activeItems.length;

  /* ─── Scroll helpers (unchanged logic) ─── */
  const getLayoutMetrics = () => {
    if (!scrollContainerRef.current) return { itemWidth: 0, maxScroll: 0 };
    const container = scrollContainerRef.current;
    const firstChild = container.firstChild;
    let itemWidth = container.clientWidth * 0.35;
    if (firstChild) itemWidth = firstChild.getBoundingClientRect().width + 32;
    const maxScroll = container.scrollWidth - container.clientWidth;
    return { itemWidth, maxScroll };
  };

  const updatePaginationOnScroll = () => {
    if (isButtonScrolling.current || !scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    const { itemWidth, maxScroll } = getLayoutMetrics();
    if (scrollLeft >= maxScroll - 15) {
      setCurrentSlide(totalSlides);
    } else {
      const calculatedIndex = Math.round(scrollLeft / itemWidth) + 1;
      setCurrentSlide(Math.min(Math.max(calculatedIndex, 1), totalSlides));
    }
  };

  const handleOutsideScroll = (direction) => {
    if (!scrollContainerRef.current || isButtonScrolling.current) return;
    const { itemWidth } = getLayoutMetrics();
    let nextIndex = currentSlide;
    if (direction === 'next' && currentSlide < totalSlides) nextIndex = currentSlide + 1;
    else if (direction === 'prev' && currentSlide > 1) nextIndex = currentSlide - 1;
    if (nextIndex === currentSlide) return;
    isButtonScrolling.current = true;
    setCurrentSlide(nextIndex);
    scrollContainerRef.current.scrollTo({ left: (nextIndex - 1) * itemWidth, behavior: 'smooth' });
    setTimeout(() => { isButtonScrolling.current = false; }, 450);
  };

  useEffect(() => {
    setCurrentSlide(1);
    isButtonScrolling.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0 });
  }, [activeCategory]);

  const selectedItem = selectedItemIndex !== null ? activeItems[selectedItemIndex] : null;

  const handleModalItemSlide = (direction) => {
    if (selectedItemIndex === null) return;
    if (direction === 'next') setSelectedItemIndex(prev => (prev === activeItems.length - 1 ? 0 : prev + 1));
    else setSelectedItemIndex(prev => (prev === 0 ? activeItems.length - 1 : prev - 1));
  };

  const handleAddToCart = (item, e) => {
    e?.stopPropagation();
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="collection"
      className="px-4 sm:px-6 py-24 overflow-hidden relative font-[family:var(--font-jost)] bg-[#f8fafc] dark:bg-[#071320] transition-colors duration-500"
    >
      {/* Subtle ambient background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #143755 0%, transparent 60%), radial-gradient(circle at 80% 80%, #f1ae2c 0%, transparent 55%)' }}
      />

      <div className="mx-auto max-w-7xl relative">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#f1ae2c]">
              Atelier Collection
            </span>
            <h2 className="font-[family:var(--font-dm-serif)] text-4xl font-normal md:text-5xl capitalize text-[#143755] dark:text-slate-100 transition-colors duration-500">
              The{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {activeCategory}
                </motion.span>
              </AnimatePresence>{' '}
              Suite
            </h2>
          </motion.div>

          <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto z-30">
            <div className="font-[family:var(--font-dm-serif)] text-sm tracking-widest font-medium min-w-[55px] text-[#143755] dark:text-slate-300">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {String(currentSlide).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="mx-1 font-light text-[#143755]/30 dark:text-slate-500">/</span>
              {String(totalSlides).padStart(2, '0')}
            </div>

            <div className="flex gap-2">
              {['prev', 'next'].map((dir) => (
                <motion.button
                  key={dir}
                  whileTap={{ scale: 0.91 }}
                  whileHover={{ scale: 1.06 }}
                  onClick={() => handleOutsideScroll(dir)}
                  disabled={dir === 'prev' ? currentSlide === 1 : currentSlide === totalSlides || totalSlides <= 1}
                  className="w-11 h-11 rounded-full border bg-white flex items-center justify-center hover:bg-[#143755] hover:text-white dark:bg-[#12253a] dark:text-slate-200 dark:hover:bg-white dark:hover:text-[#143755] transition-all duration-300 cursor-pointer disabled:opacity-20 border-[#143755]/10 dark:border-white/10"
                >
                  <i className={`ri-arrow-${dir === 'prev' ? 'left' : 'right'}-line text-sm`} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="w-full h-[1px] mb-12 relative rounded-full overflow-hidden bg-[#143755]/10 dark:bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#f1ae2c] to-[#e89e1a]"
            animate={{ width: totalSlides > 0 ? `${(currentSlide / totalSlides) * 100}%` : '0%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          />
        </div>

        {/* ── CATEGORY TABS ── */}
        <div
          className="mb-14 flex gap-4 pb-4 overflow-x-auto scrollbar-none border-b border-[#143755]/5 dark:border-white/5"
          style={{ scrollbarWidth: 'none' }}
        >
          {Object.keys(CATEGORIES_DATA).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer whitespace-nowrap relative ${
                activeCategory === cat
                  ? 'text-[#143755] dark:text-white'
                  : 'text-[#475569]/60 dark:text-slate-400/60 hover:text-[#143755] dark:hover:text-white'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#143755] dark:bg-[#f1ae2c]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── CARD TRACK ── */}
        <div className="relative w-full min-h-[540px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={trackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              ref={scrollContainerRef}
              onScroll={updatePaginationOnScroll}
              className="flex gap-8 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory py-2 px-1 absolute inset-0 w-full"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {activeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="w-[85vw] sm:w-[45vw] lg:w-[28vw] shrink-0 snap-start group flex flex-col rounded-xl border transition-all duration-500 relative overflow-hidden bg-white dark:bg-[#0b1b2b] border-[#143755]/5 dark:border-white/5"
                  style={{ willChange: 'transform' }}
                  whileHover={{ y: -4, boxShadow: '0 24px 60px -12px rgba(20,55,85,0.18)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  {/* Card image area */}
                  <div
                    onClick={() => setSelectedItemIndex(index)}
                    className="relative h-[290px] sm:h-[330px] w-full overflow-hidden cursor-pointer bg-[#f8fafc] dark:bg-[#12253a]"
                  >
                    <div className="absolute top-4 left-4 z-30">
                      <span className="bg-white/90 dark:bg-[#0b1b2b]/90 backdrop-blur-md px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#143755] dark:text-slate-200 border border-[#143755]/5 dark:border-white/5">
                        {item.tag}
                      </span>
                    </div>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Hover overlay */}
                    <motion.div
                      initial={false}
                      className="absolute inset-0 bg-[#143755]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]"
                    >
                      <span className="bg-[#143755] dark:bg-[#f1ae2c] text-white dark:text-[#143755] text-[9px] uppercase font-bold tracking-[0.25em] px-6 py-3 shadow-xl">
                        View Editorial Spec
                      </span>
                    </motion.div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-1 flex-col justify-between bg-white dark:bg-[#0b1b2b]">
                    <div onClick={() => setSelectedItemIndex(index)} className="cursor-pointer">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#f1ae2c]">{activeCategory} // {item.id}</span>
                      <h3 className="mt-1.5 font-[family:var(--font-dm-serif)] text-xl font-normal text-[#143755] dark:text-slate-100 group-hover:text-[#f1ae2c] dark:group-hover:text-[#f1ae2c] transition-colors duration-300 line-clamp-1">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t pt-4 gap-2 border-[#143755]/5 dark:border-white/5">
                      <span className="font-[family:var(--font-dm-serif)] text-lg font-medium text-[#143755] dark:text-slate-200">{item.price}</span>

                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={(e) => handleAddToCart(item, e)}
                        className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                          addedId === item.id
                            ? 'bg-[#143755] text-white dark:bg-[#f1ae2c] dark:text-[#143755]'
                            : 'bg-[#f8fafc] dark:bg-[#12253a] text-[#143755] dark:text-slate-200 hover:bg-[#143755] hover:text-white dark:hover:bg-white dark:hover:text-[#143755]'
                        }`}
                      >
                        <i className={`text-xs ${addedId === item.id ? 'ri-check-line' : 'ri-add-line'}`} />
                        {addedId === item.id ? 'Added' : 'Add To Bag'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── LOOKBOOK MODAL ── */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItemIndex(null)}
                className="absolute inset-0 bg-[#143755]/30 dark:bg-black/60 backdrop-blur-md"
              />

              {/* Modal panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[92vh] md:max-h-[85vh] bg-white dark:bg-[#0b1b2b]"
              >
                {/* Left: image */}
                <div className="relative md:col-span-6 h-56 sm:h-72 md:h-full overflow-hidden bg-[#f8fafc] dark:bg-[#12253a]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedItem.id}
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Modal nav arrows */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
                    {['prev', 'next'].map((dir) => (
                      <motion.button
                        key={dir}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                        onClick={(e) => { e.stopPropagation(); handleModalItemSlide(dir); }}
                        className="w-9 h-9 rounded-full bg-white/90 dark:bg-[#12253a]/90 text-[#143755] dark:text-white flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <i className={`ri-arrow-${dir === 'prev' ? 'left' : 'right'}-s-line text-lg`} />
                      </motion.button>
                    ))}
                  </div>

                  {/* Item counter badge */}
                  <div className="absolute bottom-4 left-4 z-20 bg-[#143755]/90 dark:bg-[#f1ae2c] px-4 py-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-white dark:text-[#143755]">
                      Item {String(selectedItemIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Right: details */}
                <div className="p-6 sm:p-8 md:p-10 md:col-span-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-white dark:bg-[#0b1b2b]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#f1ae2c] bg-[#f8fafc] dark:bg-[#12253a] px-3 py-1 rounded-sm">
                        UYAD Premium // {selectedItem.id}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.88, rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        onClick={() => setSelectedItemIndex(null)}
                        className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-[#f8fafc] dark:bg-[#12253a] text-[#143755] dark:text-white"
                      >
                        <i className="ri-close-line text-lg" />
                      </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedItem.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <h3 className="font-[family:var(--font-dm-serif)] text-3xl font-normal mb-1.5 text-[#143755] dark:text-white">
                          {selectedItem.name}
                        </h3>
                        <p className="font-[family:var(--font-dm-serif)] text-2xl font-medium mb-6 text-[#f1ae2c]">
                          {selectedItem.price}
                        </p>

                        <div className="border-t pt-4 space-y-4 border-[#143755]/10 dark:border-white/10">
                          {[
                            { label: 'Dimensions', value: selectedItem.specs.dimensions },
                            { label: 'Material Composition', value: selectedItem.specs.material }
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#475569] dark:text-slate-400 mb-1">{label}:</h4>
                              <p className="text-xs font-light leading-relaxed tracking-wide text-[#143755]/80 dark:text-slate-300">{value}</p>
                            </div>
                          ))}

                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#475569] dark:text-slate-400 mb-1">Production Lead:</h4>
                              <p className="text-xs font-medium flex items-center gap-1 text-[#143755] dark:text-slate-200">
                                <i className="ri-time-line text-[#f1ae2c]" />{selectedItem.specs.leadTime}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#475569] dark:text-slate-400 mb-1">Atelier Protection:</h4>
                              <p className="text-xs font-medium flex items-center gap-1 text-[#143755] dark:text-slate-200">
                                <i className="ri-shield-check-line text-[#f1ae2c]" />{selectedItem.specs.warranty}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#143755]/5 dark:border-white/5">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleAddToCart(selectedItem)}
                      className="w-full rounded-full bg-[#143755] dark:bg-[#f1ae2c] text-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white dark:text-[#143755] hover:bg-[#f1ae2c] dark:hover:bg-white transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <i className="ri-add-circle-line text-sm" /> Add To Showroom Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}