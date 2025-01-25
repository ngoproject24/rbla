import React from 'react';
import './PlaceOrder.css';


const PlaceOrder = () => {
  const orderDetails = [
    { name: 'Product 1', quantity: 2, price: 100 },
    { name: 'Product 2', quantity: 1, price: 50 },
  ];

  const calculateTotal = () => {
    return orderDetails.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    // Add logic to navigate or process order
  };

  return (
    <div className="place-order-container">
      <h1>Place Your Order</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderDetails.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal()}</h3>
      </div>
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Address:</strong> 123 Main Street, City, State, ZIP
        </p>
        <p>
          <strong>Phone:</strong> +123 456 7890
        </p>
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
      
    </div>
  );
};

export default PlaceOrder;
