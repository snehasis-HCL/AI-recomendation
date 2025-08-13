import React from 'react';
import './CartView.css'; // We will create this CSS file

const CartItem = ({ item, onUpdateQuantity }) => (
  <div className="cart-item">
    <div className="item-details">
      <input type="checkbox" defaultChecked />
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-info">
        <p className="item-name">{item.name}</p>
        <div className="quantity-selector">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
    </div>
    <div className="item-financials">
      <div className="financial-tabs">
        <button className="active">Financial Details</button>
        <button>Approver Flow</button>
      </div>
      <div className="financial-details-content">
        <div className="detail-row">
          <span>Cost Center</span>
          <div className="account-box">1545 - Marketing Ops <span className="status-dot green"></span></div>
        </div>
        <div className="detail-row">
          <span>GL Account</span>
          <div className="account-box">5421600 - IT Hardware <span className="status-dot green"></span></div>
        </div>
      </div>
    </div>
  </div>
);

const CartView = ({ cartItems, onUpdateQuantity, onPlaceOrder }) => {
  return (
    <div className="cart-view-container">
      <h3>Your Cart</h3>
      <div className="cart-items-list">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
        ))}
      </div>
      <div className="cart-footer">
        <button className="place-order-btn" onClick={onPlaceOrder}>Submit & Place Order</button>
      </div>
    </div>
  );
};

export default CartView;
