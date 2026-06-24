'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/collection' },
    { name: 'Technology', href: '/technology' },
    { name: 'Journal', href: '/journal' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-brand-offwhite/90 backdrop-blur-md border-b border-brand-graphite/10">
        <div className="flex items-center justify-between px-5 md:px-6 py-5 max-w-[1600px] mx-auto text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium">
          
          {/* DESKTOP NAV: Hidden on mobile */}
          <nav className="hidden md:flex gap-8 w-1/3">
            <Link href="/collection" className="hover:text-brand-gray transition-colors">Collection</Link>
            <Link href="/technology" className="hover:text-brand-gray transition-colors">Technology</Link>
          </nav>
          
          {/* MOBILE NAV TOGGLE */}
          <button className="md:hidden w-1/4 text-left" onClick={() => setIsMenuOpen(true)}>
            [ Menu ]
          </button>
          
          <div className="flex justify-center w-1/2 md:w-1/3">
            <Link href="/" className="font-display text-lg md:text-xl tracking-normal font-bold uppercase">
              Vanguard
            </Link>
          </div>
          
          <nav className="flex gap-4 md:gap-8 w-1/4 md:w-1/3 justify-end items-center">
            <Link href="/journal" className="hidden md:block hover:text-brand-gray transition-colors">Journal</Link>
            <button 
              onClick={openCart}
              className="hover:text-brand-gray transition-colors flex items-center gap-1"
            >
              Cart [{mounted ? itemCount : 0}]
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-[#F4F4F2] md:hidden flex flex-col pt-32 px-6"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.2em]"
            >
              [ Close ]
            </button>
            <div className="flex flex-col gap-8 text-2xl uppercase font-display">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}