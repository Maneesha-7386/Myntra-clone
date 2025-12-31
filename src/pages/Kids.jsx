import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/productsSlice";
import Banner from "../components/Banner/Banner";
import ProductCard from "../components/ProductCard";
import { kidsBanners } from "../components/Banner/bannerData";
import { slugify } from "../utils/slugs";
import { normalizeProduct } from "../utils/productUtils";

const Kids = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data]);

  const handleCardClick = (title) => {
    navigate(`/kids-${slugify(title)}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    navigate(`/wishlist`);
  };

  if (loading && !data?.kids) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading Kids Collection...</p>
      </div>
    );
  }

  const kidsData = data?.kids;

  if (!kidsData) {
    return (
      <div className="text-center py-20 text-gray-500">
        No kids data found.
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* TOP BANNER */}
      <Banner
        type="carousel"
        data={kidsBanners}
        height="h-[260px] md:h-[420px]"
        fit="contain"
        fullWidth
      />

      {/* ================== FAVOURITE BRANDS ================== */}
      {kidsData.favouriteBrands && (
        <section className="px-6 md:px-16 mt-14">
          <h2 className="text-2xl font-semibold tracking-widest mb-8 text-center md:text-left uppercase text-gray-800">
            FAVOURITE BRANDS
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-9 gap-8 place-items-center">
            {kidsData.favouriteBrands.map((brand) => (
              <div
                key={brand.id || brand.name}
                onClick={() => handleCardClick(brand.name)}
                className="relative w-24 h-24 rounded-full border flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <img
                  src={brand.logo || brand.image}
                  alt={brand.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
                <button
                  onClick={handleWishlist}
                  className="absolute -top-1 -right-1 bg-white shadow-md p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Heart size={14} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================== TOP PICKS ================== */}
      {kidsData.topPicks && (
        <section className="px-6 md:px-16 mt-20">
          <h2 className="text-2xl font-semibold tracking-widest mb-8 text-center md:text-left uppercase text-gray-800">
            TOP PICKS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {kidsData.topPicks.map((item, idx) => (
              <ProductCard
                key={item.id || item.title}
                product={normalizeProduct(item, 'KIDS', idx)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================== FASHION & ESSENTIALS ================== */}
      {kidsData.fashionEssentials && (
        <section className="px-6 md:px-16 mt-20">
          <h2 className="text-2xl font-semibold tracking-widest mb-8 text-center md:text-left uppercase text-gray-800">
            FASHION & ESSENTIALS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {kidsData.fashionEssentials.map((item, idx) => (
              <ProductCard
                key={item.id || item.title}
                product={normalizeProduct(item, 'KIDS', idx)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Kids;
