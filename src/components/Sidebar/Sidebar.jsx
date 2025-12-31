import React from "react";
import { slugify } from "../../utils/slugs";

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <aside className="hidden md:block w-64 flex-shrink-0 pr-8 border-r border-gray-100">
            <div className="sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">
                    Categories
                </h3>

                <ul className="space-y-3">
                    {categories.map((cat, idx) => {
                        const isSelected = selectedCategory &&
                            slugify(cat) === selectedCategory;

                        return (
                            <li key={idx}>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category-filter"
                                        className="accent-pink-600 w-4 h-4 cursor-pointer"
                                        checked={!!isSelected}
                                        onChange={() => onSelectCategory(cat)}
                                    />
                                    <span
                                        className={`text-sm group-hover:text-pink-600 transition-colors ${isSelected ? "font-bold text-gray-900" : "text-gray-600"
                                            }`}
                                    >
                                        {cat}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
