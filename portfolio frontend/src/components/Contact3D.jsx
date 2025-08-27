import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Contact3D = () => {
  const sceneContainerRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    if (!sceneContainerRef.current) return;

    // Three.js 3D Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneContainerRef.current.appendChild(renderer.domElement);

    // Mars-like terrain (simple plane with red texture)
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x8b4513, side: THREE.DoubleSide }); // Rusty red
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Orbiting particles (Mars dust/asteroids)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xff4500, size: 0.05 });
    const particlesVertices = [];
    for (let i = 0; i < 500; i++) {
      const x = THREE.MathUtils.randFloatSpread(50);
      const y = THREE.MathUtils.randFloatSpread(50);
      const z = THREE.MathUtils.randFloatSpread(50);
      particlesVertices.push(x, y, z);
    }
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 20;

    // Animation loop
    let animationId;
    const animate = () => {
      particles.rotation.y += 0.001; // Orbit effect
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // 3D tilt on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xRotation = (clientY / window.innerHeight - 0.5) * 20;
      const yRotation = (clientX / window.innerWidth - 0.5) * 20;
      if (formContainerRef.current) {
        formContainerRef.current.style.transform = `translate(-50%, -50%) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      sceneContainerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!'); // Replace with actual API call
    alert('Message launched to space!');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-black to-[#1a0000]">
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