import { products } from '@/data/products';
import ProductCard from '@/components/collection/ProductCard';

export default function CollectionPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32">
      
      {/* Editorial Header Section */}
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-graphite/10 pb-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-7xl mb-6 tracking-tight uppercase">
            The Collection
          </h1>
          <p className="text-brand-gray text-sm md:text-base leading-relaxed">
            Precision-engineered tools for human velocity. Every garment and footwear system is designed to minimize energy leak and maximize forward momentum. Built for the vanguard.
          </p>
        </div>
        
        <div className="mt-12 md:mt-0 flex items-center space-x-6 text-[10px] uppercase tracking-[0.2em] text-brand-graphite/60">
          <span>Index: All Systems</span>
          <span>[ {products.length} ] Units</span>
        </div>
      </div>

      {/* Product Grid 
        Deliberately spacious to allow the editorial typography to breathe. 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
}