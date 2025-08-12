import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== "/";

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="app-header">
      <div className="header-primary">
        <div className="header-logo">
          <img
            src="/logo.png"
            alt="Novo Nordisk Logo"
            style={{ height: "60px" }}
          />
          {/* <span>novo nordisk</span> */}
        </div>
        <nav className="header-nav-main">
          <span>
            <i className="icon-bell"></i> 21
          </span>
          <span>My Orders</span>
          <span>Cart</span>
          <span>Help</span>
          <span className="user-profile">SH</span>
        </nav>
      </div>
      <div className="header-secondary">
        <nav className="header-nav-tabs">
          <button className="active">Shop</button>
          <button>Invoices</button>
          <button>Payments</button>
        </nav>

        {showBackButton && (
          <span onClick={handleBackClick} style={{ cursor: "pointer" }}>
            &#8592; &nbsp;Back
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
