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
    <div className="sticky top-20 z-40 w-full bg-brand-offwhite/90 backdrop-blur-md border-b border-brand-graphite/10 pt-4 pb-4 px-6 mb-12">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Dynamic Data Readout */}
        <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-graphite/60 hidden lg:block w-32">
          SYS.QUERY // {totalResults}
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative text-[11px] uppercase tracking-[0.15em] font-medium pb-2 whitespace-nowrap transition-colors"
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

        {/* Layout View Toggles */}
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-mono min-w-fit justify-end">
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