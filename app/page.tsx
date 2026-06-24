import EngineeredHero from '@/components/home/EngineeredHero';
import VelocityMarquee from '@/components/home/VelocityMarquee';
import SplitScreenLookbook from '@/components/home/SplitScreenLookbook';

export default function Home() {
  return (
    <>
      <EngineeredHero />
      <VelocityMarquee text="Vanguard Running Systems — Maximum Kinetic Return — " baseVelocity={-2} />
      <SplitScreenLookbook />
    </>
  );
}