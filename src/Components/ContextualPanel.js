import React, { useState } from 'react';
import ProductResults from './ProductResults';
import CartView from './CartView';
import OrderConfirmation from './OrderConfirmation';

// This component will manage the state of the right-side panel
const ContextualPanel = () => {
  // Possible views: 'RESULTS', 'CART', 'CONFIRMATION'
  const [currentView, setCurrentView] = useState('RESULTS');
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // Increase quantity
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new product to cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // For this demo, we'll automatically switch to the cart view after adding an item.
    setCurrentView('CART');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, you would send the cartItems to a server here.
    console.log("Placing order for:", cartItems);
    setCurrentView('CONFIRMATION');
  };
  
  const handleContinueBrowsing = () => {
      setCartItems([]); // Clear cart after order
      setCurrentView('RESULTS');
  }

  // Render the correct component based on the current view state
  switch (currentView) {
    case 'CART':
      return <CartView 
                cartItems={cartItems} 
                onUpdateQuantity={handleUpdateQuantity}
                onPlaceOrder={handlePlaceOrder}
             />;
    case 'CONFIRMATION':
      return <OrderConfirmation onContinue={handleContinueBrowsing} />;
    case 'RESULTS':
    default:
      return <ProductResults onAddToCart={handleAddToCart} />;
  }
};

export default ContextualPanel;
