import React from 'react';
import './Delivery.css';
import OrderSummary from '../Components/ordersummary/OrderSummary';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Delivery = () => {
  return (
    <div>
      
      <h2>Delivery</h2> {/* Delivery Section */}
      <section id="delivery" className="form-group-section delivery-section">
        <div className="form-group">
          <label htmlFor="country">
            Country/Region <span className="required-symbol">*</span>
          </label>
          <select id="country" disabled required>
            <option>India</option>
          </select>
        </div>
        
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="first-name">First name <span className="required-symbol">*</span></label>
            <input id="first-name" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">
              Last name (optional)
                          </label>
            <input id="last-name" type="text" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Address <span className="required-symbol">*</span>
          </label>
          <input id="address" type="text" required />
        </div>

        <div className="form-group">
          <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
          <input id="apartment" type="text" />
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="city">
              City <span className="required-symbol">*</span>
            </label>
            <input id="city" type="text" required />
          </div>
          <div className="form-group">
            <label htmlFor="state">
              State <span className="required-symbol">*</span>
            </label>
            <select id="state" disabled required>
              <option>Tamil Nadu</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pin-code">
              PIN code <span className="required-symbol">*</span>
            </label>
            <input id="pin-code" type="text" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone <span className="required-symbol">*</span>
          </label>
          <input id="phone" type="text" required />
        </div>

        {/* Navigation Buttons */}
        <div className="nav-button-container">
          <button className="nav-button">
            <FaArrowLeft />
          </button>

          <button className="nav-button">
            <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};
