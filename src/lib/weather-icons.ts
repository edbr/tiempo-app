type WeatherDisplay = {
  icon: string;
  label: string;
};

/**
 * Open-Meteo Weather Code → Icon + Description
 * Covers all official Open-Meteo / WMO codes.
 */
export function weatherCodeToDisplay(code: number): WeatherDisplay {
  // ☀️ Clear
  if (code === 0) return { icon: "☀️", label: "Clear sky" };

  // 🌤️ Clouds
  if (code === 1) return { icon: "🌤️", label: "Mostly clear" };
  if (code === 2) return { icon: "⛅", label: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };

  // 🌫️ Fog
  if (code === 45) return { icon: "🌫️", label: "Fog" };
  if (code === 48) return { icon: "🌫️", label: "Freezing fog" };

  // 🌦️ Drizzle
  if (code === 51) return { icon: "🌦️", label: "Light drizzle" };
  if (code === 53) return { icon: "🌦️", label: "Drizzle" };
  if (code === 55) return { icon: "🌧️", label: "Heavy drizzle" };

  // 🧊 Freezing drizzle
  if (code === 56) return { icon: "🧊", label: "Freezing drizzle" };
  if (code === 57) return { icon: "🧊", label: "Heavy freezing drizzle" };

  // 🌧️ Rain
  if (code === 61) return { icon: "🌧️", label: "Light rain" };
  if (code === 63) return { icon: "🌧️🌧️", label: "Rain" };
  if (code === 65) return { icon: "🌧️🌧️🌧️", label: "Heavy rain" };

  // 🧊 Freezing rain
  if (code === 66) return { icon: "🧊", label: "Freezing rain" };
  if (code === 67) return { icon: "🧊🧊", label: "Heavy freezing rain" };

  // ❄️ Snow
  if (code === 71) return { icon: "❄️", label: "Light snow" };
  if (code === 73) return { icon: "❄️❄️", label: "Snow" };
  if (code === 75) return { icon: "❄️❄️❄️", label: "Heavy snow" };
  if (code === 77) return { icon: "❄️", label: "Snow grains" };

  // 🌧️ Showers
  if (code === 80) return { icon: "🌧️", label: "Rain showers" };
  if (code === 81) return { icon: "🌧️🌧️", label: "Heavy rain showers" };
  if (code === 82) return { icon: "🌧️🌧️🌧️", label: "Violent rain showers" };

  // 🌨️ Snow showers
  if (code === 85) return { icon: "🌨️", label: "Snow showers" };
  if (code === 86) return { icon: "🌨️🌨️🌨️", label: "Heavy snow showers" };

  // ⛈️ Storms
  if (code === 95) return { icon: "⛈️", label: "Thunderstorm" };
  if (code === 96) return { icon: "⛈️⛈️", label: "Storm with hail" };
  if (code === 99) return { icon: "⛈️⛈️⛈️", label: "Severe storm with hail" };

  // Fallback
  return { icon: "🌡️", label: "Unknown conditions" };
}
