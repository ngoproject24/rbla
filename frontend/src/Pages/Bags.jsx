import React, { useContext,useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation
import './Bags.css';
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import Header from '../Components/Header/Header'; // Corrected import path
import Marquee from './Marquee';
import Footer from '../Components/Footer/Footer';
import Chatbot from '../Components/Chatbot/Chatbot';



const Bags = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [bags, setBags] = useState([]);

  // Fetch anklet data from the API
  useEffect(() => {
    fetch("http://localhost:4000/bags") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setBags(data.data); 
        } else {
          console.error("No bags found:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching bags:", error);
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
    <div className="bags-container">
      <Header/>
      <Marquee/>
   

      <h1>Welcome to the bags Collection!</h1>

     

      {/* Product Grid */}
      <div className="product-grid">
        {bags.map((product) => (
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

export default Bags;