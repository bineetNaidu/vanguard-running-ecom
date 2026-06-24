'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import ControlMatrix from './ControlMatrix';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'ALL' | 'FOOTWEAR' | 'APPAREL' | 'GEAR';
type ViewType = 'GRID' | 'LIST';

export default function CollectionInterface() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [viewMode, setViewMode] = useState<ViewType>('GRID');

  // Compute active dataset based on matrix selection
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'ALL') return products;
    return products.filter(product => product.category.toUpperCase() === activeFilter);
  }, [activeFilter]);

  return (
    <section className="w-full min-h-screen pb-32">
      <ControlMatrix 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={filteredProducts.length}
      />

      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div 
          layout
          className={`grid gap-x-6 gap-y-16 transition-all duration-500 ${
            viewMode === 'GRID' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className={viewMode === 'LIST' ? 'flex flex-col' : ''}
              >
                {/* 
                  Passing a prop (like viewMode) down to ProductCard in the future 
                  will allow us to alter the internal card layout (e.g., horizontal image).
                  For now, the CSS Grid handles the structural widening.
                */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="w-full py-32 flex justify-center text-[11px] uppercase tracking-[0.2em] font-mono text-brand-graphite/40">
            [ ZERO DATA MATCHES FOUND FOR CURRENT QUERY ]
          </div>
        )}
      </div>
    </section>
  );
}