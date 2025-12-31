import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { slugify } from "../../utils/slugs";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // user requirement: if i click product card go to filters
    navigate(`/${slugify(item.name || item.title || item.category || "GenZ")}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    // user requirement: if i click product wishlist button go to wishlist page
    navigate(`/wishlist`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border-[4px] border-gray-50 rounded-xl overflow-hidden bg-white text-center cursor-pointer hover:shadow-lg transition-all"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[160px] sm:h-[200px] object-cover"
      />

      {/* Rating Badge */}
      {item.rating && (
        <div className="absolute left-2 top-[135px] sm:top-[175px] bg-white/90 px-1 py-0.5 rounded flex items-center gap-0.5 text-[9px] font-bold text-[#282C3F] z-10">
          <span>{typeof item.rating === 'object' ? item.rating.value : item.rating}</span>
          <span className="text-[#14958f]">★</span>
        </div>
      )}

      {/* Wishlist icon always visible */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full z-10 hover:bg-white shadow-sm"
      >
        <Heart size={16} className="text-gray-500" />
      </button>

      <div className="py-3">
        <p className="font-semibold text-xs sm:text-sm truncate px-2 text-gray-800">
          {item.name || item.title || item.category || "Category"}
        </p>
        <p className="text-[10px] sm:text-xs text-[#ff3f6c] font-bold truncate px-2 pb-1">
          {item.offer || item.discount || item.price || "Explore"}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
