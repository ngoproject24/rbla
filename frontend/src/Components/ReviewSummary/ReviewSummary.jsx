import React, { useEffect, useState } from "react";
import "./ReviewSummary.css";

const ReviewSummary = ({ productId, userToken }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

 // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:4000/review/${productId}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to fetch reviews");

      setReviews(data.reviews || []);
      setAverageRating(Number(data.reviewStats?.averageRating) || 0);
      setNumberOfReviews(data.reviewStats?.numberOfReviews || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = new FormData();
    reviewData.append("productid", productId);
    reviewData.append("rating", rating);
    reviewData.append("reviewText", reviewText);
    if (photo) reviewData.append("photo", photo);

    try {
      setLoadingSubmit(true);
      const response = await fetch(`http://localhost:4000/review`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the user's token for authentication
        },
        body: reviewData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit review.");

      setRating(0);
      setReviewText("");
      setPhoto(null);
      setShowModal(false);
      fetchReviews();
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="review-summary">
      <h2>Customer Reviews</h2>
      <div className="rating-summary">
        <span className="average-rating">{averageRating.toFixed(1)}</span>
        <p>{numberOfReviews} reviews</p>
      </div>

      <button className="write-review-btn" onClick={() => setShowModal(true)}>
        Write a Review
      </button>

      {showModal && (
        <div className="review-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>×</span>
            <h3>Write a Review</h3>

            <form onSubmit={handleSubmit}>
              <label>Your Name:</label>
              <input type="text" placeholder="Your Name" required />

              <label>Your Email:</label>
              <input type="email" placeholder="Your Email" required />

              <label>Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? "star filled" : "star"}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <label>Comment:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your comment here..."
              />

              <label>Photo:</label>
              <div className="photo-upload" onClick={() => document.getElementById('file-input').click()}>
                + Photo
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              <button type="submit" disabled={loadingSubmit}>
                {loadingSubmit ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSummary;
