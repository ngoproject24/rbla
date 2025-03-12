import React, { useState } from "react";
import "./BillingAddress.css";
import OrderSummary from "../Components/ordersummary/OrderSummary";

const BillingAddress = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.postalCode.trim()) errors.postalCode = "Postal Code is required.";
    if (!formData.country.trim()) errors.country = "Country is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Proceed to the next step
      alert("Form is valid! Proceeding to the next step.");
    } else {
      setFormErrors(errors);
    }
  };

  return (
    
    <div className="billing-address">
      <h3>Billing Address</h3>
      <div className="billing-options">
        <label className={`billing-option ${sameAsShipping ? "selected" : ""}`}>
          <input
            type="radio"
            name="billing"
            checked={sameAsShipping}
            onChange={() => setSameAsShipping(true)}
          />
          <span>Same as shipping address</span>
        </label>

        <label className={`billing-option ${!sameAsShipping ? "selected" : ""}`}>
          <input
            type="radio"
            name="billing"
            checked={!sameAsShipping}
            onChange={() => setSameAsShipping(false)}
          />
          <span>Use a different billing address</span>
        </label>
      </div>

      {!sameAsShipping && (
        <form className="billing-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={formErrors.fullName ? "error" : ""}
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>
          <div className="form-group">
            <label>Billing Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={formErrors.address ? "error" : ""}
            />
            {formErrors.address && <span className="error-message">{formErrors.address}</span>}
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={formErrors.city ? "error" : ""}
            />
            {formErrors.city && <span className="error-message">{formErrors.city}</span>}
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className={formErrors.postalCode ? "error" : ""}
            />
            {formErrors.postalCode && <span className="error-message">{formErrors.postalCode}</span>}
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={formErrors.country ? "error" : ""}
            />
            {formErrors.country && <span className="error-message">{formErrors.country}</span>}
          </div>
          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
      )}
    </div>
   
  );
};

export default BillingAddress;
