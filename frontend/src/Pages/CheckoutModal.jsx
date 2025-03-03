import React, { useState } from "react";
import "./CheckoutModal.css";

const CheckoutModal = ({ cart, calculateTotal, handleCheckoutSuccess, setError }) => {
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    const orderData = {
      items: cart.map((item) => ({
        productid: item.productid,
        quantity: item.quantity,
        price: item.new_price,
      })),
      shippingAddress,
      paymentMethod,
      totalPrice: calculateTotal(),
      userEmail: localStorage.getItem("user_email"),
    };

    const accessToken = localStorage.getItem("auth_token");

    try {
      const response = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        handleCheckoutSuccess(result.message);
        setIsOpen(false);
      } else {
        setError(result.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setError("Network error, please try again.");
    }
  };

  return (
    <>
      <button className="checkout-btn" onClick={() => setIsOpen(true)}>
        Check out
      </button>

      {isOpen && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <div className="modal-header">
              <h2>Checkout</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
            </div>

            <div className="modal-content">
              <div className="left-section">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="right-section">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
            </div>

            <button className="submit-checkout-btn" onClick={handleCheckout}>
              Submit Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutModal;
