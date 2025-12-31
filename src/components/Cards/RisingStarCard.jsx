const RisingStarCard = ({ item }) => {
  return (
    <div className="relative rounded-2xl border-2 border-orange-400 overflow-hidden bg-white">

      {/* IMAGE WRAPPER */}
      <div className="w-full aspect-[3/4] bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* OFFER STRIP */}
      <div className="bg-red-500 text-white text-center py-3">
        <p className="text-xs line-through opacity-80">
          UNDER ₹{item.mrp}
        </p>
        <p className="text-lg font-bold">
          ₹{item.price}
        </p>
        <p className="text-sm">
          {item.title}
        </p>
      </div>

    </div>
  );
};

export default RisingStarCard;
