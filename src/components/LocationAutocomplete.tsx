"use client";

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  onSelect: (place: google.maps.places.PlaceResult) => void;
};

export function LocationAutocomplete({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      const { Loader } = await import("@googlemaps/js-api-loader");
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        libraries: ["places"],
      });

      await loader.load();
      createAutocomplete();
    }

    function createAutocomplete() {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"], // or ["geocode"] for full addresses
        fields: ["geometry", "name", "formatted_address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) onSelect(place);
      });
    }

    init().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("Autocomplete init error:", error.message);
      } else {
        console.error("Unknown error initializing autocomplete");
      }
    });
  }, [onSelect]);

  return (
    <Input
      ref={inputRef}
      placeholder="Enter a location"
      className="w-full"
      type="text"
    />
  );
}
