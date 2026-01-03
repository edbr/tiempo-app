export type WeatherData = {
  // Location
  name: string;
  country?: string;
  lat: number;
  lon: number;

  // Temperature & atmosphere
  temperature: number;
  feelsLike?: number;
  humidity: number;
  pressure?: number;

  // Wind
  windSpeed: number;
  windDeg?: number;

  // Precipitation & clouds
  rain1h?: number;
  cloudCover?: number;

  // Time & sun (UTC timestamps + timezone offset)
  dt?: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;

  // Visuals
  description: string;
  icon: string;

  // Optional enrichment
  elevation?: number | null;
};



export type ForecastDay = {
  date: number;
  min: number;
  max: number;
  weatherCode: number;
};

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<ForecastDay[]> {
  const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Forecast fetch failed");
  return (await res.json()) as ForecastDay[];
}
