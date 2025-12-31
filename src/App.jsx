import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Beauty from "./pages/Beauty";
import Genz from "./pages/Genz";

import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import ListingPage from "./pages/ListingPage";
import HomeLiving from "./pages/HomeLiving";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Coupons from "./pages/Coupons";
import Addresses from "./pages/Addresses";
import MyntraInsider from "./pages/MyntraInsider";
import GiftCards from "./pages/GiftCards";
import Bag from "./pages/Bag";
import Payment from "./pages/Payment";
import OrderConfirmed from "./pages/OrderConfirmed";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/bag', '/addresses', '/payment', '/order-confirmed'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/insider" element={<MyntraInsider />} />

        {/* Dynamic Category Route - MUST BE LAST */}
        <Route path="/:categorySlug" element={<ListingPage />} />

        {/* Fallback to home for unknown routes */}
        <Route path="*" element={<Home />} />
      </Routes>

      {!shouldHideNavbar && <Footer />}
    </>
  );
}

export default App;
