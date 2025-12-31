import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { X, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar';

const Bag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const bagItems = cartItems; // Alias for UI logic
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = React.useState(false);

    // Helper to parse price strings like "Rs. 999" or numbers
    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        return parseInt(String(price).replace(/[^\d]/g, '')) || 0;
    };

    const totalMRP = bagItems.reduce((acc, item) => {
        const p = parsePrice(item.mrp || item.price);
        return acc + p * item.quantity;
    }, 0);

    const totalAmount = bagItems.reduce((acc, item) => {
        const p = parsePrice(item.price);
        return acc + p * item.quantity;
    }, 0);

    const totalDiscount = totalMRP - totalAmount;

    const handlePlaceOrder = () => {
        navigate('/addresses');
    };

    if (bagItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center font-assistant">
                <img
                    src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png"
                    alt="Empty Bag"
                    className="w-40 mb-6"
                />
                <h2 className="text-xl font-bold text-[#282c3f] mb-1 uppercase tracking-tight">Hey, it feels so light!</h2>
                <p className="text-gray-400 text-sm mb-8">There is nothing in your bag. Let's add some items.</p>
                <Link
                    to="/wishlist"
                    className="px-10 py-3 border border-[#ff3f6c] text-[#ff3f6c] font-bold rounded uppercase hover:bg-[#ff3f6c] hover:text-white transition-all shadow-sm"
                >
                    Add from Wishlist
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-assistant">
            <CheckoutNavbar />

            <div className="max-w-[1000px] mx-auto py-10 px-4 md:px-10 flex flex-col lg:flex-row gap-10">

                {/* Left Side: Items */}
                <div className="flex-grow space-y-4">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <h1 className="text-lg font-bold text-[#282c3f]">Check Details ({bagItems.length} Items)</h1>
                    </div>

                    <div className="bg-[#fdf0f4] p-4 rounded flex items-center gap-3 text-xs text-[#282c3f] border border-pink-100">
                        <Truck size={16} />
                        <span>Get free delivery on your first order!</span>
                    </div>

                    <div className="space-y-4">
                        {bagItems.map((item) => (
                            <div key={item.id} className="relative border border-gray-200 rounded p-4 flex gap-4">
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="absolute right-4 top-4 text-gray-400 hover:text-black"
                                >
                                    <X size={18} />
                                </button>

                                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-50 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                </div>

                                <div className="flex-grow pt-2">
                                    <h3 className="font-bold text-[#282c3f] text-sm md:text-base">{item.brand}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm mb-4">{item.name}</p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-bold text-[#282c3f]">
                                            Qty:
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => dispatch(updateQuantity({ id: item.id, qty: parseInt(e.target.value) }))}
                                                className="bg-transparent outline-none cursor-pointer"
                                            >
                                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-2">
                                        <span className="font-bold text-[#282c3f]">₹{parsePrice(item.price) * item.quantity}</span>
                                        <span className="text-xs text-gray-400 line-through italic font-normal">₹{parsePrice(item.mrp || item.price) * item.quantity}</span>
                                        <span className="text-[10px] text-[#ff905a] font-bold">({item.discount}% OFF)</span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-[10px] text-green-600 font-bold">
                                        <RefreshCcw size={12} />
                                        <span>14 days return available</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Price Summary */}
                <div className="w-full lg:w-[350px] flex-shrink-0">
                    <div className="p-4 border border-gray-100 rounded">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Price Details ({bagItems.length} Items)</h2>

                        <div className="space-y-3 text-sm text-[#424553]">
                            <div className="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹{totalMRP}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount on MRP</span>
                                <span className="text-[#03a685]">-₹{totalDiscount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Coupon Discount</span>
                                <span className="text-[#ff3f6c] cursor-pointer font-bold">Apply Coupon</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Platform Fee</span>
                                <span className="text-[#03a685]">FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span className="text-[#03a685]">FREE</span>
                            </div>

                            <div className="border-t pt-3 flex justify-between font-bold text-[#282c3f] text-base">
                                <span>Total Amount</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className={`w-full mt-6 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-lg uppercase tracking-wider hover:bg-[#ff527b] transition-all flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    PROCESSING...
                                </>
                            ) : 'Place Order'}
                        </button>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase">
                            <ShieldCheck size={18} className="text-gray-400" />
                            100% SECURE PAYMENTS
                        </div>
                        <div className="text-[10px] text-gray-400 leading-relaxed">
                            By continuing, you agree to our Terms of Use and Privacy Policy. You also agree to share your shipping and contact information with the merchant.
                        </div>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        .font-assistant { font-family: 'Assistant', sans-serif !important; }
      `}} />
        </div>
    );
};

export default Bag;
