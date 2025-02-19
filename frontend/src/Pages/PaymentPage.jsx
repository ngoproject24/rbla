import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Fetch user name and address from state or set default values
  const userName = state?.fullName || "Guest User";
  const userAddress = state?.address || "No address provided";

  // State to manage the selected payment method
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showUpiApps, setShowUpiApps] = useState(false); // State to manage UPI apps visibility

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleContinueClick = () => {
    if (selectedPayment) {
      navigate("/payment-success"); // Example: Navigate to a success page
    } else {
      alert("Please select a payment method");
    }
  };

  const toggleUpiApps = () => {
    setShowUpiApps(!showUpiApps); // Toggle UPI apps visibility
  };

  return (
    <div className="payment-container">
      <div className="delivery-address">
        <h2>Delivering to {userName}</h2>
        <p>{userAddress}</p>
        <button className="change-address-btn">Change delivery address</button>
      </div>

      <div className="payment-methods">
        <h2>Select a payment method</h2>
        <div className="payment-options">
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Amazon Pay UP!"
                checked={selectedPayment === 'Amazon Pay UP!'}
                onChange={handlePaymentChange}
              />
              Amazon Pay UP!
            </label>
            <ul>
              <li>Cashback Carnival: Pay Now with Amazon Pay UP! and win flat cashback of ₹10</li>
              <li onClick={toggleUpiApps} style={{ cursor: 'pointer', color: '#3498db' }}>
                Other UP! Apps
              </li>
              {showUpiApps && (
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="PhonePe"
                        checked={selectedPayment === 'PhonePe'}
                        onChange={handlePaymentChange}
                      />
                      PhonePe
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Google Pay"
                        checked={selectedPayment === 'Google Pay'}
                        onChange={handlePaymentChange}
                      />
                      Google Pay
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Paytm"
                        checked={selectedPayment === 'Paytm'}
                        onChange={handlePaymentChange}
                      />
                      Paytm
                    </label>
                  </li>
                </ul>
              )}
            </ul>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Credit/Debit Card"
                checked={selectedPayment === 'Credit/Debit Card'}
                onChange={handlePaymentChange}
              />
              CREDIT & DEBIT CARDS
            </label>
            <button className="add-card-btn">Add a new credit or debit card</button>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Amazon Pay Balance"
                checked={selectedPayment === 'Amazon Pay Balance'}
                onChange={handlePaymentChange}
              />
              Pay Balance
            </label>
            <ul>
              <li>Available balance: ₹0.00</li>
              <li>Add money & get rewarded</li>
            </ul>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Net Banking"
                checked={selectedPayment === 'Net Banking'}
                onChange={handlePaymentChange}
              />
              Net Banking
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={selectedPayment === 'Cash on Delivery'}
                onChange={handlePaymentChange}
              />
              Cash on Delivery/Pay on Delivery
            </label>
            <p>Cash, UP! and Cards accepted. Know more.</p>
            <p>Convenience fee of ₹7 will apply. To avoid this fee, use any other payment method.</p>
          </div>
        </div>
      </div>

      <button className="continue-btn" onClick={handleContinueClick}>Continue</button>
    </div>
  );
};

export default PaymentPage;