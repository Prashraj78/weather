import axios from 'axios';

const API_KEY = '1da4585a9db223a22f3fabb55f410bb8'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                units: 'metric', 
                APPID: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const fetchWeatherForecast = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/onecall`, {
            params: {
                lat: lat,
                lon: lon,
                exclude: 'current,minutely,alerts', 
                units: 'metric', 
                appid: API_KEY, 
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
        throw error;
    }
};