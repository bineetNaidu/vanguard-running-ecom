'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SplitScreenLookbook() {
  const lookbookItems = [
    { id: 1, label: '01 / Chassis', caption: '[ VXR-01 Lateral Prototype ]' },
    { id: 2, label: '02 / Membrane', caption: '[ Atmos Shell Translucency ]' },
    { id: 3, label: '03 / Kinetic', caption: '[ Aero Weave Articulation ]' },
  ];

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

        {/* Right: Scrolling Imagery Grid */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8 md:gap-16">
          {lookbookItems.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              key={item.id} 
              className="relative w-full aspect-3/4 md:aspect-4/5 bg-[#EAEAEA] border border-brand-graphite/5"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-graphite/40 mb-4">
                  {item.label}
                </span>
                <span className="text-xs uppercase tracking-widest text-brand-graphite/60 font-mono">
                  {item.caption}
                </span>
                <span className="absolute bottom-8 right-8 text-[10px] uppercase tracking-[0.2em] text-brand-graphite/30">
                  [ INSERT AI LOOKBOOK ART ]
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}