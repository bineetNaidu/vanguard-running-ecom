'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// Adjust this import path to match where your products array is exported
import { products } from '@/data/products'; 

export default function SplitScreenLookbook() {
  // We map specific editorial themes to actual product IDs from your database.
  // Change these IDs to match the exact products you want to feature.
  const featuredConfigs = [
    { 
      theme: '01 / Chassis', 
      caption: '[ Structural Carbon Output ]',
      productId: 'prod-footwear-01', // VXR-01 Carbon Trainer
      // Optional: Add a specific lookbook image path here if you generated lifestyle shots.
      // Otherwise, it falls back to the product's primary studio image.
      overrideImage: null 
    },
    { 
      theme: '02 / Membrane', 
      caption: '[ Extreme Vapor Transmission ]',
      productId: 'prod-apparel-03', // Atmos Shell Jacket
      overrideImage: null
    },
    { 
      theme: '03 / Kinetic', 
      caption: '[ Zero-Restriction Weave ]',
      productId: 'prod-apparel-01', // Flux Compression Tee
      overrideImage: null
    },
  ];

  // Hydrate the configs with actual product data
  const lookbookItems = featuredConfigs.map(config => {
    const product = products.find(p => p.id === config.productId);
    return { ...config, product };
  }).filter(item => item.product); // Filter out any mismatched IDs

  return (
    <section className="max-w-[1600px] mx-auto px-6 py-32">
      <div className="flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left: Sticky Editorial Context */}
        <div className="w-full lg:w-1/3 lg:relative">
          <div className="lg:sticky lg:top-32 flex flex-col justify-between h-auto lg:h-[70vh]">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-8">
                Form Follows <br /> Frequency.
              </h2>
              <p className="text-brand-graphite/70 leading-relaxed text-sm max-w-sm mb-12">
                Every stitch, plate, and thread is mapped against extreme human data. We strip away the superfluous until only pure performance architecture remains.
              </p>
            </div>
            
            <Link 
              href="/collection" 
              className="inline-block text-[10px] uppercase tracking-[0.2em] font-medium hover:text-brand-gray transition-colors border-b border-brand-graphite pb-2 w-max"
            >
              Explore the Systems
            </Link>
          </div>
        </div>

        {/* Right: Scrolling Editorial Grid */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8 md:gap-16">
          {lookbookItems.map((item, index) => {
            const prod = item.product!;
            const displayImage = item.overrideImage || prod.images[0]?.url;

            console.log({prod})

            return (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                key={item.theme} 
                className="group relative w-full aspect-3/4 md:aspect-4/5 bg-brand-graphite/5 overflow-hidden"
              >
                <Link href={`/product/${prod.slug}`} className="absolute inset-0 z-20">
                  <span className="sr-only">View {prod.name}</span>
                </Link>

                {/* Background Image */}
                {displayImage ? (
                  <Image 
                    src={displayImage} 
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-graphite/30">
                      [ NO ASSET ]
                    </span>
                  </div>
                )}

                {/* Overlay gradient for text legibility */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

                {/* Editorial Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none z-10 text-brand-offwhite">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1">
                      {item.theme}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs uppercase tracking-widest font-mono text-brand-offwhite/80">
                      {item.caption}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                      {prod.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium pt-2 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      View System Details <span className="text-[8px]">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}