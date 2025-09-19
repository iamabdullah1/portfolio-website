import { motion } from "motion/react";
import { useState, useEffect } from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic height based on screen size
  const getModalHeight = () => {
    const { width, height } = screenSize;

    // Mobile devices (width < 768px)
    if (width < 768) {
      return Math.min(height * 0.85, 600); // 85% of screen height, max 600px
    }
    // Tablet devices (768px <= width < 1024px)
    else if (width < 1024) {
      return Math.min(height * 0.75, 700); // 75% of screen height, max 700px
    }
    // Desktop devices (width >= 1024px)
    else {
      return Math.min(height * 0.7, 800); // 70% of screen height, max 800px
    }
  };

  const modalHeight = getModalHeight();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-4xl overflow-y-auto border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        style={{ maxHeight: `${modalHeight}px` }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-midnight/80 hover:bg-gray-500/80 transition-colors"
        >
          <img src="assets/close.svg" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-t-2xl"
        />
        <div className="p-4 sm:p-6 md:p-8">
          <h5 className="mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h5>
          <p className="mb-4 font-normal text-neutral-400 text-sm sm:text-base leading-relaxed">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-4 font-normal text-neutral-400 text-sm sm:text-base leading-relaxed">{subDesc}</p>
          ))}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg w-8 h-8 sm:w-10 sm:h-10 hover-animation"
                />
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium cursor-pointer hover-animation text-sm sm:text-base whitespace-nowrap"
              >
                Visit Website{" "}
                <img src="assets/arrow-up.svg" className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;