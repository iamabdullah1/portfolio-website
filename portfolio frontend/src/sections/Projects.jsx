import { useState, useCallback, useRef } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Optimized spring configuration for better performance
  const springX = useSpring(x, { 
    damping: 15, // Increased damping for smoother animation
    stiffness: 150, // Increased stiffness for responsiveness
    mass: 0.5 // Reduced mass for quicker response
  });
  const springY = useSpring(y, { 
    damping: 15, 
    stiffness: 150, 
    mass: 0.5 
  });
  
  // Performance optimization: throttle mouse movement
  const lastMouseMove = useRef(0);
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    // Throttle to ~60fps for smooth performance
    if (now - lastMouseMove.current < 16) return;
    lastMouseMove.current = now;
    
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  }, [x, y]);
  
  const [preview, setPreview] = useState(null);
  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut",
            // Performance optimizations
            type: "tween" // Faster than spring for quick animations
          }}
          // Performance optimizations for hardware acceleration
          style={{
            x: springX,
            y: springY,
            willChange: "transform", // Hint browser for GPU acceleration
            backfaceVisibility: "hidden", // Prevent flickering
            perspective: 1000 // Enable 3D acceleration
          }}
        />
      )}
    </section>
  );
};

export default Projects;