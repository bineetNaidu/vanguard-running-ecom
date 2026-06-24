'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types/product';
import { transitionSpring, transitionEase } from '@/lib/motion';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const primaryImage = product.images[0];

  // Controlled, engineered entrance for text elements that do not morph
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: transitionEase } 
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32">
      
      {/* Precision Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 text-[10px] uppercase tracking-[0.2em] text-brand-gray flex items-center space-x-4"
      >
        <Link href="/collection" className="hover:text-brand-graphite transition-colors">
          Collection
        </Link>
        <span>/</span>
        <span className="text-brand-graphite">{product.category}</span>
        <span>/</span>
        <span className="text-brand-graphite">System.Core</span>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
        
        {/* Left Hemisphere: Morphing Hero Media (Sticky) */}
        <div className="w-full lg:w-3/5">
          <div className="sticky top-32">
            <div className="relative aspect-4/5 lg:aspect-square bg-brand-offwhite border border-brand-graphite/5 overflow-hidden">
              <motion.div
                layoutId={`product-image-${product.id}`}
                transition={transitionSpring}
                className="w-full h-full bg-[#EAEAEA] flex items-center justify-center p-12"
              >
                {/* Fallback typography scales intelligently via layoutId */}
                <div className="text-center">
                  <p className="text-[12px] uppercase tracking-widest text-brand-graphite/40">
                    {primaryImage?.isPlaceholder ? primaryImage.alt : '[ NO ASSET ]'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Hemisphere: Typography & Technical Specs */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center py-12 lg:py-0">
          
          {/* Title Morphs from the Collection Grid */}
          <motion.h1
            layoutId={`product-title-${product.id}`}
            transition={transitionSpring}
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
          >
            {product.name}
          </motion.h1>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className="flex flex-col space-y-12"
          >
            <motion.div variants={fadeUpVariants} className="text-xl font-medium tracking-tight">
              ${product.price}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="space-y-4">
              <p className="text-brand-graphite/80 leading-relaxed md:text-lg">
                {product.description}
              </p>
            </motion.div>

            {/* Feature Matrix */}
            <motion.div variants={fadeUpVariants} className="border-t border-brand-graphite/10 pt-8">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-gray mb-6">
                Technical Specifications
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="text-brand-graphite/40 text-[10px] uppercase mt-1 font-mono tracking-widest">
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <span className="text-sm tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Action Matrix (Cart logic wired in Step 8) */}
            <motion.div variants={fadeUpVariants} className="pt-8">
              <button className="w-full bg-brand-graphite text-brand-offwhite py-5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-graphite/80 transition-colors duration-300">
                Add to System — ${product.price}
              </button>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}