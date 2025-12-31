export type WeatherData = {
  name: string;          // "Truckee, CA"
  lat: number;
  lon: number;

  temperature: number;   // °C or °F
  description: string;   // "Clear sky"
  icon: string;          // icon code or URL

  humidity: number;      // %
  windSpeed: number;     // m/s or km/h

  elevation?: number |null;  // meters
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
