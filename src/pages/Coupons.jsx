import React, { useState } from 'react';
import { Tag, Ticket } from 'lucide-react';

const Coupons = () => {
    const coupons = [
        {
            id: 1,
            code: "MYNTRA200",
            title: "₹200 Off on your first order",
            description: "Applicable on minimum purchase of ₹999. Valid for new users only.",
            expiry: "31 Jan 2026",
            status: "Active"
        },
        {
            id: 2,
            code: "FESTIVE500",
            title: "Flat ₹500 Off",
            description: "Extra ₹500 discount on selected Home & Living products.",
            expiry: "05 Jan 2026",
            status: "Active"
        }
    ];

    return (
        <div className="bg-[#f5f5f6] min-h-screen py-10 px-4 md:px-10 font-assistant">
            <div className="max-w-[800px] mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <Ticket className="text-[#ff3f6c]" size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-[#282C3F]">My Coupons</h1>
                </div>

                <div className="space-y-6">
                    {coupons.map((coupon) => (
                        <div key={coupon.id} className="relative bg-white p-6 rounded shadow-sm border-l-4 border-l-[#ff3f6c] overflow-hidden group">
                            {/* Decorative Cutouts for coupon look */}
                            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#f5f5f6] rounded-full -translate-y-1/2"></div>
                            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#f5f5f6] rounded-full -translate-y-1/2"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#fdf0f4] text-[#ff3f6c] text-xs font-bold px-2 py-1 rounded">
                                            {coupon.code}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            Expires: {coupon.expiry}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-[#282C3F] mb-1">{coupon.title}</h2>
                                    <p className="text-sm text-gray-500">{coupon.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(coupon.code);
                                            alert("Code Copied!");
                                        }}
                                        className="w-full md:w-auto px-6 py-2.5 bg-white border border-[#ff3f6c] text-[#ff3f6c] font-bold text-xs rounded hover:bg-[#ff3f6c] hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        Copy Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!coupons.length && (
                    <div className="bg-white p-20 text-center flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg">
                        <Tag size={48} className="text-gray-200 mb-4" />
                        <h2 className="text-lg font-bold text-[#282C3F] mb-2">NO COUPONS AVAILABLE</h2>
                        <p className="text-gray-500 text-sm">We'll notify you when we have new offers!</p>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
                .font-assistant {
                    font-family: 'Assistant', sans-serif !important;
                }
            `}} />
        </div>
    );
};

export default Coupons;
