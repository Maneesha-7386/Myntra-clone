import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { normalizeProduct } from "../utils/productUtils";
import Banner from "../components/Banner/Banner";
import { topBanner, womenBanner } from "../components/Banner/bannerData";
import CardsCarousel from "../components/Cards/CardsCarousel";
import CardsGrid from "../components/Cards/CardsGrid";

const Women = () => {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data]);

  const womenData = data?.women;


  if (loading && !womenData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading Women's Collection...</p>
      </div>
    );
  }

  if (!womenData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">Women's Collection Coming Soon</h2>
        <p className="text-gray-500 mt-2">We're refreshing our stock. Please check back in a moment!</p>
      </div>
    );
  }

  const filteredRising = (womenData.risingStars || []).map((item, idx) => normalizeProduct(item, 'WOMEN', idx));
  const filteredTrending = (womenData.trendingNow || []).map((item, idx) => normalizeProduct(item, 'WOMEN', idx));
  const filteredCategories = (womenData.shopByCategory || []).map((item, idx) => normalizeProduct(item, 'WOMEN', idx));

  return (
    <>
      {/* TOP STRIP */}
      <Banner
        type="single"
        data={topBanner}
        height="h-[60px] md:h-[85px]"
        fit="contain"
      />

      <div className="-mt-7" />

      {/* WOMEN MAIN BANNER */}
      <Banner
        type="single"
        data={womenBanner}
        height="h-[260px] md:h-[420px]"
        fit="contain"
      />

      {/* RISING STARS */}
      <h2 className="text-center text-xl font-semibold my-8">
        RISING STARS
      </h2>
      <CardsCarousel
        data={filteredRising}
        type="rising"
      />

      {/* TRENDING NOW */}
      <h2 className="text-center text-xl font-semibold my-8">
        TRENDING NOW
      </h2>
      <CardsCarousel
        data={filteredTrending}
      />

      {/* SHOP BY CATEGORY */}
      <h2 className="text-center text-xl font-semibold my-8">
        SHOP BY CATEGORY
      </h2>
      <CardsGrid data={filteredCategories} />
    </>
  );
};

export default Women;
