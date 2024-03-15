import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CityTempInfo from './components/CityTempInfo';
import CityCard from './components/CityCard';
import './Home.css'; // Import CSS file

function Home() {
  const [cityData, setCityData] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null); // State for error message
  const [suggestions, setSuggestions] = useState([]);

  const weatherBackgrounds = {
    0: "clear-sky.jpeg", // Clear sky
    1: "clear-sky.jpeg", // Clear sky
    2: "clear-sky.jpeg", // Clear sky
    3: "clear-sky.jpeg", // Clear sky

    51: "rain.gif", // Rain
    53: "rain.gif", // Rain
    55: "rain.gif", // Rain
    61: "rain.gif", // Rain
    63: "rain.gif", // Rain
    65: "rain.gif", // Rain
    66: "rain.gif", // Rain
    67: "rain.gif", // Rain
    80: "rain.gif", // Rain
    81: "rain.gif", // Rain
    82: "rain.gif", // Rain

    71: "snow.jpeg", // Snow fall
    73: "snow.jpeg", // Snow fall
    75: "snow.jpeg", // Snow fall
    85: "snow.jpeg", // Snow fall
    86: "snow.jpeg", // Snow fall

    95: "thunderstorm.jpeg", // Thunderstorm
    96: "thunderstorm.jpeg", // Thunderstorm
    99: "thunderstorm.jpeg" // Thunderstorm
  };

  const geocodeLocation = async (city) => {
    try {
      const response = await Axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: city,
          count: 1,
          language: 'en',
          format: 'json',
        },
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
          current: 'temperature_2m,weather_code',
          hourly: 'temperature_2m',
          temperature_unit: 'fahrenheit',
          timezone: 'auto',
          daily: 'temperature_2m_max,temperature_2m_min',
        },
      });
      return { ...weatherResponse.data, name: city };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  useEffect(() => {
    const initialCities = ['Austin', 'Houston', 'Dallas'];
    const fetchInitialWeatherData = async () => {
      const data = await Promise.all(initialCities.map(city => fetchWeatherData(city)));
      setCityData(data.filter(item => item !== null));
      const austinData = data.find(city => city.name === 'Austin');
      if (austinData) {
        setSelectedCity(austinData);
      }
    };

    fetchInitialWeatherData();
  }, []);

  const addCity = async () => {
    if (newCity.trim() !== '' && !cityData.find(city => city.name === newCity)) {
      const weatherData = await fetchWeatherData(newCity);
      if (weatherData) {
        setCityData([...cityData, weatherData]);
        setNewCity('');
        setSuggestions([]); // Clear suggestions when city is added
      } else {
        setError(`Could not find weather data for ${newCity}. Please enter a valid city name.`);
        setTimeout(() => setError(null), 6000);
        setNewCity('');
      }
    }
  };

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityData.find(city => city.name === cityName));
  };

  const fetchSuggestions = async (input) => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await Axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: input,
          count: 5,
          language: 'en',
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        // Map each result to concatenate city name and country
        const suggestions = response.data.results.map(result => `${result.name}, ${result.country}`);
        setSuggestions(suggestions); 
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const selectSuggestion = (cityName) => {
    setNewCity(cityName.split(',')[0].trim()); // Extract city name only
    setSuggestions([]);
  };

  return (
    <div className="container" style={{backgroundImage: `url(${selectedCity ? require('./images/' + weatherBackgrounds[selectedCity?.current?.weather_code] || 'clear-sky.jpeg') : require('./images/clear-sky.jpeg')})`}}>
      <div className="row justify-content-start">
        <div className="col-4">
          <div className="city-list">
            <h3 className="my-cities">My Cities</h3>
            <ul className="list-unstyled">
              {cityData.map(city => (
                <li key={city.name}>
                  <CityCard 
                    cityName={city.name} 
                    currentTemp={city.current.temperature_2m} 
                    onClick={() => handleCitySelect(city.name)} 
                    isSelected={city.name === selectedCity?.name}
                  />
                </li>
              ))}
            </ul>
            <div className="add-city">
              <input
                type="text"
                placeholder="Add a city..."
                value={newCity}
                onChange={(e) => {
                  setNewCity(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                style={{ width: "calc(80%)", borderRadius: "5px 0 0 5px" }}
              />
              <button onClick={addCity} style={{ borderRadius: "0 5px 5px 0" }}>+</button>
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => selectSuggestion(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="city-info">
            {selectedCity && (
              <CityTempInfo
                cityName={selectedCity.name}
                currentTemp={selectedCity.current.temperature_2m}
                hourlyTimeArray={selectedCity.hourly.time}
                hourlyTempArray={selectedCity.hourly.temperature_2m}
                highTemp={selectedCity.daily.temperature_2m_max[0]}
                lowTemp={selectedCity.daily.temperature_2m_min[0]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;