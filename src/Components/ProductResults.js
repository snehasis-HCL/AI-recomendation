import React from 'react';
import './ProductResults.css'; // We will create this CSS file

// Dummy data based on the screenshot
const products = [
  { id: '884721', name: 'Carekart Gloves Nitrile Gloves Large Pack of 50 | Powder-Free Medical Nitrile Exam Gloves, Latex-Free', supplier: 'SafeTech Industries', price: '650', image: '/images/gloves-blue.jpg', rating: 4.2 },
  { id: '884721-black', name: 'EcoGuard Nitrile Gloves - Pack of 50 | Premium Quality, Powder-Free, Latex-Free', supplier: 'SafeTech Industries', price: '650', image: '/images/gloves-black.jpg', rating: 4.2 },
  { id: '884721-white', name: 'EcoGuard Nitrile Gloves - 50 Count Durable, Powder-Free, Latex-Free Medical Exam Gloves', supplier: 'SafeTech Industries', price: '650', image: '/images/gloves-white.jpg', rating: 4.2 },
];

const ProductResults = ({ onAddToCart }) => {
  return (
    <div className="product-results-container">
      <div className="results-header">
        <h3>Results</h3>
        <div className="filters-and-sort">
          {/* Add filter dropdowns as needed */}
          <div className="view-toggle">
            <button className="active">Grid</button>
            <button>List</button>
          </div>
          <span>Sort: Featured</span>
        </div>
      </div>
      <div className="results-grid">
        {products.map(product => (
          <div key={product.id} className="result-product-card">
            <div className="card-image-container">
                <img src={product.image} alt={product.name} />
                <span className="novo-approved-badge">Novo Approved</span>
            </div>
            <div className="card-info">
              <span className="get-it-tomorrow">Get it tomorrow</span>
              <p className="product-name">{product.name}</p>
              <span className="product-rating">{product.rating} ★ SafeTech Industries</span>
              <div className="price-and-action">
                <span className="product-price">DKK {product.price}</span>
                {/* A simple button to simulate adding to cart */}
                <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <button className="view-more-btn">View More Products</button>
      </div>
    </div>
  );
};

export default ProductResults;
