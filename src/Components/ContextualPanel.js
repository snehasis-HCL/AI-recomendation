import React, { useState, useEffect } from 'react';
import ProductResults from './ProductResults';
import CartView from './CartView';
import OrderConfirmation from './OrderConfirmation';

// This component now receives product data as a prop
const ContextualPanel = ({ productData }) => {
  const [currentView, setCurrentView] = useState('RESULTS');
  const [cartItems, setCartItems] = useState([]);
  
  // When new productData arrives, switch back to the results view
  useEffect(() => {
    if (productData && productData.length > 0) {
        setCurrentView('RESULTS');
    }
  }, [productData]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCurrentView('CART');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handlePlaceOrder = () => {
    console.log("Placing order for:", cartItems);
    setCurrentView('CONFIRMATION');
  };
  
  const handleContinueBrowsing = () => {
      setCartItems([]);
      setCurrentView('RESULTS');
  }

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
      // Pass the received productData down to the ProductResults component
      return <ProductResults products={productData} onAddToCart={handleAddToCart} />;
  }
};

export default ContextualPanel;
