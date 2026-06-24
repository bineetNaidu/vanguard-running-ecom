'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';

// Wrap utility to loop the marquee seamlessly
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface VelocityMarqueeProps {
  text: string;
  baseVelocity?: number;
}

export default function VelocityMarquee({ text, baseVelocity = 2 }: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity to avoid jitter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity into a speed multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Track scroll direction to reverse marquee if scrolling up
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Adjust direction and speed based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Map the continuously increasing value to a percentage for CSS translation (-20% to -40% loops cleanly with 4 text copies)
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  return (
    <section className="py-24 overflow-hidden border-y border-brand-graphite/10 bg-brand-offwhite">
      <div className="m-0 flex whitespace-nowrap overflow-hidden">
        <motion.div className="flex whitespace-nowrap text-brand-graphite" style={{ x }}>
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="block mr-12 font-display text-7xl md:text-9xl uppercase tracking-tight"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}