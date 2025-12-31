import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Banner from "../components/Banner/Banner";
import { topBanner, homeBanners } from "../components/Banner/bannerData";

import CardsCarousel from "../components/Cards/CardsCarousel";
import CardsGrid from "../components/Cards/CardsGrid";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { normalizeProduct } from "../utils/productUtils";

const Home = () => {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data]);
  const [searchParams] = useSearchParams();
  const filterText = searchParams.get("filter") || "";
  const filterValue = filterText.toLowerCase();

  const homeData = data?.home;


  const filterItems = useMemo(
    () => (items = []) =>
      !filterValue
        ? items
        : items.filter((item) => {
          const fields = [item.name, item.title, item.brand, item.offer];
          return fields.some(
            (field) =>
              typeof field === "string" &&
              field.toLowerCase().includes(filterValue)
          );
        }),
    [filterValue]
  );

  // Loading State
  if (loading && (!homeData)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading Myntra Home...</p>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">Hang tight!</h2>
        <p className="text-gray-500 mt-2">We're loading the best of Myntra for you...</p>
      </div>
    );
  }

  const filteredRising = filterItems(homeData.risingStars || []).map((item, idx) => normalizeProduct(item, 'HOME', idx));
  const filteredTrending = filterItems(homeData.trendingNow || []).map((item, idx) => normalizeProduct(item, 'HOME', idx));
  const filteredCategories = filterItems(homeData.shopByCategory || []).map((item, idx) => normalizeProduct(item, 'HOME', idx));

  return (
    <>
      {/* TOP STRIP */}
      <Banner
        type="single"
        data={topBanner}
        height="h-[60px] md:h-[85px]"
        fit="contain"
        fullWidth={true}
      />

      <div className="-mt-7" />

      {/* MAIN BANNER */}
      <Banner
        type="carousel"
        data={homeBanners}
        height="h-[260px] md:h-[420px]"
        fit="contain"
      />

      {filterText && (
        <div className="mx-4 md:mx-10 my-4 rounded border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
          Showing results for "{filterText}"
        </div>
      )}

      {/* RISING STARS */}
      <div className="mb-16 mt-8">
        <h2 className="text-center text-xl font-bold mb-10 uppercase text-gray-800 tracking-wider">
          RISING STARS
        </h2>
        <CardsCarousel data={filteredRising} type="rising" />
      </div>

      {/* TRENDING NOW */}
      <div className="mb-16">
        <h2 className="text-center text-xl font-bold mb-10 uppercase text-gray-800 tracking-wider">
          TRENDING NOW
        </h2>
        <CardsCarousel data={filteredTrending} />
      </div>

      {/* SHOP BY CATEGORY */}
      <div className="mb-16">
        <h2 className="text-center text-xl font-bold mb-10 uppercase text-gray-800 tracking-wider">
          SHOP BY CATEGORY
        </h2>
        <CardsGrid data={filteredCategories} />
      </div>

      {filterText && !filteredRising.length && !filteredTrending.length && !filteredCategories.length && (
        <p className="text-center text-gray-500 my-6">
          No matches found for "{filterText}". Try another category.
        </p>
      )}
    </>
  );
};

export default Home;
