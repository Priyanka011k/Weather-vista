import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";

function WeatherDetails({ weather }) {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ul className="details">
      <li>
        <WiHumidity size={28} /> Humidity: {weather.main.humidity}%
      </li>
      <li>
        <WiStrongWind size={28} /> Wind: {Math.round(weather.wind.speed)} km/h
      </li>
      <li>
        <WiBarometer size={28} /> Pressure: {weather.main.pressure} hPa
      </li>
      <li>
        <WiSunrise size={28} /> Sunrise: {sunrise}
      </li>
      <li>
        <WiSunset size={28} /> Sunset: {sunset}
      </li>
    </ul>
  );
}

export default WeatherDetails;
