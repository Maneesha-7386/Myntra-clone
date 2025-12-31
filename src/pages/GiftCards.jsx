import React from 'react';
import { Gift, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';

const GiftCards = () => {
    return (
        <div className="bg-[#f5f5f6] min-h-screen py-10 px-4 md:px-10 font-assistant">
            <div className="max-w-[1000px] mx-auto">
                <h1 className="text-xl font-bold text-[#282C3F] mb-10">Gift Cards</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left: Purchase Section */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#fdf0f4] rounded-full">
                                <Gift className="text-[#ff3f6c]" size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-[#282C3F]">Buy a Gift Card</h2>
                        </div>

                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                            Perfect for birthdays, weddings or just to say thank you!
                        </p>

                        <div className="space-y-4">
                            <button className="w-full p-4 border border-gray-200 rounded text-left flex justify-between items-center group hover:border-[#ff3f6c] transition-all">
                                <span className="text-sm font-bold text-[#282C3F]">Email Gift Card</span>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-[#ff3f6c]" />
                            </button>
                            <button className="w-full p-4 border border-gray-200 rounded text-left flex justify-between items-center group hover:border-[#ff3f6c] transition-all">
                                <span className="text-sm font-bold text-[#282C3F]">Physical Gift Card</span>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-[#ff3f6c]" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Manage Section */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gray-50 rounded-full">
                                <CreditCard className="text-gray-600" size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-[#282C3F]">Check Balance</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gift Card Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter 16 digit number"
                                    className="w-full p-3 bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-200 outline-none text-sm transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gift Card Pin</label>
                                <input
                                    type="password"
                                    placeholder="Enter 6 digit pin"
                                    className="w-full p-3 bg-[#f9f9f9] border border-transparent focus:bg-white focus:border-gray-200 outline-none text-sm transition-all"
                                />
                            </div>
                            <button className="w-full py-4 bg-[#282C3F] text-white font-bold text-sm rounded shadow-lg uppercase tracking-widest hover:bg-black transition-all">
                                Check Balance
                            </button>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16 text-center">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">How it works</h3>
                    <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
                        <div className="flex flex-col items-center">
                            <Gift className="text-gray-300 mb-2" size={32} />
                            <p className="text-xs text-gray-500">Pick a design</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-px bg-gray-200 mt-4 hidden md:block" />
                        </div>
                        <div className="flex flex-col items-center">
                            <ShoppingBag className="text-gray-300 mb-2" size={32} />
                            <p className="text-xs text-gray-500">Personalize & Buy</p>
                        </div>
                    </div>
                </div>
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

export default GiftCards;
