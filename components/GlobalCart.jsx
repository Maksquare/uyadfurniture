'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function GlobalCart() {
  const { 
    cart, 
    totalItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    totalPrice, 
    handleWhatsAppCheckout 
  } = useCart();

  return (
    <>
      {/* BAG FLOATER */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-[9999999] h-14 w-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group hover:bg-[#f1ae2c] transition-all duration-300 border font-[family:var(--font-jost)] bg-[#143755] dark:bg-[#f1ae2c] text-white dark:text-[#143755] border-white/10 dark:border-black/5"
      >
        <div className="relative">
          <i className="ri-shopping-bag-3-line text-lg group-hover:scale-105 block transition-transform" />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2.5 -right-2.5 text-[#143755] dark:text-white font-sans font-bold text-[9px] h-5 w-5 rounded-full flex items-center justify-center border-2 bg-[#f1ae2c] dark:bg-[#143755] border-[#143755] dark:border-[#f1ae2c]"
            >
              {totalItems}
            </motion.span>
          )}
        </div>
      </button>

      {/* DRAWER PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[10000000] flex justify-end font-[family:var(--font-jost)]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-md h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-hidden bg-white dark:bg-[#0b1b2b]"
            >
              <div className="flex flex-col h-[calc(100%-120px)]">
                <div className="flex items-center justify-between pb-4 mb-6 shrink-0 border-b border-[#143755]/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-[family:var(--font-dm-serif)] text-2xl text-[#143755] dark:text-white">Your Showroom Order</h3>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-[#f8fafc] dark:bg-[#12253a] text-[#143755] dark:text-white"
                  >
                    <i className="ri-close-line text-base" />
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto flex-1 pr-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                  {cart.length === 0 ? (
                    <div className="text-center py-24 font-light text-xs tracking-wide text-[#475569]/60 dark:text-slate-400/50">
                      <i className="ri-inbox-archive-line text-3xl block mb-2 text-[#143755]/15 dark:text-white/10" />
                      Your custom collection is currently empty.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-lg items-center justify-between border bg-[#f8fafc] dark:bg-[#12253a] border-[#143755]/5 dark:border-white/5">
                        <div className="flex gap-3 items-center min-w-0">
                          <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover bg-white dark:bg-[#0b1b2b] shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-sm font-normal font-[family:var(--font-dm-serif)] truncate text-[#143755] dark:text-white">{item.name}</h4>
                            <p className="text-[11px] font-medium tracking-wide text-[#f1ae2c]">{item.price}</p>
                            <span className="text-[9px] uppercase tracking-widest font-medium text-[#475569]/50 dark:text-slate-400/40">ID: {item.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 border rounded-full px-2.5 py-1 shrink-0 bg-white dark:bg-[#0b1b2b] border-[#143755]/10 dark:border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-xs px-1 font-bold cursor-pointer text-[#475569] dark:text-slate-300">-</button>
                          <span className="text-xs font-semibold font-sans min-w-[12px] text-center text-[#143755] dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-xs px-1 font-bold cursor-pointer text-[#475569] dark:text-slate-300">+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 bg-white dark:bg-[#0b1b2b] shrink-0 border-t border-[#143755]/10 dark:border-white/10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#475569] dark:text-slate-400">Estimated Total:</span>
                  <span className="font-[family:var(--font-dm-serif)] text-2xl font-medium text-[#143755] dark:text-white">Birr {totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  disabled={cart.length === 0}
                  className="w-full rounded-full font-bold text-[10px] uppercase tracking-[0.2em] py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl bg-[#143755] dark:bg-[#f1ae2c] hover:bg-[#f1ae2c] dark:hover:bg-white text-white dark:text-[#143755] disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:text-gray-300"
                >
                  <i className="ri-whatsapp-line text-sm" /> Checkout via WhatsApp
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}