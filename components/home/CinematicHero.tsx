'use client';

import { motion } from 'framer-motion';
import { transitionEase } from '@/lib/motion';

export default function CinematicHero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex flex-col justify-end px-6 pb-12 md:pb-24 max-w-[1600px] mx-auto w-full">
      
      {/* Background Visual Asset */}
      <div className="absolute inset-0 px-6 pt-6 pb-24 md:pb-32 -z-10">
        <div className="w-full h-full bg-[#EAEAEA] border border-brand-graphite/10 overflow-hidden relative">
          {/* Placeholder for AI Video/Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-graphite/40 font-medium">
              [ INSERT AI CAMPAIGN VIDEO HERE ]
            </p>
          </div>
        </div>
      </div>

      {/* Typography Matrix */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: transitionEase, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[140px] leading-[0.85] tracking-tight uppercase mb-6 md:mb-0 mix-blend-difference text-brand-offwhite">
            Absolute <br /> Velocity.
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: transitionEase, delay: 0.6 }}
          className="md:max-w-xs md:text-right"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] leading-relaxed mix-blend-difference text-brand-offwhite/80">
            Systematic approaches to human kinetic output. Engineered precision for the vanguard of performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}