export type WeatherData = {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  name: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
  elevation?: number;
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
