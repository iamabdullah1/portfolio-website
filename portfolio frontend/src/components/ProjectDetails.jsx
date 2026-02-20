import { motion } from "motion/react";
import { useState, useEffect } from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  images,
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

  // Handle href - can be string or object with code/live properties
  const getLinks = () => {
    if (!href) return { code: null, live: null };
    
    if (typeof href === 'string') {
      const isGitHub = href.includes('github.com') || href.includes('githubusercontent.com');
      return { code: isGitHub ? href : null, live: isGitHub ? null : href };
    }
    
    return { code: href.code || null, live: href.live || null };
  };

  const { code: codeLink, live: liveLink } = getLinks();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-4">
      <motion.div
        className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-y-auto scrollbar-hide"
        style={{ height: modalHeight + "px", WebkitOverflowScrolling: "touch" }}
        onWheel={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-midnight/80 hover:bg-gray-500/80 transition-colors"
        >
          <img src="assets/close.svg" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        {images && images.length > 0 ? (
          <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-t-2xl overflow-hidden flex items-center justify-center bg-black">
            <img
              src={images[currentImageIndex]}
              alt={`${title} image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-t-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-midnight/70 hover:bg-midnight/90 text-white rounded-full p-1 z-20"
                  aria-label="Previous Image"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') prevImage(); }}
                >
                  &#8592;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-midnight/70 hover:bg-midnight/90 text-white rounded-full p-1 z-20"
                  aria-label="Next Image"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') nextImage(); }}
                >
                  &#8594;
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="relative w-full h-48 sm:h-64 rounded-t-2xl overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-950 to-navy border-b border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.2)_0%,_transparent_70%)]" />
            <span className="inline-block px-4 py-1.5 text-sm bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30 mb-4 z-10 font-medium">
              ✦ AI Powered — No Preview Available
            </span>
            <h4 className="text-white text-xl sm:text-2xl font-bold text-center px-6 z-10">{title}</h4>
            <p className="text-white/50 text-xs sm:text-sm text-center mt-2 px-8 z-10 leading-relaxed">
              This project is in development — visuals coming soon.
            </p>
          </div>
        )}
        <div className="p-4 sm:p-6 md:p-8">
          <h5 className="mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h5>
          <p className="mb-4 font-normal text-neutral-400 text-sm sm:text-base leading-relaxed">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-4 font-normal text-neutral-400 text-sm sm:text-base leading-relaxed">{subDesc}</p>
          ))}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag) =>
                tag.path ? (
                  <img
                    key={tag.id}
                    src={tag.path}
                    alt={tag.name}
                    title={tag.name}
                    className="rounded-lg w-8 h-8 sm:w-10 sm:h-10 hover-animation"
                  />
                ) : (
                  <span
                    key={tag.id}
                    className="px-2 py-1 text-xs bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30 font-medium hover-animation"
                  >
                    {tag.name}
                  </span>
                )
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {codeLink && (
                <a
                  href={codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium cursor-pointer hover-animation text-sm sm:text-base whitespace-nowrap"
                  title="View Code on GitHub"
                >
                  View Code{" "}
                  <img src="assets/logos/github.svg" className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium cursor-pointer hover-animation text-sm sm:text-base whitespace-nowrap"
                  title="Visit Live Website"
                >
                  Visit Website{" "}
                  <img src="assets/arrow-up.svg" className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;