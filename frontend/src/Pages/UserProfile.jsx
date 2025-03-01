import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, ShoppingCart, MapPin, Heart, LogOut ,Trash2} from "lucide-react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const [editIndex, setEditIndex] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    landmark: "",
    country: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/address/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await response.json();
        if (response.ok) {
          setUserData({
            name: data.name,
            email: data.email
          });
          setAddresses(data.addresses || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = ['street', 'city', 'state', 'pincode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setNotification({
        message: `Missing required fields: ${missingFields.join(', ')}`,
        type: "error",
        visible: true
      });
      return false;
    }
    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      let response;
      if (editIndex !== null) {
        const addressId = addresses[editIndex]?._id;
        response = await fetch(`http://localhost:4000/api/address/update-address/${addressId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch("http://localhost:4000/api/address/add-address", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();
      if (response.ok) {
        setAddresses(data.user.address);
        setNotification({
          message: editIndex !== null ? "Address updated!" : "Address added!",
          type: "success",
          visible: true
        });
        if (!editIndex) {
          setFormData({
            street: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            landmark: "",
            country: ""
          });
        }
        setEditIndex(null);
      }
    } catch (error) {
      setNotification({
        message: "Operation failed. Please try again.",
        type: "error",
        visible: true
      });
    }
  };
const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:4000/api/address/delete-address/${addressId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAddresses(data.user.address);
        setNotification({ message: "Address deleted successfully!", type: "success", visible: true });
      }
    } catch (error) {
      setNotification({ message: "Failed to delete address. Please try again.", type: "error", visible: true });
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar - Restored original structure */}
      <aside className="w-full md:w-64 p-6 border-r">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 mb-6">
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center justify-start gap-2 p-2">
              <User className="w-4 h-4 text-pink-500" />
              Personal Information
            </button>
            <Link to="/MyOrders" className="w-full flex items-center justify-start gap-2 p-2">
              <ShoppingCart className="w-4 h-4" />
              My Orders
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
              onClick={() => navigate("/payment")}
              className="w-full flex items-center justify-start gap-2 p-2 text-blue-500"
            >
              Go to Payment Page
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("auth_token");
                navigate("/");
              }}
              className="w-full flex items-center justify-start gap-2 p-2 text-red-500 hover:text-red-600"
            >
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
          {notification.visible && (
            <div className={`mb-4 p-3 rounded ${notification.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {notification.message}
            </div>
          )}
          
          <div className="space-y-6">
            {/* Personal Info Section */}
            <div className="form-container">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={userData.name} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={userData.email} readOnly />
              </div>
            </div>

            {/* Address Form */}
            <div className="form-container">
              <div className="form-group">
                <label>Street</label>
                <input type="text" name="street" value={formData.street} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Landmark</label>
                <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} />
              </div>
            </div>

            <button 
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleSaveAddress}
            >
              {editIndex !== null ? "Update Address" : "Save New Address"}
            </button>

            {/* Address List */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
              {addresses.map((address, index) => (
                <div key={index} className="border p-4 mb-4 rounded-md">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.pincode}</p>
                  <p>{address.country}</p>
                  <p>Phone: {address.phone}</p>
                  <div className="mt-2">
                    <button
                      className="text-blue-500 mr-4"
                      onClick={() => {
                        setFormData(address);
                        setEditIndex(index);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteAddress(address._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}