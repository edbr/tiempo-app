"use client";

/// <reference types="google.maps" />

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { getWeather, WeatherData } from "@/lib/weather";
import { Loader } from "@googlemaps/js-api-loader";

type WeatherFormProps = {
  onResult: (data: WeatherData) => void;
  onError: (msg: string) => void;
};

export function WeatherForm({ onResult, onError }: WeatherFormProps) {
  const [loading, setLoading] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const autocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);
  const lastCoordsRef = useRef<string | null>(null);

  /* --------------------------------------------------
     Google Places Autocomplete (init once)
  -------------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    async function initAutocomplete() {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
          libraries: ["places"],
        });

        await loader.load();

        if (!mounted) return;

        const input = document.getElementById(
          "location-input"
        ) as HTMLInputElement | null;
        if (!input) return;

        const autocomplete = new google.maps.places.Autocomplete(input, {
          types: ["(cities)"],
          fields: ["geometry", "name"],
        });

        autocomplete.addListener("place_changed", async () => {
          const place = autocomplete.getPlace();
          const lat = place.geometry?.location?.lat();
          const lon = place.geometry?.location?.lng();

          if (!lat || !lon) return;

          const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
          if (lastCoordsRef.current === key) return;

          lastCoordsRef.current = key;

          try {
            setLoading(true);
            const data = await getWeather(lat, lon);
            onResult(data);
          } catch {
            onError("Failed to fetch weather for selected location");
          } finally {
            setLoading(false);
          }
        });

        autocompleteRef.current = autocomplete;
      } catch (err) {
        console.error("Autocomplete init failed:", err);
        onError("Failed to initialize location search");
      }
    }

    initAutocomplete();

    return () => {
      mounted = false;
    };
  }, [onResult, onError]);

  /* --------------------------------------------------
     Manual geolocation trigger (user initiated)
  -------------------------------------------------- */
  async function useCurrentLocation() {
    if (!("geolocation" in navigator)) {
      onError("Geolocation is not supported by your browser");
      return;
    }

    try {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
          if (lastCoordsRef.current === key) {
            setLoading(false);
            return;
          }

          lastCoordsRef.current = key;

          const data = await getWeather(lat, lon);
          onResult(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
          onError("Location permission denied");
        }
      );
    } catch {
      setLoading(false);
      onError("Failed to retrieve current location");
    }
  }

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center gap-3"
    >
      <Input
        id="location-input"
        placeholder="Search for a city"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        disabled={loading}
        className="w-full text-sm"
      />

      <button
        type="button"
        onClick={useCurrentLocation}
        disabled={loading}
        className="text-xs text-blue-600 underline"
      >
        Use my current location
      </button>

      {loading && (
        <p className="text-xs text-muted-foreground text-center">
          Loading weather data…
        </p>
      )}
    </form>
  );
}
