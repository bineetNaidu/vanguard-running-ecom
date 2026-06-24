'use client';

import { motion } from 'framer-motion';
import { transitionEase } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // We initialize with a very subtle fade and shift.
      // This prevents abrupt page snapping and gives the layoutId
      // morphing transition a smooth canvas to execute upon.
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        ease: transitionEase 
      }}
      className="w-full h-full flex flex-col grow"
    >
      {children}
    </motion.div>
  );
}