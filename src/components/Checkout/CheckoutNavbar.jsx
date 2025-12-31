import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const CheckoutNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const steps = [
        { name: 'BAG', path: '/bag' },
        { name: 'ADDRESS', path: '/addresses' },
        { name: 'PAYMENT', path: '/payment' },
    ];

    const getStepStatus = (stepPath) => {
        const stepOrder = ['/bag', '/addresses', '/payment'];
        const currentIndex = stepOrder.indexOf(currentPath);
        const stepIndex = stepOrder.indexOf(stepPath);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'inactive';
    };

    return (
        <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-50">
            {/* Logo */}
            <Link to="/">
                <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-myntra-2709168-2249158.png"
                    alt="Myntra Logo"
                    className="h-10 w-10 object-contain"
                />
            </Link>

            {/* Steps - Central */}
            <div className="hidden md:flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-gray-400">
                {steps.map((step, idx) => {
                    const status = getStepStatus(step.path);
                    return (
                        <div key={step.name} className="flex items-center gap-4">
                            <span className={`
                                ${status === 'active' ? 'text-black border-b-2 border-[#20bd99] pb-0.5' : ''}
                                ${status === 'completed' ? 'text-[#20bd99]' : ''}
                            `}>
                                {step.name}
                            </span>
                            {idx < steps.length - 1 && <div className="h-[1px] w-12 bg-gray-300 border-t border-dashed" />}
                        </div>
                    );
                })}
            </div>

            {/* Secure Badge */}
            <div className="flex items-center gap-2 text-[#20bd99] uppercase text-xs font-bold tracking-widest">
                <ShieldCheck size={24} />
                <span className="hidden sm:inline">100% SECURE</span>
            </div>
        </div>
    );
};

export default CheckoutNavbar;
