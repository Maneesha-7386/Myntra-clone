import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { slugify } from '../../utils/slugs';

const BeautyProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // user requirement: if i click product card go to filters
        navigate(`/beauty-${slugify(product.category)}`);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        // user requirement: if i click product wishlist button go to wishlist page
        navigate(`/wishlist`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-white transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100 h-full flex flex-col cursor-pointer"
        >
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Rating Badge */}
                {product.rating && (
                    <div className="absolute left-2 bottom-2 bg-white/90 px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold text-[#282C3F] shadow-sm">
                        <span>{product.rating.value}</span>
                        <Star size={10} className="fill-[#14958f] text-[#14958f]" />
                        <div className="w-[1px] h-3 bg-gray-300 mx-0.5" />
                        <span className="text-gray-500">{product.rating.count}</span>
                    </div>
                )}

                {/* Wishlist Icon - ALWAYS visible as per user request */}
                <button
                    onClick={handleWishlist}
                    className="absolute right-4 top-4 p-2 bg-white rounded-full text-gray-400 opacity-100 transition-opacity hover:text-[#ff3f6c] shadow-md z-10"
                >
                    <Heart size={18} />
                </button>
            </div>

            {/* Product Details */}
            <div className="p-3 md:p-4 flex-grow flex flex-col">
                <h3 className="text-sm md:text-base font-bold text-[#282C3F] truncate mb-1">
                    {product.brand}
                </h3>
                <p className="text-xs md:text-sm text-[#535766] truncate mb-2">
                    {product.name}
                </p>

                <div className="mt-auto flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#282C3F]">
                        ₹{product.price}
                    </span>
                    {product.mrp && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through">
                            ₹{product.mrp}
                        </span>
                    )}
                    {product.discount && (
                        <span className="text-[10px] md:text-xs text-[#ff905a] font-medium">
                            ({product.discount}% OFF)
                        </span>
                    )}
                </div>
            </div>

            {/* Hover "Add to Bag" Overlay (Standard Myntra behavior often hides price/name and shows buttons, 
         but user request says keep card info) */}
        </div>
    );
};

export default BeautyProductCard;
