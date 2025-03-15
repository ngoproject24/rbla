import React, { useState, useEffect } from 'react';
import "./AdmineOrder.css";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import Sidebar from '../Sidebar/Sidebar';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [editOrder, setEditOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setErrorMessage('No token found. Please log in.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:4000/admin/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setErrorMessage('Error fetching orders: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      const updatedOrder = await response.json();
      setOrders(orders.map((order) => (order._id === orderId ? updatedOrder : order)));
    } catch (err) {
      setErrorMessage('Error updating order status: ' + err.message);
    }
  };

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      setErrorMessage('Error deleting order: ' + err.message);
    }
  };

  const handleViewDetails = async (orderId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/admin/orders/${orderId}/details`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch order details');
      const orderDetails = await response.json();
      setViewOrder(orderDetails);
    } catch (err) {
      setErrorMessage('Error fetching order details: ' + err.message);
    }
  };

  const closeViewModal = () => setViewOrder(null);

  return (
    <div className="admin-layout">
      <Sidebar/>
      <div className="admin-container">
        <h1 className="admin-title">Order Management</h1>
        {loading ? (
          <div className="loading-container">
            <ThreeDots color="#0047FF" height={50} width={50} />
          </div>
        ) : (
          <>
            {errorMessage && <p className="error-text">{errorMessage}</p>}
            <div className="table-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.userid?.name || 'Unknown User'}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        <select
                          className="status-dropdown"
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" onClick={() => handleDelete(order._id)}>
                            <FaTrash className="trash-icon" />
                          </button>
                          <button className="icon-btn" onClick={() => handleViewDetails(order._id)}>
                            <FaEye className="view-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {viewOrder && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={closeViewModal}>X</button>
            </div>
            <div className="modal-body">
              <p><strong>Order ID:</strong> {viewOrder._id}</p>
              <p><strong>User:</strong> {viewOrder.userid?.name || 'Unknown User'} ({viewOrder.userid?.email || 'N/A'})</p>
              <p><strong>Status:</strong> {viewOrder.orderStatus}</p>
              <p><strong>Total Price:</strong> ${viewOrder.totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
