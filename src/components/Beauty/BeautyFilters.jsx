import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Star, Heart } from 'lucide-react';

const FilterSection = ({ title, options, selected, onToggle, type = 'checkbox' }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-bold text-sm tracking-wider text-[#282C3F] uppercase mb-2"
            >
                <span>{title}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((option) => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selected.includes(option.id)}
                                onChange={() => onToggle(option.id)}
                                className="w-4 h-4 border-gray-300 rounded text-[#ff3f6c] focus:ring-[#ff3f6c] cursor-pointer"
                            />
                            <span className="text-sm text-[#282C3F] group-hover:text-[#ff3f6c] transition-colors flex items-center gap-1">
                                {option.label}
                                {title === 'Rating' && (
                                    <Star size={12} className="fill-[#ff3f6c] text-[#ff3f6c]" />
                                )}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const BeautyFilters = ({ filters, selectedFilters, onFilterChange }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white pr-4 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar overflow-x-hidden">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#282C3F] uppercase tracking-wide">Filters</h2>
                    <Heart
                        size={18}
                        className="text-gray-400 cursor-pointer hover:text-[#ff3f6c] transition-colors"
                        onClick={() => navigate('/wishlist')}
                    />
                </div>
                <button
                    onClick={() => onFilterChange('CLEAR_ALL')}
                    className="text-[#ff3f6c] text-xs font-bold hover:underline"
                >
                    CLEAR ALL
                </button>
            </div>

            <FilterSection
                title="Categories"
                options={filters.categories}
                selected={selectedFilters.categories}
                onToggle={(id) => onFilterChange('categories', id)}
            />

            <FilterSection
                title="Brand"
                options={filters.brands}
                selected={selectedFilters.brands}
                onToggle={(id) => onFilterChange('brands', id)}
            />

            <FilterSection
                title="Price"
                options={filters.price}
                selected={selectedFilters.price}
                onToggle={(id) => onFilterChange('price', id)}
            />

            <FilterSection
                title="Discount"
                options={filters.discount}
                selected={selectedFilters.discount}
                onToggle={(id) => onFilterChange('discount', id)}
            />

            <FilterSection
                title="Rating"
                options={filters.rating}
                selected={selectedFilters.rating}
                onToggle={(id) => onFilterChange('rating', id)}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d5d9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}} />
        </div>
    );
};

export default BeautyFilters;
