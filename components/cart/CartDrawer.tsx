'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cart-store';
import { transitionSpring } from '@/lib/motion';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-100 bg-brand-graphite/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer: Explicitly Dark Themed */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={transitionSpring}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] z-101 bg-brand-graphite text-brand-offwhite flex flex-col border-l border-brand-offwhite/10"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-brand-offwhite/10 flex justify-between items-center">
              <h2 className="font-display text-2xl uppercase tracking-widest">
                System Hub
              </h2>
              <button
                onClick={closeCart}
                className="text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/60 hover:text-brand-offwhite transition-colors"
              >
                [ Close ]
              </button>
            </div>

            {/* Line Items Matrix */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/40">
                  System Empty.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    {/* Media Thumbnail */}
                    <div className="w-24 h-24 bg-brand-offwhite/5 border border-brand-offwhite/10 flex items-center justify-center p-2 shrink-0">
                       <span className="text-[8px] uppercase tracking-widest text-brand-offwhite/30 text-center">
                          {item.product.images[0]?.isPlaceholder ? 'NO ASSET' : 'ASSET'}
                       </span>
                    </div>
                    
                    {/* Data / Controls */}
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-lg tracking-tight leading-none">
                            {item.product.name}
                          </h3>
                          <span className="text-sm tracking-tight">${item.product.price}</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/40">
                          Size: {item.size}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4 text-[11px] font-mono text-brand-offwhite/80">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-brand-offwhite transition-colors p-1">-</button>
                          <span>{String(item.quantity).padStart(2, '0')}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-brand-offwhite transition-colors p-1">+</button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/40 hover:text-brand-offwhite transition-colors border-b border-transparent hover:border-brand-offwhite pb-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Action */}
            <div className="p-8 border-t border-brand-offwhite/10 bg-brand-graphite">
              <div className="flex justify-between items-end mb-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-offwhite/60">
                  Estimated Subtotal
                </span>
                <span className="font-display text-3xl tracking-tight">
                  ${total}
                </span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-brand-offwhite text-brand-graphite py-5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-offwhite/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Initialize Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}