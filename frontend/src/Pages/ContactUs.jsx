import React from "react";
import "./ContactUs.css";
import at from '../Components/Assets/at.png';
import phone from '../Components/Assets/phone.png';
import cell from '../Components/Assets/cell.png';
import mail from '../Components/Assets/mail.png';
import contactba from '../Components/Assets/contactba.png';



const ContactUs = () => {
  return (
    <div className="contact-us">
      {/* Banner Section */}
      <div className="contact-banner">
        
        <div className="overlay">
        <img src={contactba} alt="contactba" className="contactba-logo" />  
          <h1>CONTACT US</h1>
          <p>
            
            <a href="/">Home</a> » <span>CONTACT US</span>
          </p>
          {/* Icons Section */}
          <div className="contact-icons">
            <img src={at} alt="at icon" />
            <img src={phone} alt="phone icon" />
            <img src={cell} alt="cell icon" />
            <img src={mail} alt="mail icon" />
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-container">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message here" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Address:</strong> 123 Contact Lane, City, Country</p>
        </div>
      </div>
      
    </div>
  );
};

export default ContactUs;
