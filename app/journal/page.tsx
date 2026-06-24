import Link from 'next/link';

export default function JournalPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-brand-graphite/10 pb-12">
        <h1 className="font-display text-5xl md:text-7xl tracking-tight uppercase">
          The Vanguard <br /> Journal
        </h1>
        <div className="mt-8 md:mt-0 text-[10px] uppercase tracking-[0.2em] text-brand-graphite/60 flex space-x-8">
          <span>Vol. 001</span>
          <span>Manifesto & Field Tests</span>
        </div>
      </div>

      {/* Magazine Layout: Featured Campaign */}
      <article className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-8">
            <div className="w-full aspect-video bg-[#EAEAEA] border border-brand-graphite/5 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-graphite/40">
                [ INSERT CAMPAIGN HERO IMAGE ]
              </span>
            </div>
          </div>
          <div className="md:col-span-4 md:pl-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray block mb-4">
              Field Test — 04.12.2025
            </span>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight uppercase mb-6 leading-none">
              Project: <br /> Elevation.
            </h2>
            <Link 
              href="#" 
              className="inline-block text-[11px] uppercase tracking-[0.2em] font-medium border-b border-brand-graphite pb-1 hover:text-brand-gray transition-colors"
            >
              Read Dispatch
            </Link>
          </div>
        </div>
      </article>

      {/* Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32">
        
        {/* Left Column Text-Heavy Entry */}
        <article className="flex flex-col justify-center">
          <h3 className="font-display text-3xl md:text-4xl tracking-tight uppercase mb-6">
            The Death of the Traditional Marathon Shoe.
          </h3>
          <p className="text-brand-graphite/70 leading-relaxed mb-8">
            For decades, standard EVA foam dictated the limits of human endurance. The physical toll of striking concrete 30,000 times over 26.2 miles was accepted as an absolute. But geometry and supercritical fluids have shifted the paradigm. We are no longer absorbing impact; we are weaponizing it.
          </p>
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray font-mono">
            By Dr. Aris Thorne — Lead Biomechanics
          </span>
        </article>

        {/* Right Column Image Entry */}
        <article className="flex flex-col">
          <div className="w-full aspect-3/4 bg-[#EAEAEA] border border-brand-graphite/5 flex items-center justify-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-graphite/40">
              [ INSERT EDITORIAL PORTRAIT ]
            </span>
          </div>
          <h3 className="font-display text-2xl tracking-tight uppercase mb-4">
            Isolating the Threshold
          </h3>
          <Link 
            href="#" 
            className="inline-block text-[10px] uppercase tracking-[0.2em] font-medium text-brand-gray hover:text-brand-graphite transition-colors"
          >
            Read Dispatch →
          </Link>
        </article>

      </div>

      {/* Large Pull Quote */}
      <div className="py-24 border-y border-brand-graphite/10 text-center px-6">
        <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight uppercase max-w-5xl mx-auto leading-tight">
          "The limit does not exist in the human heart; it exists in the hardware. Upgrade the hardware."
        </blockquote>
      </div>

    </div>
  );
}