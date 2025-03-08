import React from "react";
import "./ShippingMethod.css";
import OrderSummary from "../Components/ordersummary/OrderSummary";

const ShippingMethod = () => {
  return (
    <div className="shipping-method">
        <OrderSummary/>
      <h3>Shipping method</h3>
      <div className="shipping-box">
        <p>Enter your shipping address to view available shipping methods.</p>
      </div>
    </div>
  );
};

export default ShippingMethod;
