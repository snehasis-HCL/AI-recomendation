import React from "react";
import "./ProductCard.css"; // We'll create this file

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        {product.getItTomorrow && (
          <span className="tomorrow-badge">Get it tomorrow</span>
        )}
        <p className="product-sku">{product.sku}</p>
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">DKK {product.price}</p>
        <p className="product-supplier">{product.supplier}</p>
        <div className="product-favorite">♡</div>
      </div>
    </div>
  );
};

export default ProductCard;
