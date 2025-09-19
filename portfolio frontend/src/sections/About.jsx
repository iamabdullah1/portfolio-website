import { useRef, useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import TechCards from "../components/TechCards";
import { Globe } from "../components/Globe";
import Matter from 'matter-js';


const { Engine, World, Bodies, MouseConstraint, Mouse, Body, Runner } = Matter;

const About = () => {
  const grid2Container = useRef();
  const grid3Container = useRef();
  const engineRef = useRef();
  const cardsRef = useRef([]);
  const cardElementsRef = useRef([]);
  const runnerRef = useRef();
  const animationRef = useRef();
  const aboutSectionRef = useRef();
  
  // Smart performance management states
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const lastInteractionTime = useRef(0);
  const inactivityTimer = useRef();

  // Smart pause/resume system for About section physics
  const pausePhysics = useCallback(() => {
    if (engineRef.current && runnerRef.current && isPhysicsActive) {
      console.log('🔴 Pausing About section physics engine (tech cards)...');
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
      console.log('🟢 Resuming About section physics engine (tech cards)...');
      Matter.Runner.run(runnerRef.current, engineRef.current);
      setIsPhysicsActive(true);
    }
  }, [isPhysicsActive, isVisible]);

  // Handle user interactions (tech card dragging)
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

    // Set inactivity timer (pause after 8 seconds for tech cards since they fall longer)
    inactivityTimer.current = setTimeout(() => {
      setIsInteracting(false);
      // Only pause if no dragging is happening
      if (isPhysicsActive && !isInteracting) {
        pausePhysics();
      }
    }, 8000); // 8 seconds for falling animation
  }, [isPhysicsActive, isVisible, isInteracting, resumePhysics, pausePhysics]);

  // Intersection Observer for visibility detection (About section)
  useEffect(() => {
    if (!aboutSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const newIsVisible = entry.isIntersecting;
          setIsVisible(newIsVisible);
          
          if (newIsVisible) {
            console.log('📍 About section with tech cards is visible');
            // Start physics when section becomes visible with falling animation
            setTimeout(() => {
              if (!isPhysicsActive) {
                resumePhysics();
              }
            }, 600); // Longer delay for dramatic falling effect
          } else {
            console.log('📍 About section is hidden - pausing tech cards physics');
            // Pause physics when section is not visible
            pausePhysics();
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible (better for falling animation)
        rootMargin: '100px' // Start earlier for falling effect
      }
    );

    observer.observe(aboutSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPhysicsActive, resumePhysics, pausePhysics]);

  useEffect(() => {
    if (!grid3Container.current) return;

    // Add a small delay to ensure container has proper dimensions
    const initPhysics = () => {
      // Create engine with performance optimizations
      const engine = Engine.create();
      engineRef.current = engine;
    
      // Optimize engine settings for natural movement and mobile performance
      engine.world.gravity.y = 0.4; // Moderate gravity for natural feel
      engine.timing.timeScale = 1;
      engine.constraintIterations = 2; // Reduced for performance
      engine.positionIterations = 6; // Reduced for performance
      engine.velocityIterations = 4; // Reduced for performance
      engine.enableSleeping = true; // Allow bodies to sleep when not moving
      
      // Mobile performance optimizations
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        engine.constraintIterations = 1; // Further reduce for mobile
        engine.positionIterations = 4;
        engine.velocityIterations = 3;
        engine.world.gravity.y = 0.3; // Slightly lighter gravity on mobile
      }

      // Get container dimensions
      const container = grid3Container.current;
      let containerRect = container.getBoundingClientRect();
      let width = containerRect.width;
      let height = containerRect.height;

      // Create walls with proper spacing to prevent sticking
      const wallThickness = 15; // Thicker walls for better containment
      const margin = 5; // Margin from edges to prevent sticking
      
      let walls = createWalls(width, height, margin, wallThickness);

      function createWalls(w, h, m, wt) {
        return [
          // Top wall
          Bodies.rectangle(w / 2, m + wt / 2, w - (m * 2), wt, { 
            isStatic: true,
            render: { visible: false },
            restitution: 0.4,
            friction: 0.3
          }),
          // Bottom wall
          Bodies.rectangle(w / 2, h - m - wt / 2, w - (m * 2), wt, { 
            isStatic: true,
            render: { visible: false },
            restitution: 0.4,
            friction: 0.3
          }),
          // Left wall
          Bodies.rectangle(m + wt / 2, h / 2, wt, h - (m * 2), { 
            isStatic: true,
            render: { visible: false },
            restitution: 0.4,
            friction: 0.3
          }),
          // Right wall
          Bodies.rectangle(w - m - wt / 2, h / 2, wt, h - (m * 2), { 
            isStatic: true,
            render: { visible: false },
            restitution: 0.4,
            friction: 0.3
          })
        ];
      }

      // Cache DOM elements once
      cardElementsRef.current = Array.from(container.querySelectorAll('img'));

      // Track last positions to avoid expensive DOM reads
      const lastPositions = cardElementsRef.current.map(() => ({ x: 0, y: 0, angle: 0 }));

      // Create physics bodies matching initial element positions and rotations
      const cardBodies = cardElementsRef.current.map((el, index) => {
        const initialLeftPercent = parseFloat(el.style.left) || 0;
        const initialTopPercent = parseFloat(el.style.top) || 0;
        const initialLeft = (initialLeftPercent / 100) * width;
        const initialTop = (initialTopPercent / 100) * height;

        // Parse initial rotate from transform (assuming format 'rotate(Xdeg)')
        const transformStr = el.style.transform || '';
        const rotateMatch = transformStr.match(/rotate\(([-]?\d+(?:\.\d+)?)deg\)/);
        const initialRotateDeg = rotateMatch ? parseFloat(rotateMatch[1]) : 0;
        const initialAngleRad = initialRotateDeg * (Math.PI / 180);

        // Set element to use transform for everything (optimize for GPU)
        el.style.position = 'absolute';
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.transform = `translate(${initialLeft}px, ${initialTop}px) rotate(${initialAngleRad}rad)`;

        // Update last position
        lastPositions[index] = { x: initialLeft, y: initialTop, angle: initialAngleRad };

        // Create body at center position
        return Bodies.rectangle(
          initialLeft + 25, // center x
          initialTop + 25,  // center y
          50,
          50,
          { 
            angle: initialAngleRad,
            restitution: 0.4,
            friction: 0.2,
            frictionAir: 0.005,
            density: 0.001,
            sleepThreshold: 60,
            render: { fillStyle: 'transparent' }
          }
        );
      });

      cardsRef.current = cardBodies;

      // Add all bodies to world
      World.add(engine.world, [...walls, ...cardBodies]);

      // Add initial realistic movement velocity to cards for gravitational effect
      cardBodies.forEach((card) => {
        Body.setVelocity(card, {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 1
        });
      });

      // Create mouse constraint for dragging with better responsiveness
      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.8,
          render: { visible: false }
        }
      });
      World.add(engine.world, mouseConstraint);

      // Add touch support for mobile devices
      let handleTouchStart, handleTouchMove, handleTouchEnd;
      
      if (isMobile) {
        // Touch event handlers for mobile
        let isDragging = false;

        handleTouchStart = (e) => {
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          const touchX = touch.clientX - rect.left;
          const touchY = touch.clientY - rect.top;
          
          // Update mouse position for Matter.js
          mouse.position.x = touchX;
          mouse.position.y = touchY;
          mouseConstraint.mouse.button = 0; // Simulate mouse down
          isDragging = true;
        };

        handleTouchMove = (e) => {
          if (!isDragging) return;
          e.preventDefault(); // Prevent scrolling
          
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          const touchX = touch.clientX - rect.left;
          const touchY = touch.clientY - rect.top;
          
          // Update mouse position for Matter.js
          mouse.position.x = touchX;
          mouse.position.y = touchY;
        };

        handleTouchEnd = () => {
          isDragging = false;
          mouseConstraint.mouse.button = -1; // Simulate mouse up
          
          // Release any grabbed card
          if (mouseConstraint.constraint.bodyB) {
            mouseConstraint.constraint.bodyB = null;
          }
        };

        // Add touch event listeners
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        container.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      }

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
        mouseConstraint.constraint.stiffness = 0.8;
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

      // Give cards gentle initial movement for natural feel
      cardBodies.forEach((body) => {
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 0.8, // Gentle initial movement
          y: (Math.random() - 0.5) * 0.8
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1); // Gentle rotation
      });

      // Run the physics engine with optimized settings
      const runner = Runner.create({
        delta: 1000 / 60, // 60 FPS cap
        isFixed: true,
        enabled: true
      });
      runnerRef.current = runner;
      
      // Only start if physics is active (visible and not paused)
      if (isPhysicsActive) {
        Runner.run(runner, engine);
      }

      // Optimized position update with throttling and no DOM reads
      let lastUpdate = 0;
      const targetFPS = isMobile ? 45 : 60; // Lower FPS on mobile for better performance
      const frameDelay = 1000 / targetFPS;
      
      const updateCardPositions = (timestamp) => {
        if (timestamp - lastUpdate >= frameDelay) {
          cardBodies.forEach((body, index) => {
            const cardElement = cardElementsRef.current[index];
            if (cardElement) {
              const margin = 10;
              const cardSize = 50;
              const newX = Math.max(margin, Math.min(width - cardSize - margin, body.position.x - 25));
              const newY = Math.max(margin, Math.min(height - cardSize - margin, body.position.y - 25));
              
              // Force body position if it's outside safe bounds (prevents physics glitches)
              if (body.position.x < margin + 25 || body.position.x > width - margin - 25 ||
                  body.position.y < margin + 25 || body.position.y > height - margin - 25) {
                Matter.Body.setPosition(body, {
                  x: Math.max(margin + 25, Math.min(width - margin - 25, body.position.x)),
                  y: Math.max(margin + 25, Math.min(height - margin - 25, body.position.y))
                });
                // Gentle velocity damping when hitting boundaries
                Matter.Body.setVelocity(body, {
                  x: body.velocity.x * 0.7, // Less aggressive damping for more natural movement
                  y: body.velocity.y * 0.7
                });
              }
              
              // Only update DOM if position changed significantly (> 0.5px) or rotation > 0.01
              const last = lastPositions[index];
              if (Math.abs(newX - last.x) > 0.5 || Math.abs(newY - last.y) > 0.5 || Math.abs(body.angle - last.angle) > 0.01) {
                cardElement.style.transform = `translate(${newX}px, ${newY}px) rotate(${body.angle}rad)`;
                last.x = newX;
                last.y = newY;
                last.angle = body.angle;
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

      // Resize handler to update bounds without disrupting physics much
      const handleResize = () => {
        containerRect = container.getBoundingClientRect();
        width = containerRect.width;
        height = containerRect.height;

        // Recreate walls for new dimensions
        World.remove(engine.world, walls);
        walls = createWalls(width, height, margin, wallThickness);
        World.add(engine.world, walls);
      };
      window.addEventListener('resize', handleResize);

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
        
        // Remove touch event listeners on mobile
        if (isMobile) {
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchmove', handleTouchMove);
          container.removeEventListener('touchend', handleTouchEnd);
          container.removeEventListener('touchcancel', handleTouchEnd);
        }
        
        window.removeEventListener('resize', handleResize);
        if (mouse) {
          mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
          mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
        }
      };
    }; // Close initPhysics function

    // Call initPhysics with a small delay to ensure container dimensions are available
    const timer = setTimeout(initPhysics, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isPhysicsActive]);

  return (
    <section ref={aboutSectionRef} className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
           <p className="headtext">Hi, I'm Abdullah Akram</p>
<p className="subtext">
  A passionate <b>Full-Stack Developer</b> specializing in the <b>MERN stack</b> and <b>Next.js</b>. 
  I craft modern, scalable, and interactive web applications that blend clean 
  UI with powerful backend logic.
</p>

          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{  top: "30%", left: "20%" }}
              text="Clean Code"
              containerRef={grid2Container}
            />
            <Card
              style={{  top: "60%", left: "45%" }}
              text="Problem Solving"
              containerRef={grid2Container}
            />
            <Card
              style={{ bottom: "30%", left: "70%" }}
              text="UI/UX Focus"
              containerRef={grid2Container}
            />
            <Card
              style={{  top: "55%", left: "0%" }}
              text="Performance Optimized"
              containerRef={grid2Container}
            />
            <Card
              style={{ top: "10%", left: "38%" }}
              text="Scalable Design"
              containerRef={grid2Container}
            />
            {/* <Card
              style={{ transform: "rotate(30deg)", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ transform: "rotate(-45deg)", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ transform: "rotate(-45deg)", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            /> */}
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3 relative overflow-visible">
          <div className="z-10  w-[50%]">
           <p className="headtext">Remote & Global</p>
<p className="subtext pb-14">
  Based in Pakistan, available for <b>remote projects</b> worldwide. 
  Flexible with time zones and focused on smooth  collaboration.
</p>

          </div>
          <figure className="absolute bottom-0 right-0">
            <div className="w-60 h-60 flex items-center justify-center overflow-visible transform scale-y-[-1]">
              <Globe />
            </div>
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              What to see my Physics-Powered skills in action ?
              <p className="pt-5"></p> <b>grab, drag, and play with <p></p> icons!</b> 
            </p>
            {/* <CopyEmailButton /> */}
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and AI tools that
              allow me to build robust and scalable applications
            </p>
          </div>
          <div
            ref={grid3Container}
            className="relative w-full h-full overflow-hidden"
            onMouseEnter={handleInteraction}
            onMouseMove={handleInteraction}
            onTouchStart={handleInteraction}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              minHeight: '280px' // Ensure minimum height for physics container
            }}
          >
            <TechCards
              style={{ position: "absolute", top: "15%", left: "70%", transform: "rotate(30deg)" }}
              image="assets/logos/gsap.png"
            />
            <TechCards
              style={{ position: "absolute", top: "75%", left: "25%", transform: "rotate(-45deg)" }}
              image="assets/logos/css3.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "10%", left: "15%", transform: "rotate(-25deg)" }}
              image="assets/logos/nextjs.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "60%", left: "80%", transform: "rotate(15deg)" }}
              image="assets/logos/Express-js.png"
            />
            <TechCards
              style={{ position: "absolute", top: "40%", left: "10%", transform: "rotate(45deg)" }}
              image="assets/logos/html5.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "25%", left: "40%", transform: "rotate(-30deg)" }}
              image="assets/logos/java.png"
            />
            <TechCards
              style={{ position: "absolute", top: "80%", left: "60%", transform: "rotate(25deg)" }}
              image="assets/logos/mongodb.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "50%", left: "75%", transform: "rotate(-15deg)" }}
              image="assets/logos/nodejs.png"
            />
            <TechCards
              style={{ position: "absolute", top: "35%", left: "55%", transform: "rotate(35deg)" }}
              image="assets/logos/react.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "65%", left: "15%", transform: "rotate(-35deg)" }}
              image="assets/logos/tailwindcss.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "20%", left: "85%", transform: "rotate(20deg)" }}
              image="assets/logos/threejs.svg"
            />
            <TechCards
              style={{ position: "absolute", top: "85%", left: "40%", transform: "rotate(-20deg)" }}
              image="assets/logos/vitejs.svg"
            />
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            {/* <Frameworks /> */}
          </div>
        </div>
      </div>
      {/* <Contact3D /> */}
    </section>
  );
};

export default About;