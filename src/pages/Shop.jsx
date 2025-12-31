import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import CardsCarousel from "../components/Cards/CardsCarousel";
import CardsGrid from "../components/Cards/CardsGrid";
import ProductCard from "../components/ProductCard";
import {
  genzBanners,
  kidsBanners,
  menBanner,
  topBanner,
  womenBanner,
} from "../components/Banner/bannerData";
import { getAllProducts } from "../api/productsApi";

const sectionTitleMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  home: "Home & Living",
  beauty: "Beauty",
  genz: "Gen-Z",
};

const sectionBannerMap = {
  men: { type: "single", data: menBanner },
  women: { type: "single", data: womenBanner },
  kids: { type: "carousel", data: kidsBanners, fullWidth: true },
  genz: { type: "carousel", data: genzBanners, fullWidth: true },
};

// Collect products for a section from the API shape we have
const collectProducts = (sectionKey, data) => {
  if (!data) return [];
  const section = data[sectionKey];
  if (!section) return [];

  const pools = [
    section.products,
    section.trendingNow,
    section.risingStars,
    section.shopByCategory,
  ].filter(Boolean);

  return pools.flat().map((item, idx) => ({
    id: item.id || `${sectionKey}-${idx}-${item.name || item.title}`,
    title: item.title || item.name || "Product",
    brand: item.brand || sectionTitleMap[sectionKey] || "Brand",
    price: item.price || item.offer || "",
    image: item.image || item.img || item.banner || item.pic,
    tags: [
      item.name,
      item.title,
      item.brand,
      item.offer,
      item.section,
      item.category,
    ]
      .filter(Boolean)
      .map((x) => String(x).toLowerCase()),
  }));
};

const Shop = ({ sectionProp }) => {
  const params = useParams();
  const section = sectionProp || params.section || "men";
  const [searchParams] = useSearchParams();
  const filterText = (searchParams.get("filter") || "").toLowerCase();

  const [data, setData] = useState(null);

  useEffect(() => {
    getAllProducts().then(setData);
  }, []);

  const filterItems = useMemo(
    () => (items = []) =>
      !filterText
        ? items
        : items.filter((item) =>
          (item.tags || [])
            .filter(Boolean)
            .some((t) => t.includes(filterText)) ||
          [item.name, item.title, item.brand, item.offer, item.section]
            .filter(Boolean)
            .some((field) =>
              String(field).toLowerCase().includes(filterText)
            )
        ),
    [filterText]
  );

  const sectionData = data && data[section];

  const products = useMemo(
    () => collectProducts(section, data),
    [section, data]
  );

  const filtered = useMemo(
    () =>
      !filterText
        ? products
        : products.filter((p) =>
          p.tags.some((t) => t && t.includes(filterText))
        ),
    [products, filterText]
  );

  const title = sectionTitleMap[section] || "Shop";
  const bannerCfg = sectionBannerMap[section];

  const showGrid = section !== "men" && section !== "women";

  return (
    <div>
      {/* Optional top strip */}
      <Banner
        type="single"
        data={topBanner}
        height="h-[60px] md:h-[85px]"
        fit="contain"
      />

      {/* Section banner if available */}
      {bannerCfg && (
        <Banner
          type={bannerCfg.type}
          data={bannerCfg.data}
          height="h-[260px] md:h-[420px]"
          fit="contain"
          fullWidth={bannerCfg.fullWidth}
        />
      )}

      <div className="px-6 md:px-10 py-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {filterText && (
            <span className="text-sm text-pink-600">
              • filtered by “{filterText}”
            </span>
          )}
        </div>

        {showGrid && (
          <>
            <div className="mt-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((item) => (
                <ProductCard key={item.id} product={{
                  ...item,
                  name: item.title, // Align field names
                }} />
              ))}
            </div>

            {filterText && !filtered.length && (
              <p className="text-center text-gray-500 mt-10">
                No matches for “{filterText}”.
              </p>
            )}
          </>
        )}

        {/* Rising Stars */}
        {sectionData?.risingStars?.length > 0 && (() => {
          const filteredRising = filterItems(sectionData.risingStars);
          const risingToShow =
            filterText && filteredRising.length ? filteredRising : sectionData.risingStars;
          return (
            <>
              <h2 className="text-center text-xl font-semibold my-10">
                RISING STARS
              </h2>
              <CardsCarousel
                data={risingToShow}
                type="rising"
              />
            </>
          );
        })()}

        {/* Trending Now */}
        {sectionData?.trendingNow?.length > 0 && (() => {
          const filteredTrending = filterItems(sectionData.trendingNow);
          const trendingToShow =
            filterText && filteredTrending.length ? filteredTrending : sectionData.trendingNow;
          return (
            <>
              <h2 className="text-center text-xl font-semibold my-10">
                TRENDING NOW
              </h2>
              <CardsCarousel
                data={trendingToShow}
              />
            </>
          );
        })()}

        {/* Shop By Category */}
        {sectionData?.shopByCategory?.length > 0 && (() => {
          const filteredCategories = filterItems(sectionData.shopByCategory);
          const categoriesToShow =
            filterText && filteredCategories.length ? filteredCategories : sectionData.shopByCategory;
          return (
            <>
              <h2 className="text-center text-xl font-semibold my-10">
                SHOP BY CATEGORY
              </h2>
              <CardsGrid data={categoriesToShow} />
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default Shop;

