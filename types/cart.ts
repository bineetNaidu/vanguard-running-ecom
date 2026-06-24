import { Product } from './product';

export interface CartItem {
  id: string; // Unique cart line item ID (typically product.id + size)
  product: Product;
  quantity: number;
  size: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}