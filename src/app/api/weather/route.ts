import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("API called with:", { lat, lon });

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  console.log("OPENWEATHER_API_KEY:", apiKey ? "✓ found" : "❌ missing");

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    /* ------------------------------------------------------------
       1. Fetch weather
    ------------------------------------------------------------ */
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather:", weatherUrl);

    const weatherRes = await fetch(weatherUrl);
    console.log("OpenWeather response status:", weatherRes.status);

    if (!weatherRes.ok) {
      const msg = await weatherRes.text();
      console.error("OpenWeather error:", msg);
      return NextResponse.json({ error: msg }, { status: weatherRes.status });
    }

    const data = await weatherRes.json();
    console.log("OpenWeather success:", data.name);

    /* ------------------------------------------------------------
       2. Fetch elevation (Open-Meteo)
    ------------------------------------------------------------ */
    let elevation: number | null = null;

    try {
      const elevUrl = `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`;
      console.log("Fetching elevation:", elevUrl);

      const elevRes = await fetch(elevUrl);
      const elevData = await elevRes.json();

      elevation = elevData.elevation ?? null;
      console.log("Elevation:", elevation);
    } catch (e) {
      console.warn("Elevation fetch failed:", e);
    }

    /* ------------------------------------------------------------
       3. Unified response
    ------------------------------------------------------------ */
    return NextResponse.json({
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,

      // richer weather data
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,

      // coordinates
      lat: Number(lat),
      lon: Number(lon),

      // new field
      elevation,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
