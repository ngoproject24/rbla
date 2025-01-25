import React, { useState } from "react";
import "./Checkout.css"; // Import the CSS file


const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [cart] = useState([
    { id: 1, name: "Towel 1", quantity: 2, price: 20 },
    { id: 2, name: "Towel 2", quantity: 1, price: 15 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("Order Placed:", formData, cart);
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        {/* Order Summary Section */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal()}</h3>
        </div>

        {/* Shipping Details Section */}
        <form className="checkout-form" onSubmit={handleCheckout}>
          <h2>Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <button type="submit" className="checkout-btn" onClick={'/PlaceOrder'}>
            Place Order
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Checkout;
