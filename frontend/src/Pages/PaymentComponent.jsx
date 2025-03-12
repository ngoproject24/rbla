import React, { useState } from 'react';
import './PaymentComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import visaLogo from '../Components/Assets/visa.png';
import MasterCardLogo from '../Components/Assets/Mastercard.png';
import rupayLogo from '../Components/Assets/rupay.png';
import paytmLogo from '../Components/Assets/paytm.png';


const PaymentComponent = () => {
  const [selectedPayment, setSelectedPayment] = useState('payu');

  return (
 
      <div className="payment-container">
        <h2>Payment</h2>
        <p>All transactions are secure and encrypted.</p>

        {/* PayU Payment Option */}
        <label className={`payment-option ${selectedPayment === 'payu' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="payu"
            checked={selectedPayment === 'payu'}
            onChange={() => setSelectedPayment('payu')}
          />
          <div className="payment-details">
            <span>Cards, UPI, NB, Wallets, BNPL by PayU India</span>
            <div className="payment-logos">
              <img src={visaLogo} alt="Visa" />
              <img src={MasterCardLogo} alt="MasterCard" />
              <img src={rupayLogo} alt="RuPay" />
              <img src={paytmLogo} alt="Paytm" />
            </div>
          </div>
        </label>

        {/* Payment Redirection Info */}
        {selectedPayment === 'payu' && (
          <div className="payment-info">
            <div className="redirect-icon-container">
              <FontAwesomeIcon icon={faArrowRight} className="redirect-icon" />
            </div>
            <p>
              After clicking <strong>"Pay now"</strong>, you will be redirected to
              Cards, UPI, NB, Wallets, BNPL by PayU India to complete your purchase securely.
            </p>
          </div>
        )}

        {/* Cash on Delivery Option */}
        <label className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedPayment === 'cod'}
            onChange={() => setSelectedPayment('cod')}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        {/* Pay Now Button */}
        <button className="pay-now-button">Pay now</button>
      </div>
    
  );
};

export default PaymentComponent;
