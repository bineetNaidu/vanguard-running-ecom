export interface EditorialSection {
    id: string;
    title: string;
    subtitle: string;
    body: string;
  }
  
  export const technologyStorytelling: EditorialSection[] = [
    {
      id: 'tech-carbon-geometry',
      title: 'Carbon Geometry',
      subtitle: 'Propulsion Engineered',
      body: 'A tuned carbon fiber plate geometry designed for maximum forward propulsion and biomechanical efficiency. We analyze the exact pivot points of the stride to create a lever system that reduces energy cost.'
    },
    {
      id: 'tech-energy-return',
      title: 'Energy Return System',
      subtitle: 'Kinetic Conservation',
      body: 'Our proprietary supercritical foam compound compresses and expands in milliseconds, returning kinetic energy back to the runner with near-zero heat loss.'
    },
    {
      id: 'tech-adaptive-cushion',
      title: 'Adaptive Cushioning',
      subtitle: 'Intelligent Attenuation',
      body: 'The midsole structure maps distinct zones of density, absorbing localized impact forces where they are highest while maintaining a firm platform for push-off.'
    },
    {
      id: 'tech-aero-construction',
      title: 'Aerodynamic Construction',
      subtitle: 'Fluid Dynamics',
      body: 'Every contour is shaped to reduce drag coefficients. From micro-perforated uppers to sculpted heel counters, air passes cleanly over the footwear matrix.'
    }
  ];