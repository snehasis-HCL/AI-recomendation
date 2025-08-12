import React from "react";
import "./Widgets.css";

// Dummy data for suppliers - add logos to public/images/
const suppliers = [
  { name: "Ambu", logo: "/images/logo/ambu-logo.png" },
  { name: "Lenovo", logo: "/images/logo/lenovo-logo.png" },
  { name: "Eppendorf", logo: "/images/logo/eppendorf-logo.png" },
  { name: "FOSS", logo: "/images/logo/foss-logo.png" },
  { name: "Ninolab", logo: "/images/logo/ninolab-logo.png" },
  { name: "3M", logo: "/images/logo/3m-logo.png" },
  { name: "ChemoMetec", logo: "/images/logo/chemometec-logo.png" },
  { name: "Hempel", logo: "/images/logo/hempel-logo.png" },
  { name: "Nopa", logo: "/images/logo/nopa-logo.png" },
  { name: "Estichem", logo: "/images/logo/estichem-logo.png" },
];

const ExploreSuppliers = () => {
  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3>Explore Suppliers</h3>
        <a href="#see-all">See All &gt;</a>
      </div>
      <div className="widget-content supplier-grid">
        {suppliers.map((supplier, index) => (
          <div key={index} className="supplier-logo-container">
            <img src={supplier.logo} alt={`${supplier.name} logo`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSuppliers;
