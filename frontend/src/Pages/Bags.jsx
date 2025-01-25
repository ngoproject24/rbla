import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Ba1_img from '../Components/Assets/Ba1.png';
import Ba2_img from '../Components/Assets/Ba2.png';
import Ba3_img from '../Components/Assets/Ba3.png';
import Ba4_img from '../Components/Assets/Ba4.png';
import Ba5_img from '../Components/Assets/Ba5.png';
import './Bags.css';
import { WishlistContext } from '../WishlistContext'; // Wishlist context
import { CartContext } from '../CartContext'; // Cart context



const bags = [
  { id: 1, name: 'Classic Bag', image: Ba1_img, new_price: 30.0, old_price: 45.0 },
  { id: 2, name: 'Trendy Bag', image: Ba2_img, new_price: 40.0, old_price: 55.0 },
  { id: 3, name: 'Elegant Bag', image: Ba3_img, new_price: 50.0, old_price: 70.0 },
  { id: 4, name: 'Sporty Bag', image: Ba4_img, new_price: 35.0, old_price: 50.0 },
  { id: 5, name: 'Luxury Bag', image: Ba5_img, new_price: 75.0, old_price: 100.0 },
];

const Bags = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // Wishlist context
  const { addToCart } = useContext(CartContext); // Cart context

  const navigate = useNavigate(); // React Router navigation

  const isInWishlist = (bag) => wishlist.some((item) => item.id === bag.id); // Check if in wishlist

  // Handle Add to Cart
  const handleAddToCart = (bag) => {
    addToCart(bag); // Add item to cart
    navigate('/cart'); // Navigate to Cart page
  };

  return (
    <div>
      
      <h1>Welcome to the Bags category page!</h1>
      <div className="container">
        {bags.map((bag) => (
          <div key={bag.id} className="bag-card">
            <div className="bag-image-container">
              {/* Wishlist Heart Button */}
              <div
                className={`heart-icon ${isInWishlist(bag) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(bag)) {
                    removeFromWishlist(bag); // Remove from wishlist
                  } else {
                    addToWishlist(bag); // Add to wishlist
                  }
                }}
              ></div>
              <img className="bag-image" src={bag.image} alt={bag.name} />
            </div>
            <div className="bag-name">{bag.name}</div>
            <div className="bag-price">
              <span className="new-price">${bag.new_price}</span>{' '}
              <span className="old-price">${bag.old_price}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(bag)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Bags;
