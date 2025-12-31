import Slider from "react-slick";
import ProductCard from "../ProductCard";

const CardsCarousel = ({ data = [], type = "normal" }) => {
  if (!data.length) return null;

  const settings = {
    arrows: false,        // Hide arrows on all devices
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    speed: 600,
    swipeToSlide: true,
    touchThreshold: 10,

    /* Default: Desktop (1536px+) */
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: true,

    responsive: [
      {
        /*  LAPTOP (1280px - 1536px) */
        breakpoint: 1536,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        /*  SMALL LAPTOP (1024px – 1280px) */
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        /*  TABLET (768px – 1024px) */
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        /*  LARGE MOBILE (640px – 768px) */
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        /*  MOBILE (0px – 640px) */
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
    ],

    customPaging: () => (
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300 transition-colors hover:bg-pink-400"></div>
    ),

    appendDots: dots => (
      <div className="mt-2 md:mt-4">
        {/* Sliced to show only first 3 dots if user insists, but scrollBY=6 usually fixes it. Only slicing if valid. */}
        <ul className="flex justify-center gap-1.5 md:gap-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="px-2 md:px-10 group relative">
      <Slider {...settings}>
        {data.map(item => (
          <div key={item.id} className="px-1.5 md:px-2 pb-6">
            <ProductCard product={item} />
          </div>
        ))}
      </Slider>

      {/* Custom styles for arrows if needed */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .slick-dots li.slick-active div { background-color: #ff3f6c !important; }

      `}} />
    </div>
  );
};

export default CardsCarousel;

