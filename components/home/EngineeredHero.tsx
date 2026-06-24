'use client';

import { motion } from 'framer-motion';
import { transitionEase } from '@/lib/motion';
import InteractiveChassis from './InteractiveChassis';

export default function EngineeredHero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex flex-col justify-end px-6 pb-12 md:pb-24 max-w-[1600px] mx-auto w-full border-b border-brand-graphite/10">
      
      {/* Background Interactive Layer */}
      <div className="absolute inset-0 px-6 pt-6 pb-24 md:pb-32 -z-10">
        <div className="w-full h-full bg-transparent relative">
          <InteractiveChassis />
        </div>
      </div>

      {/* Foreground Typography Matrix */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between w-full pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: transitionEase, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[140px] leading-[0.85] tracking-tight uppercase mb-6 md:mb-0 text-brand-graphite">
            Absolute <br /> Velocity.
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: transitionEase, delay: 0.6 }}
          className="md:max-w-xs md:text-right"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] leading-relaxed text-brand-graphite/80 font-medium">
            Systematic approaches to human kinetic output. Engineered precision for the vanguard of performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}