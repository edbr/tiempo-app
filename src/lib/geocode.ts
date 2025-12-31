export type GeoResult = {
  lat: number;
  lon: number;
  name: string;
};

export async function geocodeCity(query: string): Promise<GeoResult> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "weather-app" },
  });

  if (!res.ok) {
    throw new Error("Geocoding failed");
  }

  const data = await res.json();

  if (!data.length) {
    throw new Error("Location not found");
  }

  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    name: data[0].display_name,
  };
}
