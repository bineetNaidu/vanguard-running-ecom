'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { transitionSpring, transitionEase } from '@/lib/motion';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cart-store';
import ProductSizingTrigger from './ProductSizingTrigger';
import ZonalHeatmap from './ZonalHeatmap';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addItem, openCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const images = product.images;
  const currentImg = images[imageIndex];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // System Override: Snap back to primary chassis view when analyzing technical specs
  // This ensures the Zonal Heatmap coordinates always align with the primary angle.
  useEffect(() => {
    if (activeFeature !== null && hasMultipleImages) {
      setImageIndex(0);
    }
  }, [activeFeature, hasMultipleImages]);

  const handleAddToSystem = () => {
    if (!selectedSize) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    openCart();
  };

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: transitionEase } }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-6 pt-24 pb-32 md:py-32">
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 md:mb-12 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-gray flex items-center space-x-3 md:space-x-4"
      >
        <Link href="/collection" className="hover:text-brand-graphite transition-colors">
          Collection
        </Link>
        <span>/</span>
        <span className="text-brand-graphite">{product.category}</span>
        <span>/</span>
        <span className="text-brand-graphite">System.Core</span>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-16 xl:gap-24">
        
        {/* LEFT HEMISPHERE: Media & Interactive Overlay */}
        <div className="w-full lg:w-3/5">
          <div className="sticky top-24 md:top-32">
            <div className="relative aspect-square md:aspect-4/5 lg:aspect-square bg-brand-offwhite border border-brand-graphite/5 overflow-hidden group select-none">
              
              {/* Engineering HUD */}
              <ZonalHeatmap activeFeature={activeFeature} />

              <motion.div
                layoutId={`product-image-${product.id}`}
                transition={transitionSpring}
                className="w-full h-full bg-[#EAEAEA] relative z-10 transition-transform duration-700 ease-out"
                style={{ transform: activeFeature !== null ? 'scale(1.02)' : 'scale(1)' }}
              >
                {currentImg && !currentImg.isPlaceholder ? (
                  <Image 
                    src={currentImg.url} 
                    alt={currentImg.alt} 
                    fill 
                    priority={imageIndex === 0}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8 text-center">
                    <p className="text-[10px] md:text-[12px] uppercase tracking-widest text-brand-graphite/40">
                      {currentImg?.alt || '[ NO ASSET ]'}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Kinetic Navigation System (Multiple Images) */}
              {hasMultipleImages && (
                <>
                  {/* Invisible Touch/Click Zones */}
                  <div className="absolute inset-0 z-20 flex">
                    <div className="w-1/2 h-full cursor-w-resize" onClick={prevImage} />
                    <div className="w-1/2 h-full cursor-e-resize" onClick={nextImage} />
                  </div>

                  {/* Top-Right Technical Readout */}
                  <div className="absolute top-5 right-5 z-30 pointer-events-none text-[9px] font-mono text-brand-graphite bg-brand-offwhite/80 backdrop-blur-sm px-2 py-1 uppercase tracking-widest border border-brand-graphite/10">
                    ASSET // 0{imageIndex + 1}
                  </div>

                  {/* Bottom Dash Indicators */}
                  <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1.5 z-30 pointer-events-none px-6">
                    {images.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1 transition-all duration-300 ${
                          idx === imageIndex ? 'w-6 bg-brand-graphite' : 'w-3 bg-brand-graphite/30'
                        }`} 
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT HEMISPHERE: Typography & Interactions */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center py-6 lg:py-0 relative z-30">
          
          <motion.h1
            layoutId={`product-title-${product.id}`}
            transition={transitionSpring}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6"
          >
            {product.name}
          </motion.h1>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="flex flex-col space-y-8 md:space-y-12"
          >
            <motion.div variants={fadeUpVariants} className="text-lg md:text-xl font-medium tracking-tight">
              ${product.price}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="space-y-4">
              <p className="text-brand-graphite/80 leading-relaxed text-sm md:text-lg">
                {product.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="border-t border-brand-graphite/10 pt-8">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-gray mb-6">
                Technical Specifications
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li 
                    key={index} 
                    onMouseEnter={() => !isTouchDevice && setActiveFeature(index)}
                    onMouseLeave={() => !isTouchDevice && setActiveFeature(null)}
                    className={`flex items-start space-x-4 p-3 -mx-3 rounded-lg transition-colors border border-transparent 
                      ${!isTouchDevice ? 'hover:bg-brand-graphite/5 cursor-crosshair hover:border-brand-graphite/10' : ''}`}
                  >
                    <span 
                      className="text-brand-graphite/40 text-[10px] uppercase mt-0.5 font-mono tracking-widest transition-colors" 
                      style={{ color: activeFeature === index ? '#ff3333' : '' }}
                    >
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <span 
                      className={`text-xs md:text-sm tracking-wide transition-colors ${
                        activeFeature === index ? 'text-brand-graphite font-medium' : 'text-brand-graphite/80'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="flex flex-col">
              <ProductSizingTrigger 
                selectedSize={selectedSize} 
                setSelectedSize={setSelectedSize} 
                category={product.category}
              />

              {error && (
                <div className="text-[10px] text-[#ff3333] uppercase tracking-widest font-mono mt-4 text-center">
                  [ ERROR: TARGET SIZE REQUIRED. RUN MATRIX. ]
                </div>
              )}

              <button 
                onClick={handleAddToSystem} 
                className="w-full mt-4 bg-brand-graphite text-brand-offwhite py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-graphite/80 transition-colors duration-300 active:scale-[0.98]"
              >
                Add to System — ${product.price}
              </button>
            </motion.div>

          </motion.div>
        </div>
        
      </div>
    </div>
  );
}