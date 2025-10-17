// Augment the google.maps types with the new Places Web Components API
// This file lives in `src/types` so it's included by tsconfig.json

/// <reference types="@types/google.maps" />

declare global {
  namespace google.maps {
    /**
     * Minimal subset of the PlacesLibrary returned by google.maps.importLibrary('places')
     * We only add the types we need for this project: PlaceAutocompleteElement.
     */
    interface PlacesLibrary {
      PlaceAutocompleteElement: {
        new (options?: {
          placeholder?: string;
          disabled?: boolean;
          value?: string;
          componentRestrictions?: { country: string[] };
        }): HTMLElement & {
          disabled: boolean;
          placeholder: string;
          value: string;
          componentRestrictions?: { country: string[] } | undefined;
          addEventListener(
            type: "gmp-placechange",
            listener: (event: CustomEvent<{ place: google.maps.places.PlaceResult }>) => void
          ): void;
        };
      };
    }
  }
}

export {};
