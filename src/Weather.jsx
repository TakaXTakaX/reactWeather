import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (err) {
      setError('Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-card">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
          <div className="weather-details">
            <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;