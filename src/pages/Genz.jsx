import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { normalizeProduct } from "../utils/productUtils";
import Banner from "../components/Banner/Banner";
import { genzBanners } from "../components/Banner/bannerData";
import CardsGrid from "../components/Cards/CardsGrid";

const GenZ = () => {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data]);

  const genzData = data?.genz;


  if (loading && !genzData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading GenZ Collection...</p>
      </div>
    );
  }

  if (!genzData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">GenZ Collection Coming Soon</h2>
        <p className="text-gray-500 mt-2">We're refreshing our stock. Please check back in a moment!</p>
      </div>
    );
  }

  const filteredProducts = (genzData.products || []).map((item, idx) => normalizeProduct(item, 'GENZ', idx));

  return (
    <>
      <Banner
        type="carousel"
        data={genzBanners}
        height="h-[260px] md:h-[420px]"
        fit="contain"
        fullWidth
      />

      <h2 className="text-center text-xl font-semibold my-8">
        GEN-Z PICKS
      </h2>

      <CardsGrid data={filteredProducts} cols={5} />
    </>
  );
};

export default GenZ;
