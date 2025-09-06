import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const Contact3D = () => {
  const sceneContainerRef = useRef(null);
  const formContainerRef = useRef(null);
  const contact3DSectionRef = useRef(null);
  
  // Smart performance management states
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const animationIdRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const starsRef = useRef(null);

  // Smart animation control functions
  const pauseAnimation = useCallback(() => {
    if (animationIdRef.current && isAnimationActive) {
      console.log('🔴 Pausing Contact3D animation...');
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
      setIsAnimationActive(false);
    }
  }, [isAnimationActive]);

  const resumeAnimation = useCallback(() => {
    if (!isAnimationActive && isVisible && rendererRef.current && sceneRef.current && cameraRef.current) {
      console.log('🟢 Resuming Contact3D animation...');
      setIsAnimationActive(true);
      
      const animate = () => {
        if (particlesRef.current) particlesRef.current.rotation.y += 0.001;
        if (starsRef.current) starsRef.current.rotation.y += 0.0005;
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        animationIdRef.current = requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isAnimationActive, isVisible]);

  // Intersection Observer for visibility detection
  useEffect(() => {
    if (!contact3DSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const newIsVisible = entry.isIntersecting;
          setIsVisible(newIsVisible);
          
          if (newIsVisible) {
            console.log('📍 Contact3D section is visible');
            setTimeout(() => {
              if (!isAnimationActive) {
                resumeAnimation();
              }
            }, 300); // Small delay for smooth transition
          } else {
            console.log('📍 Contact3D section is hidden - pausing animation');
            pauseAnimation();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Start a bit earlier
      }
    );

    observer.observe(contact3DSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isAnimationActive, resumeAnimation, pauseAnimation]);

  useEffect(() => {
    if (!sceneContainerRef.current) return;

    const container = sceneContainerRef.current;

    // Detect mobile for performance optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile || window.innerWidth < 768;

    // Three.js 3D Scene Setup with performance optimizations
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: !isLowEnd, // Disable antialiasing on low-end devices
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    
    // Optimize renderer settings
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio on mobile
    container.appendChild(renderer.domElement);

    // Mars-like terrain (simple plane with red texture)
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x8b4513, side: THREE.DoubleSide }); // Rusty red
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    // Optimized Stars - Dramatically reduced count
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: isLowEnd ? 0.15 : 0.1 });
    const starsVertices = [];
    
    // Reduced from 10,000 to 1,000-2,000 based on device capability
    const starsCount = isLowEnd ? 1000 : 2000;
    for (let i = 0; i < starsCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    starsRef.current = stars;
    scene.add(stars);

    // Optimized Orbiting particles - Reduced count
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ 
      color: 0xff4500, 
      size: isLowEnd ? 0.08 : 0.05
    });
    const particlesVertices = [];
    
    // Reduced from 500 to 100-200 based on device capability
    const particlesCount = isLowEnd ? 100 : 200;
    for (let i = 0; i < particlesCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(50);
      const y = THREE.MathUtils.randFloatSpread(50);
      const z = THREE.MathUtils.randFloatSpread(50);
      particlesVertices.push(x, y, z);
    }
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    camera.position.z = 20;

    // Smart animation system - only starts when visible
    // Animation will be controlled by visibility detection
    if (isVisible) {
      resumeAnimation();
    }

    // Optimized 3D tilt on mouse move with throttling
    let lastMouseMove = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMove < 16) return; // ~60fps throttling
      lastMouseMove = now;
      
      const { clientX, clientY } = e;
      const xRotation = (clientY / window.innerHeight - 0.5) * (isLowEnd ? 10 : 20); // Reduced rotation on mobile
      const yRotation = (clientX / window.innerWidth - 0.5) * (isLowEnd ? 10 : 20);
      if (formContainerRef.current) {
        formContainerRef.current.style.transform = `translate(-50%, -50%) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Optimized resize handler
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Enhanced cleanup with proper memory management
    return () => {
      // Stop animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose of Three.js objects to prevent memory leaks
      if (renderer) {
        renderer.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      
      // Clean up geometries and materials
      if (starsGeometry) starsGeometry.dispose();
      if (starsMaterial) starsMaterial.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      
      // Reset refs
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      particlesRef.current = null;
      starsRef.current = null;
    };
  }, [isVisible, resumeAnimation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!'); // Replace with actual API call
    alert('Message launched to space!');
  };

  return (
    <div 
      ref={contact3DSectionRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-black to-[#1a0000]"
    >
      <div ref={sceneContainerRef} className="absolute top-0 left-0 w-full h-full z-10" />
      <div 
        ref={formContainerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-[rgba(255,69,0,0.3)] rounded-3xl shadow-[0_0_20px_rgba(255,165,0,0.5)] z-20 perspective-1000 transition-transform duration-300 hover:rotate-y-5 hover:rotate-x-5"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[rgba(255,255,255,0.2)] to-transparent rounded-3xl pointer-events-none" />
        <h2 className="text-center text-2xl font-bold text-yellow-400 mb-6">Contact Me from Mars</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            required 
            className="p-3 border border-orange-600 rounded-md bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            required 
            className="p-3 border border-orange-600 rounded-md bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
          />
          <textarea 
            placeholder="Your Message" 
            rows="5" 
            required 
            className="p-3 border border-orange-600 rounded-md bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
          />
          <button 
            type="submit" 
            className="p-3 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-500 transition-colors"
          >
            Launch Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact3D;