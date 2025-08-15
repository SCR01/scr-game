import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

const SearchBar = ({ gameTitles }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Debug logging
  console.log("SearchBar rendered with gameTitles:", gameTitles);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsOpen(true);

    console.log("Search input:", value);
    console.log("Available gameTitles:", gameTitles);

    if (!value) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const filtered = gameTitles.filter((title) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    
    console.log("Filtered results:", filtered);
    setSuggestions(filtered.length ? filtered : ["No games found"]);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (title) => {
    if (title === "No games found") return;
    
    console.log("Attempting to find game:", title);
    
    try {
      // Try multiple selectors to find the game element
      let el = document.querySelector(
        `.game-title[data-title="${title.replace(/"/g, "&quot;")}"]`
      );
      
      if (!el) {
        // Try alternative selectors
        el = document.querySelector(`[data-title="${title}"]`);
      }
      
      if (!el) {
        // Try finding by text content
        const allGameTitles = document.querySelectorAll('.game-title');
        el = Array.from(allGameTitles).find(element => 
          element.textContent.trim() === title
        );
      }
      
      console.log("Found element:", el);
      
      if (el) {
        console.log("Scrolling to element:", el);
        el.scrollIntoView({ behavior: "smooth" });
        // Add a subtle highlight effect
        el.style.animation = "searchHighlight 2s ease-out";
        setTimeout(() => {
          el.style.animation = "";
        }, 2000);
      } else {
        console.warn(`Game element not found for title: ${title}`);
        // Show a user-friendly message
        alert(`Game "${title}" found but could not scroll to it. Please scroll manually to the Games section.`);
      }
    } catch (error) {
      console.error("Error scrolling to game:", error);
    }
    
    setInput("");
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex] !== "No games found") {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSuggestions([]);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (input && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="search-wrapper navbar-search">
      <div className="search-container" ref={searchRef}>
        <input
          ref={inputRef}
          type="text"
          id="searchInput"
          placeholder="🔍 Search games..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          autoComplete="off"
          aria-label="Search games"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="searchSuggestions"
        />
        {isOpen && suggestions.length > 0 && (
          <ul 
            id="searchSuggestions" 
            role="listbox"
            aria-label="Game suggestions"
          >
            {suggestions.map((title, idx) => (
              <li
                key={idx}
                className={`${title === "No games found" ? "no-result" : ""} ${
                  idx === selectedIndex ? "selected" : ""
                }`}
                onClick={() => handleSuggestionClick(title)}
                role="option"
                aria-selected={idx === selectedIndex}
                data-index={idx}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
