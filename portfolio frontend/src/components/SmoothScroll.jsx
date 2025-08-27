import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Duration of scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true, // Enable smooth scrolling
      mouseMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Disable infinite scroll
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Add scroll event listener for other components that might need scroll position
    const handleScroll = (e) => {
      // Dispatch custom scroll event with Lenis scroll data
      window.dispatchEvent(new CustomEvent('lenisScroll', {
        detail: {
          scroll: e.scroll,
          limit: e.limit,
          velocity: e.velocity,
          direction: e.direction,
          progress: e.progress
        }
      }));
    };

    lenis.on('scroll', handleScroll);

    // Cleanup function
    return () => {
      lenis.off('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Expose scroll methods globally for navigation
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      window.scrollToSection = (target) => {
        lenis.scrollTo(target, {
          offset: -80, // Offset for fixed navbar
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      };

      window.scrollToTop = () => {
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      };
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
