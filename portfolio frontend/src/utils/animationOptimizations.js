// Advanced Animation Performance Optimization Utilities

/**
 * Performance-optimized animation configurations for Framer Motion
 * These configurations prioritize smooth performance over complex animations
 */

// Standard performance-optimized variants
export const performanceVariants = {
  // Fade animations (most performant)
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    }
  },

  // Slide animations (GPU accelerated)
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },

  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },

  // Scale animations (hardware accelerated)
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
};

// Container variants for staggered animations
export const containerVariants = {
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "tween"
      }
    }
  },

  medium: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        type: "tween"
      }
    }
  },

  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
        type: "tween"
      }
    }
  }
};

// Performance-optimized transition presets
export const transitions = {
  // Ultra-fast for UI interactions
  instant: {
    type: "tween",
    duration: 0.15,
    ease: "easeOut"
  },

  // Fast for hover effects
  fast: {
    type: "tween",
    duration: 0.2,
    ease: "easeOut"
  },

  // Standard for most animations
  standard: {
    type: "tween",
    duration: 0.3,
    ease: "easeOut"
  },

  // Smooth for page transitions
  smooth: {
    type: "tween",
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
  }
};

// Hardware acceleration styles for better performance
export const hardwareAcceleration = {
  willChange: "transform",
  backfaceVisibility: "hidden",
  perspective: 1000,
  transform: "translateZ(0)" // Force hardware acceleration
};

// Animation performance monitor
export const animationPerformance = {
  // Check if device prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get optimal animation configuration based on device
  getOptimalConfig: () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile || window.innerWidth < 768;
    const prefersReduced = animationPerformance.prefersReducedMotion();

    if (prefersReduced) {
      return {
        duration: 0,
        type: "tween",
        ease: "linear"
      };
    }

    if (isLowEnd) {
      return {
        duration: 0.2,
        type: "tween",
        ease: "easeOut"
      };
    }

    return transitions.standard;
  },

  // Create performance-aware motion values
  createOptimizedSpring: (value, config = {}) => {
    const isLowEnd = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      damping: isLowEnd ? 25 : (config.damping || 15),
      stiffness: isLowEnd ? 200 : (config.stiffness || 150),
      mass: isLowEnd ? 0.8 : (config.mass || 0.5),
      restDelta: 0.01,
      restSpeed: 0.01
    };
  }
};

// Frame rate limiter for animations
export const frameRateLimiter = {
  lastFrame: 0,
  targetFPS: 60,

  shouldUpdate: function(timestamp) {
    const deltaTime = timestamp - this.lastFrame;
    const targetDelta = 1000 / this.targetFPS;
    
    if (deltaTime >= targetDelta) {
      this.lastFrame = timestamp;
      return true;
    }
    return false;
  },

  setTargetFPS: function(fps) {
    this.targetFPS = Math.max(30, Math.min(120, fps)); // Clamp between 30-120 FPS
  }
};

export default {
  performanceVariants,
  containerVariants,
  transitions,
  hardwareAcceleration,
  animationPerformance,
  frameRateLimiter
};
