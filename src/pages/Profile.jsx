import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Orders", desc: "Check your order status", path: "/orders" },
    { title: "Collections & Wishlist", desc: "All your curated product collections", path: "/wishlist" },
    { title: "Myntra Credit", desc: "Manage your refunds and gift cards", path: "/gift-cards" },
    { title: "MynCash", desc: "Earn MynCash and save on your purchase", path: "/insider" },
    { title: "Saved Cards", desc: "Save your cards for faster checkout", path: "/payment" },
    { title: "Saved VPA", desc: "View your saved VPA", path: "/payment" },
    { title: "Addresses", desc: "Save addresses for a hassle-free checkout", path: "/addresses" },
    { title: "Coupons", desc: "Manage coupons for additional discounts", path: "/coupons" },
    { title: "Profile Details", desc: "Change your profile details & password", path: "/login" },
  ];

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <div className="border-b pb-8 mb-8">
          <h1 className="text-2xl font-bold text-[#282C3F] mb-2 uppercase">Account</h1>
          <p className="text-[#3e4152]">Manage your profile and account settings</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
          {sections.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="p-6 border-b md:border-b-0 md:border-r border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <h3 className="text-sm font-bold text-[#282C3F] mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-[#ff3f6c] text-white font-bold rounded shadow hover:bg-[#ff527b] uppercase"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile