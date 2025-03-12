import React, { useContext,useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation
import './Bedsheets.css';
//import { WishlistContext } from '../WishlistContext'; // Wishlist context
//import { CartContext } from '../CartContext'; // Cart context
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import Header from '../Components/Header/Header';
import Marquee from './Marquee';
import Chatbot from '../Components/Chatbot/Chatbot';
import Footer from '../Components/Footer/Footer'


const Bedsheets = () => {
  // Access context values
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [bedsheets, setBedsheets] = useState([]);

  // Fetch anklet data from the API
  useEffect(() => {
    fetch("http://localhost:4000/bedsheets") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setBedsheets(data.data); 
        } else {
          console.error("No bedsheets found:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching bedsheets:", error);
      });
  }, []);

  const isInWishlist = (product) => wishlist.some((item) => item.productid === product.productid);
  const isInCart = (product) => cart.some((item) => item.productid === product.productid);
  return (
    <div className="bedsheets-container">
      <Header/>
      <Marquee/>


      <h1>Welcome to the bedsheets Collection!</h1>

     

      {/* Product Grid */}
      <div className="product-grid">
      {bedsheets.map((product) => (
  <div className="product-card" key={product.productid}> {/* Ensure each key is unique */}

            {/* Wishlist Icon */}
            <div
              className={`wishlist-icon ${isInWishlist(product) ? "active" : ""}`}
              onClick={() => {
                console.log("Prd: ",product)
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

export default Bedsheets;