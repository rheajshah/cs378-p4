import React, { useState, useRef } from 'react';
import Axios from 'axios';

const CitySearch = ({ suggestions, setSuggestions, setError, fetchSuggestions}) => { // Add suggestions prop
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const selectSuggestion = (cityName) => {
    setInputValue(cityName.split(',')[0].trim()); // Extract city name only
    setSuggestions([]);
  };

  const handleAddCity = async () => {
    const cityName = inputValue.trim();
    if (cityName !== '') {
      setInputValue('');
      setSuggestions([]);
      // Perform add city action
    }
  };

  return (
    <div className="add-city">
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a city..."
        style={{ width: "calc(80%)", borderRadius: "5px 0 0 5px" }}
      />
      <button onClick={handleAddCity} style={{ borderRadius: "0 5px 5px 0" }}>+</button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
