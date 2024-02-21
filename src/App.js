import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { fetchWeather, fetchWeatherForecast } from './components/Weather';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);


  const transformHourlyForecastData = (hourlyData) => {
    return hourlyData.map((hour) => {
      const date = new Date(hour.dt * 1000);
      const day = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
      const weather = hour.weather[0].main;
      const high = Math.round(hour.temp);
      const low = Math.round(hour.temp); 
  
      return { day, weather, high, low };
    });
  };
  
  const transformDailyForecastData = (dailyData) => {
    return dailyData.map((day) => {
      const date = new Date(day.dt * 1000);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const weather = day.weather[0].main;
      const high = Math.round(day.temp.max);
      const low = Math.round(day.temp.min);
  
      return { day: dayOfWeek, weather, high, low };
    });
  };

  const searchWeather = async (cityToSearch) => {
    if (!cityToSearch) return;
  
    try {
      const weatherData = await fetchWeather(cityToSearch);
      setWeather(weatherData);
      const { lat, lon } = weatherData.coord; 
      const forecastData = await fetchWeatherForecast(lat, lon);
      
    
      const dailyData = transformDailyForecastData(forecastData.daily);
      const hourlyData = transformHourlyForecastData(forecastData.hourly);
  
      setHourlyForecast(hourlyData.slice(0, 7)); 
      setDailyForecast(dailyData.slice(0, 7)); 
    } catch (error) {
      console.error("Error fetching weather or forecast data:", error);
    }
  };
  useEffect(() => {
   
    searchWeather('Paris');
  }, []);

 
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchWeather(city);
    setCity('');
  };


  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <SearchBar city={city} onCityChange={handleCityChange} onSearchSubmit={handleSearchSubmit} />
      {weather && <WeatherCard weather={weather} />}


      {hourlyForecast.length > 0 && (
        <Forecast title="Hourly Forecast" forecastData={hourlyForecast} />
      )}
      {dailyForecast.length > 0 && (
        <Forecast title="Daily Forecast" forecastData={dailyForecast} />
      )}
      <div className="text-center text-lg text-gray-500 mt-4">
        Developed By Prashant Patil
      </div>
    </div>
  );
}

export default App;
