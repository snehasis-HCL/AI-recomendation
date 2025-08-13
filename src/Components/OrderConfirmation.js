import React from 'react';
import './OrderConfirmation.css'; // And the CSS for it

const OrderConfirmation = ({ onContinue }) => {
  return (
    <div className="order-confirmation-container">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        <h2>Order Submitted</h2>
        <p>Your request has been sent to the team. You can track the status of your application or continue browsing for products.</p>
        <div className="confirmation-actions">
          <button className="view-orders-btn">View My Orders</button>
          <button className="continue-browsing-btn" onClick={onContinue}>Continue Browsing</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
