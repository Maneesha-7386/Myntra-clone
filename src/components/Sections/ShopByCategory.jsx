// src/components/Sections/ShopByCategory.jsx
import CardsGrid from "../Cards/CardsGrid";

const ShopByCategory = ({ title, data }) => {
  if (!data?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-center text-xl font-semibold mb-8">
        {title}
      </h2>

      <CardsGrid data={data} />
    </section>
  );
};

export default ShopByCategory;
