import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductDetailView from '@/components/product/ProductDetailView';

// Statically generate all product routes at build time for instant loading
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ 
    params 
  }: { 
    params: Promise<{ slug: string }> 
  }) {
    const resolvedParams = await params;
    const product = products.find((p) => p.slug === resolvedParams.slug);
  
    if (!product) {
      notFound();
    }
  
    return <ProductDetailView product={product} />;
  }