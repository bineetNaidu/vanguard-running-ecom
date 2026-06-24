import { technologyStorytelling } from '@/data/editorial';

export default function TechnologyPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32">
      
      {/* Header */}
      <div className="max-w-3xl mb-32 md:mb-48">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase mb-8">
          System <br /> Architecture.
        </h1>
        <p className="text-brand-gray text-base md:text-lg leading-relaxed">
          We do not design shoes; we engineer kinetic return systems. Every material choice and geometric angle is calculated to minimize energy leak and push the boundaries of human endurance.
        </p>
      </div>

      {/* Sticky Storytelling Matrix */}
      <div className="flex flex-col relative space-y-32 md:space-y-0">
        {technologyStorytelling.map((section, index) => (
          <div 
            key={section.id} 
            className="flex flex-col md:flex-row min-h-screen relative"
          >
            {/* Sticky Visual Hemisphere */}
            <div className="w-full md:w-1/2 md:sticky md:top-0 h-[50vh] md:h-screen flex items-center justify-center p-0 md:pr-16 mb-8 md:mb-0">
              <div className="w-full aspect-square bg-[#EAEAEA] border border-brand-graphite/5 flex items-center justify-center relative overflow-hidden">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-graphite/40 z-10 absolute bottom-8 left-8">
                  Fig {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-graphite/40">
                  [ INSERT {section.title.toUpperCase()} 3D RENDER ]
                </span>
              </div>
            </div>

            {/* Scrolling Typography Hemisphere */}
            <div className="w-full md:w-1/2 flex items-center h-auto md:h-screen md:pl-16">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray font-mono mb-4 block">
                  0{index + 1} // {section.subtitle}
                </span>
                <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase mb-8">
                  {section.title}
                </h2>
                <p className="text-brand-graphite/80 leading-relaxed md:text-lg">
                  {section.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}