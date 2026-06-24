import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SystemBootSequence from '@/components/layout/SystemBootSequence';

// Technical Sans-Serif
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Editorial Serif
const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VANGUARD RUNNING | Engineered Precision',
  description: 'A concept brand experience that happens to sell products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body className="font-sans bg-brand-offwhite text-brand-graphite antialiased selection:bg-brand-graphite selection:text-brand-offwhite">
        <SystemBootSequence />
        <Header />
        <CartDrawer />
        {/* pt-20 accounts for the fixed header */}
        <main className="grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}