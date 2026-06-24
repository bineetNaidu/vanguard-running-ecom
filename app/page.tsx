import CinematicHero from '@/components/home/CinematicHero';
import VelocityMarquee from '@/components/home/VelocityMarquee';
import SplitScreenLookbook from '@/components/home/SplitScreenLookbook';

export default function Home() {
  return (
    <>
      <CinematicHero />
      
      {/* Negative scroll velocity moves left, positive moves right.
        Base velocity sets the idle drift speed.
      */}
      <VelocityMarquee text="Vanguard Running Systems — Maximum Kinetic Return — " baseVelocity={-2} />
      
      <SplitScreenLookbook />
    </>
  );
}