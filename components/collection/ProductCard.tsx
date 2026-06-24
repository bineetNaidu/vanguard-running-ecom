'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types/product';
import { transitionSpring } from '@/lib/motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className="group flex flex-col cursor-pointer"
    >
      {/* Image Container 
        Using aspect-[4/5] to maintain an editorial fashion-forward proportion 
      */}
      <div className="relative aspect-4/5 bg-brand-offwhite border border-brand-graphite/5 overflow-hidden mb-6">
        <motion.div
          layoutId={`product-image-${product.id}`}
          transition={transitionSpring}
          className="w-full h-full bg-[#EAEAEA] flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        >
          {/* Graceful Fallback for missing AI Assets */}
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-brand-graphite/40">
              {primaryImage?.isPlaceholder ? primaryImage.alt : '[ NO ASSET ]'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Typography & Metadata */}
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <motion.h2
            layoutId={`product-title-${product.id}`}
            transition={transitionSpring}
            className="font-display text-2xl md:text-3xl tracking-tight group-hover:text-brand-gray transition-colors duration-300"
          >
            {product.name}
          </motion.h2>
          <span className="text-sm font-medium tracking-tight mt-1">
            ${product.price}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.15em] text-brand-gray">
          <span>{product.category}</span>
          <span className="text-brand-graphite/20">/</span>
          <span>System.Core</span>
        </div>
      </div>
    </Link>
  );
}