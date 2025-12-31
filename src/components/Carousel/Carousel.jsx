import { useEffect, useState } from "react";

const Carousel = ({ data = [], height, fit = "cover", onItemClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [data.length]);

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full">
      <div className={`relative overflow-hidden ${height}`}>
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {data.map((item, idx) => (
            <div
              key={item.id || idx}
              className="w-full shrink-0 h-full"
            >
              <img
                src={item.img}
                alt="banner"
                onClick={() => onItemClick?.(item)}
                className={`w-full h-full cursor-pointer ${
                  fit === "contain"
                    ? "object-contain"
                    : "object-cover"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* dots below banner */}
      <div className="flex justify-center gap-2 mt-2">
        {data.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[8px] w-[8px] rounded-full cursor-pointer
              ${i === index ? "bg-slate-400" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
