import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import N1_img from '../Components/Assets/N1.png';
import N2_img from '../Components/Assets/N2.png';
import N3_img from '../Components/Assets/N3.png';
import N4_img from '../Components/Assets/N4.png';
import N5_img from '../Components/Assets/N5.png';
import './Napkins.css';
import { WishlistContext } from '../WishlistContext'; // Wishlist context
import { CartContext } from '../CartContext'; // Cart context


const napkins = [
  { id: 1, name: 'Floral Napkin', image: N1_img, new_price: 50.0, old_price: 30.0 },
  { id: 2, name: 'Patterned Napkin', image: N2_img, new_price: 60.0, old_price: 40.0 },
  { id: 3, name: 'Linen Napkin', image: N3_img, new_price: 70.0, old_price: 50.0 },
  { id: 4, name: 'Striped Napkin', image: N4_img, new_price: 55.0, old_price: 35.0 },
  { id: 5, name: 'Cotton Napkin', image: N5_img, new_price: 65.0, old_price: 45.0 },
];

const Napkins = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isInWishlist = (napkin) => wishlist.some((item) => item.id === napkin.id);

  const handleAddToCart = (napkin) => {
    addToCart(napkin);
    navigate('/cart');
  };

  return (
    <div>
     
      <h1>Welcome to the Napkins category page!</h1>
      <div className="container">
        {napkins.map((napkin) => (
          <div key={napkin.id} className="napkin-card">
            <div className="napkin-image-container">
              <div
                className={`heart-icon ${isInWishlist(napkin) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(napkin)) {
                    removeFromWishlist(napkin);
                  } else {
                    addToWishlist(napkin);
                  }
                }}
              ></div>
              <img className="napkin-image" src={napkin.image} alt={napkin.name} />
            </div>
            <div className="napkin-name">{napkin.name}</div>
            <div className="napkin-price">
              <span className="new-price">${napkin.new_price}</span>{' '}
              <span className="old-price">${napkin.old_price}</span>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(napkin)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Napkins;
