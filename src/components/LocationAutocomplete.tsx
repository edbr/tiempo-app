"use client";

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";

type Props = {
  onSelect: (place: google.maps.places.PlaceResult) => void;
};

export function LocationAutocomplete({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { Loader } = await import("@googlemaps/js-api-loader");
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        libraries: ["places"],
      });

      await loader.load();

      // ✅ Import new Places library
      const { PlaceAutocompleteElement } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;

      // ✅ Create new Autocomplete element
      const autocomplete = new PlaceAutocompleteElement({
        placeholder: "Enter a city",
        componentRestrictions: { country: ["us"] }, // optional
      });

      // ✅ Listen for place changes
      autocomplete.addEventListener("gmp-placechange", (e: Event) => {
        const customEvent = e as CustomEvent<{ place: google.maps.places.PlaceResult }>;
        const place = customEvent.detail.place;
        if (place) onSelect(place);
      });

      // ✅ Mount into container
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // clear previous
        containerRef.current.appendChild(autocomplete);
      }
    }

    init().catch((err) => console.error("Autocomplete init error:", err));
  }, [onSelect]);

  return <div ref={containerRef} className="w-full" />;
}
