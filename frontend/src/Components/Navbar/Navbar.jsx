import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png'; // Path to your logo
import cart from '../Assets/cart.png'; // Path to your cart icon
import heart from '../Assets/heart-logo.png'; // Path to your heart icon
import user from '../Assets/user.png'; // Path to your user icon
import { CartContext } from '../../CartContext'; // Import CartContext
import Header from '../Header/Header';

export const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { cartCount } = useContext(CartContext); // Use cartCount from CartContext

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="navbar">
      <Header/>
      {/* Logo Section */}
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>Shop</p>
      </div>

      {/* Navigation Menu */}
      <ul className="nav-menu">
      <li>
          <Link to="/AboutPage">About Us</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/ProductPage">
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
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/Gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/ContactUs">ContactUs</Link>
        </li>
        
        
      </ul>

      {/* Icons and Login Section */}
      <div className="nav-icons">
        {/* Wishlist */}
        <Link to="/wishlist">
          <div className="nav-icon">
            <img src={heart} alt="Heart" className="nav-heart-logo" />
          </div>
        </Link>

        {/* Cart */}
        <div className="nav-cart">
          <Link to="/cart" className="nav-cart-link">
            <img src={cart} alt="Cart" className="nav-cart-icon" />
            <div className="nav-cart-count">{cartCount}</div> {/* Dynamic count */}
          </Link>
        </div>

        {/* Login Button */}
        <Link to="/login">
          <img src={user} alt="User" className="nav-user-icon" />
        </Link>
      </div>
    </div>
  );
};
