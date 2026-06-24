'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function ProductFeatureStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Isolate target product data
  const targetProduct = products.find(p => p.slug === 'vxr-04-velocity-elite') || products[3];

  // Motion coordinates mapping from -1 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Weighty spring physics for premium response
  const springConfig = { damping: 45, stiffness: 120, mass: 1.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Parallax transformations: Image shifts WITH mouse, text moves OPPOSITE
  const imgX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const imgY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const imgRotate = useTransform(smoothX, [-1, 1], [-4, 4]);

  const textX = useTransform(smoothX, [-1, 1], [15, -15]);
  const textY = useTransform(smoothY, [-1, 1], [15, -15]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouchDevice) {
      // Programmatic ambient wave for mobile interaction representation
      let time = 0;
      const interval = setInterval(() => {
        time += 0.015;
        x.set(Math.sin(time) * 0.2);
        y.set(Math.cos(time * 1.2) * 0.15);
      }, 16);
      return () => clearInterval(interval);
    } else {
      const handleMove = (e: MouseEvent) => {
        if (!stageRef.current) return;
        const { left, top, width, height } = stageRef.current.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) / (width / 2));
        y.set((e.clientY - (top + height / 2)) / (height / 2));
      };

      const container = stageRef.current;
      if (container) container.addEventListener('mousemove', handleMove);
      return () => {
        if (container) container.removeEventListener('mousemove', handleMove);
      };
    }
  }, [x, y, isTouchDevice]);

  return (
    <section 
      ref={stageRef}
      className="max-w-[1600px] mx-auto px-6 py-20 md:py-32 border-b border-brand-graphite/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh] md:min-h-[90vh] bg-[#EAEAEA]/30 md:cursor-none"
    >
      {/* Background Subtle Spatial Reference Grid */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-4 border-x border-brand-graphite/5">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="border-t border-l border-brand-graphite/3" />
        ))}
      </div>

      {/* Floating System Architecture Metadata Tag */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="absolute top-16 left-12 font-mono text-[9px] uppercase tracking-[0.25em] text-brand-gray pointer-events-none hidden md:block"
      >
        SYS.MODEL // VELOCITY_ELITE_V4
      </motion.div>

      {/* Center 3D-Look Parallax Image Plate */}
      <Link href={`/product/${targetProduct.slug}`} className="relative z-10 group block w-full max-w-4xl aspect-video">
        <motion.div 
          style={{ x: imgX, y: imgY, rotateZ: imgRotate, perspective: 1200 }}
          className="w-full h-full relative border border-brand-graphite/10 shadow-2xl bg-[#EAEAEA] overflow-hidden"
        >
          {!imgError ? (
            <Image 
              src="/assets/featured-elite.jpg" 
              alt={targetProduct.name}
              fill
              className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-graphite/40 font-medium">
                [ FEATURED: {targetProduct.name.toUpperCase()} IMAGE ]
              </span>
            </div>
          )}

          {/* Touch-safe interaction indicator */}
          <div className="absolute bottom-4 left-4 bg-brand-graphite text-brand-offwhite px-3 py-1.5 text-[8px] uppercase tracking-widest font-mono md:hidden">
            View System →
          </div>

          {/* Dynamic Follow-Cursor Context Label */}
          <motion.div 
            style={{ x: imgX, y: imgY }}
            className="absolute bottom-8 left-8 bg-brand-graphite text-brand-offwhite px-4 py-2 text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono"
          >
            Deploy System_
          </motion.div>
        </motion.div>
      </Link>

      {/* Floating Massive Typographic Matrix Overlay */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="w-full max-w-6xl mt-12 flex flex-col md:flex-row items-start md:items-end justify-between relative z-20 pointer-events-none"
      >
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gray font-mono block mb-2">
            Pinnacle Propulsion
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-none text-brand-graphite wrap-break-word">
            {targetProduct.name}
          </h2>
        </div>

        <div className="mt-6 md:mt-0 md:text-right max-w-xs">
          <p className="text-[12px] font-mono mb-2 text-brand-graphite/60">
            [ PRICE: ${targetProduct.price} USD ]
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] leading-relaxed text-brand-gray">
            Dual-plated carbon configuration optimized for pure target threshold conversion.
          </p>
        </div>
      </motion.div>
    </section>
  );
}