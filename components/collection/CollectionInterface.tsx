'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard'; 
import ControlMatrix from './ControlMatrix';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'ALL' | 'FOOTWEAR' | 'APPAREL' | 'GEAR';
type ViewType = 'GRID' | 'LIST';

// Engineered physical spring parameters
const springTransition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  mass: 1
};

// Orchestrated stagger variants mapping
const cardVariants: any = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.98 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      // Dynamic delay based on index creates the cascading wave effect
      delay: i * 0.08, 
    }
  }),
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  }
};

export default function CollectionInterface() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [viewMode, setViewMode] = useState<ViewType>('GRID');

  // Compute active dataset based on matrix selection
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'ALL') return products;
    return products.filter(product => product.category.toUpperCase() === activeFilter);
  }, [activeFilter]);

  return (
    <section className="w-full">
      <ControlMatrix 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={filteredProducts.length}
      />

      <div className="max-w-[1600px] mx-auto px-6 mt-12">
        <motion.div 
          layout
          className={`grid gap-x-8 gap-y-24 transition-all duration-500 ${
            viewMode === 'GRID' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {/* mode="popLayout" ensures exiting elements don't abruptly snap the grid */}
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                custom={index} // Passes the loop index to the variant for calculation
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={viewMode === 'LIST' ? 'flex flex-col' : ''}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-32 flex justify-center text-[11px] uppercase tracking-[0.2em] font-mono text-brand-graphite/40"
          >
            [ ZERO DATA MATCHES FOUND FOR CURRENT QUERY ]
          </motion.div>
        )}
      </div>
    </section>
  );
}