const TechCards = ({ style, image }) => {
  return image && (
    <img
      className="absolute w-15 cursor-grab select-none"
      src={image}
      style={{ 
        position: 'absolute', 
        zIndex: 10,
        width: '50px',
        height: '50px',
        objectFit: 'contain',
        ...style
      }}
      draggable={false}
    />
  );
};

export default TechCards;