import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Truck, Star } from "lucide-react";
import { getSingleProduct } from "../api/productsApi";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";

const ProductDetails = () => {
  const { id: slugId } = useParams(); // This captures 'brand-title-id'
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (!product) {
      // Extract ID from slug (assumes ID is last part after hyphen)
      const parts = slugId.split("-");
      const realId = parts[parts.length - 1];

      getSingleProduct(realId).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [slugId, product]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product Not Found</div>;

  const isWishlisted = isInWishlist(product.id);

  // Parse price number for calculations
  const priceNum = parseInt(product.price.replace(/[^\d]/g, "")) || 999;
  const originalPriceNum = parseInt(product.originalPrice?.replace(/[^\d]/g, "")) || priceNum + 500;

  const handleAddToBag = () => {
    if (product) {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }
      dispatch(addToCart({
        id: product.id,
        image: product.image,
        brand: product.brand,
        name: product.title,
        price: product.price,
        mrp: product.originalPrice,
        discount: typeof product.discount === 'string' ? parseInt(product.discount) : product.discount,
        section: product.section,
        category: product.category || 'Apparel', // specific category or default
        size: selectedSize,
        slug: slugId
      }));
      navigate('/bag');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-black">Home</span> /
        <span onClick={() => navigate(`/${product.section.toLowerCase()}`)} className="cursor-pointer hover:text-black capitalize ml-1">{product.section.toLowerCase()}</span> /
        <span className="font-bold text-black ml-1">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* Product Images - Adaptive Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
          {[product.image, product.image, product.image, product.image].map((img, idx) => (
            <div key={idx} className="w-full aspect-[3/4] overflow-hidden bg-gray-50 transition-transform duration-300 md:hover:scale-[1.01]">
              <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="flex-1 lg:max-w-[500px] flex flex-col">
          <div className="sticky top-24">
            <h1 className="text-xl md:text-2xl font-bold text-[#282C3F] tracking-tight">{product.brand}</h1>
            <p className="text-lg md:text-xl text-gray-400 mt-1">{product.title}</p>

            <div className="flex items-center gap-2 mt-4 border border-gray-100 w-fit px-2 py-1 rounded-sm bg-gray-50/50">
              <span className="font-bold text-sm">
                {typeof product.rating === 'object' ? product.rating.value : product.rating || '4.2'}
              </span>
              <Star size={14} className="text-teal-500 fill-teal-500" />
              <div className="w-[1px] h-3 bg-gray-300 mx-1" />
              <span className="text-gray-500 text-xs font-semibold">
                {typeof product.rating === 'object' ? product.rating.count : product.ratingCount || '1.2k'} Ratings
              </span>
            </div>

            <div className="border-t border-gray-100 my-5 md:my-6"></div>

            <div className="flex items-baseline gap-3 md:gap-4">
              <span className="text-xl md:text-2xl font-bold text-[#282C3F]">{product.price}</span>
              {product.originalPrice && (
                <span className="text-base md:text-lg text-gray-400 line-through decoration-gray-300 font-light">{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="text-base md:text-lg text-[#ff905a] font-bold">({product.discount})</span>
              )}
            </div>
            <p className="text-[#03a685] text-xs font-bold mt-1 uppercase tracking-tight">inclusive of all taxes</p>

            {/* Sizes (Mocked for Myntra Feel) */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
                <span className="text-xs font-bold text-pink-600 uppercase cursor-pointer hover:underline">Size Chart</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center text-sm font-bold transition-all active:scale-95 ${selectedSize === size ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-gray-300 hover:border-pink-500 hover:text-pink-500'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-xs text-red-500 mt-2">Please select a size</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
              <button
                className="flex-[2] bg-[#ff3f6c] text-white font-bold py-4 rounded-sm text-sm md:text-base uppercase flex items-center justify-center gap-3 hover:bg-[#ff527b] transition shadow-md active:scale-[0.98]"
                onClick={handleAddToBag}
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`flex-1 border border-gray-300 font-bold py-4 rounded-sm text-sm md:text-base uppercase flex items-center justify-center gap-3 transition-colors active:scale-[0.98] ${isWishlisted ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-[#282C3F] hover:border-gray-800'
                  }`}
              >
                <Heart size={20} className={isWishlisted ? "fill-white text-white" : ""} />
                Wishlist
              </button>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  Delivery Options <Truck size={20} className="text-gray-400" />
                </h3>
                <div className="flex h-12 border border-gray-200 rounded-sm overflow-hidden max-w-sm">
                  <input type="tel" maxLength="6" placeholder="Enter Pincode" className="px-4 flex-1 outline-none text-sm font-medium" />
                  <button className="px-6 text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors uppercase">Check</button>
                </div>
                <p className="text-[11px] text-gray-400 mt-3 font-medium">
                  Please enter PIN code to check delivery time & Pay on Delivery Availability
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="text-gray-400"><Truck size={24} strokeWidth={1.5} /></div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-700">Get it by Sat, Jan 04</p>
                    <p className="text-gray-400 mt-0.5">Standard Delivery</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-gray-400 text-sm font-bold">₹</div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-700">Cash on delivery available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
