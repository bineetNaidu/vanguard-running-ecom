// Centralized motion physics to ensure consistency across the application.
// "Deliberate and Engineered" means zero bouncy defaults.

import { Easing } from "framer-motion";

export const transitionSpring = {
    type: 'spring',
    stiffness: 200,
    damping: 30,
    mass: 1,
  };
  
export const transitionEase: Easing = [0.25, 1, 0.5, 1]; // Custom bezier for precise slides/fades