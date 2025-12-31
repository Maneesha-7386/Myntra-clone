// src/components/Cards/TrendingCard.jsx
const TrendingCard = ({ item }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-3 text-center">
        <h4 className="font-semibold text-sm">{item.brand}</h4>
        <p className="text-xs text-gray-500">{item.title}</p>
        <p className="font-bold mt-1">
          ₹{item.price}
          <span className="line-through text-gray-400 ml-2 text-xs">
            ₹{item.mrp}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TrendingCard;
