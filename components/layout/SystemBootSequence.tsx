'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemBootSequence() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Check if the system has already booted in this session
    const hasBooted = sessionStorage.getItem('vanguard_system_booted');
    
    if (hasBooted) {
      setIsBooting(false);
    } else {
      // Run the initial sequence
      const timer = setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem('vanguard_system_booted', 'true');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }}
          className="fixed inset-0 z-999 bg-[#EAEAEA] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Central Logo Matrix */}
          <div className="relative flex flex-col items-center">
            {/* Spinning Technical Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-brand-graphite/10 border-t-brand-graphite rounded-full mb-8"
            />
            
            {/* Absolute Centered Branding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center mb-8">
              <span className="font-display text-2xl uppercase tracking-widest text-brand-graphite">
                Vanguard
              </span>
            </div>

            {/* Boot Sequence Terminal Text */}
            <div className="flex flex-col items-center text-center space-y-2 font-mono text-[9px] uppercase tracking-[0.3em] text-brand-graphite/60 h-12 overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute"
              >
                Initializing Core Architecture...
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute"
              >
                Loading Kinetic Matrices...
              </motion.span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-12 w-48 h-px bg-brand-graphite/10 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.8, ease: "circOut" }}
              className="w-full h-full bg-brand-graphite"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}