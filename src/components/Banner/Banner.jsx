import { useNavigate } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const Banner = ({ type, data, height, fit = "cover", fullWidth = false }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`
        mt-[12px] mb-1
        ${fullWidth ? "px-0" : "px-3 md:px-6 lg:px-10"}
      `}
    >
      {type === "carousel" ? (
        <Carousel
          data={data || []}
          height={height}
          fit={fit}
          onItemClick={(item) => item?.link && navigate(item.link)}
        />
      ) : (
        <img
          src={data?.img}
          alt="banner"
          onClick={() => data?.link && navigate(data.link)}
          className={`w-full ${height} cursor-pointer ${
            fit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      )}
    </section>
  );
};

export default Banner;
