import { motion } from "motion/react";
const Card = ({ style, text, image, containerRef }) => {
  // Determine text size based on text length
  const getTextClass = (text) => {
    if (!text) return "text-xl";
    if (text.length > 15) return "text-sm"; // Smaller text for longer strings
    if (text.length > 10) return "text-base"; // Medium text for medium strings
    return "text-xl"; // Default size for short strings
  };

  return image && !text ? (
    <motion.img
      className="absolute w-15  cursor-grab"
      
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
      className={`absolute px-1 py-4 ${getTextClass(text)} text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab`}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;