import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, MoreVertical } from 'lucide-react';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar';

const Addresses = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "John Doe",
            mobile: "9876543210",
            pincode: "560001",
            address: "123, 4th Main, HSR Layout, Sector 2",
            locality: "HSR Layout",
            city: "Bengaluru",
            state: "Karnataka",
            type: "Home",
            isDefault: true
        },
        {
            id: 2,
            name: "Work Office",
            mobile: "9123456780",
            pincode: "560102",
            address: "Tech Park, Outer Ring Road",
            locality: "Bellandur",
            city: "Bengaluru",
            state: "Karnataka",
            type: "Work",
            isDefault: false
        }
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', mobile: '', pincode: '', address: '', locality: '', city: '', state: '', type: 'Home'
    });

    const totalAmount = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^\d]/g, '')) || 0;
        return acc + price * item.quantity;
    }, 0);

    const handleAddNew = () => {
        setFormData({ name: '', mobile: '', pincode: '', address: '', locality: '', city: '', state: '', type: 'Home' });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (e, addr) => {
        e.stopPropagation();
        setFormData(addr);
        setEditingId(addr.id);
        setShowForm(true);
    };

    const handleRemove = (e, id) => {
        e.stopPropagation();
        const newAddresses = addresses.filter(a => a.id !== id);
        setAddresses(newAddresses);
        if (selectedAddressId === id && newAddresses.length > 0) {
            setSelectedAddressId(newAddresses[0].id);
        }
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        if (editingId) {
            setAddresses(addresses.map(a => a.id === editingId ? { ...formData, id: editingId } : a));
        } else {
            const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
            setAddresses([...addresses, { ...formData, id: newId, isDefault: addresses.length === 0 }]);
            if (addresses.length === 0) setSelectedAddressId(newId);
        }
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen font-assistant relative">
            <CheckoutNavbar />

            <div className="max-w-[1000px] mx-auto py-8 px-4 md:px-10 flex flex-col lg:flex-row gap-8">
                {/* Left: Address List */}
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg font-bold text-[#282C3F]">Select Delivery Address</h1>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-4 py-2 border border-[#282C3F] text-[#282C3F] text-xs font-bold rounded hover:bg-gray-50 uppercase"
                        >
                            <Plus size={16} /> ADD NEW ADDRESS
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="text-xs font-bold text-[#282C3F] mb-4">DEFAULT ADDRESS</div>

                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                onClick={() => setSelectedAddressId(addr.id)}
                                className={`p-6 rounded-md shadow-sm border relative cursor-pointer hover:shadow-md transition-shadow ${selectedAddressId === addr.id ? 'border-l-4 border-l-pink-500 border-gray-200 bg-white' : 'border-gray-100 bg-white'}`}
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${selectedAddressId === addr.id ? 'border-pink-500' : 'border-gray-300'}`}>
                                        {selectedAddressId === addr.id && <div className="w-2 h-2 rounded-full bg-pink-500" />}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm font-bold text-[#282C3F]">{addr.name}</span>
                                            <span className="bg-gray-100 text-[10px] text-gray-500 font-bold px-1.5 py-0.5 rounded uppercase">{addr.type}</span>
                                        </div>
                                        <div className="text-sm text-[#424553] space-y-1">
                                            <p>{addr.address}</p>
                                            <p>{addr.locality}, {addr.city} - {addr.pincode}</p>
                                            <p>{addr.state}</p>
                                            <p className="mt-2"><span className="text-gray-500">Mobile:</span> <span className="font-bold text-[#282C3F]">{addr.mobile}</span></p>
                                        </div>

                                        {selectedAddressId === addr.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 animation-fadeIn">
                                                <button onClick={(e) => handleRemove(e, addr.id)} className="text-xs font-bold text-[#ff3f6c] uppercase hover:underline">Remove</button>
                                                <button onClick={(e) => handleEdit(e, addr)} className="ml-4 text-xs font-bold text-[#282C3F] uppercase hover:underline">Edit</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {addresses.length === 0 && <p className="text-gray-500 text-sm">No addresses saved. Please add one.</p>}
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="w-full lg:w-[350px] flex-shrink-0">
                    <div className="p-4 border border-gray-100 rounded">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Price Details ({cartItems.length} Items)</h2>
                        <div className="flex justify-between font-bold text-[#282c3f] text-base border-t pt-3 mt-3">
                            <span>Total Amount</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <button
                            onClick={() => navigate('/payment')}
                            disabled={addresses.length === 0}
                            className={`w-full mt-6 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow-lg uppercase tracking-wider hover:bg-[#ff527b] transition-all ${addresses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="font-bold text-[#282C3F] uppercase">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                            <button onClick={() => setShowForm(false)} className="text-2xl leading-none">&times;</button>
                        </div>
                        <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
                            <input required name="name" value={formData.name} onChange={handleChange} placeholder="Name*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                            <input required name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                            <div className="flex gap-4">
                                <input required name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pin Code*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                                <input required name="state" value={formData.state} onChange={handleChange} placeholder="State*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                            </div>
                            <input required name="address" value={formData.address} onChange={handleChange} placeholder="Address (House No, Building, Street)*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                            <div className="flex gap-4">
                                <input required name="locality" value={formData.locality} onChange={handleChange} placeholder="Locality/Town*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                                <input required name="city" value={formData.city} onChange={handleChange} placeholder="City/District*" className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:border-black" />
                            </div>

                            <div className="pt-2">
                                <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Type of Address</p>
                                <div className="flex gap-4">
                                    {['Home', 'Work'].map(type => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={type}
                                                checked={formData.type === type}
                                                onChange={handleChange}
                                                className="accent-[#ff3f6c]"
                                            />
                                            <span className="text-sm text-[#282C3F]">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-[#ff3f6c] text-white font-bold py-3 rounded uppercase hover:bg-[#ff527b] transition-colors">
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addresses;
