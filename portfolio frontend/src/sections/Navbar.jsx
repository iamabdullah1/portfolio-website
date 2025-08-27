import { useState } from "react";
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

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a 
          className="nav-link" 
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
          className="nav-link" 
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
          className="nav-link" 
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('work');
          }}
        >
          Work
        </a>
      </li>
      <li className="nav-li">
        <a 
          className="nav-link" 
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
            <Navigation />
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
              <Navigation />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;