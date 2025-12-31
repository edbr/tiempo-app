"use client";

import { useState, useRef } from "react";
import { WeatherForm } from "@/components/WeatherForm";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastList } from "@/components/ForecastList";
import { WeatherData, getForecast, type ForecastDay } from "@/lib/weather";

export default function Page() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState("");

  // Prevent duplicate forecast calls for same coordinates
  const lastCoordsRef = useRef<string | null>(null);

  async function handleWeatherResult(data: WeatherData) {
    const key = `${data.lat.toFixed(4)},${data.lon.toFixed(4)}`;

    if (lastCoordsRef.current === key) return;

    lastCoordsRef.current = key;
    setWeather(data);

    try {
      const forecastData = await getForecast(data.lat, data.lon);
      setForecast(forecastData);
    } catch (err) {
      console.error("Forecast failed:", err);
      setForecast(null);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center">Weather App</h1>

        <WeatherForm onResult={handleWeatherResult} onError={setError} />

        {weather && <WeatherCard data={weather} />}

        {forecast && <ForecastList days={forecast} />}

        {error && (
          <p className="text-center text-sm text-red-600 bg-orange-100 p-2 rounded">
            {error}
          </p>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          Data provided by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            OpenWeather
          </a>
        </p>
      </div>
    </main>
  );
}
