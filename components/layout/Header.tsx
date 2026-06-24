'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { useEffect, useState } from 'react';

export default function Header() {
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  
  // Prevent Next.js server-client hydration mismatch for persisted store data
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-offwhite/90 backdrop-blur-md border-b border-brand-graphite/10">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1600px] mx-auto text-[11px] uppercase tracking-[0.2em] font-medium">
        <nav className="flex gap-8 w-1/3">
          <Link href="/collection" className="hover:text-brand-gray transition-colors duration-300">
            Collection
          </Link>
          <Link href="/technology" className="hover:text-brand-gray transition-colors duration-300">
            Technology
          </Link>
        </nav>
        
        <div className="flex justify-center w-1/3">
          <Link href="/" className="font-display text-xl tracking-normal font-bold uppercase">
            Vanguard
          </Link>
        </div>
        
        <nav className="flex gap-8 w-1/3 justify-end items-center">
          <Link href="/journal" className="hover:text-brand-gray transition-colors duration-300">
            Journal
          </Link>
          <button 
            onClick={openCart}
            className="hover:text-brand-gray transition-colors duration-300 flex items-center gap-1"
          >
            Cart [{mounted ? itemCount : 0}]
          </button>
        </nav>
      </div>
    </header>
  );
}