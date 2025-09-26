import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Enhanced smooth scroll utility using Lenis
const smoothScrollTo = (elementId) => {
  if (window.scrollToSection) {
    window.scrollToSection(`#${elementId}`);
  } else {
    // Fallback for when Lenis isn't ready
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }
};

function Navigation({ activeSection }) {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a 
          className={`nav-link ${activeSection === 'hero' ? 'text-white font-semibold' : 'text-neutral-400'}`} 
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('hero');
          }}
        >
          Home
        </a>
      </li>
      <li className="nav-li">
        <a 
          className={`nav-link ${activeSection === 'about' ? 'text-white font-semibold' : 'text-neutral-400'}`} 
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('about');
          }}
        >
          About
        </a>
      </li>
      <li className="nav-li">
        <a 
          className={`nav-link ${activeSection === 'projects' ? 'text-white font-semibold' : 'text-neutral-400'}`} 
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('projects');
          }}
        >
          Work
        </a>
      </li>
      <li className="nav-li">
        <a 
          className={`nav-link ${activeSection === 'contact' ? 'text-white font-semibold' : 'text-neutral-400'}`} 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('contact');
          }}
        >
          Contact
        </a>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Abdullah  
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation activeSection={activeSection} />
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="block overflow-hidden text-center sm:hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            style={{ maxHeight: "100vh" }}
            transition={{ duration: 0.5 }}
          >
            <nav className="pb-5">
              <Navigation activeSection={activeSection} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;