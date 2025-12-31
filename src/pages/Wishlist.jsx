import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleMoveToBag = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <div className="bg-white min-h-screen pt-10 pb-20 px-4 md:px-10 lg:px-20 font-assistant">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline gap-2 mb-8">
          <h1 className="text-lg md:text-xl font-bold text-[#282C3F]">My Wishlist</h1>
          <span className="text-gray-500 font-normal text-sm md:text-base">{wishlistItems.length} Items</span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-7">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative bg-white border border-gray-100 group">
                {/* Remove Icon */}
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="absolute right-2 top-2 z-10 p-1 bg-white/80 rounded-full hover:bg-white border border-gray-100 transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>

                {/* Product Image */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-[#282C3F] truncate">{item.brand}</h3>
                  <p className="text-xs text-[#535766] truncate mb-2">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#282C3F]">₹{item.price}</span>
                    <span className="text-[10px] text-gray-400 line-through">₹{item.mrp}</span>
                    <span className="text-[10px] text-[#ff905a]">({item.discount}% OFF)</span>
                  </div>
                </div>

                {/* Move to Bag Button */}
                <button
                  onClick={() => handleMoveToBag(item)}
                  className="w-full py-3 text-xs md:text-sm font-bold text-[#ff3f6c] bg-white hover:bg-[#ff3f6c] hover:text-white transition-all duration-300 border-t border-gray-100 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  MOVE TO BAG
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-xl font-bold text-[#282C3F] mb-4 uppercase">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-gray-500 text-sm max-w-xs mb-8">
              Add items that you like to your wishlist. Review them anytime and easily move them to the bag.
            </p>
            <div className="w-48 h-48 mb-8 opacity-20">
              <ShoppingBag size={150} strokeWidth={1} />
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-3 border-2 border-[#ff3f6c] text-[#ff3f6c] font-bold rounded shadow-sm hover:bg-[#ff3f6c] hover:text-white transition-all uppercase"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        .font-assistant { font-family: 'Assistant', sans-serif !important; }
      `}} />
    </div>
  );
};

export default Wishlist;