import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { performanceVariants, containerVariants } from "../utils/animationOptimizations.js";

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];
  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <motion.div 
        className="flex-col hidden md:flex c-space"
        variants={containerVariants.medium}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-medium"
          variants={performanceVariants.slideLeft}
        >
          Hi I'm Abdullah
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={performanceVariants.slideLeft}
          >
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div
            variants={performanceVariants.fadeIn}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={performanceVariants.slideLeft}
          >
            Web Solutions
          </motion.p>
        </div>
      </motion.div>
      {/* Mobile View */}
      <motion.div 
        className="flex flex-col space-y-6 md:hidden"
        variants={containerVariants.medium}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-4xl font-medium"
          variants={performanceVariants.fadeIn}
          initial="hidden"
          animate="visible"
        >
          Hi,I'm Abdullah
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={performanceVariants.slideUp}
            initial="hidden"
            animate="visible"
          >
            Building
          </motion.p>
          <motion.div
            variants={performanceVariants.scaleIn}
            initial="hidden"
            animate="visible"
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={performanceVariants.slideUp}
            initial="hidden"
            animate="visible"
          >
            Web Applications
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;