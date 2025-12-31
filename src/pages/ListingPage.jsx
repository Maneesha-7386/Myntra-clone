import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import {
    setSelectedBrands,
    setSelectedColors,
    setSelectedPriceRanges,
    setSelectedDiscount,
    clearAllFilters
} from "../store/filterSlice";
import { deslugify } from "../utils/slugs";
import { collectNormalizedProducts } from "../utils/productUtils";

// New Components
import FilterSidebar from "../components/Listing/FilterSidebar";
import ProductsGrid from "../components/Listing/ProductsGrid";
import Kids from "./Kids";
import HomeLiving from "./HomeLiving";
import Men from "./Men";
import Women from "./Women";
import Genz from "./Genz";
import { X, Filter, ChevronDown, SlidersHorizontal } from "lucide-react";

const SECTION_KEY_MAP = {
    MEN: "men",
    WOMEN: "women",
    KIDS: "kids",
    HOME: "home",
    BEAUTY: "beauty",
    GENZ: "genz",
    SEARCH: "search",
};

const ListingPage = (props) => {
    const { categorySlug } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: productsData, loading } = useSelector((state) => state.products);
    const searchQuery = searchParams.get('q');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

    useEffect(() => {
        if (!productsData || Object.keys(productsData).length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, productsData]);

    // Myntra-style Slug Parsing
    const { sectionKey, categoryName, isGlobalSearch } = useMemo(() => {
        const SECTION_MAP = {
            'men': 'MEN',
            'women': 'WOMEN',
            'kids': 'KIDS',
            'home-living': 'HOME',
            'beauty': 'BEAUTY',
            'genz': 'GENZ'
        };

        if (categorySlug === 'listing') {
            return { sectionKey: 'SEARCH', categoryName: searchQuery, isGlobalSearch: true };
        }

        if (!categorySlug) return { sectionKey: '', categoryName: null, isGlobalSearch: false };

        if (SECTION_MAP[categorySlug]) {
            return { sectionKey: SECTION_MAP[categorySlug], categoryName: null, isGlobalSearch: false };
        }

        const foundParentKey = Object.keys(SECTION_MAP).find(key => categorySlug.startsWith(key + "-"));
        if (foundParentKey) {
            const categoryPart = categorySlug.slice(foundParentKey.length + 1);
            return {
                sectionKey: SECTION_MAP[foundParentKey],
                categoryName: deslugify(categoryPart),
                isGlobalSearch: false
            };
        }

        return {
            sectionKey: 'SEARCH',
            categoryName: deslugify(categorySlug),
            isGlobalSearch: true
        };
    }, [categorySlug, searchQuery]);

    // Redux Filter State
    const {
        selectedBrands,
        selectedColors,
        selectedPriceRanges,
        selectedDiscount
    } = useSelector((state) => state.filters);

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    // Sync state with URL change
    useEffect(() => {
        dispatch(clearAllFilters());
        setPage(1);
        window.scrollTo(0, 0);
        setIsFilterDrawerOpen(false);
    }, [categoryName, sectionKey, dispatch]);

    const allSectionProducts = useMemo(() => {
        if (!productsData || !sectionKey) return [];
        const apiSectionKey = SECTION_KEY_MAP[sectionKey];
        return collectNormalizedProducts(apiSectionKey === "search" ? null : apiSectionKey, productsData);
    }, [productsData, sectionKey]);

    const filteredProducts = useMemo(() => {
        if (allSectionProducts.length === 0) return [];
        let result = allSectionProducts;

        if (categoryName) {
            const normalizedTarget = categoryName.toLowerCase().replace(/[^a-z0-9]/g, "");
            let categoryFiltered = [];
            if (isGlobalSearch) {
                categoryFiltered = allSectionProducts.filter(p =>
                    (p.brand && p.brand.toLowerCase().includes(normalizedTarget)) ||
                    (p.name && p.name.toLowerCase().includes(normalizedTarget)) ||
                    (p.tags && p.tags.some(tag => tag && tag.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalizedTarget)))
                );
            } else {
                categoryFiltered = allSectionProducts.filter(p => p.tags.some(tag => tag && tag.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalizedTarget)));
            }
            if (categoryFiltered.length > 0) result = categoryFiltered;
        }

        if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
        if (selectedColors.length > 0) result = result.filter(p => selectedColors.includes(p.color));
        if (selectedPriceRanges.length > 0) {
            result = result.filter(p => {
                const price = typeof p.price === 'string' ? parseInt(p.price.replace(/[^\d]/g, "")) : p.price;
                return selectedPriceRanges.some(range => {
                    if (range.includes("-")) {
                        const [min, max] = range.split("-").map(Number);
                        return price >= min && price <= max;
                    } else if (range.includes("+")) {
                        const min = parseInt(range);
                        return price >= min;
                    }
                    return true;
                });
            });
        }
        if (selectedDiscount) {
            const minDiscount = parseInt(selectedDiscount);
            result = result.filter(p => {
                const discount = typeof p.discount === 'string' ? parseInt(p.discount.replace(/[^\d]/g, "")) : p.discount;
                return discount >= minDiscount;
            });
        }
        return result;
    }, [allSectionProducts, categoryName, selectedBrands, selectedColors, selectedPriceRanges, selectedDiscount, isGlobalSearch]);

    const displayProducts = filteredProducts.length > 0 ? filteredProducts : allSectionProducts;

    const ALL_AVAILABLE_COLORS = ["Black", "Blue", "White", "Red", "Pink", "Green", "Yellow", "Orange", "Navy Blue", "Maroon", "Multi"];
    const filterOptions = useMemo(() => {
        if (!productsData || !sectionKey) return { brands: [], colors: [], prices: [], discounts: [] };
        const apiSectionKey = SECTION_KEY_MAP[sectionKey];
        const baseProducts = collectNormalizedProducts(apiSectionKey === "search" ? null : apiSectionKey, productsData);
        const brands = Array.from(new Set(baseProducts.map(p => p.brand))).sort();
        const dynamicColors = Array.from(new Set(baseProducts.map(p => p.color))).filter(Boolean);
        const colors = Array.from(new Set([...ALL_AVAILABLE_COLORS, ...dynamicColors])).sort();

        return {
            brands,
            colors,
            prices: [
                { label: "Rs. 499 to Rs. 1000", value: "499-1000" },
                { label: "Rs. 1001 to Rs. 2000", value: "1001-2000" },
                { label: "Rs. 2001 to Rs. 5000", value: "2001-5000" },
                { label: "Rs. 5001 and above", value: "5001+" }
            ],
            discounts: ["10% and above", "20% and above", "30% and above", "50% and above", "70% and above"]
        };
    }, [productsData, sectionKey]);

    const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE) || 1;
    const currentProducts = displayProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (loading && (!productsData || Object.keys(productsData).length === 0)) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading Myntra...</p>
            </div>
        );
    }

    if (!sectionKey) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">Discover Latest Trends</h2>
                <p className="text-gray-500 mt-2">Explore our premium collection curated for you.</p>
                <button
                    onClick={() => navigate('/men')}
                    className="mt-6 px-8 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-md hover:bg-[#ff527b] transition-all uppercase tracking-wider w-full max-w-xs"
                >
                    Explore Men Section
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-10">
            {(!categoryName && sectionKey !== 'BEAUTY') ? (
                <div className="pb-20">
                    {sectionKey === 'HOME' && <HomeLiving />}
                    {sectionKey === 'GENZ' && <Genz />}
                    {sectionKey === 'KIDS' && <Kids />}
                    {sectionKey === 'MEN' && <Men />}
                    {sectionKey === 'WOMEN' && <Women />}
                </div>
            ) : (
                <>
                    {/* BREADCRUMB */}
                    <div className="max-w-[1600px] mx-auto px-4 md:px-5 py-3 md:py-4 text-[10px] md:text-sm text-gray-500 truncate">
                        <span className="hover:text-black cursor-pointer" onClick={() => navigate('/')}>Home</span>
                        <span> / </span>
                        <span className="capitalize hover:text-black cursor-pointer" onClick={() => navigate(`/${sectionKey.toLowerCase()}`)}>{sectionKey.toLowerCase().replace("-", " ")}</span>
                        {categoryName && (
                            <>
                                <span> / </span>
                                <span className="font-bold text-black capitalize">{categoryName}</span>
                            </>
                        )}
                    </div>

                    {/* TITLE & MOBILE FILTERS BUTTON */}
                    <div className="max-w-[1600px] mx-auto px-4 md:px-5 mb-4 border-b md:border-b-0 pb-4 md:pb-0">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
                            <h1 className="text-sm md:text-xl font-bold capitalize">
                                {isGlobalSearch ? `Search Results: ${categoryName}` : `${categoryName} for ${sectionKey.toLowerCase()}`}
                            </h1>
                            <span className="text-gray-500 text-xs md:text-base">
                                - {filteredProducts.length} items
                            </span>
                        </div>

                        {/* MOBILE FILTER/SORT BAR */}
                        <div className="flex lg:hidden mt-4 border rounded overflow-hidden">
                            <button
                                onClick={() => setIsFilterDrawerOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 border-r font-bold text-xs uppercase text-gray-700 active:bg-gray-100"
                            >
                                <SlidersHorizontal size={14} /> Filters
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-xs uppercase text-gray-700 active:bg-gray-100">
                                Sort By <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="flex max-w-[1600px] mx-auto md:border-t border-gray-200">

                        {/* DESKTOP SIDEBAR */}
                        <div className="hidden lg:block">
                            <FilterSidebar
                                key={`${sectionKey}`}
                                brands={filterOptions.brands}
                                colors={filterOptions.colors}
                                prices={filterOptions.prices}
                                discounts={filterOptions.discounts}
                            />
                        </div>

                        {/* MOBILE FILTER DRAWER */}
                        {isFilterDrawerOpen && (
                            <div className="fixed inset-0 z-[200] flex lg:hidden">
                                <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterDrawerOpen(false)} />
                                <div className="relative w-[85%] max-w-[320px] bg-white h-full flex flex-col shadow-xl animate-slideInLeft">
                                    <div className="p-4 flex items-center justify-between border-b shadow-sm sticky top-0 bg-white z-10">
                                        <h3 className="font-bold uppercase tracking-wider text-sm">Filters</h3>
                                        <button onClick={() => setIsFilterDrawerOpen(false)}><X size={24} /></button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto px-4 pb-20">
                                        <FilterSidebar
                                            brands={filterOptions.brands}
                                            colors={filterOptions.colors}
                                            prices={filterOptions.prices}
                                            discounts={filterOptions.discounts}
                                            isMobile={true}
                                        />
                                    </div>
                                    <div className="p-4 border-t bg-white absolute bottom-0 left-0 right-0 flex gap-4">
                                        <button
                                            onClick={() => {
                                                dispatch(clearAllFilters());
                                                setIsFilterDrawerOpen(false);
                                            }}
                                            className="flex-1 py-3 border border-pink-600 text-pink-600 font-bold uppercase text-xs rounded"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setIsFilterDrawerOpen(false)}
                                            className="flex-1 py-3 bg-pink-600 text-white font-bold uppercase text-xs rounded"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PRODUCT GRID SECTION */}
                        <div className="flex-1 w-full p-0 md:p-6">
                            <div className="hidden md:flex justify-between items-center mb-6 border-b border-gray-100 pb-4 px-2">
                                <div className="text-sm font-semibold text-gray-600 uppercase">
                                    Filters: <span className="text-pink-600 ml-1">
                                        {[...selectedBrands, ...selectedColors, ...selectedPriceRanges, selectedDiscount].filter(Boolean).join(", ") || "All"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm border px-3 py-2 rounded cursor-pointer hover:bg-gray-50 bg-white shadow-sm">
                                    <span className="text-gray-500 font-medium">Sort by:</span>
                                    <span className="font-bold text-[#282C3F]">Recommended</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>

                            <ProductsGrid products={currentProducts} />

                            {/* PAGINATION */}
                            {displayProducts.length > 0 && (
                                <div className="mt-12 mb-20 flex flex-col items-center px-4">
                                    <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-full pb-2 no-scrollbar px-2">
                                        <button
                                            disabled={page === 1}
                                            onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
                                            className={`px-3 md:px-4 py-2 border rounded font-bold text-xs md:text-sm ${page === 1 ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-800 border-gray-300 active:bg-gray-100'}`}
                                        >
                                            Prev
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setPage(i + 1); window.scrollTo(0, 0); }}
                                                className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center border rounded font-bold text-xs md:text-sm ${page === i + 1 ? 'bg-[#282C3F] text-white border-[#282C3F]' : 'text-gray-800 border-gray-300 active:bg-gray-100'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
                                            className={`px-3 md:px-4 py-2 border rounded font-bold text-xs md:text-sm ${page === totalPages ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-800 border-gray-300 active:bg-gray-100'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <p className="mt-4 text-xs md:text-sm text-gray-500 font-medium">Page {page} of {totalPages}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }
            `}} />
        </div>
    );
};

export default ListingPage;

