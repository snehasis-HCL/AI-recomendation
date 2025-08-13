import React from 'react';
import './ProductResults.css';

// Accept the new 'recommendedProductId' prop
const ProductResults = ({ products, onAddToCart, recommendedProductId }) => {
  
  if (!products || products.length === 0) {
    return (
        <div className="product-results-container">
            <div className="results-header"><h3>Results</h3></div>
            <p style={{textAlign: 'center', color: '#666'}}>Please ask the assistant for a product to see results.</p>
        </div>
    );
  }

  const formattedProducts = products.map(p => ({
    id: p.product_id,
    name: p.product_name,
    supplier: p.supplier_name,
    price: p.unit_price,
    image: '/images/mouse.jpg',
    rating: p.global_rating
  }));

  return (
    <div className="product-results-container">
      {/* (Header section remains the same) */}
      <div className="results-header">
        <h3>Results</h3>
        {/* ... */}
      </div>
      <div className="results-grid">
        {formattedProducts.map(product => (
          <div key={product.id} className="result-product-card">
            <div className="card-image-container">
                <img src={product.image} alt={product.name} />
                {/* *** CONDITIONAL BADGE RENDERING *** */}
                {/* Check if the current product is the recommended one */}
                {product.id === recommendedProductId && (
                  <span className="recommended-badge">✅ Recommended</span>
                )}
                <span className="novo-approved-badge">Novo Approved</span>
            </div>
            <div className="card-info">
              {/* (Card info remains the same) */}
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
