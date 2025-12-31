import { useState } from "react";

const SimpleCarousel = ({ children, slides }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative">
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children}
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: slides }).map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              i === index ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
