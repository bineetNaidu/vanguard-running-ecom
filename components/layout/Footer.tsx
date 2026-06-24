import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-graphite text-brand-offwhite px-6 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-display text-3xl md:text-4xl mb-6 tracking-wide">VANGUARD RUNNING</h2>
          <p className="text-brand-offwhite/60 max-w-md leading-relaxed text-[13px]">
            Engineered for maximum energy return and structural stability. 
            A concept brand experience dedicated to the precise intersection of performance and design.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="uppercase tracking-[0.2em] text-brand-offwhite/40 mb-2 text-[10px]">Index</h3>
          <Link href="/collection" className="hover:text-white transition-colors text-[13px]">Collection</Link>
          <Link href="/technology" className="hover:text-white transition-colors text-[13px]">Technology</Link>
          <Link href="/journal" className="hover:text-white transition-colors text-[13px]">Journal</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="uppercase tracking-[0.2em] text-brand-offwhite/40 mb-2 text-[10px]">System</h3>
          <Link href="#" className="hover:text-white transition-colors text-[13px]">Client Account</Link>
          <Link href="#" className="hover:text-white transition-colors text-[13px]">Global Shipping</Link>
          <Link href="#" className="hover:text-white transition-colors text-[13px]">Returns Hub</Link>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto mt-24 pt-8 border-t border-brand-offwhite/10 text-[10px] text-brand-offwhite/40 uppercase tracking-widest flex justify-between">
        <span>© {new Date().getFullYear()} Vanguard Running Systems</span>
        <span>Prototype Concept</span>
      </div>
    </footer>
  );
}