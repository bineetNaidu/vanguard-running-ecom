'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ZonalHeatmapProps {
  activeFeature: number | null;
}

// Spatially mapped relative coordinates for standard Vanguard product shots.
// These percentages drop the reticle onto different key zones (Heel, Midfoot, Toe, Upper, Collar).
const HOTSPOTS = [
  { x: '35%', y: '45%' }, // 01: Upper / Core
  { x: '65%', y: '75%' }, // 02: Outsole / Heel
  { x: '75%', y: '35%' }, // 03: Forefoot / Membrane
  { x: '50%', y: '85%' }, // 04: Bottom Plate
  { x: '20%', y: '60%' }, // 05: Rear Articulation
];

export default function ZonalHeatmap({ activeFeature }: ZonalHeatmapProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {activeFeature !== null && HOTSPOTS[activeFeature] && (
          <motion.div
            key="hotspot"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute"
            // Transform directly translates our CSS percentages to the exact pixel coordinate
            style={{ left: HOTSPOTS[activeFeature].x, top: HOTSPOTS[activeFeature].y }}
          >
            {/* The Engineered Targeting Reticle */}
            <div className="relative flex items-center justify-center -ml-3 -mt-3 w-6 h-6">
              {/* Radar pulse */}
              <div className="absolute inset-0 border border-[#ff3333] rounded-full animate-ping opacity-60" />
              
              {/* Solid core */}
              <div className="w-1.5 h-1.5 bg-[#ff3333] rounded-full z-10" />
              
              {/* Architectural vector line extending outwards */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute h-px bg-[#ff3333]/50 top-1/2 -translate-y-1/2 left-full ml-2 origin-left" 
              />
              
              {/* Technical data readout */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="absolute text-[9px] font-mono text-[#ff3333] tracking-widest top-1/2 -translate-y-1/2 left-full ml-[72px] whitespace-nowrap bg-brand-offwhite/80 px-2 py-0.5 border border-[#ff3333]/20"
              >
                ZONE_LOC // 0{activeFeature + 1}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Ambient vignette to make the red reticle pop more when active */}
      <motion.div 
        animate={{ opacity: activeFeature !== null ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-brand-offwhite/30 backdrop-blur-[1px] mix-blend-multiply"
      />
    </div>
  );
}