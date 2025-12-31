import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShieldCheck, CreditCard, Banknote, Smartphone } from 'lucide-react';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar';
import { placeOrder } from '../store/ordersSlice';

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedMode, setSelectedMode] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);

    // Calculate totals (reusing logic, ideally should be a selector)
    const totalAmount = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^\d]/g, '')) || 0;
        return acc + price * item.quantity;
    }, 0);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            dispatch(placeOrder(cartItems));
            setIsProcessing(false);
            navigate('/order-confirmed');
        }, 2000);
    };

    if (cartItems.length === 0) {
        navigate('/bag');
        return null; // Redirecting empty cart
    }

    return (
        <div className="bg-white min-h-screen">
            <CheckoutNavbar />

            <div className="max-w-[1000px] mx-auto py-10 px-4 md:px-10 flex flex-col lg:flex-row gap-8 font-assistant">
                {/* Left Side: Payment Options */}
                <div className="flex-grow">
                    <h1 className="text-lg font-bold text-[#282C3F] mb-6">Choose Payment Mode</h1>

                    <div className="border border-gray-200 rounded-md overflow-hidden">
                        {[
                            { id: 'cod', icon: <Banknote size={20} />, title: 'Cash On Delivery (Cash/UPI)' },
                            { id: 'card', icon: <CreditCard size={20} />, title: 'Credit/Debit Card' },
                            { id: 'upi', icon: <Smartphone size={20} />, title: 'PhonePe / Google Pay / UPI' },
                        ].map((mode) => (
                            <div
                                key={mode.id}
                                onClick={() => setSelectedMode(mode.id)}
                                className={`p-5 flex items-center gap-4 cursor-pointer border-b border-gray-100 transition-colors ${selectedMode === mode.id ? 'bg-[#f4fcf9]' : 'hover:bg-gray-50'}`}
                            >
                                <div className={`text-gray-500 ${selectedMode === mode.id ? 'text-[#03a685]' : ''}`}>
                                    {mode.icon}
                                </div>
                                <span className={`flex-grow font-bold text-sm ${selectedMode === mode.id ? 'text-[#03a685]' : 'text-[#282C3F]'}`}>
                                    {mode.title}
                                </span>
                                <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center ${selectedMode === mode.id ? 'border-[#03a685]' : ''}`}>
                                    {selectedMode === mode.id && <div className="w-2 h-2 rounded-full bg-[#03a685]" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Price Details */}
                <div className="w-full lg:w-[350px] flex-shrink-0">
                    <div className="p-4 border border-gray-100 rounded">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Price Details ({cartItems.length} Items)</h2>

                        <div className="space-y-3 text-sm text-[#424553]">
                            <div className="flex justify-between font-bold text-[#282c3f] text-base border-t pt-3 mt-3">
                                <span>Total Amount</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`w-full mt-6 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-lg uppercase tracking-wider hover:bg-[#ff527b] transition-all flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? 'Processing...' : `Pay Now`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
