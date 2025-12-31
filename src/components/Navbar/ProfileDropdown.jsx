import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ closeMenu }) => {
    const navigate = useNavigate();

    const handleItemClick = (e, path) => {
        e.preventDefault();
        e.stopPropagation(); //  Prevent any parent category logic from firing

        if (path && path.startsWith('/')) {
            navigate(path);
        } else {
            alert(`${e.target.innerText} feature coming soon!`);
        }

        closeMenu && closeMenu();
    };

    return (
        <div className="absolute right-0 top-full pt-4 w-[280px] z-50 animate-fadeInSlide">
            <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-gray-100 rounded-sm">

                {/* Section 1: Welcome */}
                <div className="p-5 pb-4 text-left">
                    <h3 className="text-[#282c3f] font-bold text-sm mb-1">Welcome</h3>
                    <p className="text-[#3e4152] text-xs mb-4">To access account and manage orders</p>
                    <button
                        onClick={(e) => handleItemClick(e, '/login')}
                        className="inline-block px-5 py-2.5 border border-[#eaeaec] text-[#ff3f6c] font-bold text-sm tracking-wide rounded-sm hover:border-[#ff3f6c] transition-all duration-200 uppercase"
                    >
                        Login / Signup
                    </button>
                </div>

                <div className="border-t border-gray-100 mx-5"></div>

                {/* Section 2: Main Links */}
                <div className="py-3">
                    {[
                        { label: 'Orders', path: '/orders' },
                        { label: 'Wishlist', path: '/wishlist' },
                        { label: 'Gift Cards', path: '/gift-cards' },
                        { label: 'Contact Us', path: '/login' },
                        { label: 'Myntra Insider', path: '/insider', isNew: true },
                    ].map((link, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => handleItemClick(e, link.path)}
                            className="w-full px-5 py-2 flex items-center justify-between text-[#3e4152] text-sm font-normal hover:bg-[#f5f5f6] hover:font-bold transition-all text-left"
                        >
                            <span>{link.label}</span>
                            {link.isNew && (
                                <span className="bg-[#ff3f6c] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                                    New
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="border-t border-gray-100 mx-5"></div>

                {/* Section 3: Account Options */}
                <div className="py-3 mb-2">
                    {[
                        'Myntra Credit',
                        'Coupons',
                        'Saved Cards',
                        'Saved VPA',
                        'Saved Addresses'
                    ].map((item, idx) => {
                        const path = `/${item.toLowerCase().replace(/ /g, '-')}`;
                        return (
                            <button
                                key={idx}
                                onClick={(e) => handleItemClick(e, path)}
                                className="w-full px-5 py-1.5 block text-[#3e4152] text-sm font-normal hover:bg-[#f5f5f6] hover:font-bold transition-all text-left"
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlide {
          animation: fadeInSlide 0.2s ease-out forwards;
        }
      `}} />
        </div>
    );
};

export default ProfileDropdown;
