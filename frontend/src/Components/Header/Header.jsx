import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import flag from "../Assets/in.png";
import heart from "../Assets/heart.png";
import search from "../Assets/search.png";

// Dummy CartContext (Replace with your actual context)
const CartContext = React.createContext({ cartCount: 0 }); // Replace with actual CartContext provider if used

export const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [query, setQuery] = useState(""); // State for the search query
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const { cartCount } = useContext(CartContext); // Use cartCount from CartContext

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setSearchResults([]); // Clear search results if query is empty
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (response.ok) {
        setSearchResults(data); // Set search results if successful
      } else {
        setSearchResults([]); // Clear search results if no products found
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Update search query when user types
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Toggle dropdown visibility
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownVisible((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownVisible(false);
    }
  };

  // Attach and remove event listeners for clicks outside
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" width="85" height="85" />
        </div>
        <div className="location">
          <div>Delivering to Chennai 600009</div>
          <div>
            <ul>
              <li>
                <Link to="/UpdateLocation">Update Location</Link>
              </li>
            </ul>
          </div>
        </div>
        
          
          <div className="input-container">
  <input
    type="text"
    value={query}
    onChange={handleInputChange}
    placeholder="Search products..."
  />
  {/*<img src={} alt="Search Icon" className="search-icon" />

      
          {/* Optional: Display search results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((product) => (
                  <li key={product._id}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="options">
          <div className="in">
            <img src={flag} alt="India Flag" width="20" height="20" />
          </div>
          <div>IND</div>
          <div>
            <Link to="/login" style={{ color: "white" }}>
              Hello, sign in
              <br />
              Account
            </Link>
          </div>
          <div>
            <Link to="/ReturnOrder" style={{ color: "white" }}>
              Returns
              <br />
              & Orders
            </Link>
          </div>
          <div className="heart">
            <Link to="/Wishlist">
              <img src={heart} alt="Wishlist" width="20" height="20" />
            </Link>
          </div>
          <div>
            <Link to="/cart" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faShoppingCart} /> Cart ({cartCount})
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faBars} /> All
          </Link>
        </li>
        <li>
          <Link to="/AboutPage">About Us</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/ProductPage" onClick={toggleDropdown}>
            Product
          </Link>
          {isDropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/towels">Towels</Link></li>
              <li><Link to="/bedsheets">Bedsheets</Link></li>
              <li><Link to="/napkins">Napkins</Link></li>
              <li><Link to="/bags">Bags</Link></li>
              <li><Link to="/cupcoaster">Cupcoaster</Link></li>
              <li><Link to="/paperfiles">Paperfiles</Link></li>
              <li><Link to="/bamboo">Bamboo</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/Gallery">Gallery</Link></li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
        <li><Link to="/adminpanel">UnitPage</Link></li>
      </ul>
    </div>
  );
};

export default Header;
