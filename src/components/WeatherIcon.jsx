import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

/**
 * Map OpenWeather condition id to a simplified condition key.
 * https://openweathermap.org/weather-conditions
 */
function conditionKeyFromId(id) {
  if (id >= 200 && id < 300) return "thunder";
  if (id >= 300 && id < 600) return "rainy";      // drizzle + rain
  if (id >= 600 && id < 700) return "snow";
  if (id === 701 || id === 741) return "mist";    // mist/fog
  if (id >= 700 && id < 800) return "mist";       // smoke, haze, etc
  if (id === 800) return "clear";
  if (id > 800 && id < 805) return "cloudy";
  return "cloudy";
}

/**
 * Decide day/night by comparing current time with sunrise/sunset.
 */
function isDay(dt, sunrise, sunset) {
  try {
    const t = Number(dt);
    return t >= Number(sunrise) && t < Number(sunset);
  } catch {
    return true;
  }
}

export default function WeatherIcon({ weather, sizeClass = "icon-large" }) {
  if (!weather) return null;
  const w = weather.weather?.[0];
  if (!w) return null;

  const key = conditionKeyFromId(w.id);
  const day = isDay(weather.dt, weather.sys?.sunrise, weather.sys?.sunset);

  let Icon = WiCloud;
  if (key === "clear") Icon = day ? WiDaySunny : WiNightClear;
  else if (key === "cloudy") Icon = weather.clouds?.all > 60 ? WiCloudy : WiCloud;
  else if (key === "rainy") Icon = weather.rain ? WiRain : WiShowers;
  else if (key === "thunder") Icon = WiThunderstorm;
  else if (key === "snow") Icon = WiSnow;
  else if (key === "mist") Icon = WiFog;

  // Add fun class hooks for subtle animations
  const extra =
    key === "clear" ? "sunny" :
    key === "rainy" ? "rainy" :
    key === "thunder" ? "thunder" : "";

  return <Icon className={`${sizeClass} ${extra}`} aria-label={w.description} title={w.description} />;
}

/** Export helper for theming the background */
export function themeClassFromWeather(weather) {
  if (!weather?.weather?.[0]) return "";
  const key = conditionKeyFromId(weather.weather[0].id);
  switch (key) {
    case "clear": return "theme-sunny";
    case "cloudy": return "theme-cloudy";
    case "rainy": return "theme-rainy";
    case "thunder": return "theme-thunder";
    case "snow": return "theme-snow";
    case "mist": return "theme-mist";
    default: return "";
  }
}
