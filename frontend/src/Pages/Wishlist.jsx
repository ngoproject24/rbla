import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css'; 
import { WishlistContext } from "../Context/WishlistContext";
import bheart from "../Components/Assets/bheart.png";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading, error } = useContext(WishlistContext);

  return (
    <div className="wishlist-container">
      {loading && <div className="loading">Loading...</div>} {/* Add a loading indicator */}
      
      {error && <div className="error">{error}</div>} {/* Display error message if any */}

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <img src={bheart} alt="bheart" />
          <h2>Your Wishlist is Empty</h2>
          <p>Looks like you haven't added anything to your Wishlist yet.</p>
          <Link to="/">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className="wishlist-items">
          <h2>Your Wishlist</h2>
          <div className="items-container">
            {wishlist.map((item, index) => (
              <div key={index} className="wishlist-item">
                <img src={item.images[0]} alt={item.productName} className="wishlist-image" />
                <div className="wishlist-details">
                  <h3>{item.productName}</h3>
                  <p>Price: ${item.new_price}</p>
                  <button
                    className="remove-icon"
                    onClick={() => {
                      if (window.confirm('Remove this item from your Wishlist?')) {
                        removeFromWishlist(item); // Pass the entire object to remove it
                      }
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
