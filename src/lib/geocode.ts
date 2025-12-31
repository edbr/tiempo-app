export type GeocodeResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export async function geocodeCity(city: string): Promise<GeocodeResult> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Geocoding failed");
  }

  const data = (await res.json()) as GeocodeResult[];

  if (!data.length) {
    throw new Error("City not found");
  }

  return data[0];
}
