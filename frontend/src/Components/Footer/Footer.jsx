import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#top" className="back-to-top">Back to top</a>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
          <li><Link to="/AboutPAge">About RBLA</Link></li>
            <li><Link to="/ProductPage">Products</Link></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Let Us Help You</h4>
          <ul>
          <li><Link to="/AccountPage">Your Account</Link></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">Recalls and Product Safety Alerts</a></li>
            <li><a href="#">100% Purchase Protection</a></li>
            <li><Link to="/ContactUs">Help</Link></li>
            <li><Link to="/PaymentPage">pay</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <span>RBLA</span>
        </div>
        <div className="footer-country">
          <button>English</button>
          <button>India</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
