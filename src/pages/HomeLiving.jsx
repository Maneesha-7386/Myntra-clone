import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { slugify } from '../utils/slugs';

const HomeLiving = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data]);

  const handleItemClick = (item) => {
    navigate(`/home-living-${slugify(item)}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    navigate(`/wishlist`);
  };

  if (loading && !data?.home) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 font-medium tracking-wide">Loading Home & Living...</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Furnishings & Bed Linen",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Bed Sheets",
        "Bedding Sets & Bed Covers",
        "Blankets, Quilts & Dohars",
        "Pillows & Pillow Covers",
        "Cushions & Cushion Covers",
        "Curtains",
        "Mats & Dhurries",
        "Carpets"
      ]
    },
    {
      title: "Bath & Bed Linen",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Towels & Towel Sets",
        "Bath Robes",
        "Bathroom Accessories",
        "Shower Curtains",
        "Bath Rugs"
      ]
    },
    {
      title: "Home Décor",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Pooja Essentials",
        "Artificial Flowers & Plants",
        "Candles & Candle Holders",
        "Clocks",
        "Planters & Garden Accessories",
        "Home Fragrances",
        "Mirrors",
        "Wall Art",
        "Wall Décor",
        "Wall Shelves",
        "Showpieces & Vases",
        "Photo Frames"
      ]
    },
    {
      title: "Lamps & Lighting",
      image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Floor Lamps",
        "Table Lamps",
        "Wall Lamp & String Lights",
        "Ceiling Lamps",
        "Outdoor Lamps"
      ]
    },
    {
      title: "Kitchen & Table",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Dinnerware & Serveware",
        "Cups & Mugs",
        "Bakeware",
        "Bar & Drinkware",
        "Cookware & Kitchen Tools",
        "Kitchen Storage & Organisers",
        "Table Covers & Furnishings"
      ]
    },
    {
      title: "Storage & Organisers",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=compress&cs=tinysrgb&w=1200",
      items: [
        "Organisers",
        "Hooks & Holders",
        "Shoe Racks",
        "Storage Baskets & Boxes",
        "Clothes Hangers"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-assistant">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-10">
        <div className="space-y-20 md:space-y-32">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div
                className="w-full md:w-[65%] overflow-hidden cursor-pointer"
                onClick={() => navigate(`/home-living-${slugify(section.title)}`)}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-700 hover:scale-[1.01]"
                />
              </div>

              <div className="w-full md:w-[35%] py-2">
                <h2 className="text-[#282C3F] text-lg font-bold tracking-wider mb-6 uppercase border-b border-gray-100 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleItemClick(item)}
                        className="text-[#535766] text-sm md:text-base font-normal hover:text-[#ff3f6c] hover:font-bold transition-all duration-200 text-left"
                      >
                        {item}
                      </button>
                      <Heart
                        size={16}
                        className="text-gray-300 cursor-pointer hover:text-[#ff3f6c] opacity-0 group-hover:opacity-100 transition-all ml-4"
                        onClick={handleWishlist}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        body { font-family: 'Assistant', sans-serif !important; }
        .font-assistant { font-family: 'Assistant', sans-serif; }
      `}} />
    </div>
  );
};

export default HomeLiving;