import React, { useContext, useState, useEffect } from 'react';
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

const Cupcoaster = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [cupcoaster, setCupcoaster] = useState([]);

  // Fetch cupcoaster data from the API
  useEffect(() => {
    fetch("http://localhost:4000/cupcoaster") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setCupcoaster(data.data); 
        } else {
          console.error("No cupcoaster found:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching cupcoaster:", error);
      });
  }, []);

  const isInWishlist = (product) => wishlist.some((item) => item.id === product.id); // Check if in wishlist
  const isInCart = (product) => cart.some((item) => item.id === product.id);

  return (
    <div>
      <h1>Welcome to the Cup Coasters category page!</h1>
      <div className="container">
        {cupcoaster.map((coaster) => (
          <div key={coaster.id} className="cupcoaster-card">
            <div className="cupcoaster-image-container">
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
              <img className="cupcoaster-image" src={coaster.image} alt={coaster.name} />
            </div>
            <div className="cupcoaster-name">{coaster.name}</div>
            <div className="cupcoaster-price">
              <span className="new-price">₹{coaster.new_price}</span>{' '}
              <span className="old-price">₹{coaster.oldPrice}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(coaster)}
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
