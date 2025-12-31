import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginBanner = "https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?auto=format&fit=crop&w=800&q=80";

const Login = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobileNumber.length === 10) {
            navigate('/');
        } else {
            setError('Please enter a valid 10-digit mobile number');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setMobileNumber(value);
            if (value.length === 10) setError('');
        }
    };

    return (
        <div className="bg-[#fdf0f1] min-h-[calc(100vh-80px)] md:py-12 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[400px] shadow-2xl rounded-sm overflow-hidden flex flex-col transition-all duration-300">

                {/* Banner */}
                <div className="w-full aspect-[4/3] bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img
                        src={loginBanner}
                        alt="Login Banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold text-[#424553] flex items-baseline gap-2 mb-8">
                        Login <span className="text-gray-400 font-normal text-sm md:text-lg">or</span> Signup
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                        <div className="relative mb-6">
                            <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden focus-within:border-[#ff3f6c] transition-all bg-white">
                                <span className="px-3 py-3 md:py-3.5 border-r border-gray-100 text-gray-500 font-medium text-sm md:text-base bg-gray-50">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    autoFocus
                                    value={mobileNumber}
                                    onChange={handleInputChange}
                                    className="flex-grow px-4 py-3 md:py-3.5 text-sm md:text-base font-semibold outline-none text-[#282c3f] tracking-widest placeholder:font-normal placeholder:tracking-normal"
                                    placeholder="Mobile Number*"
                                    autoComplete="tel"
                                    maxLength="10"
                                />
                            </div>
                            {error && <p className="text-[10px] md:text-xs text-red-500 mt-1 font-bold absolute">{error}</p>}
                        </div>

                        <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed mb-8">
                            By continuing, I agree to the <span className="text-[#ff3f6c] font-bold cursor-pointer hover:underline">Terms of Use</span> & <span className="text-[#ff3f6c] font-bold cursor-pointer hover:underline">Privacy Policy</span>
                        </p>

                        <button
                            type="submit"
                            disabled={mobileNumber.length !== 10}
                            className={`w-full py-3.5 md:py-4 font-bold rounded-sm shadow-md transition-all uppercase tracking-widest text-sm ${mobileNumber.length === 10
                                ? 'bg-[#ff3f6c] text-white active:scale-[0.98] hover:bg-[#ff527b]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs md:text-sm text-gray-500">
                            Have trouble logging in? <span className="text-[#ff3f6c] font-bold cursor-pointer hover:underline">Get help</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
