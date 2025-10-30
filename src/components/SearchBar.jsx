import { useState } from "react";

function SearchBar({ onSearch, onUseLocation }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="px-4 py-2 rounded-lg text-black outline-none w-64"
        />
        <button
          type="submit"
          className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </form>

      <button
        onClick={onUseLocation}
        className="bg-green-400 px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition"
      >
        📍 Use My Location
      </button>
    </div>
  );
}

export default SearchBar;
