import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Widgets.css';
 
const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://20.115.96.172:8000/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: "U002", 
            query: "Show me the best wireless mouse" 
          }),
        });
 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
 
        const data = await response.json();
 
        if (data.status === 'success' && data.recommendations) {
          // Map the API response to the format our ProductCard component expects
          const formattedProducts = data.recommendations.map(p => ({
            sku: p.product_id,
            name: p.product_name,
            price: p.metrics.avg_price.toFixed(2), // Format price to 2 decimal places
            supplier: p.supplier_name,
            // API doesn't provide an image, so we use a placeholder
            image: '/images/mouse.jpg',
            getItTomorrow: Math.random() > 0.5, // Randomly assign "Get it tomorrow"
          }));
          setProducts(formattedProducts);
        } else {
           throw new Error("Failed to get recommendations from API.");
        }
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch recommendations:", e);
      } finally {
        setLoading(false);
      }
    };
 
    fetchRecommendations();
  }, []); // The empty array [] means this effect runs once when the component mounts
 
  return (
    <div className="widget-card recommendations">
      <div className="widget-header">
        <h3>Recommendations for you</h3>
        <a href="#see-all">See All &gt;</a>
      </div>
      <div className="widget-toggle">
        <button className="toggle-btn active">Goods</button>
        <button className="toggle-btn">Services</button>
      </div>
      <div className="widget-content carousel">
        {loading && <p>Loading recommendations...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
       <div className="carousel-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};
 
export default Recommendations;