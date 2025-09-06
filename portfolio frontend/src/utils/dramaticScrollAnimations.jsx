// Enhanced Dramatic Scroll Animations

import { motion } from "motion/react";

/**
 * Dramatic Scroll-triggered Animation Variants
 * These create more impressive entrance effects
 */

export const dramaticScrollVariants = {
  // Dramatic fade with scale and blur
  dramaticFadeIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)",
      y: 60
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  },

  // Cinematic slide up with rotation
  cinematicSlideUp: {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 45,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      }
    }
  },

  // Elastic bounce entrance
  elasticBounce: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      y: 80
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        mass: 0.8,
        duration: 1.5
      }
    }
  },

  // Magnetic slide from left
  magneticSlideLeft: {
    hidden: { 
      opacity: 0, 
      x: -120,
      rotateY: -45,
      scale: 0.7
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.34, 1.56, 0.64, 1],
        staggerChildren: 0.08
      }
    }
  },

  // Magnetic slide from right
  magneticSlideRight: {
    hidden: { 
      opacity: 0, 
      x: 120,
      rotateY: 45,
      scale: 0.7
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.34, 1.56, 0.64, 1],
        staggerChildren: 0.08
      }
    }
  },

  // Typewriter reveal effect
  typewriterReveal: {
    hidden: { 
      width: 0,
      opacity: 0
    },
    visible: { 
      width: "auto",
      opacity: 1,
      transition: {
        width: {
          duration: 1.5,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5,
          delay: 0.2
        }
      }
    }
  },

  // Morphing scale entrance
  morphingScale: {
    hidden: { 
      opacity: 0, 
      scale: 0,
      borderRadius: "50%"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      borderRadius: "0%",
      transition: {
        duration: 1.2,
        ease: [0.68, -0.55, 0.265, 1.55],
        borderRadius: { delay: 0.3, duration: 0.6 }
      }
    }
  },

  // Glitch-style entrance
  glitchEntrance: {
    hidden: { 
      opacity: 0,
      x: 0,
      skewX: 45,
      scale: 1.1
    },
    visible: { 
      opacity: 1,
      x: [0, -5, 5, -3, 3, 0],
      skewX: [45, -10, 10, -5, 5, 0],
      scale: [1.1, 1.05, 1.02, 1.01, 1],
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  },

  // Parallax depth slide
  parallaxDepth: {
    hidden: { 
      opacity: 0, 
      y: 150,
      z: -100,
      rotateX: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      z: 0,
      rotateX: 0,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.12
      }
    }
  }
};

/**
 * Container variants for orchestrated animations
 */
export const dramaticContainerVariants = {
  staggerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  },

  staggerCinematic: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  cascadeLeft: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
        ease: "easeOut"
      }
    }
  },

  cascadeRight: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        ease: "easeOut"
      }
    }
  }
};

/**
 * Scroll-triggered animation hook
 */
export const useScrollAnimation = (variant = "dramaticFadeIn", options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
    ...options
  };

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: defaultOptions,
    variants: dramaticScrollVariants[variant] || dramaticScrollVariants.dramaticFadeIn
  };
};

/**
 * Enhanced ScrollMotion Component
 */
export const ScrollMotion = ({ 
  children, 
  variant = "dramaticFadeIn", 
  delay = 0,
  className = "",
  ...props 
}) => {
  const animationProps = useScrollAnimation(variant, {
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      className={className}
      {...animationProps}
      transition={{
        ...dramaticScrollVariants[variant]?.visible?.transition,
        delay: delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Text reveal animation component
 */
export const TextReveal = ({ 
  children, 
  delay = 0,
  className = "",
  stagger = 0.05 
}) => {
  const words = children.split(' ');
  
  return (
    <motion.div
      className={className}
      variants={dramaticContainerVariants.staggerCinematic}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 50,
              rotateX: 90
            },
            visible: { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                delay: delay + (index * stagger),
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

/**
 * Card flip reveal animation
 */
export const CardFlipReveal = ({ 
  children, 
  delay = 0,
  className = "" 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        rotateY: 180,
        scale: 0.8
      }}
      whileInView={{ 
        opacity: 1, 
        rotateY: 0,
        scale: 1
      }}
      viewport={{ once: true, threshold: 0.3 }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        rotateY: { 
          type: "spring", 
          damping: 15, 
          stiffness: 100 
        }
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Smooth Lenis scroll configuration for dramatic effects
 */
export const dramaticScrollConfig = {
  duration: 1.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1.2,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  autoResize: true,
  syncTouch: false,
  syncTouchLerp: 0.1,
  __experimental__naiveDimensions: false
};

export default {
  dramaticScrollVariants,
  dramaticContainerVariants,
  useScrollAnimation,
  ScrollMotion,
  TextReveal,
  CardFlipReveal,
  dramaticScrollConfig
};
