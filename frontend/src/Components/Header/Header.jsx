import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import flag from "../Assets/in.png";
import heart from "../Assets/heart.png";

// Dummy CartContext (Replace with your actual context)
const CartContext = React.createContext({ cartCount: 0 }); // Replace with actual CartContext provider if used

export const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { cartCount } = useContext(CartContext); // Use cartCount from CartContext

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
            <a href="#" style={{ color: "#00A8E1" }}>
              Update location
            </a>
          </div>
        </div>
        <div className="search-bar">
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" defaultValue="block print cotton bags" />
        </div>
        <div className="options">
          <div className="in">
          <img src={flag} alt="in" width="20" height="20" />
          </div>
          <div>IND</div>
          <div>
            <Link to="/login" style={{ color: "white" }}>
              Hello, sign in
              <br />
              Account & Lists
            </Link>
          </div>
          <div>
            <a href="#" style={{ color: "white" }}>
              Returns
              <br />
              & Orders
            </a>
          </div>
          <div className="heart">
  <Link to="/Wishlist">
    <img src={heart} alt="heart" width="20" height="20" />
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
      <div className="nav-links">
        <a href="#">
          <FontAwesomeIcon icon={faBars} /> All
        </a>
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
              <li>
                <Link to="/towels">Towels</Link>
              </li>
              <li>
                <Link to="/bedsheets">Bedsheets</Link>
              </li>
              <li>
                <Link to="/napkins">Napkins</Link>
              </li>
              <li>
                <Link to="/bags">Bags</Link>
              </li>
              <li>
                <Link to="/cupcoaster">Cupcoaster</Link>
              </li>
              <li>
                <Link to="/paperfiles">Paperfiles</Link>
              </li>
              <li>
                <Link to="/bamboo">Bamboo</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/Gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/ContactUs">ContactUs</Link>
        </li>
      </div>
    </div>
  );
};

export default Header;
