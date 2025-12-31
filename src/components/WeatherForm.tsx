"use client";

import { useState } from "react";
import { geocodeCity } from "@/lib/geocode";
import { getWeather, WeatherData } from "@/lib/weather";
import { Input } from "@/components/ui/input";

type Props = {
  onResult: (data: WeatherData) => void;
  onError: (msg: string) => void;
};

export function WeatherForm({ onResult, onError }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!query || loading) return;

    try {
      setLoading(true);

      // geocodeCity returns a single object, not an array
      const { lat, lon } = await geocodeCity(query);

      const weather = await getWeather(lat, lon);
      onResult(weather);
    } catch (err) {
      onError(
        err instanceof Error ? err.message : "Failed to find location"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-form">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Enter a city (e.g. Truckee, CA)"
        disabled={loading}
        className="weather-form__input"
      />

      <button
        type="button"
        onClick={submit}
        disabled={loading || !query}
        aria-label="Search (Enter)"
        className="weather-form__submit"
      >
        ↵
      </button>

      {loading && (
        <p className="weather-form__loading">
          Loading…
        </p>
      )}
    </div>
  );
}
