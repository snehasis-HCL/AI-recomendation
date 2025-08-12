import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Widgets.css"; // We'll create this for shared widget styles
 
// Dummy data - remember to add images to public/images/
const orderProducts = {
  it: [
    {
      sku: "PN23678",
      name: "Laptop Charger - 65W USB-C Power Adapter",
      price: "290",
      supplier: "SafeTech Industries",
      image: "/images/product-small/charger.png",
      getItTomorrow: false,
    },
    {
      sku: "PN45679",
      name: "Keyboard for desktops and laptops - Ergonomic Design",
      price: "6690",
      supplier: "SafeTech Industries",
      image: "/images/product-small/keyboard.png",
      getItTomorrow: true,
    },
    {
      sku: "PN23808",
      name: "USB-C Power Adapter - 45W Fast Charging",
      price: "1450",
      supplier: "BioSafe Solutions",
      image: "/images/product-small/cabel.png",
      getItTomorrow: false,
    },
  ],
  biomedical: [
    {
      sku: "PN984727",
      name: "EcoGuard Biohazard Cleanup Kit - 15 liter capacity",
      price: "1150",
      supplier: "BioSafe Solutions",
      image: "/images/product-small/spill-kit-2.png",
      getItTomorrow: false,
    },
    {
      sku: "PN47171",
      name: "EcoGuard Hazmat Spill Response Kit - 20 liter capacity",
      price: "340",
      supplier: "SafeTech Industries",
      image: "/images/product-small/spill-kit-1.png",
      getItTomorrow: false,
    },
    {
      sku: "PN984727",
      name: "ChemSafe Chemical Spill Kit - 30 liter capacity",
      price: "5470",
      supplier: "BioSafe Solutions",
      image: "/images/product-small/helmet.png",
      getItTomorrow: true,
    },
  ],
};
 
const OrderAgain = ({ userDetails }) => {
  const [orderAgainProducts, setOrderAgainProducts] = useState([]);
 
  useEffect(() => {
    if (userDetails) {
      const role = userDetails.role.toLowerCase();
      setOrderAgainProducts(orderProducts[role] || []);
    }
  }, [userDetails]);
 
  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3>Order Again</h3>
        <a href="#see-all">See All &gt;</a>
      </div>
      <div className="widget-content carousel">
        {orderAgainProducts.map((product, index) => (
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
 
export default OrderAgain;
 