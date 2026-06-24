'use client';

import { motion } from 'framer-motion';

type FilterType = 'ALL' | 'FOOTWEAR' | 'APPAREL' | 'GEAR';
type ViewType = 'GRID' | 'LIST';

interface ControlMatrixProps {
  activeFilter: FilterType;
  setActiveFilter: (f: FilterType) => void;
  viewMode: ViewType;
  setViewMode: (v: ViewType) => void;
  totalResults: number;
}

export default function ControlMatrix({
  activeFilter,
  setActiveFilter,
  viewMode,
  setViewMode,
  totalResults
}: ControlMatrixProps) {
  const filters: FilterType[] = ['ALL', 'FOOTWEAR', 'APPAREL', 'GEAR'];

  return (
    <div className="sticky top-16 md:top-20 z-40 w-full bg-brand-offwhite/90 backdrop-blur-md border-b border-brand-graphite/10 pt-4 pb-0 md:pb-4 mb-8 md:mb-12">
      <div className="max-w-[1600px] mx-auto px-5 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
        
        {/* Dynamic Data Readout (Hidden on Mobile) */}
        <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-graphite/60 hidden lg:block w-32">
          SYS.QUERY // {totalResults}
        </div>

        {/* Filter Navigation (Edge-to-Edge scroll on mobile) */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-3 md:pb-0 w-full md:w-auto -mx-5 px-5 md:mx-0 md:px-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium pb-2 whitespace-nowrap transition-colors"
              style={{ color: activeFilter === filter ? '#121212' : '#8E8E8E' }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-brand-graphite"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Layout View Toggles (Hidden on mobile since it's 1-column natively) */}
        <div className="hidden md:flex min-w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-mono w-32 justify-end">
          <button 
            onClick={() => setViewMode('GRID')}
            className={`transition-opacity ${viewMode === 'GRID' ? 'opacity-100 text-brand-graphite' : 'opacity-40 hover:opacity-70 text-brand-graphite'}`}
          >
            [ GRID ]
          </button>
          <button 
            onClick={() => setViewMode('LIST')}
            className={`transition-opacity ${viewMode === 'LIST' ? 'opacity-100 text-brand-graphite' : 'opacity-40 hover:opacity-70 text-brand-graphite'}`}
          >
            [ LIST ]
          </button>
        </div>

      </div>
    </div>
  );
}