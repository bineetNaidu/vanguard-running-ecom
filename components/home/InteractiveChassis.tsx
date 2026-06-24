'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import TechNode from './TechNode';

export default function InteractiveChassis() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Raw mouse coordinates normalized from -1 to 1
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Overdamped springs for a heavy, premium feel (no bouncy defaults)
  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Map springs to CSS rotation (subtle tilt) and translation (movement)
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const translateX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the container
      const center_x = left + width / 2;
      const center_y = top + height / 2;
      
      // Normalize to a -1 to 1 scale
      rawX.set((e.clientX - center_x) / (width / 2));
      rawY.set((e.clientY - center_y) / (height / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      
      {/* The Magnetic Wrapper */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          perspective: 1000
        }}
        className="relative w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center"
      >
        
        {/* The Product Graphic / AI Placeholder */}
        <div className="relative w-3/4 h-3/4 bg-[#EAEAEA] border border-brand-graphite/10 flex items-center justify-center shadow-2xl transition-transform duration-700">
           <span className="text-[10px] uppercase tracking-[0.3em] text-brand-graphite/40 font-medium">
              [ INSERT HI-RES CHASSIS PNG ]
           </span>
        </div>

        {/* Technical Data Nodes */}
        <TechNode 
          mouseX={smoothX} 
          mouseY={smoothY} 
          label="01. CARBON CORE" 
          position={{ top: '20%', left: '5%' }} 
          inverseFactor={30}
          delay={0.2}
        />
        <TechNode 
          mouseX={smoothX} 
          mouseY={smoothY} 
          label="02. AERO MATRIX" 
          position={{ bottom: '25%', right: '0%' }} 
          inverseFactor={45}
          delay={0.4}
        />
        <TechNode 
          mouseX={smoothX} 
          mouseY={smoothY} 
          label="SYS. ACTIVE" 
          position={{ top: '10%', right: '15%' }} 
          inverseFactor={15}
          delay={0.6}
        />

      </motion.div>
    </div>
  );
}