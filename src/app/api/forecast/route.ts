import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
      `&timezone=auto`;

    const res = await fetch(url);

    if (!res.ok) {
      const msg = await res.text();
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    const data = await res.json();

    const days = data.daily.time.slice(0, 10).map(
      (date: string, i: number) => ({
        date: new Date(date).getTime(),
        min: Math.round(data.daily.temperature_2m_min[i]),
        max: Math.round(data.daily.temperature_2m_max[i]),
        weatherCode: data.daily.weathercode[i],
      })
    );

    return NextResponse.json(days);
  } catch (err) {
    return NextResponse.json(
      { error: "Forecast fetch failed", details: String(err) },
      { status: 500 }
    );
  }
}
