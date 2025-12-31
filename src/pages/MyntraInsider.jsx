import React from 'react';
import { Award, Zap, Gift, ShieldCheck } from 'lucide-react';

const MyntraInsider = () => {
    return (
        <div className="bg-[#282C3F] min-h-screen font-assistant text-white">
            {/* Hero Section */}
            <div className="relative pt-16 pb-24 px-6 md:px-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <Award size={400} />
                </div>

                <div className="max-w-[1200px] mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="text-[#ff3f6c]" size={32} />
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Myntra <span className="text-[#ff3f6c]">Insider</span></h1>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-light mb-8 max-w-2xl leading-tight">
                        Elevate your shopping experience with <br />
                        <span className="font-bold underline decoration-[#ff3f6c] underline-offset-8">exclusive benefits.</span>
                    </h2>

                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 inline-block">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Available Points</p>
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-bold">450</span>
                            <span className="text-[#ff3f6c] text-sm font-bold flex items-center gap-1">
                                <Zap size={14} fill="#ff3f6c" />
                                SuperCoins
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="bg-white text-[#282C3F] py-20 px-6 md:px-20">
                <div className="max-w-[1200px] mx-auto text-center mb-16">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-widest">Insider Perks</h3>
                    <p className="text-gray-500">The more you shop, the better it gets.</p>
                </div>

                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <Gift className="text-[#ff3f6c]" size={40} />,
                            title: "Exclusive Offers",
                            desc: "Early access to sales and member-only discounts on top brands."
                        },
                        {
                            icon: <ShieldCheck className="text-[#ff3f6c]" size={40} />,
                            title: "Priority Shipping",
                            desc: "Get your favorite styles delivered faster than everyone else."
                        },
                        {
                            icon: <Award className="text-[#ff3f6c]" size={40} />,
                            title: "Early Access",
                            desc: "Be the first to shop new launches and limited collections."
                        }
                    ].map((benefit, idx) => (
                        <div key={idx} className="p-8 border border-gray-100 rounded-xl hover:shadow-xl transition-all cursor-crosshair">
                            <div className="mb-6">{benefit.icon}</div>
                            <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                        </div>
                    ))}
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

export default MyntraInsider;
