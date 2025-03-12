import React, { useContext,useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation
import './Towels.css';
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import Header from '../Components/Header/Header'; // Corrected import path
import Footer from '../Components/Footer/Footer';
import Marquee from './Marquee';
import Chatbot from '../Components/Chatbot/Chatbot';

/*const bedsheets = [
  { id: 1, name: 'Floral Bedsheet', image: B1_img, new_price: 50.0, old_price: 65.0 },
  { id: 2, name: 'Geometric Bedsheet', image: B2_img, new_price: 55.0, old_price: 70.0 },
  { id: 3, name: 'Abstract Bedsheet', image: B3_img, new_price: 60.0, old_price: 80.0 },
  { id: 4, name: 'Classic White Bedsheet', image: B4_img, new_price: 45.0, old_price: 60.0 },
  { id: 5, name: 'Luxury Bedsheet', image: B5_img, new_price: 90.0, old_price: 110.0 },
];*/


const Towels = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [towels, setTowels] = useState([]);

  // Fetch anklet data from the API
  useEffect(() => {
    fetch("http://localhost:4000/towels") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setTowels(data.data); 
        } else {
          console.error("No Towels found:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching Towels:", error);
      });
  }, []);

  const isInWishlist = (product) => wishlist.some((item) => item.id === product.id); // Check if in wishlist
  const isInCart = (product) => cart.some((item) => item.id === product.id);
  // Handle Add to Cart
 /* const handleAddToCart = (bedsheet) => {
    addToCart(bedsheet); // Add item to cart
    navigate('/cart'); // Navigate to Cart page
  };*/

  return (
    <div className="Towels-container">
    <Header/>
    <Marquee/>

      <h1>Welcome to the Towels Collection!</h1>

     

      {/* Product Grid */}
      <div className="product-grid">
        {towels.map((product) => (
          <div className="product-card" key={product.id}>
            {/* Wishlist Icon */}
            <div
              className={`wishlist-icon ${isInWishlist(product) ? "active" : ""}`}
              onClick={() => {
                if (isInWishlist(product)) {
                  removeFromWishlist(product);
                } else {
                  addToWishlist(product);
                }
              }}
            >
              ♥
            </div>

            {/* Product Image */}
            <Link to={`/product/${product.productid}`}>
              <img src={product.images[0]} alt={product.name} className="product-image" />
            </Link>

            {/* Product Details */}
            <h3>{product.name}</h3>
            <p>Price: ₹{product.new_price}</p>
            <p className="original-price">Original Price: ₹{product.old_price}</p>

            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={() => {
                if (!isInCart(product)) {
                  addToCart(product);
                }
              }}
            >
              {isInCart(product) ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* New Design Steps Section */}
      <div className="design-steps">
        <h3>Next Step for Design</h3>
        <div className="design-options">
          <div
            className="design-option"
            onClick={() => navigate("/browse-design")}
            role="button"
            aria-label="Browse Design"
          >
            Browse Design →
          </div>
          <div
            className="design-option"
            onClick={() => navigate("/CustomDesignPage")}
            role="button"
            aria-label="Custom Design"
          >
            Custom Design →
          </div>
          <div
            className="design-option"
            onClick={() => navigate("/upload-design")}
            role="button"
            aria-label="Upload Design and Checkout"
          >
            Upload Design and Checkout →
          </div>
        </div>
      </div>
      <Footer/>
      <Chatbot/>
    </div>
  );
};

export default Towels;