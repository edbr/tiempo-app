"use client";

import { useState, useRef } from "react";
import { WeatherForm } from "@/components/WeatherForm";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastList } from "@/components/ForecastList";
import { WeatherMap } from "@/components/WeatherMap";
import { WeatherData, getForecast } from "@/lib/weather";
import type { ForecastDay } from "@/lib/weather";

export default function Page() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const lastCoordsRef = useRef<string | null>(null);

  async function handleWeatherResult(data: WeatherData) {
    const key = `${data.lat.toFixed(4)},${data.lon.toFixed(4)}`;
    if (lastCoordsRef.current === key) return;

    lastCoordsRef.current = key;
    setHasSearched(true);
    setWeather(data);

    try {
      const forecastData = await getForecast(data.lat, data.lon);
      setForecast(forecastData);
    } catch {
      setForecast(null);
    }
  }

  return (
    <main className="page-weather">
      {/* Search */}
      <div
        className={`search-container ${
          hasSearched
            ? "search-container--pinned"
            : "search-container--centered"
        }`}
      >
        <div className="mx-auto max-w-md px-6">
          <WeatherForm onResult={handleWeatherResult} onError={setError} />
        </div>
      </div>

      {/* Results */}
      <div
        className={`results-container ${
          hasSearched ? "results-visible" : "results-hidden"
        }`}
      >
        {weather && (
          <div className="space-y-4">
            <WeatherCard data={weather} />
            <WeatherMap lat={weather.lat} lon={weather.lon} />
          </div>
        )}

        {forecast && <ForecastList days={forecast} />}

        {error && (
          <p className="mt-4 text-center text-sm text-destructive bg-orange-100 p-2 rounded">
            {error}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
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
      </footer>
    </main>
  );
}
