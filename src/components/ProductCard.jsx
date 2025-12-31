import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag } from 'lucide-react';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { slugify } from '../utils/slugs';

/**
 * Universal Myntra Product Card
 * Enhanced for all devices (Mobile/Tablet/Desktop)
 */
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);

    const {
        id,
        image,
        brand = 'Brand',
        name = 'Product Name',
        price = 0,
        mrp = 0,
        discount = 0,
        rating = null
    } = product;

    const handleCardClick = () => {
        if (product && product.section) {
            const section = product.section.toLowerCase() === "home" ? "home-living" : product.section.toLowerCase();
            const category = slugify(product.category || "");
            if (category) {
                navigate(`/${section}-${category}`);
            } else {
                navigate(`/${section}`);
            }
        } else {
            navigate(`/${slugify(brand)}`);
        }
    };

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        dispatch(toggleWishlist(product));
    };

    const handleAddToBag = (e) => {
        e.stopPropagation();
        dispatch(addToCart(product));
    };

    return (
        <div
            className="group relative bg-white w-full flex flex-col cursor-pointer transition-shadow duration-300 md:hover:shadow-xl rounded-sm overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                />

                {/* Wishlist Icon - Always visible, bigger touch area for mobile */}
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-2 bg-white/90 rounded-full shadow-sm transition-all md:hover:scale-110 active:scale-95"
                >
                    <Heart
                        size={isHovered ? 20 : 18}
                        className={`${isWishlisted ? 'fill-[#ff3f6c] text-[#ff3f6c]' : 'text-gray-400'}`}
                    />
                </button>

                {/* Rating Badge */}
                {rating && (
                    <div className="absolute left-2 bottom-2 bg-white/90 px-1.5 py-0.5 rounded flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-[#282C3F]">
                        <span>{rating.value}</span>
                        <span className="text-[#14958f]">★</span>
                        <div className="w-[1px] h-3 bg-gray-300 mx-0.5" />
                        <span className="text-gray-500 font-medium">{rating.count}</span>
                    </div>
                )}

                {/* Add to Bag Button Overlay - Adaptive */}
                <div className={`
                    absolute inset-x-0 bottom-0 p-2 md:p-3 bg-white/95 transition-all duration-200
                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none md:hidden'}
                `}>
                    <button
                        onClick={handleAddToBag}
                        className="w-full py-2 bg-[#ff3f6c] text-white text-[10px] md:text-xs font-bold rounded flex items-center justify-center gap-2 uppercase tracking-tight md:tracking-wider hover:bg-[#ff527b]"
                    >
                        <ShoppingBag size={14} />
                        Add to Bag
                    </button>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-2 md:p-4 bg-white flex-grow">
                <h3 className="text-xs md:text-sm font-bold text-[#282C3F] truncate mb-0.5 md:mb-1 uppercase tracking-tight">{brand}</h3>
                <p className="text-[10px] md:text-xs text-[#535766] truncate mb-1.5 md:mb-2">{name}</p>

                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                    <span className="text-xs md:text-sm font-bold text-[#282C3F]">₹{price}</span>
                    {mrp > price && (
                        <span className="text-[9px] md:text-[10px] text-gray-400 line-through">₹{mrp}</span>
                    )}
                    {discount > 0 && (
                        <span className="text-[9px] md:text-[10px] text-[#ff905a] font-bold">({discount}% OFF)</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

