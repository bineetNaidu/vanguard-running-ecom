import { Metadata } from 'next';
import CollectionInterface from '@/components/collection/CollectionInterface';

export const metadata: Metadata = {
  title: 'Collection | Vanguard Running',
  description: 'Precision-engineered tools for human velocity.',
};

export default function CollectionPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20 md:pb-32 bg-brand-offwhite">
      
      {/* Editorial Header Section */}
      <div className="max-w-[1600px] mx-auto px-5 md:px-6 mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-graphite/10 pb-8 md:pb-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 tracking-tight uppercase">
            The Collection
          </h1>
          <p className="text-brand-gray text-xs sm:text-sm md:text-base leading-relaxed">
            Precision-engineered tools for human velocity. Every garment and footwear system is designed to minimize energy leak and maximize forward momentum. Built for the vanguard.
          </p>
        </div>
        
        <div className="mt-8 md:mt-0 flex items-center space-x-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-graphite/60">
          <span>Index: All Systems</span>
        </div>
      </div>

      <CollectionInterface />
      
    </div>
  );
}