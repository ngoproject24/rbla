import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, ShoppingCart, MapPin, Heart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {}; // Ensure location is not undefined

  const {
    fullName = "",
    email = "",
    phone = "",
    country = "",
    address = "",
    pincode = "",
    city = "",
  } = state || {}; // Ensure state is not undefined

  // Function to navigate to Payment Page with address data
  const goToPaymentPage = () => {
    navigate("/payment", { state: { address } });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 p-6 border-r">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 mb-6">
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center justify-start gap-2 p-2 bg-transparent border-none cursor-pointer">
              <User className="w-4 h-4 text-pink-500" />
              Personal Information
            </button>
            <Link to="/MyOrders" className="w-full flex items-center justify-start gap-2 p-2">
              <ShoppingCart className="w-4 h-4" />
              My Order
            </Link>
            <Link to="/UpdateLocation" className="w-full flex items-center justify-start gap-2 p-2">
              <MapPin className="w-4 h-4" />
              My Addresses
            </Link>
            <Link to="/wishlist" className="w-full flex items-center justify-start gap-2 p-2">
              <Heart className="w-4 h-4" />
              My Wishlist
            </Link>
            <button
              className="w-full flex items-center justify-start gap-2 p-2 bg-transparent border-none cursor-pointer text-blue-500"
              onClick={goToPaymentPage}
            >
              Go to Payment Page
            </button>
            <button className="w-full flex items-center justify-start gap-2 p-2 text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
          <div className="space-y-6">
            <div className="form-container">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={fullName} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} readOnly />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={phone} readOnly />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={address} readOnly />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" value={city} readOnly />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" value={pincode} readOnly />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" value={country} readOnly />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
