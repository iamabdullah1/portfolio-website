import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { useEffect } from "react";

const ParallaxBackground = () => {
  // Create motion values for Lenis scroll integration
  const scrollYProgress = useMotionValue(0);
  
  // Use Lenis scroll events for better performance
  useEffect(() => {
    const handleLenisScroll = (e) => {
      // Convert Lenis scroll progress to 0-1 range
      const progress = e.detail.progress || 0;
      scrollYProgress.set(Math.min(progress * 2, 1)); // Limit to first half of page scroll
    };

    // Listen for Lenis scroll events
    window.addEventListener('lenisScroll', handleLenisScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('lenisScroll', handleLenisScroll);
    };
  }, [scrollYProgress]);

  const x = useSpring(scrollYProgress, { damping: 90, stiffness: 400 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;