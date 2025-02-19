import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReturnsOrders.css";

const ReturnsOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="returns-orders-container">
      <h2>Returns & Orders</h2>

      {/* Returns Section */}
      <div className="returns-section">
        <h3>Returns</h3>
        <p>
          Easily track your returns and process refunds for your purchases. If
          you're not satisfied, initiate a return within 30 days.
        </p>
        <button onClick={() => navigate("/returns")}>View Returns</button>
      </div>

      {/* Orders Section */}
      <div className="orders-section">
        <h3>Your Orders</h3>
        <p>
          Manage your orders, check statuses, track deliveries, and reorder
          your favorite items.
        </p>
        <button onClick={() => navigate("/orders")}>View Orders</button>
      </div>
    </div>
  );
};

export default ReturnsOrders;
