import { slugify } from "./slugs";

/**
 * Normalizes product data from API to a consistent format for ProductCard.
 */
export const normalizeProduct = (item, sectionKey = "MEN", idx = 0) => {
    if (!item) return null;

    // Determine the likely section if missing
    const sKey = item.section || sectionKey;

    return {
        id: item.id || `${sKey}-${idx}-${item.name || item.title}`,
        title: item.title || item.name || "Product",
        name: item.name || item.title || "Product", // 🔥 Added for compatibility with universal ProductCard
        brand: item.brand || sKey.toUpperCase() || "Brand",
        color: item.color,
        price: item.price || item.offer || "Rs. 999",
        mrp: item.mrp || item.originalPrice || "Rs. 1999",
        discount: item.discount || item.off || "50% OFF",
        image: item.image || item.img || item.banner || item.pic || "https://bit.ly/3NDR0cZ",
        category: item.category || item.section || "Product",
        section: sKey,
        rating: typeof item.rating === 'object' ? item.rating : {
            value: item.rating || (Math.random() * 2 + 3).toFixed(1),
            count: item.ratingCount || Math.floor(Math.random() * 1000)
        },
        tags: [
            item.name,
            item.title,
            item.brand,
            item.color,
            item.offer,
            item.section,
            item.category,
        ]
            .filter(Boolean)
            .map((x) => String(x).toLowerCase()),
    };
};

/**
 * Collects and normalizes all products from a section object (products, trending, etc.)
 */
export const collectNormalizedProducts = (sectionKey, data) => {
    if (!data) return [];

    // Case 1: data is already a flat array of products
    if (Array.isArray(data)) {
        let results = data.map((item, idx) => normalizeProduct(item, item.section || sectionKey, idx));
        // If we have a specific sectionKey, filter further
        if (sectionKey && sectionKey !== "search" && sectionKey !== "SEARCH") {
            const target = sectionKey.toLowerCase();
            results = results.filter(p => p.section && p.section.toLowerCase() === target);
        }
        return results;
    }

    // Case 2: data is an object with section keys (MEN, WOMEN, etc.)
    let sectionData = sectionKey ? data[sectionKey.toUpperCase()] || data[sectionKey.toLowerCase()] : null;
    let products = [];

    const extract = (sData, sKey) => {
        if (!sData) return [];
        // Support both direct array and nested pools
        if (Array.isArray(sData)) return sData.map((item, idx) => normalizeProduct(item, sKey, idx));

        const pools = [
            sData.products,
            sData.trendingNow,
            sData.risingStars,
            sData.shopByCategory,
            sData.topPicks,
            sData.fashionEssentials
        ].filter(Boolean);

        if (pools.length > 0) {
            return pools.flat().map((item, idx) => normalizeProduct(item, sKey, idx));
        }

        // If it's an object but not a known pool, maybe it's a single product?
        return [normalizeProduct(sData, sKey, 0)];
    };

    if (sectionData) {
        products = extract(sectionData, sectionKey);
    }

    // Fallback search across all keys if nothing found in section
    if (products.length === 0 && typeof data === 'object') {
        products = Object.keys(data).flatMap(sk => {
            if (sk === 'id' || sk === 'createdAt') return []; // Skip metadata
            return extract(data[sk], sk);
        });
    }

    return products;
};
