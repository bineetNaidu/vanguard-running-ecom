import { Product } from '../types/product';

export const products: Product[] = [
  // FOOTWEAR
  {
    id: 'prod-footwear-01',
    slug: 'vxr-01-carbon-trainer',
    name: 'VXR-01 Carbon Trainer',
    category: 'FOOTWEAR',
    price: 280,
    description: 'Engineered for maximum energy return and structural stability. The VXR-01 features a full-length carbon geometry specifically tuned for daily mileage and high-output efforts.',
    features: ['Tuned Carbon Geometry', 'Adaptive Foam Midsole', 'Seamless Monomesh Upper', 'Precision Heel Lock'],
    images: [
      { url: '/placeholders/footwear-1-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - VXR-01 Carbon Trainer Lateral View', isPlaceholder: true },
      { url: '/placeholders/footwear-1-b.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - VXR-01 Carbon Trainer Top View', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-footwear-02',
    slug: 'vxr-02-race-system',
    name: 'VXR-02 Race System',
    category: 'FOOTWEAR',
    price: 320,
    description: 'A stripped-down, ultralight racing platform. Removing all non-essential material, the VXR-02 provides raw biomechanical efficiency for race-day performance.',
    features: ['Ultralight Construction', 'Aggressive Rocker Profile', 'Micro-perforated Upper', 'High-Traction Outsole System'],
    images: [
      { url: '/placeholders/footwear-2-a.jpg', alt: '[ INSERT AI ART HERE ] - VXR-02 Race System Studio', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-footwear-03',
    slug: 'vxr-03-distance-platform',
    name: 'VXR-03 Distance Platform',
    category: 'FOOTWEAR',
    price: 260,
    description: 'Calculated cushioning for long-range engagements. The VXR-03 manages impact attenuation without sacrificing the firm, responsive feel required by elite athletes.',
    features: ['Maximized Volume Midsole', 'Expanded Toe Box', 'Integrated Arch Support', 'Breathable Knit Composite'],
    images: [
      { url: '/placeholders/footwear-3-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - VXR-03 Distance Platform', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-footwear-04',
    slug: 'vxr-04-velocity-elite',
    name: 'VXR-04 Velocity Elite',
    category: 'FOOTWEAR',
    price: 350,
    description: 'Our pinnacle velocity engine. Dual-plated geometry meets our most reactive compound yet, creating a propulsive experience that defies conventional physics.',
    features: ['Dual-Plate Geometry', 'Reactive Foam Compound', 'Aerodynamic Profile', 'Race-Fit Lacing System'],
    images: [
      { url: '/placeholders/footwear-4-a.jpg', alt: '[ INSERT AI ART HERE ] - VXR-04 Velocity Elite Lateral', isPlaceholder: true }
    ]
  },

  // APPAREL
  {
    id: 'prod-apparel-01',
    slug: 'flux-compression-tee',
    name: 'Flux Compression Tee',
    category: 'APPAREL',
    price: 110,
    description: 'Next-to-skin baseline engineering. Zonal compression mapping supports core muscle groups while managing thermal output during threshold efforts.',
    features: ['Zonal Compression Mapping', 'Thermal Regulation', 'Anti-Odor Treatment', 'Seamless Articulation'],
    images: [
      { url: '/placeholders/apparel-1-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - Flux Compression Tee Front', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-apparel-02',
    slug: 'vector-race-singlet',
    name: 'Vector Race Singlet',
    category: 'APPAREL',
    price: 85,
    description: 'Near-weightless coverage. The Vector Singlet utilizes a hydrophobic laser-cut mesh that refuses to hold moisture, staying light from start to finish.',
    features: ['Hydrophobic Mesh', 'Laser-Cut Ventilation', 'Bonded Seams', 'Ultralight Weight'],
    images: [
      { url: '/placeholders/apparel-2-a.jpg', alt: '[ INSERT AI ART HERE ] - Vector Race Singlet', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-apparel-03',
    slug: 'atmos-shell-jacket',
    name: 'Atmos Shell Jacket',
    category: 'APPAREL',
    price: 450,
    description: 'Absolute elemental protection. An engineered 3-layer membrane that completely blocks wind and precipitation while allowing extreme internal vapor transmission.',
    features: ['3-Layer Waterproof Membrane', 'Articulated Hood', 'Packable Design', 'Reflective Accents'],
    images: [
      { url: '/placeholders/apparel-3-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - Atmos Shell Jacket', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-apparel-04',
    slug: 'aero-weave-shorts',
    name: 'Aero Weave Shorts',
    category: 'APPAREL',
    price: 120,
    description: 'Precision-cut for zero restriction. Featuring an integrated moisture-wicking brief and exterior storage system that holds nutrition flat against the body.',
    features: ['Integrated Brief', 'Zero-Bounce Storage', '4-Way Stretch Woven Fabric', 'Bonded Hem'],
    images: [
      { url: '/placeholders/apparel-4-a.jpg', alt: '[ INSERT AI ART HERE ] - Aero Weave Shorts', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-apparel-05',
    slug: 'thermal-grid-half-zip',
    name: 'Thermal Grid Half Zip',
    category: 'APPAREL',
    price: 180,
    description: 'A micro-grid fleece architecture traps dead air for warmth while channels allow excess heat to escape rapidly. The perfect mid-layer for winter conditioning.',
    features: ['Micro-Grid Fleece', 'Extended Cuffs with Thumbholes', 'Deep Venting Zipper', 'Athletic Fit'],
    images: [
      { url: '/placeholders/apparel-5-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - Thermal Grid Half Zip', isPlaceholder: true }
    ]
  },

  // SYSTEMS
  {
    id: 'prod-systems-01',
    slug: 'pulse-running-cap',
    name: 'Pulse Running Cap',
    category: 'SYSTEMS',
    price: 45,
    description: 'A crushable, lightweight cap designed for maximum sun protection and heat dissipation. Features a pliable brim for easy pocket storage.',
    features: ['Crushable Brim', 'Laser-Cut Venting', 'Adjustable Bungee Closure', 'UPF 50+ Protection'],
    images: [
      { url: '/placeholders/systems-1-a.jpg', alt: '[ INSERT AI ART HERE ] - Pulse Running Cap', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-systems-02',
    slug: 'motion-belt',
    name: 'Motion Belt',
    category: 'SYSTEMS',
    price: 65,
    description: 'A continuous loop of high-stretch tubular mesh. Engineered to carry hydration and nutrition seamlessly against the center of gravity.',
    features: ['Tubular Construction', 'High-Capacity Storage', 'Silicone Grip Rings', 'Bounce-Free Ride'],
    images: [
      { url: '/placeholders/systems-2-a.jpg', alt: '[ PRODUCT IMAGE PLACEHOLDER ] - Motion Belt', isPlaceholder: true }
    ]
  },
  {
    id: 'prod-systems-03',
    slug: 'velocity-socks',
    name: 'Velocity Socks',
    category: 'SYSTEMS',
    price: 30,
    description: 'The critical link between foot and footwear. Zonal cushioning protects high-impact areas while compressive arch bands lock the midfoot in place.',
    features: ['Zonal Cushioning', 'Compressive Arch Support', 'Seamless Toe Box', 'Moisture Wicking Yarn'],
    images: [
      { url: '/placeholders/systems-3-a.jpg', alt: '[ INSERT AI ART HERE ] - Velocity Socks', isPlaceholder: true }
    ]
  }
];