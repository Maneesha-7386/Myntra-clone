import CardsCarousel from "../Cards/CardsCarousel";

const RisingStars = ({ data }) => {
  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold mb-6">
        RISING STARS
      </h2>

      <CardsCarousel data={data} type="rising" />
    </section>
  );
};

export default RisingStars;
