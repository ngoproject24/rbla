import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders data from API or mock data
    const fetchedOrders = [
      {
        orderId: 'ORD123',
        date: '2025-02-01',
        status: 'Shipped',
        totalAmount: 59.99,
      },
      {
        orderId: 'ORD124',
        date: '2025-01-15',
        status: 'Delivered',
        totalAmount: 89.49,
      },
      {
        orderId: 'ORD125',
        date: '2025-02-03',
        status: 'Pending',
        totalAmount: 120.00,
      },
    ];

    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-item">
            <h3>Order ID: {order.orderId}</h3>
            <p>Date: {order.date}</p>
            <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
