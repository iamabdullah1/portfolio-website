import { useRef, useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
// import { Globe } from "../components/globe";
import Matter from 'matter-js';
// import CopyEmailButton from "../components/CopyEmailButton";
// import { Frameworks } from "../components/FrameWorks";
import { motion } from "framer-motion";

const Frameworks = () => {
  const grid2Container = useRef();
  const engineRef = useRef();
  const cardsRef = useRef([]);
  const runnerRef = useRef();
  const animationRef = useRef();
  const frameworksSectionRef = useRef();
  
  // Smart performance management states
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const lastInteractionTime = useRef(0);
  const inactivityTimer = useRef();

  // Smart pause/resume system for Frameworks section physics
  const pausePhysics = useCallback(() => {
    if (engineRef.current && runnerRef.current && isPhysicsActive) {
      console.log('🔴 Pausing Frameworks section physics engine...');
      Matter.Runner.stop(runnerRef.current);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setIsPhysicsActive(false);
    }
  }, [isPhysicsActive]);

  const resumePhysics = useCallback(() => {
    if (engineRef.current && runnerRef.current && !isPhysicsActive && isVisible) {
      console.log('🟢 Resuming Frameworks section physics engine...');
      Matter.Runner.run(runnerRef.current, engineRef.current);
      setIsPhysicsActive(true);
    }
  }, [isPhysicsActive, isVisible]);

  // Handle user interactions (framework card dragging)
  const handleInteraction = useCallback(() => {
    lastInteractionTime.current = Date.now();
    setIsInteracting(true);
    
    if (!isPhysicsActive && isVisible) {
      resumePhysics();
    }

    // Clear existing timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Set inactivity timer (pause after 5 seconds for framework cards)
    inactivityTimer.current = setTimeout(() => {
      setIsInteracting(false);
      // Only pause if no dragging is happening
      if (isPhysicsActive && !isInteracting) {
        pausePhysics();
      }
    }, 5000); // 5 seconds
  }, [isPhysicsActive, isVisible, isInteracting, resumePhysics, pausePhysics]);

  // Intersection Observer for visibility detection (Frameworks section)
  useEffect(() => {
    if (!frameworksSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const newIsVisible = entry.isIntersecting;
          setIsVisible(newIsVisible);
          
          if (newIsVisible) {
            console.log('📍 Frameworks section is visible');
            // Start physics when section becomes visible
            if (!isPhysicsActive) {
              resumePhysics();
            }
          } else {
            console.log('📍 Frameworks section is hidden - pausing physics');
            // Pause physics when section is not visible
            pausePhysics();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Start a bit earlier
      }
    );

    observer.observe(frameworksSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPhysicsActive, resumePhysics, pausePhysics]);

  useEffect(() => {
    if (!grid2Container.current) return;

    // Matter.js modules
    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

    // Create engine with performance optimizations
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Optimize engine settings for better performance
    engine.world.gravity.y = 0.8;
    engine.timing.timeScale = 1;
    engine.constraintIterations = 2; // Reduce constraint iterations
    engine.positionIterations = 6; // Reduce position iterations
    engine.velocityIterations = 4; // Reduce velocity iterations
    engine.enableSleeping = true; // Allow bodies to sleep when not moving

    // Get container dimensions
    const container = grid2Container.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    console.log('Container dimensions:', { width, height });

    // Create walls that match the exact container dimensions
    const wallThickness = 5; // Ultra-thin walls
    const walls = [
      // Top wall - positioned exactly at container top edge
      Bodies.rectangle(width / 2, 0, width, wallThickness, { 
        isStatic: true,
        render: { visible: false }
      }),
      // Bottom wall - positioned exactly at container bottom edge  
      Bodies.rectangle(width / 2, height, width, wallThickness, { 
        isStatic: true,
        render: { visible: false }
      }),
      // Left wall - positioned exactly at container left edge
      Bodies.rectangle(0, height / 2, wallThickness, height, { 
        isStatic: true,
        render: { visible: false }
      }),
      // Right wall - positioned exactly at container right edge
      Bodies.rectangle(width, height / 2, wallThickness, height, { 
        isStatic: true,
        render: { visible: false }
      })
    ];

    // Create physics bodies for cards with optimized settings
    const cardBodies = [
      Bodies.rectangle(width * 0.3, height * 0.2, 50, 50, { 
        restitution: 0.6, 
        friction: 0.4,
        frictionAir: 0.03, // Slightly more air friction for stability
        density: 0.001, // Lighter bodies
        sleepThreshold: 60, // Allow sleeping sooner
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(width * 0.7, height * 0.2, 50, 50, { 
        restitution: 0.6, 
        friction: 0.4,
        frictionAir: 0.03,
        density: 0.001,
        sleepThreshold: 60,
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(width * 0.2, height * 0.6, 50, 50, { 
        restitution: 0.6, 
        friction: 0.4,
        frictionAir: 0.03,
        density: 0.001,
        sleepThreshold: 60,
        render: { fillStyle: 'transparent' }
      }),
      Bodies.rectangle(width * 0.8, height * 0.6, 50, 50, { 
        restitution: 0.6, 
        friction: 0.4,
        frictionAir: 0.03,
        density: 0.001,
        sleepThreshold: 60,
        render: { fillStyle: 'transparent' }
      })
    ];

    cardsRef.current = cardBodies;

    // Add all bodies to world
    World.add(engine.world, [...walls, ...cardBodies]);

    // Create mouse constraint for dragging with better responsiveness
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.6,
        render: { visible: false }
      }
    });
    World.add(engine.world, mouseConstraint);

    // Enhanced mouse leave functionality to completely deselect and release cards
    const handleMouseLeave = () => {
      // Force release any current constraint when mouse leaves container
      if (mouseConstraint.constraint.bodyB) {
        const releasedBody = mouseConstraint.constraint.bodyB;
        
        // Add a natural release impulse
        Matter.Body.applyForce(releasedBody, releasedBody.position, {
          x: (Math.random() - 0.5) * 0.002,
          y: (Math.random() - 0.5) * 0.002
        });
      }
      
      // Force clear the constraint connections
      mouseConstraint.constraint.bodyB = null;
      mouseConstraint.constraint.bodyA = null;
      mouseConstraint.constraint.angleA = 0;
      mouseConstraint.constraint.angleB = 0;
      
      // Disable mouse constraint completely
      mouseConstraint.constraint.stiffness = 0;
      mouseConstraint.constraint.damping = 0;
      
      // Move mouse position far away to prevent interaction
      mouseConstraint.mouse.position.x = -10000;
      mouseConstraint.mouse.position.y = -10000;
      
      // Remove any mouse button state
      mouseConstraint.mouse.button = -1;
    };

    const handleMouseEnter = () => {
      // Re-enable mouse constraint when mouse enters container
      mouseConstraint.constraint.stiffness = 0.6;
      mouseConstraint.constraint.damping = 0.1;
      
      // Reset constraint connections
      mouseConstraint.constraint.bodyB = null;
      mouseConstraint.constraint.bodyA = null;
      mouseConstraint.constraint.angleA = 0;
      mouseConstraint.constraint.angleB = 0;
      
      // Reset mouse button state
      mouseConstraint.mouse.button = -1;
      
      // Mouse position will be updated automatically by Matter.js
    };

    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    // Give cards some gentle initial movement for smoother start
    cardBodies.forEach((body) => {
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1,
        y: (Math.random() - 0.5) * 1
      });
    });

    // Run the physics engine with optimized settings
    const runner = Runner.create({
      delta: 1000 / 60, // 60 FPS cap
      isFixed: false,
      enabled: true
    });
    runnerRef.current = runner;
    
    // Only start if physics is active (visible and not paused)
    if (isPhysicsActive) {
      Runner.run(runner, engine);
    }

    // Optimized position update with throttling
    let lastUpdate = 0;
    const targetFPS = 60;
    const frameDelay = 1000 / targetFPS;
    
    const updateCardPositions = (timestamp) => {
      if (timestamp - lastUpdate >= frameDelay) {
        cardBodies.forEach((body, index) => {
          const cardElements = container.querySelectorAll('img');
          const cardElement = cardElements[index];
          if (cardElement) {
            // Only update if body has moved significantly
            const currentX = parseFloat(cardElement.style.left) || 0;
            const currentY = parseFloat(cardElement.style.top) || 0;
            // Allow cards to reach the exact container edges (card size is 50px, so offset by 25px for centering)
            const newX = Math.max(0, Math.min(width - 50, body.position.x - 25));
            const newY = Math.max(0, Math.min(height - 50, body.position.y - 25));
            
            // Only update DOM if position changed significantly (> 0.5px)
            if (Math.abs(newX - currentX) > 0.5 || Math.abs(newY - currentY) > 0.5 || Math.abs(body.angle) > 0.01) {
              cardElement.style.left = `${newX}px`;
              cardElement.style.top = `${newY}px`;
              cardElement.style.transform = `rotate(${body.angle}rad)`;
            }
          }
        });
        lastUpdate = timestamp;
      }
      // Only continue animation if physics is still active
      if (isPhysicsActive) {
        animationRef.current = requestAnimationFrame(updateCardPositions);
      }
    };
    
    // Only start animation if physics is active
    if (isPhysicsActive) {
      animationRef.current = requestAnimationFrame(updateCardPositions);
    }

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      Engine.clear(engine);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      if (mouse) {
        mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
      }
    };
  }, [isPhysicsActive]);

  return (
    <motion.section 
      ref={frameworksSectionRef}
      className="c-space section-spacing" 
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Ali Sanati</p>
            <p className="subtext">
              Over the last 4 years, I developed my frontend and backend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="relative flex items-center justify-center w-full h-full overflow-hidden"
            onMouseEnter={handleInteraction}
            onMouseMove={handleInteraction}
            onTouchStart={handleInteraction}
            style={{ 
              position: 'relative'
            }}
          >
            <p className="flex items-end text-5xl text-gray-500 pointer-events-none">
              CODE IS CRAFT
            </p>
            {/* Physics-enabled Cards with solid collisions */}
            <img
              className="absolute w-15 cursor-grab select-none"
              src="assets/logos/java.png"
              style={{ 
                position: 'absolute', 
                zIndex: 10,
                width: '50px',
                height: '50px',
                objectFit: 'contain'
              }}
              draggable={false}
            />
            <img
              className="absolute w-15 cursor-grab select-none"
              src="assets/logos/nodejs.png"
              style={{ 
                position: 'absolute', 
                zIndex: 10,
                width: '50px',
                height: '50px',
                objectFit: 'contain'
              }}
              draggable={false}
            />
            <img
              className="absolute w-15 cursor-grab select-none"
              src="assets/logos/html5.svg"
              style={{ 
                position: 'absolute', 
                zIndex: 10,
                width: '50px',
                height: '50px',
                objectFit: 'contain'
              }}
              draggable={false}
            />
            <img
              className="absolute w-15 cursor-grab select-none"
              src="assets/logos/react.svg"
              style={{ 
                position: 'absolute', 
                zIndex: 10,
                width: '50px',
                height: '50px',
                objectFit: 'contain'
              }}
              draggable={false}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Pakistan, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            {/* <CopyEmailButton /> */}
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            {/* <Frameworks /> */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Frameworks;