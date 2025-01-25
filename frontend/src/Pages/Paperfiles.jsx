import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import P1_img from '../Components/Assets/P1.png';
import P2_img from '../Components/Assets/P2.png';
import P3_img from '../Components/Assets/P3.png';
import P4_img from '../Components/Assets/P4.png';
import P5_img from '../Components/Assets/P5.png';
import './Paperfiles.css';
import { WishlistContext } from '../WishlistContext'; // Wishlist context
import { CartContext } from '../CartContext'; // Cart context



const paperfiles = [
  { id: 1, name: 'Worldone Eco Friendly Documents Organizer File', image: P1_img, new_price: 100, oldPrice: 200 },
  { id: 2, name: 'CRAFTWAFT Shila Hard Board Brown Lace File', image: P2_img, new_price: 150, oldPrice: 300 },
  { id: 3, name: 'Manifold Kraft File Folder with Spine', image: P3_img, new_price: 120, oldPrice: 250 },
  { id: 4, name: 'Monaf A4 Twin-Pocket Conference File', image: P4_img, new_price: 180, oldPrice: 350 },
  { id: 5, name: 'Wallet - Half Flap  File', image: P5_img, new_price: 220, oldPrice: 450 },
];

const Paperfiles = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // Wishlist context
  const { addToCart } = useContext(CartContext); // Cart context

  const navigate = useNavigate(); // React Router navigation

  const isInWishlist = (file) => wishlist.some((item) => item.id === file.id); // Check if in wishlist

  // Handle Add to Cart
  const handleAddToCart = (file) => {
    addToCart(file); // Add item to cart
    navigate('/cart'); // Navigate to Cart page
  };

  return (
    <div>
     

      <h1>Welcome to the Paper Files category page!</h1>

      <div className="container">
        {paperfiles.map((file) => (
          <div key={file.id} className="paperfile-card">
            <div className="paperfile-image-container">
              {/* Wishlist Heart Button */}
              <div
                className={`heart-icon ${isInWishlist(file) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(file)) {
                    removeFromWishlist(file); // Remove from wishlist
                  } else {
                    addToWishlist(file); // Add to wishlist
                  }
                }}
              ></div>
              <img className="paperfile-image" src={file.image} alt={file.name} />
            </div>
            <div className="paperfile-name">{file.name}</div>
            <div className="paperfile-price">
              <span className="new-price">₹{file.new_price}</span>{' '}
              <span className="old-price">₹{file.oldPrice}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(file)}
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

export default Paperfiles;
