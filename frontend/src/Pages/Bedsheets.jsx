import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import B1_img from '../Components/Assets/B1.png';
import B2_img from '../Components/Assets/B2.png';
import B3_img from '../Components/Assets/B3.png';
import B4_img from '../Components/Assets/B4.png';
import B5_img from '../Components/Assets/B5.png';
import './Bedsheets.css';
import { WishlistContext } from '../WishlistContext'; // Wishlist context
import { CartContext } from '../CartContext'; // Cart context



const bedsheets = [
  { id: 1, name: 'Floral Bedsheet', image: B1_img, new_price: 50.0, old_price: 65.0 },
  { id: 2, name: 'Geometric Bedsheet', image: B2_img, new_price: 55.0, old_price: 70.0 },
  { id: 3, name: 'Abstract Bedsheet', image: B3_img, new_price: 60.0, old_price: 80.0 },
  { id: 4, name: 'Classic White Bedsheet', image: B4_img, new_price: 45.0, old_price: 60.0 },
  { id: 5, name: 'Luxury Bedsheet', image: B5_img, new_price: 90.0, old_price: 110.0 },
];

const Bedsheets = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // Wishlist context
  const { addToCart } = useContext(CartContext); // Cart context

  const navigate = useNavigate(); // React Router navigation

  const isInWishlist = (bedsheet) => wishlist.some((item) => item.id === bedsheet.id); // Check if in wishlist

  // Handle Add to Cart
  const handleAddToCart = (bedsheet) => {
    addToCart(bedsheet); // Add item to cart
    navigate('/cart'); // Navigate to Cart page
  };

  return (
    <div>
      
      <h1>Welcome to the Bedsheets category page!</h1>
      <div className="container">
        {bedsheets.map((bedsheet) => (
          <div key={bedsheet.id} className="bedsheet-card">
            <div className="bedsheet-image-container">
              {/* Wishlist Heart Button */}
              <div
                className={`heart-icon ${isInWishlist(bedsheet) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(bedsheet)) {
                    removeFromWishlist(bedsheet); // Remove from wishlist
                  } else {
                    addToWishlist(bedsheet); // Add to wishlist
                  }
                }}
              ></div>
              <img className="bedsheet-image" src={bedsheet.image} alt={bedsheet.name} />
            </div>
            <div className="bedsheet-name">{bedsheet.name}</div>
            <div className="bedsheet-price">
              <span className="new-price">${bedsheet.new_price}</span>{' '}
              <span className="old-price">${bedsheet.old_price}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(bedsheet)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Bedsheets;
