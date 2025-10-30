import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";

function WeatherCard({ weather }) {
  // Pick icon based on weather condition
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
      case "Clouds":
        return <WiCloud className="text-gray-400 text-6xl" />;
      case "Rain":
        return <WiRain className="text-blue-400 text-6xl" />;
      case "Snow":
        return <WiSnow className="text-blue-200 text-6xl" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-purple-500 text-6xl" />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog className="text-gray-300 text-6xl" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-80 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
      <div className="flex flex-col items-center">
        {getWeatherIcon(weather.weather[0].main)}
        <p className="text-4xl font-bold mt-2">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="text-lg text-gray-600">
          {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
