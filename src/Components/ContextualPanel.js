import React, { useState, useEffect } from 'react';
import ProductResults from './ProductResults';
import CartView from './CartView';
import OrderConfirmation from './OrderConfirmation';

const ContextualPanel = ({ productData, recommendedId }) => {
  // State for managing the view (what the user sees)
  const [currentView, setCurrentView] = useState('RESULTS');
  
  // State for managing the items in the shopping cart
  const [cartItems, setCartItems] = useState([]);
  
  // This effect resets the view to the product results whenever a new search is performed
  useEffect(() => {
    if (productData && productData.length > 0) {
        setCurrentView('RESULTS');
    }
  }, [productData]);

  // --- FULLY IMPLEMENTED HANDLER FUNCTIONS ---

  // Adds a product to the cart or increments its quantity
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // If item already exists, just increase its quantity
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Otherwise, add the new product to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // Switch the view to the cart so the user can see what they've added
    setCurrentView('CART');
  };

  // Updates the quantity of an item in the cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is zero or less, remove the item from the cart
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      // Otherwise, update the quantity for the specific product
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Simulates placing an order and switches to the confirmation screen
  const handlePlaceOrder = () => {
    // In a real application, you would send the cartItems to a server here
    console.log("Placing order for:", cartItems);
    setCurrentView('CONFIRMATION');
  };
  
  // Resets the panel after an order is complete
  const handleContinueBrowsing = () => {
      setCartItems([]); // Clear the cart
      setCurrentView('RESULTS'); // Go back to the product results view
  }

  // --- VIEW RENDERING LOGIC ---

  // This switch statement decides which component to show based on the 'currentView' state
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
      return <ProductResults 
               products={productData} 
               onAddToCart={handleAddToCart} 
               recommendedProductId={recommendedId}
             />;
  }
};

export default ContextualPanel;
