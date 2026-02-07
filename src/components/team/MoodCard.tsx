interface MoodCardProps {
  color: string;
  imageSrc: string;
  imageAlt: string;
  name?: string;
  role?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'center';
}

const MoodCard = ({ color, imageSrc, imageAlt, name, role, delay = 0, direction = 'center' }: MoodCardProps) => {
  // Determine animation class based on direction
  const getAnimationClass = () => {
    if (direction === 'left') return 'animate-fade-in-left';
    if (direction === 'right') return 'animate-fade-in-right';
    return 'animate-slide-up';
  };

  // Determine rotation class based on direction
  const getRotationClass = () => {
    if (direction === 'left') return '-rotate-6';
    if (direction === 'right') return 'rotate-6';
    return '';
  };

  return (
    <div
      className={`w-full h-[420px] md:h-[380px] lg:h-[400px] rounded-[40px] md:rounded-[50px] lg:rounded-[60px] flex items-center justify-center overflow-hidden shadow-black/30 ${getAnimationClass()} ${getRotationClass()} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative group cursor-pointer`}
      style={{
        backgroundColor: color,
        animationDelay: `${delay}ms`,
      }}
    >
      {imageSrc && imageSrc.trim() !== "" ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
      )}
      {/* Hover overlay */}
      {(name || role) && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center px-4">
          {name && (
            <h3 className="text-lg md:text-xl font-bold mb-2">{name}</h3>
          )}
          {role && (
            <p className="text-sm md:text-base opacity-90">{role}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodCard;
