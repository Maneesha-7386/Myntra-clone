import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  Search,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

import logo from "../../assets/myntra-logo.png";
import MegaMenu from "./MegaMenu";
import ProfileDropdown from "./ProfileDropdown";
import { navbarMenuData } from "../../data/navbarMenuData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "MEN", path: "/men" },
  { key: "WOMEN", path: "/women" },
  { key: "KIDS", path: "/kids" },
  { key: "HOME", path: "/home-living" },
  { key: "BEAUTY", path: "/beauty" },
  { key: "GENZ", path: "/genz" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);
  const bagCount = useSelector((state) => state.cart.cartItems.length);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === 'click') && searchText.trim()) {
      navigate(`/listing?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
      setIsMobileSearchOpen(false);
    }
  };

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    setExpandedSection(null);
  }, [location]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-[100]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 py-3 md:py-0 h-16 md:h-20">

        {/* MOBILE: HAMBURGER */}
        <button
          className="lg:hidden p-1 -ml-1 text-gray-700"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* LOGO */}
        <Link to="/" className="flex items-center ml-2 md:ml-5 mr-auto md:mr-0">
          <img src={logo} alt="Myntra" className="h-6 md:h-10 lg:h-12" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex h-full ml-10 gap-4 lg:gap-8 font-bold text-xs lg:text-[14px] text-[#282C3F] tracking-wide h-full items-stretch">
          {categories.map(({ key }) => (
            <div
              key={key}
              className="relative flex items-center h-full border-b-4 border-transparent hover:border-pink-500 transition-all cursor-pointer group px-1 lg:px-2"
              onMouseEnter={() => setActiveMenu(key)}
              onMouseLeave={() => setActiveMenu(null)}
              onClick={() => {
                const path = key === "HOME" ? "home-living" : key.toLowerCase();
                navigate(`/${path}`);
              }}
            >
              <span className="uppercase pt-1">{key}</span>
            </div>
          ))}
        </nav>

        {/* SEARCH BAR (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-[500px] mx-8 lg:mx-12 items-center bg-[#f5f5f6] rounded px-4 py-2 border border-transparent focus-within:border-gray-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400 mr-3" />
          <input
            placeholder="Search for products, brands and more"
            className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder-gray-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto md:ml-0">
          {/* SEARCH TRIGGER (Mobile) */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search size={22} />
          </button>

          {/* PROFILE */}
          <div
            className="relative hidden lg:flex flex-col items-center cursor-pointer group py-4"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <User size={20} className="text-[#282C3F]" />
            <span className="mt-1 text-[10px] uppercase font-bold text-[#282C3F]">Profile</span>
            {showProfile && (
              <ProfileDropdown closeMenu={() => setShowProfile(false)} />
            )}
          </div>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="flex flex-col items-center cursor-pointer relative py-2"
          >
            <Heart size={20} className="text-[#282C3F]" />
            <span className="hidden md:inline-block mt-1 text-[10px] uppercase font-bold text-[#282C3F]">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 md:-top-1 right-0 md:right-3 bg-[#ff3f6c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* BAG */}
          <Link
            to="/bag"
            className="flex flex-col items-center cursor-pointer relative py-2"
          >
            <ShoppingBag size={20} className="text-[#282C3F]" />
            <span className="hidden md:inline-block mt-1 text-[10px] uppercase font-bold text-[#282C3F]">Bag</span>
            {bagCount > 0 && (
              <span className="absolute top-1 md:-top-1 right-0 md:right-1 bg-[#ff3f6c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bagCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* FULL WIDTH MEGA MENU CONTAINER */}
      {/* Moved outside the inner container to be full width relative to header */}
      <div
        className="absolute top-full left-0 w-full bg-white z-[90]"
        onMouseEnter={() => { }} // Keep active if needed, but handled by nav hover delay usually. 
      // For simplicity: We rely on the activeMenu state which needs to persist.
      // Issue: if we leave the nav item, activeMenu becomes null. 
      // We need to keep it open if hovering the menu itself.
      >
        {activeMenu && navbarMenuData[activeMenu] && (
          <div
            className="border-t shadow-lg animate-fadeIn"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <MegaMenu
              data={navbarMenuData[activeMenu]}
              categoryKey={activeMenu}
              closeMenu={() => setActiveMenu(null)}
            />
          </div>
        )}
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col transition-all duration-300">
          <div className="flex items-center p-4 border-b">
            <button onClick={() => setIsMobileSearchOpen(false)} className="mr-4">
              <ChevronLeft size={24} />
            </button>
            <input
              autoFocus
              placeholder="Search products..."
              className="flex-1 text-lg outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />
            {searchText && (
              <button onClick={() => setSearchText("")} className="ml-2">
                <X size={20} className="text-gray-400" />
              </button>
            )}
          </div>
          <div className="p-4 bg-gray-50 flex-1">
            <p className="text-sm text-gray-500 font-bold uppercase mb-4 tracking-wider">Recent Searches</p>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER / SIDEBAR */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[150] lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed top-0 left-0 w-[80%] max-w-[300px] h-full bg-white z-[160] overflow-y-auto lg:hidden shadow-2xl transition-transform duration-300 transform translate-x-0">
            <div className="p-5 flex items-center justify-between border-b bg-pink-50 text-pink-600 font-bold">
              <span>EXPLORE MYNTRA</span>
              <button onClick={() => setIsDrawerOpen(false)}><X size={24} /></button>
            </div>

            <div className="py-2">
              {categories.map(({ key }) => (
                <div key={key} className="border-b last:border-0 border-gray-100">
                  <button
                    className="w-full flex items-center justify-between p-4 font-bold text-gray-700 hover:bg-gray-50"
                    onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                  >
                    <span>{key}</span>
                    <ChevronRight
                      size={20}
                      className={`transition-transform duration-200 ${expandedSection === key ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {expandedSection === key && (
                    <div className="bg-gray-50 py-2">
                      <button
                        onClick={() => navigate(`/${key === "HOME" ? "home-living" : key.toLowerCase()}`)}
                        className="w-full text-left px-8 py-2 text-pink-600 font-bold text-sm underline"
                      >
                        View All {key}
                      </button>
                      {navbarMenuData[key]?.map((section, idx) => (
                        <div key={idx} className="px-8 py-2">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">{section.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {section.items.map((item, i) => (
                              <button
                                key={i}
                                className="text-sm text-gray-600 hover:text-pink-500 py-1 mr-4"
                                onClick={() => navigate(`/${key === "HOME" ? "home-living" : key.toLowerCase()}-${item.toLowerCase().replace(/ /g, '-')}`)}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 mt-10 p-5 space-y-4 font-semibold text-gray-600">
              <Link to="/login" className="block">My Account</Link>
              <Link to="/orders" className="block">Orders</Link>
              <Link to="/wishlist" className="block">Shortlist</Link>
              <Link to="/bag" className="block">Shopping Bag</Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;

