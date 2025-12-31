import React from 'react';
import ProductCard from '../ProductCard';

const ProductsGrid = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 w-full px-4 text-center">
                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">No products found</h3>
                <p className="text-gray-500 mt-2 text-sm">Try checking other categories or clear filters.</p>
            </div>
        );
    }

    return (
        <div className="
            grid 
            grid-cols-2          /*  MOBILE: 2 cards */
            sm:grid-cols-2 
            md:grid-cols-3       /*  TABLET: 3 cards */
            lg:grid-cols-5       /*  LAPTOP: 5 cards */
            xl:grid-cols-6       /*  DESKTOP: 6 cards */
            gap-x-2 md:gap-x-4 
            gap-y-6 md:gap-y-10 
            px-2 md:px-0
        ">
            {products.map((product) => (
                <ProductCard
                    key={product.id || Math.random()}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductsGrid;

