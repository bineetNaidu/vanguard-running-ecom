'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cart-store';
import { transitionSpring } from '@/lib/motion';

// Orchestrated staggered entrance for cart items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitionSpring },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [isMobile, setIsMobile] = useState(false);

  // Safely determine viewport structure for mobile bottom-sheet vs desktop side-drawer
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Dynamic variants based on environmental context
  const drawerVariants = {
    hidden: isMobile ? { y: '100%' } : { x: '100%' },
    visible: isMobile ? { y: 0 } : { x: 0 },
    exit: isMobile ? { y: '100%' } : { x: '100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            // Used arbitrary values for z-index to guarantee it overlays everything
            className="fixed inset-0 z-100 bg-brand-graphite/60 backdrop-blur-md cursor-pointer"
          />

          {/* Core Drawer Architecture */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className={`
              fixed z-101 bg-brand-graphite text-brand-offwhite flex flex-col shadow-2xl
              ${isMobile 
                ? 'inset-x-0 bottom-0 top-auto h-[85vh] w-full rounded-t-3xl border-t border-brand-offwhite/10' 
                : 'top-0 right-0 h-full w-[480px] border-l border-brand-offwhite/10'
              }
            `}
          >
            {/* Drawer Header */}
            <div className="px-6 md:px-8 py-5 md:py-6 border-b border-brand-offwhite/10 flex justify-between items-center shrink-0">
              <h2 className="font-display text-xl md:text-2xl uppercase tracking-widest">
                System Hub
              </h2>
              <button
                onClick={closeCart}
                className="text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/60 hover:text-brand-offwhite transition-colors p-2 -mr-2"
              >
                [ Close ]
              </button>
            </div>

            {/* Kinetic Line Items Matrix */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 custom-scrollbar">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="h-full flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/40"
                >
                  System Empty.
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-8 pb-4"
                >
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layout // Enables smooth reflow when an item is removed
                        variants={itemVariants}
                        exit="exit"
                        className="flex gap-4 md:gap-6"
                      >
                        {/* Media Thumbnail */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-offwhite/5 border border-brand-offwhite/10 flex items-center justify-center p-2 shrink-0">
                           <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-brand-offwhite/30 text-center">
                              {item.product.images[0]?.isPlaceholder ? 'NO ASSET' : 'ASSET'}
                           </span>
                        </div>
                        
                        {/* Technical Data / Controls */}
                        <div className="flex flex-col flex-1 justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <h3 className="font-display text-base md:text-lg tracking-tight leading-none line-clamp-2">
                                {item.product.name}
                              </h3>
                              <span className="text-xs md:text-sm tracking-tight shrink-0">
                                ${item.product.price}
                              </span>
                            </div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/40">
                              Size: {item.size}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-3 text-[11px] font-mono text-brand-offwhite/80 bg-brand-offwhite/5 rounded-full px-2 py-0.5 border border-brand-offwhite/10">
                              {/* Tactile Micro-interactions on adjusters */}
                              <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="w-6 h-6 flex items-center justify-center hover:text-brand-offwhite transition-colors"
                              >
                                -
                              </motion.button>
                              <span className="w-4 text-center">{String(item.quantity).padStart(2, '0')}</span>
                              <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                className="w-6 h-6 flex items-center justify-center hover:text-brand-offwhite transition-colors"
                              >
                                +
                              </motion.button>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#ff3333]/80 hover:text-[#ff3333] transition-colors border-b border-transparent hover:border-[#ff3333]/50 pb-0.5 mb-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Checkout Action Zone (Mobile Optimized Padding) */}
            <div className="px-6 md:px-8 py-6 md:py-8 border-t border-brand-offwhite/10 bg-brand-graphite shrink-0 pb-10 md:pb-8">
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/60">
                  Estimated Subtotal
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-tight">
                  ${total}
                </span>
              </div>
              <motion.button 
                whileTap={items.length > 0 ? { scale: 0.98 } : {}}
                disabled={items.length === 0}
                className="w-full bg-brand-offwhite text-brand-graphite py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-offwhite/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Initialize Checkout
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}