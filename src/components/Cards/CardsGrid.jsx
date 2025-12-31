import ProductCard from "../ProductCard";

/**
 * Grid component for Home and Landing pages
 */
const CardsGrid = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <div className="px-2 md:px-10">
      <div className="
        grid 
        gap-x-2 md:gap-x-4 
        gap-y-6 md:gap-y-10 
        grid-cols-2          /* Mobile */
        sm:grid-cols-2       /* Large Mobile */
        md:grid-cols-3       /* Tablet */
        lg:grid-cols-5       /* Laptop */
        xl:grid-cols-6       /* Desktop */
      ">
        {data.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;

