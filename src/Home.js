import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CityCard from './components/CityCard';

function Home() {
  // State to manage the list of cities and their weather data
  const [cityData, setCityData] = useState([]);
  const [newCity, setNewCity] = useState('');

  // Function to geocode location
  const geocodeLocation = async (city) => {
    try {
      const response = await Axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: city,
          count: 1, // Assuming we only want the most relevant result
          language: 'en',
          format: 'json'
        }
      });
      if (response.data.results && response.data.results.length > 0) {
        const { latitude, longitude } = response.data.results[0];
        return { latitude, longitude };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
      return null;
    }
  };

  // Function to fetch weather data for a location
  const fetchWeatherData = async (city) => {
    try {
      const coords = await geocodeLocation(city);
      if (!coords) {
        console.log(`Could not find coordinates for ${city}`);
        return null;
      }
      const weatherResponse = await Axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          current: 'temperature_2m',
          hourly: 'temperature_2m',
          temperature_unit: 'fahrenheit'
        }
      });
      return { ...weatherResponse.data, name: city }; // Add city for identification
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  // Initial load and setup of city weather data
  useEffect(() => {
    const initialCities = ['Austin', 'Houston', 'Dallas'];
    const fetchInitialWeatherData = async () => {
      const data = await Promise.all(initialCities.map(city => fetchWeatherData(city)));
      setCityData(data.filter(item => item !== null)); // Filter out null responses
    };

    fetchInitialWeatherData();
  }, []);

  // Function to add a new city and fetch its weather data
  const addCity = async () => {
    if (newCity.trim() !== '' && !cityData.find(city => city.name === newCity)) {
      const weatherData = await fetchWeatherData(newCity);
      if (weatherData) {
        setCityData([...cityData, weatherData]);
      }
      setNewCity('');
    }
  };

  return (
    <div>
      <div className="city-list">
        {cityData.map(city => (
          <CityCard
            key={city.name}
            cityName={city.name}
            currentTemp={city.current.temperature_2m}
            // For highTemp and lowTemp, you need to derive or specify these from your API data
            highTemp="N/A"
            lowTemp="N/A"
          />
        ))}
      </div>
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
