import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import BeautyFilters from '../components/Beauty/BeautyFilters';
import ProductCard from '../components/ProductCard';

// Filter Definitions
const FILTER_DATA = {
  categories: [
    { id: 'makeup', label: 'Makeup' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'haircare', label: 'Haircare' },
    { id: 'fragrances', label: 'Fragrances' },
    { id: 'bath', label: 'Bath & Body' },
    { id: 'grooming', label: 'Men Grooming' },
    { id: 'accessories', label: 'Beauty Accessories' },
  ],
  brands: [
    { id: 'lakme', label: 'Lakme' },
    { id: 'maybelline', label: 'Maybelline' },
    { id: 'loreal', label: 'L’Oreal' },
    { id: 'mamaearth', label: 'Mamaearth' },
    { id: 'minimalist', label: 'Minimalist' },
    { id: 'plum', label: 'Plum' },
    { id: 'wow', label: 'WOW' },
    { id: 'nivea', label: 'Nivea' },
  ],
  price: [
    { id: '0-499', label: '₹0 – ₹499' },
    { id: '500-999', label: '₹500 – ₹999' },
    { id: '1000-1999', label: '₹1000 – ₹1999' },
    { id: '2000+', label: '₹2000+' },
  ],
  discount: [
    { id: '10', label: '10% and above' },
    { id: '20', label: '20% and above' },
    { id: '30', label: '30% and above' },
    { id: '40', label: '40% and above' },
  ],
  rating: [
    { id: '4', label: '4★ & above' },
    { id: '3', label: '3★ & above' },
  ]
};

// Mock Products Generator
const generateBeautyProducts = () => {
  const brands = ['Lakme', 'Maybelline', 'L’Oreal', 'Mamaearth', 'Minimalist', 'Plum', 'WOW', 'Nivea'];
  const categories = ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Bath & Body', 'Men Grooming', 'Beauty Accessories'];
  const images = [
    "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1522335789183-b15c27da6358?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1512496011931-621d0a52783a?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=compress&cs=tinysrgb&w=600"
  ];

  return Array.from({ length: 40 }).map((_, i) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 3000) + 100;
    const discount = [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)];
    const mrp = Math.floor(price / (1 - discount / 100));

    return {
      id: i + 1,
      brand,
      name: `${brand} ${category === 'Fragrances' ? 'Perfume' : 'Special Edition ' + category}`,
      category: category.toLowerCase().replace(' & ', ' '),
      price,
      mrp,
      discount,
      rating: {
        value: (Math.random() * (5 - 3) + 3).toFixed(1),
        count: Math.floor(Math.random() * 1000) + 50
      },
      image: images[i % images.length]
    };
  });
};

const Beauty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL params
  const selectedFilters = useMemo(() => ({
    categories: searchParams.getAll('category'),
    brands: searchParams.getAll('brand'),
    price: searchParams.getAll('price'),
    discount: searchParams.getAll('discount'),
    rating: searchParams.getAll('rating'),
  }), [searchParams]);

  useEffect(() => {
    // Simulate API fetch
    const fetchProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(generateBeautyProducts());
        setLoading(false);
      }, 500);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (type, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (type === 'CLEAR_ALL') {
      setSearchParams(new URLSearchParams());
      return;
    }

    const paramKey = type === 'categories' ? 'category' : type.slice(0, -1);
    const currentValues = newParams.getAll(paramKey);

    if (currentValues.includes(value)) {
      // Remove value
      const updated = currentValues.filter(v => v !== value);
      newParams.delete(paramKey);
      updated.forEach(v => newParams.append(paramKey, v));
    } else {
      // Add value
      newParams.append(paramKey, value);
    }

    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category Filter
      if (selectedFilters.categories.length > 0) {
        if (!selectedFilters.categories.some(c => product.category.includes(c))) return false;
      }
      // Brand Filter
      if (selectedFilters.brands.length > 0) {
        if (!selectedFilters.brands.includes(product.brand.toLowerCase())) return false;
      }
      // Price Filter
      if (selectedFilters.price.length > 0) {
        const isMatch = selectedFilters.price.some(p => {
          const [min, max] = p.split('-').map(Number);
          if (p === '2000+') return product.price >= 2000;
          return product.price >= min && product.price <= max;
        });
        if (!isMatch) return false;
      }
      // Discount Filter
      if (selectedFilters.discount.length > 0) {
        if (!selectedFilters.discount.some(d => product.discount >= Number(d))) return false;
      }
      // Rating Filter
      if (selectedFilters.rating.length > 0) {
        if (!selectedFilters.rating.some(r => Number(product.rating.value) >= Number(r))) return false;
      }
      return true;
    });
  }, [products, selectedFilters]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6">

        {/* Header Info */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <span className="font-bold text-[#282C3F]">Beauty</span>
          <span className="text-gray-400 font-normal">- {filteredProducts.length} items</span>
        </div>

        <div className="flex gap-8 relative">
          {/* LEFT SIDE – FILTERS */}
          <div className="hidden md:block w-[280px] shrink-0">
            <BeautyFilters
              filters={FILTER_DATA}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* RIGHT SIDE – PRODUCTS */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-7">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-7 md:gap-y-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <h3 className="text-xl font-bold text-[#282C3F] mb-2">No products found</h3>
                <p className="text-gray-500 text-sm">Try clearing some filters to find what you're looking for.</p>
                <button
                  onClick={() => handleFilterChange('CLEAR_ALL')}
                  className="mt-6 px-8 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-lg hover:bg-[#ff527b] transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beauty;