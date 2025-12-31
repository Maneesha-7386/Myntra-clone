import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineAssignmentReturn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#FAFBFC] text-sm text-gray-700 mt-20">

      {/*  TOP MAIN FOOTER */}
      <div className="max-w-[1300px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/*  ONLINE SHOPPING */}
        <div>
          <h3 className="font-bold mb-4 text-black">ONLINE SHOPPING</h3>
          <ul className="space-y-2">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home</li>
            <li>Beauty</li>
            <li>Genz</li>
            <li>Gift Cards</li>
            <li>Myntra Insider</li>
          </ul>

          <h3 className="font-bold mt-6 mb-3 text-black">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Careers</li>
            <li>Site Map</li>
            <li>Corporate Information</li>
            <li>Whitehat</li>
            <li>Cleartrip</li>
            <li>Myntra Global</li>
          </ul>
        </div>

        {/*  CUSTOMER POLICIES */}
        <div>
          <h3 className="font-bold mb-4 text-black">CUSTOMER POLICIES</h3>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&C</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Privacy policy</li>
            <li>Grievance Redressal</li>
            <li>FSSAI Food Safety</li>
            <li>Connect app</li>
          </ul>
        </div>

        {/*  APP + SOCIAL */}
        <div>
          <h3 className="font-bold mb-4 text-black">
            EXPERIENCE MYNTRA APP ON MOBILE
          </h3>

          <div className="flex gap-3 mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-9"
            />

            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-9"
            />
          </div>

          <h3 className="font-bold mb-3 text-black">KEEP IN TOUCH</h3>

          {/*  ASH COLOR MYNTRA STYLE ICONS */}
          <div className="flex gap-6 items-center mt-2 text-gray-500 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaTwitter className="cursor-pointer hover:text-black" />
            <FaYoutube className="cursor-pointer hover:text-black" />
            <FaInstagram className="cursor-pointer hover:text-black" />
          </div>
        </div>

        {/*  ORIGINAL + RETURN (ASH ICON STYLE) */}
        <div className="space-y-8">

          {/*  100% ORIGINAL */}
          <div className="flex items-start gap-4">
            <RiVerifiedBadgeLine className="text-4xl text-gray-400" />
            <p className="text-gray-700">
              <span className="font-bold text-black">100% ORIGINAL</span> guarantee
              for all products at myntra.com
            </p>
          </div>

          {/*  14 DAYS RETURN */}
          <div className="flex items-start gap-4">
            <MdOutlineAssignmentReturn className="text-4xl text-gray-400" />
            <p className="text-gray-700">
              <span className="font-bold text-black">Return within 14 days</span> of
              receiving your order
            </p>
          </div>

        </div>
      </div>

      {/*  POPULAR SEARCHES */}
      <div className="max-w-[1300px] mx-auto px-6 border-t pt-8">
        <h3 className="font-bold text-black mb-4">POPULAR SEARCHES</h3>

        <p className="text-[13px] leading-6 text-gray-600">
          Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | 
          Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes |
          Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis |
          Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings |
          Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits |
          Bikini | Myntra Fashion Show | Lipstick | Saree | Watches | Dresses |
          Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes | Adidas Shoes |
          Woodland Shoes | Jewellery | Designers Sarees
        </p>
      </div>

      {/*  CONTACT + COPYRIGHT */}
      <div className="max-w-[1300px] mx-auto px-6 py-6  mt-8 flex flex-col md:flex-row justify-between gap-4 text-gray-600">
        <p>
          In case of any concern,{" "}
          <span className="text-blue-500 font-semibold cursor-pointer">
            Contact Us
          </span>
        </p>

        <p>© 2025 Myntra Clone by Maneesha. All rights reserved.</p>

        <p>Educational Project</p>
      </div>

      {/*  REGISTERED ADDRESS */}
      <div className="max-w-[1300px] mx-auto px-6 py-8 border-t text-gray-600 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-black mb-3">Registered Office Address</h3>
          <p>
            Buildings Alyssa, <br />
            Begonia and Clover situated in Embassy Tech Village, <br />
            Outer Ring Road, <br />
            Devarabeesanahalli Village, <br />
            Varthur Hobli, <br />
            Bengaluru – 560103, India
          </p>
        </div>

        <div className="md:text-right">
          <p>CIN: U72300KA2007PTC****</p>
          <p className="mt-2">
            Telephone:{" "}
            <span className="text-blue-500 font-semibold">
              +91-80-615*****
            </span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
