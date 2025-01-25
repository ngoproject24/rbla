import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import O1_img from '../Components/Assets/O1.png';  // Example images for Bamboo
import O2_img from '../Components/Assets/O2.png';
import O3_img from '../Components/Assets/O3.png';
import O4_img from '../Components/Assets/O4.png';
import O5_img from '../Components/Assets/O5.png';
import './Bamboo.css';  // Import Bamboo styles
import { WishlistContext } from '../WishlistContext';  // Wishlist context
import { CartContext } from '../CartContext';  // Cart context



// Example array for Bamboo products
const bambooProducts = [
  { id: 1, name: 'Floral Bamboo', image: O1_img, new_price: 250, oldPrice: 500 },
  { id: 2, name: 'Wicker Storage Basket', image: O2_img, new_price: 300, oldPrice: 600 },
  { id: 3, name: 'Bamboo House', image: O3_img, new_price: 200, oldPrice: 450 },
  { id: 4, name: 'Marble Bamboo', image: O4_img, new_price: 350, oldPrice: 700 },
  { id: 5, name: 'Vintage Bamboo Products', image: O5_img, new_price: 400, oldPrice: 800 },
];

const Bamboo = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);  // Wishlist context
  const { addToCart } = useContext(CartContext);  // Cart context

  const navigate = useNavigate();  // React Router navigation

  const isInWishlist = (product) => wishlist.some((item) => item.id === product.id);  // Check if in wishlist

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);  // Add item to cart
    navigate('/cart');  // Navigate to Cart page
  };

  return (
    <div>
      

      <h1>Welcome to the Bamboo Products category page!</h1>

      <div className="container">
        {bambooProducts.map((product) => (
          <div key={product.id} className="bamboo-card">
            <div className="bamboo-image-container">
              {/* Wishlist Heart Button */}
              <div
                className={`heart-icon ${isInWishlist(product) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(product)) {
                    removeFromWishlist(product);  // Remove from wishlist
                  } else {
                    addToWishlist(product);  // Add to wishlist
                  }
                }}
              ></div>
              <img className="bamboo-image" src={product.image} alt={product.name} />
            </div>
            <div className="bamboo-name">{product.name}</div>
            <div className="bamboo-price">
              <span className="new-price">₹{product.new_price}</span>{' '}
              <span className="old-price">₹{product.oldPrice}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Customize Button */}
      <button className="customize-btn">Customize</button>
      
    </div>
  );
};

export default Bamboo;
