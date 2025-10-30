import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import ForecastChart from "./components/ForecastChart";
import Favorites from "./components/Favorites";
import { themeClassFromWeather } from "./components/WeatherIcon"; 
import "./styles/weather.css"; // 🎨 Custom CSS

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "c1af14f7f531248ce1272f394b3ccbf2";  
  const API_URL = "https://api.openweathermap.org/data/2.5/";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        `${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);

      const forecastRes = await axios.get(
        `${API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const dailyData = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyData);
    } catch (err) {
      setError("Could not fetch weather for your location.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        `${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);

      const forecastRes = await axios.get(
        `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const dailyData = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyData);
    } catch (err) {
      setError("City not found. Try again!");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setError("Location access denied. Please search manually.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  };

  const addFavorite = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((c) => c !== city));
  };

  // 🎨 Dynamic theme + background image
  const theme = weather ? themeClassFromWeather(weather) : "";
  const backgroundClass = weather
    ? `bg-${weather.weather[0].main.toLowerCase()}`
    : "bg-default";

  return (
    <div className={`app ${theme} ${backgroundClass}`}>
      <h1 className="h1">🌦 Weather App</h1>

      <SearchBar onSearch={fetchWeather} onUseLocation={handleUseLocation} />

      <Favorites favorites={favorites} onSelect={fetchWeather} onRemove={removeFavorite} />

      {loading && <p className="mt8 subtle">Fetching weather...</p>}
      {error && <p className="mt8 subtle">{error}</p>}

      {weather && !loading && (
        <div className="mt8 center">
          <WeatherCard weather={weather} />
          <div className="mt8">
            <button onClick={addFavorite} className="btn">
              ❤️ Save to Favorites
            </button>
          </div>
          <div className="mt8">
            <WeatherDetails weather={weather} />
          </div>
          <div className="mt8">
            <ForecastChart forecast={forecast} />
          </div>
        </div>
        

      )}
    </div>
    

  );
}

export default App;
