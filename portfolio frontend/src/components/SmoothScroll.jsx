import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    // Detect mobile for performance optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Initialize Lenis with simplified, stable configuration
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: isMobile ? 0.8 : 1,
      smoothTouch: false, // Keep disabled for better mobile performance
      touchMultiplier: isMobile ? 1.5 : 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Simple, stable animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Simple scroll event dispatch
    const handleScroll = (e) => {
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

    // Cleanup
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
