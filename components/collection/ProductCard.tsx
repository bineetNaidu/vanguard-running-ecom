'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { transitionSpring } from '@/lib/motion';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;
  const hasMultipleImages = images.length > 1;

  // Unified Spatial Scrubbing Logic for Mouse and Touch
  const handleScrub = (clientX: number, currentTarget: EventTarget & HTMLDivElement) => {
    if (!hasMultipleImages) return;
    
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    
    const percentage = Math.max(0, Math.min(1, x / width));
    const index = Math.floor(percentage * images.length);
    setActiveIndex(Math.min(index, images.length - 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleScrub(e.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Allows thumb-sliding on mobile to scrub the images
    handleScrub(e.touches[0].clientX, e.currentTarget);
  };

  const handleReset = () => {
    setActiveIndex(0);
  };

  const activeImage = images[activeIndex];

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className="group flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-4/5 bg-brand-offwhite border border-brand-graphite/5 overflow-hidden mb-6"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleReset}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleReset}
      >
        <motion.div
          layoutId={`product-image-${product.id}`}
          transition={transitionSpring}
          className="relative w-full h-full bg-[#EAEAEA] flex items-center justify-center lg:group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        >
          {activeImage && !activeImage.isPlaceholder ? (
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-[10px] uppercase tracking-widest text-brand-graphite/40">
                {activeImage?.alt || '[ NO ASSET ]'}
              </p>
            </div>
          )}

          {/* Technical UI Indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end transition-opacity duration-300 z-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
              <div className="text-[9px] font-mono text-brand-graphite bg-brand-offwhite/80 backdrop-blur-sm px-2 py-1 uppercase tracking-widest border border-brand-graphite/10">
                ASSET // 0{activeIndex + 1}
              </div>
              
              <div className="flex gap-1 h-1">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-3 h-full transition-colors duration-200 ${
                      idx === activeIndex ? 'bg-brand-graphite' : 'bg-brand-graphite/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
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