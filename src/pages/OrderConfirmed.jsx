import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Package, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const OrderConfirmed = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Ensure cart is cleared if arriving here
    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center font-assistant animate-fadeIn">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <ShieldCheck size={48} className="text-[#03a685]" />
            </div>

            <h2 className="text-2xl font-bold text-[#282c3f] mb-2 uppercase tracking-tight">Order Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-8">
                Thank you for shopping. Your order has been successfully placed.
            </p>

            <div className="bg-[#f5f5f6] p-6 rounded-lg w-full max-w-md mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full">
                        <Package className="text-[#ff3f6c]" size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-[#282c3f]">Estimated Delivery</p>
                        <p className="text-xs text-gray-500">By {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                    onClick={() => navigate('/orders')}
                    className="px-10 py-3 bg-[#ff3f6c] text-white font-bold rounded uppercase shadow-sm hover:bg-[#ff527b] transition-colors"
                >
                    View Orders
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-10 py-3 border border-gray-200 text-gray-600 font-bold rounded uppercase hover:bg-gray-50 transition-all"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmed;
