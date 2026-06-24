export type ProductCategory = 'FOOTWEAR' | 'APPAREL' | 'SYSTEMS';

export interface ProductImage {
  url: string;
  alt: string;
  isPlaceholder: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  features: string[];
  images: ProductImage[];
}