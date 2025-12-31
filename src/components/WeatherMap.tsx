"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

type Props = {
  lat: number;
  lon: number;
};


export function WeatherMap({ lat, lon }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [lon, lat],
      zoom: 9,
      interactive: false, // 👈 important
    });

    new maplibregl.Marker({ color: "#111" })
      .setLngLat([lon, lat])
      .addTo(map);

    return () => map.remove();
  }, [lat, lon]);

  return (
    <div
      ref={mapRef}
      className="h-48 w-full rounded-lg overflow-hidden border"
    />
  );
}
