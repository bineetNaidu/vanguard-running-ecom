'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface TechNodeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  label: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  inverseFactor?: number;
  delay?: number;
}

export default function TechNode({ 
  mouseX, 
  mouseY, 
  label, 
  position, 
  inverseFactor = 15,
  delay = 0 
}: TechNodeProps) {
  
  // Move in the opposite direction of the mouse for parallax depth
  const x = useTransform(mouseX, [-1, 1], [inverseFactor, -inverseFactor]);
  const y = useTransform(mouseY, [-1, 1], [inverseFactor, -inverseFactor]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
      style={{ ...position, x, y }}
      className="absolute z-20 pointer-events-none hidden md:flex items-center gap-3"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#ff3333] rounded-full animate-pulse" />
        <div className="absolute w-4 h-4 border border-[#ff3333]/40 rounded-full" />
      </div>
      
      {/* Engineered UI Tag */}
      <div className="text-[9px] uppercase tracking-[0.2em] text-brand-graphite font-mono bg-brand-offwhite/80 backdrop-blur-md px-3 py-1.5 border border-brand-graphite/10 whitespace-nowrap shadow-sm">
        {label}
      </div>
    </motion.div>
  );
}