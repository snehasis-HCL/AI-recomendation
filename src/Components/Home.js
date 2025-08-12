import React, { useState, useEffect } from "react";
import Header from "./Header";
import SearchBar from "./Searchbar";
import OrderAgain from "./OrderAgain";
import Recommendations from "./Recommendations";
import ExploreSuppliers from "./ExploreSuppliers";
import "./Home.css"; // We'll create this file
 
const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
 
  return (
    <div>
      <Header />
      <main className="main-content">
        <div className="search-section">
          <h1>What are you looking for?</h1>
          <SearchBar userDetails={user} />
        </div>
 
        {/* This is the new section that replaces the placeholder text */}
        <div className="home-widgets-container">
          <OrderAgain userDetails={user} />
          <Recommendations />
          <ExploreSuppliers />
        </div>
 
        {/* The "Shop" section from the bottom of the screenshot can be added later */}
      </main>
    </div>
  );
};
 
export default Home;
 
 