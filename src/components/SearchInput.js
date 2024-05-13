import React, { useState } from 'react';

function SearchInput({value, onChange, fetchSuggestionsDebounced}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Call the onChange function passed from parent component
    fetchSuggestionsDebounced(newValue); // Call the debounced function passed from parent component
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange} // Call handleChange function on input change
        placeholder="Add a city..."
        style={{ width: "calc(79%)", borderRadius: "5px 0 0 5px" }}
      />
    </div>
  );
}

export default SearchInput;
