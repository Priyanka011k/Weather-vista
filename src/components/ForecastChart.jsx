import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ForecastChart({ forecast }) {
  // Prepare chart data
  const data = forecast.map((day) => ({
    date: new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
    temp: day.main.temp,
  }));

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-3 text-center">5-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;
