import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
 
// Dummy data refined for computer mouse and other items
const products = {
  it: [
    { id: 1, type: "product", name: "Wireless Optical Mouse - Professional" },
    { id: 2, type: "product", name: "Ergonomic Vertical Mouse" },
    { id: 3, type: "product", name: "Mechanical Keyboard - Backlit" },
    { id: 4, type: "product", name: "EcoGuard Spill Response Kit" },
    {
      id: 5,
      type: "service",
      name: "Ask Novo about bulk computer mouse discounts",
    },
    { id: 6, type: "service", name: "Ask Novo about IT support services" },
    { id: 7, type: "search", name: "Computer mouse wireless" },
    { id: 8, type: "search", name: "Computer keyboard" },
  ],
  biomedical: [
    {
      id: 1,
      type: "search",
      name: "Mouse traps for rats",
    },
    {
      id: 2,
      type: "search",
      name: "Mouse poison for rats",
    },
    {
      id: 3,
      type: "search",
      name: "Mouse bait for rats",
    },
    {
      id: 4,
      type: "product",
      name: "Mouse glue trap for rats",
    },
    {
      id: 5,
      type: "service",
      name: "Mouse pads for laptops",
    },
    {
      id: 6,
      type: "service",
      name: "Mouse wired for laptop or PC",
    }
  ],
};
 
const SearchBar = ({ userDetails }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
 
  const [searchData, setSearchData] = useState([]);
 
  useEffect(() => {
    if (userDetails) {
      const role = userDetails.role.toLowerCase();
      setSearchData(products[role] || []);
    }
  }, [userDetails]);
 
  const handleSelection = (item) => {
    setQuery(""); // Clear the search bar
    setSuggestions([]); // Close the dropdown
 
    // Always navigate to the chat page, passing the selected item's name as state.
    navigate("/chat", { state: { initialQuery: item.name } });
  };
 
  const fetchSuggestions = useCallback(
    (searchQuery) => {
      if (searchQuery) {
        const filtered = searchData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    },
    [searchData]
  );
 
  // Debounce effect
  useEffect(() => {
    if (searchData.length > 0) {
      const timerId = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
 
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [query, fetchSuggestions, searchData]);
 
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Novo for a product or service"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelection(item)}>
              {item.type === "product" && <span className="icon-box">📦</span>}
              {item.type === "search" && <span className="icon-box">🔍</span>}
              {item.type === "service" && <span className="icon-box">💬</span>}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default SearchBar;
 
 