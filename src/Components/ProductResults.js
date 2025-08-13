import React from 'react';
import './ProductResults.css';

// This component now receives products via props
const ProductResults = ({ products, onAddToCart }) => {
  
  // If there are no products, show a message
  if (!products || products.length === 0) {
    return (
        <div className="product-results-container">
            <div className="results-header"><h3>Results</h3></div>
            <p style={{textAlign: 'center', color: '#666'}}>Please ask the assistant for a product to see results.</p>
        </div>
    );
  }

  // Map API data to the format needed by the card
  const formattedProducts = products.map(p => ({
    id: p.product_id,
    name: p.product_name,
    supplier: p.supplier_name,
    price: p.unit_price,
    image: '/images/mouse.jpg', // Using placeholder image as it's not in the API
    rating: p.global_rating
  }));

  return (
    <div className="product-results-container">
      <div className="results-header">
        <h3>Results</h3>
        <div className="filters-and-sort">
          <div className="view-toggle">
            <button className="active">Grid</button>
            <button>List</button>
          </div>
          <span>Sort: Featured</span>
        </div>
      </div>
      <div className="results-grid">
        {formattedProducts.map(product => (
          <div key={product.id} className="result-product-card">
            <div className="card-image-container">
                <img src={product.image} alt={product.name} />
                <span className="novo-approved-badge">Novo Approved</span>
            </div>
            <div className="card-info">
              <span className="get-it-tomorrow">Get it tomorrow</span>
              <p className="product-name">{product.name}</p>
              <span className="product-rating">{product.rating} ★ {product.supplier}</span>
              <div className="price-and-action">
                <span className="product-price">DKK {product.price}</span>
                <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductResults;
