import CardsCarousel from "../Cards/CardsCarousel";

const TrendingNow = ({ data }) => {
  return (
    <section className="px-10 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Trending Now
      </h2>

      <CardsCarousel data={data} />
    </section>
  );
};

export default TrendingNow;
