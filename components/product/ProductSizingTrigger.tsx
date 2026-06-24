'use client';

import { useState } from 'react';
import TrueSizingMatrix from './TrueSizingMatrix';

interface ProductSizingTriggerProps {
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  category: string;
}

export default function ProductSizingTrigger({ selectedSize, setSelectedSize, category }: ProductSizingTriggerProps) {
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  return (
    <div className="w-full mt-8 border-t border-brand-graphite/10 pt-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-gray">
          System Sizing
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-graphite font-medium">
          {selectedSize ? `Target: [ ${selectedSize} ]` : 'Target: [ UNCALCULATED ]'}
        </span>
      </div>

      <button 
        onClick={() => setIsMatrixOpen(true)}
        className="w-full flex items-center justify-between border border-brand-graphite/20 p-4 md:p-5 hover:border-brand-graphite transition-colors group"
      >
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-mono font-medium text-left">
          {selectedSize ? `RE-CALCULATE SIZING` : `RUN KINETIC SIZING MATRIX`}
        </span>
        <span className="text-[14px] text-brand-graphite/40 group-hover:text-brand-graphite transition-colors">
          +
        </span>
      </button>

      {/* The Overlay */}
      <TrueSizingMatrix 
        isOpen={isMatrixOpen} 
        onClose={() => setIsMatrixOpen(false)} 
        onSelectSize={setSelectedSize}
        category={category}
      />
    </div>
  );
}