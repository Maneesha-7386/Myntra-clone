import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronRight, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const orders = useSelector((state) => state.orders.orders);

    const handleCardClick = (e, slug) => {
        e.preventDefault();
        e.stopPropagation();
        if (slug) navigate(`/${slug}`);
        else navigate('/');
    };

    return (
        <div className="bg-[#f5f5f6] min-h-screen py-10 px-4 md:px-10">
            <div className="max-w-[900px] mx-auto">
                <h1 className="text-base font-bold text-[#282C3F] mb-5 tracking-wide uppercase">All Orders</h1>

                <div className="space-y-4 mb-8">
                    {orders.map((order, idx) => (
                        <div
                            key={order.orderId || idx}
                            onClick={(e) => handleCardClick(e, order.slug)}
                            className="bg-white rounded shadow-sm border border-gray-100 p-4 flex gap-4 md:gap-6 hover:shadow transition-shadow cursor-pointer"
                        >
                            {/* Product Image */}
                            <div className="w-[80px] h-[105px] bg-[#f9f9f9] flex-shrink-0 relative">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="w-full h-full object-cover"
                                />
                                {order.quantity > 1 && (
                                    <span className="absolute top-0 right-0 bg-gray-600 text-white text-[10px] px-1.5 py-0.5 font-bold rounded-bl-sm">
                                        x{order.quantity}
                                    </span>
                                )}
                            </div>

                            {/* Order Info */}
                            <div className="flex-grow flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-sm font-bold text-[#282C3F] mb-1">{order.status || 'Placed'}</h3>
                                    <p className="text-[13px] text-gray-500 mb-2">
                                        {order.status === 'Delivered' ? 'Delivered on' : 'Arriving by'} {order.deliveryDate}
                                    </p>

                                    <div className="p-2 bg-gray-50 rounded border border-gray-100">
                                        <h4 className="text-xs font-bold text-[#282C3F] mb-0.5">{order.brand || 'Myntra Fashion'}</h4>
                                        <p className="text-xs text-gray-600 line-clamp-1 mb-1">{order.name}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <span>Size: <span className="font-bold text-[#282C3F]">{order.size || 'M'}</span></span>
                                            <span>Qty: <span className="font-bold text-[#282C3F]">{order.quantity || 1}</span></span>
                                        </div>
                                        <p className="text-sm font-bold text-[#282C3F] mt-1">₹{order.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chevron */}
                            <div className="flex items-center self-center">
                                <ChevronRight size={18} className="text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>

                {!orders.length && (
                    <div className="bg-white p-20 text-center flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg">
                        <Package size={48} className="text-gray-300 mb-4" />
                        <h2 className="text-lg font-bold text-[#282C3F] mb-2 uppercase tracking-wide">NO ORDERS FOUND</h2>
                        <p className="text-gray-500 text-sm mb-8">You haven't placed any orders yet.</p>
                        <Link to="/" className="px-8 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-lg uppercase">Shop Now</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
