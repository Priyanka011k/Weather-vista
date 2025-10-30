function Favorites({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) return null;

  return (
    <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-lg w-full sm:w-96">
      <h3 className="text-lg font-semibold mb-2">⭐ Favorites</h3>
      <ul className="space-y-2">
        {favorites.map((city, index) => (
          <li key={index} className="flex justify-between items-center">
            <button
              onClick={() => onSelect(city)}
              className="text-blue-600 font-medium hover:underline"
            >
              {city}
            </button>
            <button
              onClick={() => onRemove(city)}
              className="text-red-500 hover:underline"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
