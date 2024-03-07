import React, { useState } from 'react';

function Home() {
  // State to manage the list of cities
  const [cities, setCities] = useState(['Austin', 'Houston', 'Dallas']);
  const [newCity, setNewCity] = useState('');

  // Function to add a new city to the list
  const addCity = () => {
    if (newCity.trim() !== '' && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  return (
    <div>
      <div className="hamburger-menu">
        <button className="hamburger-icon">&#9776;</button>
        <div className="city-list">
          <ul>
            {cities.map(city => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Input field to add new city */}
      <div className="add-city">
        <input
          type="text"
          placeholder="Add a city..."
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button onClick={addCity}>Add</button>
      </div>
    </div>
  );
}

export default Home;

