import React, { useState, useEffect } from 'react';
import './ReviewList.css';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [editReview, setEditReview] = useState(null);
  const [viewReview, setViewReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const fetchReviews = async () => {
    let url = 'http://localhost:4000/api/review';
    if (statusFilter !== 'all') {
      url = `http://localhost:4000/api/review/status/${statusFilter}`;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorMessage('Error fetching reviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setErrorMessage('No token found. Please log in.');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/review/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
    } catch (err) {
      setErrorMessage('Error deleting review: ' + err.message);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!editReview) return;

    const updatedReviewData = { ...editReview, status: !editReview.status };

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setErrorMessage('No token found. Please log in.');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/review/${editReview._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: updatedReviewData.status,
          reviewText: updatedReviewData.reviewText,
          rating: updatedReviewData.rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update review status');
      }

      const updatedReview = await response.json();
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        )
      );

      closeEditModal();
    } catch (err) {
      setErrorMessage('Error updating review: ' + err.message);
    }
  };

  const openEditModal = (review) => setEditReview(review);
  const closeEditModal = () => setEditReview(null);
  const openViewModal = (review) => setViewReview(review);
  const closeViewModal = () => setViewReview(null);

  return (
    <div className="admin-layout">
      <Sidebar/>
      <div className="admin-container">
        <h1 className="admin-title">Review Management</h1>
        {loading ? (
          <div className="loading-container">
            <ThreeDots color="#0047FF" height={50} width={50} />
          </div>
        ) : (
          <>
            {errorMessage && <p className="error-text">{errorMessage}</p>}
            <div className="status-filter">
              <button onClick={() => setStatusFilter('all')}>All</button>
              <button onClick={() => setStatusFilter('true')}>Active</button>
              <button onClick={() => setStatusFilter('false')}>Inactive</button>
            </div>
            <div className="table-container">
              <table className="review-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Product</th>
                    <th>Review</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.userid?.email || 'Unknown'}</td>
                      <td>{review.productid}</td>
                      <td>{review.reviewText}</td>
                      <td>{review.rating}</td>
                      <td>{review.status ? 'Active' : 'Inactive'}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" onClick={() => openEditModal(review)}>
                            <FaEdit className="edit-icon" />
                          </button>
                          <button className="icon-btn" onClick={() => handleDelete(review._id)}>
                            <FaTrash className="trash-icon" />
                          </button>
                          <button className="icon-btn" onClick={() => openViewModal(review)}>
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
    </div>
  );
};

export default ReviewList;
