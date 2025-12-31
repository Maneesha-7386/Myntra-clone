import { useNavigate } from "react-router-dom";
import { slugify } from "../../utils/slugs";

const MegaMenu = ({ data, categoryKey, closeMenu }) => {
  const navigate = useNavigate();
  // We don't need isLargeMenu check anymore as all "Mega" menus follow 5-col structure.
  // Unless for Beauty/Home which might be smaller. Usually Myntra keeps consistent structure.

  return (
    <div className="max-w-[1240px] mx-auto px-10 py-6 min-h-[400px]">
      <div className="grid grid-cols-5 gap-y-10 gap-x-12">
        {data.map((section, index) => (
          <div
            key={index}
            className="flex flex-col"
          >
            <h4
              className="font-bold text-[14px] leading mb-2 uppercase tracking-wide text-[#ee5f73]"
            >
              <button
                onClick={() => {
                  if (section.title.toLowerCase().includes("wear")) {
                    navigate(`/${categoryKey.toLowerCase()}?q=${section.title}`);
                  }
                  // Default behavior to just list items
                }}
                className="hover:text-[#ee5f73] cursor-default text-left"
              >
                {section.title}
              </button>
            </h4>

            <ul className="space-y-1">
              {section.items.map((item, idx) => {
                const slug = slugify(item);
                const handleClick = (e) => {
                  e.preventDefault();
                  const sectionPath = categoryKey === "HOME" ? "home-living" : categoryKey.toLowerCase();
                  navigate(`/${sectionPath}-${slug}`);
                  closeMenu();
                };

                return (
                  <li key={idx}>
                    <button
                      onClick={handleClick}
                      className="block w-full text-left text-[14px] text-gray-500 hover:text-black hover:font-bold py-0.5 leading-tight transition-all"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MegaMenu;
