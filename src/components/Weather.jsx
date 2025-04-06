import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const OPENWEATHER_API_KEY = "20ec30b398d36ddf199771457ca5c958"; // Replace with actual API key

  const getCoordinates = async (location) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );

      if (response.data.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lon } = response.data[0];
      return { lat, lon };
    } catch (error) {
      console.error("Error getting coordinates:", error);
      throw new Error("Failed to get coordinates");
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw new Error("Failed to get weather data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    try {
      const { lat, lon } = await getCoordinates(location);
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);
    } catch (error) {
      setError(error.message || "Failed to fetch weather data.");
    }
  };

  return (
    <div className="bg-white/80 p-8 rounded-2xl shadow-xl border border-green-200 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌿 Weather Conditions
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or place"
            className="w-full px-4 py-2 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl shadow-md transition"
        >
          Get Weather
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      {weather && (
        <div className="mt-8 bg-white border border-green-100 rounded-xl shadow-md p-6 text-green-800">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Weather in {weather.name}
          </h2>
          <ul className="space-y-2 text-base">
            <li>
              🌡️ <strong>Temperature:</strong> {weather.main.temp} °C
            </li>
            <li>
              🌥️ <strong>Condition:</strong> {weather.weather[0].description}
            </li>
            <li>
              💧 <strong>Humidity:</strong> {weather.main.humidity}%
            </li>
            <li>
              💨 <strong>Wind Speed:</strong> {weather.wind.speed} m/s
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
