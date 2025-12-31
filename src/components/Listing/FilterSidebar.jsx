import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedBrands,
    setSelectedColors,
    setSelectedPriceRanges,
    setSelectedDiscount,
    clearAllFilters
} from "../../store/filterSlice";

const FilterSection = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200 py-3 md:py-4">
            <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={onToggle}
            >
                <span className="font-bold text-[11px] md:text-sm uppercase text-gray-800 tracking-wider">{title}</span>
                {isOpen ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
            </div>
            {isOpen && <div className="mt-2 text-sm">{children}</div>}
        </div>
    );
};

const FilterSidebar = ({
    brands = [],
    prices = [],
    colors = [],
    discounts = [],
    isMobile = false
}) => {
    const dispatch = useDispatch();
    const {
        selectedBrands,
        selectedColors,
        selectedPriceRanges,
        selectedDiscount
    } = useSelector((state) => state.filters);

    const [sectionsOpen, setSectionsOpen] = useState({
        brand: true,
        price: true,
        color: !isMobile,
        discount: !isMobile
    });

    const toggleSection = (section) => {
        setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleBrandToggle = (brand) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        dispatch(setSelectedBrands(newBrands));
    };

    const handleColorToggle = (color) => {
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter(c => c !== color)
            : [...selectedColors, color];
        dispatch(setSelectedColors(newColors));
    };

    const handlePriceToggle = (range) => {
        const newRanges = selectedPriceRanges.includes(range)
            ? selectedPriceRanges.filter(r => r !== range)
            : [...selectedPriceRanges, range];
        dispatch(setSelectedPriceRanges(newRanges));
    };

    const handleClearAll = () => {
        dispatch(clearAllFilters());
    };

    return (
        <aside className={`${isMobile ? "w-full" : "w-64 flex-shrink-0 pr-6 border-r border-gray-200 sticky top-20 self-start pb-20 p-4"}`}>

            {/* HEADER - Desktop only */}
            {!isMobile && (
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <h2 className="font-bold text-base uppercase text-gray-800">Filters</h2>
                    <span
                        className="text-xs font-bold text-pink-600 cursor-pointer hover:text-pink-700 uppercase"
                        onClick={handleClearAll}
                    >
                        Clear All
                    </span>
                </div>
            )}

            {/* BRAND */}
            <FilterSection
                title="Brand"
                isOpen={sectionsOpen.brand}
                onToggle={() => toggleSection('brand')}
            >
                <div className="mb-3 relative">
                    <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
                    <input
                        placeholder="Search Brand"
                        className="w-full bg-gray-100 rounded py-1.5 pl-8 pr-3 text-xs outline-none focus:bg-white border border-transparent focus:border-gray-200"
                    />
                </div>
                <ul className="space-y-4 md:space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    {brands.map((brand, idx) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                            <li key={idx} className="flex items-center gap-3 group px-1">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`brand-${idx}`}
                                        className="accent-pink-600 w-5 h-5 md:w-4 md:h-4 cursor-pointer"
                                        checked={isChecked}
                                        onChange={() => handleBrandToggle(brand)}
                                    />
                                </div>
                                <label htmlFor={`brand-${idx}`} className={`text-[13px] md:text-xs cursor-pointer hover:text-gray-900 transition-colors ${isChecked ? "font-bold text-gray-900" : "text-gray-600"}`}>
                                    {brand}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </FilterSection>

            {/* PRICE */}
            <FilterSection
                title="Price"
                isOpen={sectionsOpen.price}
                onToggle={() => toggleSection('price')}
            >
                <ul className="space-y-4 md:space-y-2">
                    {prices.map((price, idx) => {
                        const isChecked = selectedPriceRanges.includes(price.value);
                        return (
                            <li key={idx} className="flex items-center gap-3 group px-1">
                                <input
                                    type="checkbox"
                                    id={`price-${idx}`}
                                    className="accent-pink-600 w-5 h-5 md:w-4 md:h-4 cursor-pointer"
                                    checked={isChecked}
                                    onChange={() => handlePriceToggle(price.value)}
                                />
                                <label htmlFor={`price-${idx}`} className={`text-[13px] md:text-xs cursor-pointer hover:text-gray-900 transition-colors ${isChecked ? "font-bold text-gray-900" : "text-gray-600"}`}>
                                    {price.label}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </FilterSection>

            {/* COLOR */}
            <FilterSection
                title="Color"
                isOpen={sectionsOpen.color}
                onToggle={() => toggleSection('color')}
            >
                <ul className="space-y-4 md:space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    {colors.map((color, idx) => {
                        const isChecked = selectedColors.includes(color);
                        return (
                            <li key={idx} className="flex items-center gap-3 px-1">
                                <input
                                    type="checkbox"
                                    id={`color-${idx}`}
                                    className="accent-pink-600 w-5 h-5 md:w-4 md:h-4 cursor-pointer"
                                    checked={isChecked}
                                    onChange={() => handleColorToggle(color)}
                                />
                                <label htmlFor={`color-${idx}`} className="flex items-center gap-2 cursor-pointer">
                                    <span
                                        className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
                                    ></span>
                                    <span className={`text-[13px] md:text-xs transition-colors ${isChecked ? "font-bold text-gray-900" : "text-gray-600"}`}>
                                        {color}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </FilterSection>

            {/* DISCOUNT RANGE */}
            <FilterSection
                title="Discount Range"
                isOpen={sectionsOpen.discount}
                onToggle={() => toggleSection('discount')}
            >
                <ul className="space-y-4 md:space-y-2 pb-6">
                    {discounts.map((discount, idx) => {
                        const val = parseInt(discount);
                        const isChecked = selectedDiscount === `${val}%`;
                        return (
                            <li key={idx} className="flex items-center gap-3 px-1">
                                <input
                                    type="radio"
                                    id={`discount-${idx}`}
                                    name="discount"
                                    className="accent-pink-600 w-5 h-5 md:w-4 md:h-4 cursor-pointer"
                                    checked={isChecked}
                                    onChange={() => dispatch(setSelectedDiscount(`${val}%`))}
                                />
                                <label htmlFor={`discount-${idx}`} className={`text-[13px] md:text-xs cursor-pointer transition-colors ${isChecked ? "font-bold text-gray-900" : "text-gray-600"}`}>
                                    {discount}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </FilterSection>

        </aside>
    );
};

export default FilterSidebar;

