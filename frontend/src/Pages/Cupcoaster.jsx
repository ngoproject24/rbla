import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import C1_img from '../Components/Assets/C1.png';
import C2_img from '../Components/Assets/C2.png';
import C3_img from '../Components/Assets/C3.png';
import C4_img from '../Components/Assets/C4.png';
import C5_img from '../Components/Assets/C5.png';
import './Cupcoaster.css';
import { WishlistContext } from '../WishlistContext'; // Wishlist context
import { CartContext } from '../CartContext'; // Cart context

import { Link } from 'react-router-dom';


const cupcoasters = [
  { id: 1, name: 'Floral Coaster', image: C1_img, new_price: 250, oldPrice: 500 },
  { id: 2, name: 'Wooden Coaster', image: C2_img, new_price: 300, oldPrice: 600 },
  { id: 3, name: 'Abstract Coaster', image: C3_img, new_price: 200, oldPrice: 450 },
  { id: 4, name: 'Marble Coaster', image: C4_img, new_price: 350, oldPrice: 700 },
  { id: 5, name: 'Vintage Coaster', image: C5_img, new_price: 400, oldPrice: 800 },
];

const Cupcoaster = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // Wishlist context
  const { addToCart } = useContext(CartContext); // Cart context

  const navigate = useNavigate(); // React Router navigation

  const isInWishlist = (coaster) => wishlist.some((item) => item.id === coaster.id); // Check if in wishlist

  // Handle Add to Cart
  const handleAddToCart = (coaster) => {
    addToCart(coaster); // Add item to cart
    navigate('/cart'); // Navigate to Cart page
  };

  return (
    <div>
     
        


      <h1>Welcome to the Cup Coasters category page!</h1>
        

      <div className="container">
        {cupcoasters.map((coaster) => (
          <div key={coaster.id} className="bedsheet-card">
            <div className="bedsheet-image-container">
              {/* Wishlist Heart Button */}
              <div
                className={`heart-icon ${isInWishlist(coaster) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(coaster)) {
                    removeFromWishlist(coaster); // Remove from wishlist
                  } else {
                    addToWishlist(coaster); // Add to wishlist
                  }
                }}
              ></div>
              <img className="bedsheet-image" src={coaster.image} alt={coaster.name} />
            </div>
            <div className="bedsheet-name">{coaster.name}</div>
            <div className="bedsheet-price">
              <span className="new-price">₹{coaster.new_price}</span>{' '}
              <span className="old-price">₹{coaster.oldPrice}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(coaster)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* Customize Button */}
      <Link to="/custproduct" className="customize-btn">
 <center>Click Here</center> 
  <span className="tooltip">Customize Your Own Product</span>
</Link>

    </div>
  );
};

export default Cupcoaster;
