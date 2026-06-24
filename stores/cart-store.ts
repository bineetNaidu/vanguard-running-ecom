import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem } from '@/types/cart';
import { Product } from '@/types/product';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (product: Product, size: string) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === `${product.id}-${size}`
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === `${product.id}-${size}`
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            id: `${product.id}-${size}`,
            product,
            quantity: 1,
            size,
          };

          return { items: [...state.items, newItem] };
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
    }),
    {
      name: 'vanguard-cart-storage',
      partialize: (state) => ({ items: state.items }), // Persist line items, but reset isOpen state on reload
    }
  )
);